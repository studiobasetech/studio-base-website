/**
 * ORBIT DEFENSE — 3D edition (Three.js).
 *
 * Same public API as the old 2D engine, so sections/OrbitGame.tsx keeps its
 * console UI, HUD and start / game-over screens:
 *   createGame(canvas, { onHud, onPhase, onOver, getLang })
 *     → { resize, start, setTarget, setKey, isLive, destroy }
 *
 * Everything is procedural (no model files): metallic ship, displaced rock
 * asteroids, drones, a mothership boss, nebula sky, lit planet, star streaks,
 * particle explosions and bloom post-processing.
 */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

export type Phase = "ready" | "countdown" | "playing" | "over";
export type HudState = {
  score: number;
  lives: number;
  wave: number;
  mult: number;
  shield: boolean;
  triple: number;
  boss: number | null;
  rescued: number;
};
export type GameLang = "en" | "es";
type Callbacks = {
  onHud: (h: HudState) => void;
  onPhase: (p: Phase) => void;
  onOver: (score: number) => void;
  getLang?: () => GameLang;
};
type Bi = { en: string; es: string };

/* ------------------------------------------------------------------ */
/* small helpers                                                        */
/* ------------------------------------------------------------------ */
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// deterministic 3D value noise (for asteroid surfaces)
function hash3(x: number, y: number, z: number) {
  let h = x * 374761393 + y * 668265263 + z * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function vnoise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const s = (t: number) => t * t * (3 - 2 * t);
  const u = s(xf), v = s(yf), w = s(zf);
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz);
  const x00 = lerp(c(0, 0, 0), c(1, 0, 0), u), x10 = lerp(c(0, 1, 0), c(1, 1, 0), u);
  const x01 = lerp(c(0, 0, 1), c(1, 0, 1), u), x11 = lerp(c(0, 1, 1), c(1, 1, 1), u);
  return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
}
function fbm(x: number, y: number, z: number, oct = 4) {
  let a = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { a += amp * vnoise(x * f, y * f, z * f); f *= 2.03; amp *= 0.5; }
  return a;
}

/* ------------------------------------------------------------------ */
/* procedural geometry                                                  */
/* ------------------------------------------------------------------ */
function makeAsteroidGeometry(seed: number, detail: number) {
  const base = new THREE.IcosahedronGeometry(1, detail);
  const pos = base.getAttribute("position") as THREE.BufferAttribute;
  // weld vertices so displaced surface stays closed and smooth-shaded
  const map = new Map<string, number>();
  const verts: number[] = [];
  const index: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const k = `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
    let id = map.get(k);
    if (id === undefined) { id = verts.length / 3; map.set(k, id); verts.push(x, y, z); }
    index.push(id);
  }
  const o = seed * 13.17;
  const sx = 0.8 + hash3(seed, 1, 2) * 0.45, sy = 0.7 + hash3(seed, 3, 4) * 0.4, sz = 0.8 + hash3(seed, 5, 6) * 0.4;
  // craters
  const craters: [THREE.Vector3, number][] = [];
  for (let c = 0; c < 9; c++) {
    const v = new THREE.Vector3(hash3(seed, c, 7) - 0.5, hash3(seed, c, 8) - 0.5, hash3(seed, c, 9) - 0.5).normalize();
    craters.push([v, 0.18 + hash3(seed, c, 10) * 0.32]);
  }
  const colors: number[] = [];
  const n = new THREE.Vector3();
  for (let i = 0; i < verts.length; i += 3) {
    n.set(verts[i], verts[i + 1], verts[i + 2]).normalize();
    let d = 1 + (fbm(n.x * 1.6 + o, n.y * 1.6 + o, n.z * 1.6 + o, 4) - 0.5) * 0.75;
    d += (fbm(n.x * 6 + o, n.y * 6, n.z * 6, 3) - 0.5) * 0.16;
    d += (Math.abs(fbm(n.x * 14 + o, n.y * 14, n.z * 14, 2) - 0.5)) * -0.07; // sharp ridges / pitting
    let crater = 0;
    for (const [cv, cr] of craters) {
      const dist = n.distanceTo(cv);
      if (dist < cr) {
        const t = dist / cr;
        d -= (1 - t * t) * 0.16 * cr * 2.4; // bowl
        crater = Math.max(crater, 1 - t);
      } else if (dist < cr * 1.35) {
        d += Math.sin(((dist - cr) / (cr * 0.35)) * Math.PI) * 0.035; // rim
      }
    }
    verts[i] = n.x * d * sx; verts[i + 1] = n.y * d * sy; verts[i + 2] = n.z * d * sz;
    // dark basalt with dusty highlights; crater floors darker (colors are linear)
    let tone = 0.035 + fbm(n.x * 4 + o, n.y * 4, n.z * 4, 3) * 0.075;
    tone *= 1 - crater * 0.45;
    if (hash3(Math.floor(n.x * 40), Math.floor(n.y * 40), Math.floor(n.z * 40) + seed) > 0.93) tone += 0.05; // mineral specks
    const warm = 0.008 + hash3(seed, 11, 12) * 0.02;
    colors.push(tone + warm, tone * 0.93 + warm * 0.5, tone * 0.86);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  g.setIndex(index);
  g.computeVertexNormals();
  base.dispose();
  return g;
}

function makeShip() {
  const ship = new THREE.Group();
  const hull = new THREE.MeshStandardMaterial({ color: 0xd4d8e2, metalness: 0.9, roughness: 0.26 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b2230, metalness: 0.8, roughness: 0.38 });
  const blue = new THREE.MeshStandardMaterial({ color: 0x2f6fe8, metalness: 0.7, roughness: 0.25, emissive: 0x0b2a6b, emissiveIntensity: 0.6 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0b1530, metalness: 0.2, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.03 });
  const glowBlue = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.55, 0.8, 3.2), toneMapped: false });

  // fuselage (lathe profile, nose toward -Z)
  const prof: THREE.Vector2[] = [];
  const P = [[0, 0], [0.08, 0.15], [0.2, 0.5], [0.3, 1.0], [0.36, 1.6], [0.38, 2.1], [0.34, 2.6], [0.26, 2.9], [0, 2.95]];
  for (const [r, y] of P) prof.push(new THREE.Vector2(r, y));
  const fus = new THREE.Mesh(new THREE.LatheGeometry(prof, 40), hull);
  fus.rotation.x = -Math.PI / 2; fus.position.z = -1.55; fus.scale.set(1, 1, 0.72);
  ship.add(fus);
  // spine stripe
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 2.1), blue);
  stripe.position.set(0, 0.27, 0.1); ship.add(stripe);

  // wings (extruded swept shape), mirrored
  const ws = new THREE.Shape();
  ws.moveTo(0, -0.2); ws.lineTo(1.65, 0.55); ws.lineTo(1.75, 0.95); ws.lineTo(1.5, 1.0); ws.lineTo(0, 0.95); ws.closePath();
  const wg = new THREE.ExtrudeGeometry(ws, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.03, bevelSegments: 2 });
  wg.rotateX(Math.PI / 2);
  for (const s of [1, -1]) {
    const w = new THREE.Mesh(wg, hull);
    w.scale.x = s; w.position.set(0.2 * s, -0.02, -0.2);
    ship.add(w);
    // blue leading-edge panel
    const edge = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.035, 0.14), blue);
    edge.position.set(0.95 * s, 0.04, 0.12 + 0.0); edge.rotation.y = -0.42 * s;
    ship.add(edge);
    // wing-tip light
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), new THREE.MeshBasicMaterial({ color: s > 0 ? new THREE.Color(0.6, 2.2, 0.8) : new THREE.Color(2.6, 0.4, 0.4), toneMapped: false }));
    tip.position.set(1.83 * s, 0.0, 0.75); ship.add(tip);
    // engine nacelle
    const nac = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.2, 24), dark);
    nac.rotation.x = Math.PI / 2; nac.position.set(0.52 * s, -0.04, 0.85); ship.add(nac);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.035, 12, 32), glowBlue);
    ring.position.set(0.52 * s, -0.04, 1.46); ship.add(ring);
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.14, 24), glowBlue);
    core.position.set(0.52 * s, -0.04, 1.47); ship.add(core);
    // tail fin
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.55), hull);
    fin.position.set(0.32 * s, 0.25, 1.0); fin.rotation.z = -0.35 * s; fin.rotation.x = 0.35; ship.add(fin);
  }
  // cockpit canopy
  const can = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2), glass);
  can.scale.set(0.85, 0.9, 2.1); can.position.set(0, 0.17, -0.45); ship.add(can);

  // exhaust flames (additive cones)
  const flameMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPower: { value: 1 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `uniform float uTime; uniform float uPower; varying vec2 vUv;
      void main(){ float t=vUv.y; float f=pow(1.-t,1.6); float flick=0.85+0.15*sin(uTime*60.+vUv.x*20.);
        vec3 c=mix(vec3(0.4,0.7,3.5),vec3(2.4,2.8,3.6),f*f); gl_FragColor=vec4(c*f*flick*uPower, f*flick); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  const flames: THREE.Mesh[] = [];
  for (const s of [1, -1]) {
    const fl = new THREE.Mesh(new THREE.ConeGeometry(0.13, 1.4, 20, 1, true), flameMat);
    fl.rotation.x = -Math.PI / 2; fl.position.set(0.52 * s, -0.04, 2.15); ship.add(fl); flames.push(fl);
  }
  // shield bubble
  const shield = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 40, 24),
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz); vP=position; gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform float uTime; uniform float uAlpha; varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main(){ float fr=pow(1.-abs(dot(vN,vV)),2.5); float hex=0.5+0.5*sin(vP.x*9.+uTime*2.)*sin(vP.y*9.)*sin(vP.z*9.-uTime*1.5);
          vec3 c=vec3(2.6,2.1,0.4)*(fr*1.2+hex*0.08); gl_FragColor=vec4(c, (fr*0.9+0.05)*uAlpha); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    }),
  );
  shield.scale.set(1.15, 0.6, 1.0);
  ship.add(shield);
  ship.scale.setScalar(0.62);
  return { ship, flameMat, flames, shield };
}

function makeDrone() {
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x5b6475, metalness: 0.9, roughness: 0.3 });
  const darkM = new THREE.MeshStandardMaterial({ color: 0x14161d, metalness: 0.7, roughness: 0.45 });
  const red = new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 0.35, 0.5), toneMapped: false });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 16), metal);
  body.scale.set(1.6, 0.42, 1.6); g.add(body);
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), darkM);
  top.position.y = 0.18; g.add(top);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 10, 64), red);
  ring.rotation.x = Math.PI / 2; g.add(ring);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), red);
    l.position.set(Math.cos(a) * 0.9, -0.12, Math.sin(a) * 0.9); g.add(l);
  }
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), red);
  eye.position.set(0, -0.05, 1.15); eye.scale.set(1, 0.6, 0.5); g.add(eye);
  return g;
}

function makeBoss() {
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x8a92a3, metalness: 0.92, roughness: 0.28 });
  const darkM = new THREE.MeshStandardMaterial({ color: 0x0e1118, metalness: 0.8, roughness: 0.4 });
  const purple = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 0.5, 3.4), toneMapped: false });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 5.2, 0.7, 64), metal); g.add(disc);
  const under = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 3.2, 0.9, 64), darkM); under.position.y = -0.8; g.add(under);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.0, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: 0x1a0d33, metalness: 0.3, roughness: 0.05, clearcoat: 1 }));
  dome.position.y = 0.35; g.add(dome);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.75, 0.09, 12, 96), purple); ring.rotation.x = Math.PI / 2; ring.position.y = -0.05; g.add(ring);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.9), darkM);
    p.position.set(Math.cos(a) * 4.2, 0.4, Math.sin(a) * 4.2); p.rotation.y = -a; g.add(p);
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), purple);
    l.position.set(Math.cos(a) * 3.2, -1.25, Math.sin(a) * 3.2); g.add(l);
  }
  const beam = new THREE.Mesh(new THREE.SphereGeometry(0.6, 20, 20), purple); beam.position.set(0, -1.15, 0); beam.scale.y = 0.4; g.add(beam);
  return g;
}

/* ------------------------------------------------------------------ */
/* background                                                           */
/* ------------------------------------------------------------------ */
function makeSky() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(900, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `
        uniform float uTime; varying vec3 vDir;
        float h(vec3 p){ p=fract(p*0.3183099+.1); p*=17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        float n(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.-2.*f);
          return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
                     mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
        float fbm(vec3 p){ float a=0.,w=.5; for(int i=0;i<5;i++){ a+=w*n(p); p*=2.07; w*=.5; } return a; }
        void main(){
          vec3 d=normalize(vDir);
          float c1=fbm(d*2.4+vec3(0.,0.,uTime*0.004));
          float c2=fbm(d*4.8+vec3(5.2,1.3,0.));
          float band=exp(-pow((d.y*1.2+d.x*0.35-0.05)*2.2,2.));
          vec3 col=vec3(0.004,0.007,0.018);
          col+=vec3(0.03,0.07,0.22)*pow(c1,3.2)*band*1.6;
          col+=vec3(0.16,0.04,0.22)*pow(c2,3.8)*band*1.1;
          col+=vec3(0.01,0.025,0.07)*pow(c1*c2,1.5);
          // tiny distant stars
          vec3 q=d*420.; float s=h(floor(q)); float tw=0.6+0.4*sin(uTime*2.+s*40.);
          col+=vec3(0.75,0.85,1.)*step(0.9975,s)*tw*1.4;
          gl_FragColor=vec4(col,1.);
        }`,
    }),
  );
}

function makePlanet() {
  const g = new THREE.Group();
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uSun: { value: new THREE.Vector3(1, 0.35, 0.6).normalize() } },
      vertexShader: `varying vec3 vN; varying vec3 vP; varying vec3 vW; void main(){ vP=position; vN=normalize(mat3(modelMatrix)*normal); vW=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.); }`,
      fragmentShader: `
        uniform float uTime; uniform vec3 uSun; varying vec3 vN; varying vec3 vP; varying vec3 vW;
        float h(vec3 p){ p=fract(p*0.3183099+.1); p*=17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        float n(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.-2.*f);
          return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
                     mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
        float fbm(vec3 p){ float a=0.,w=.5; for(int i=0;i<6;i++){ a+=w*n(p); p*=2.03; w*=.5; } return a; }
        vec3 warp(vec3 p){ return p+vec3(fbm(p*1.7),fbm(p*1.7+3.1),fbm(p*1.7+7.7))*0.9; }
        void main(){
          float ang=uTime*0.006; mat3 r=mat3(cos(ang),0.,sin(ang),0.,1.,0.,-sin(ang),0.,cos(ang));
          vec3 p=r*normalize(vP);
          vec3 N=normalize(vN);
          float land=fbm(warp(p*1.6));
          float lat=abs(p.y);
          float detail=fbm(p*14.);
          vec3 deep=vec3(0.004,0.018,0.06), shallow=vec3(0.01,0.06,0.13);
          vec3 ocean=mix(deep,shallow,smoothstep(0.38,0.53,land));
          vec3 desert=vec3(0.30,0.22,0.14), forest=vec3(0.05,0.09,0.05), rock=vec3(0.16,0.15,0.14);
          vec3 ground=mix(forest,desert,smoothstep(0.35,0.7,fbm(p*4.+5.)));
          ground=mix(ground,rock,smoothstep(0.62,0.72,land))*(0.7+0.6*detail);
          float isLand=smoothstep(0.535,0.55,land);
          vec3 col=mix(ocean,ground,isLand);
          col=mix(col,vec3(0.85,0.9,0.95),smoothstep(0.78,0.86,lat+detail*0.12)); // ice caps
          // clouds: two layers, streaky along latitude
          vec3 cp=p*vec3(3.,6.,3.)+vec3(uTime*0.003,0.,0.);
          float cl=smoothstep(0.52,0.8,fbm(warp(cp*0.8)))*0.9+smoothstep(0.6,0.85,fbm(p*11.+2.))*0.35;
          cl=clamp(cl,0.,1.);
          col=mix(col,vec3(0.92,0.94,0.98),cl);
          float NL=dot(N,uSun);
          float dif=smoothstep(-0.08,0.5,NL);
          vec3 V=normalize(cameraPosition-vW);
          // ocean glint
          vec3 H=normalize(uSun+V); float spec=pow(max(dot(N,H),0.),70.)*(1.-isLand)*(1.-cl)*1.6;
          // warm terminator scattering
          float term=exp(-pow(NL*5.,2.))*0.6;
          vec3 lit=col*dif*0.95+vec3(1.0,0.45,0.2)*term*0.12+vec3(1.,0.95,0.85)*spec*dif;
          float city=isLand*step(0.8,n(p*90.))*smoothstep(0.55,0.65,fbm(p*7.))*(1.-smoothstep(-0.2,0.02,NL))*(1.-cl);
          lit+=vec3(1.5,0.9,0.45)*city*0.5;
          float fr=pow(1.-max(dot(N,V),0.),2.5);
          lit+=vec3(0.12,0.32,0.95)*fr*smoothstep(-0.3,0.6,NL)*0.9;
          gl_FragColor=vec4(lit,1.);
        }`,
    }),
  );
  g.add(planet);
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(1.035, 96, 64),
    new THREE.ShaderMaterial({
      uniforms: { uSun: { value: new THREE.Vector3(1, 0.35, 0.6).normalize() } },
      vertexShader: `varying vec3 vN; varying vec3 vW; void main(){ vN=normalize(mat3(modelMatrix)*normal); vW=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.); }`,
      fragmentShader: `uniform vec3 uSun; varying vec3 vN; varying vec3 vW;
        void main(){ vec3 V=normalize(cameraPosition-vW); float fr=pow(1.-abs(dot(vN,V)),4.);
          float lit=smoothstep(-0.35,0.5,dot(vN,uSun)); vec3 c=mix(vec3(1.0,0.5,0.25),vec3(0.3,0.6,1.6),smoothstep(-0.1,0.4,dot(vN,uSun))); gl_FragColor=vec4(c*fr*lit*1.3, fr); }`,
      side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  g.add(atmo);
  return { group: g, planet, atmo };
}

/* soft round sprite texture (for glows) */
function glowTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const x = c.getContext("2d")!;
  const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.25, "rgba(255,255,255,0.55)"); gr.addColorStop(0.6, "rgba(255,255,255,0.12)"); gr.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/* environment map for metallic reflections */
function makeEnv(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: `varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `varying vec3 vD; void main(){ float y=vD.y; vec3 c=mix(vec3(0.01,0.015,0.04),vec3(0.06,0.12,0.35),smoothstep(-0.2,0.8,y)); gl_FragColor=vec4(c,1.); }`,
  }));
  scene.add(sky);
  const panel = (w: number, h: number, color: THREE.Color, pos: THREE.Vector3) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    m.position.copy(pos); m.lookAt(0, 0, 0); scene.add(m);
  };
  panel(6, 2.2, new THREE.Color(3.5, 3.4, 3.2), new THREE.Vector3(5, 6, 3));
  panel(3, 8, new THREE.Color(0.4, 0.8, 3.0), new THREE.Vector3(-7, 1, -4));
  panel(8, 1.2, new THREE.Color(1.2, 1.3, 1.6), new THREE.Vector3(0, -6, 4));
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(scene, 0.03);
  pm.dispose();
  return rt.texture;
}

/* ------------------------------------------------------------------ */
/* main                                                                 */
/* ------------------------------------------------------------------ */
type Kind = "rock" | "drone" | "boss" | "pod" | "shieldUp" | "tripleUp";
type Ent = {
  kind: Kind; obj: THREE.Object3D; x: number; z: number; vx: number; vz: number; r: number;
  hp: number; maxHp: number; spin: THREE.Vector3; t: number; fireCd: number; size: number; baseX: number;
};
type Bolt = { mesh: THREE.Mesh; x: number; z: number; vx: number; vz: number; enemy: boolean };
type Popup = { x: number; z: number; text: string; life: number; color: string };

const WAVE_NAMES: Bi[] = [
  { en: "ASTEROID BELT", es: "CINTURÓN DE ASTEROIDES" },
  { en: "DRONE PATROL", es: "PATRULLA DE DRONES" },
  { en: "DEBRIS STORM", es: "TORMENTA DE ESCOMBROS" },
  { en: "MOTHERSHIP", es: "NAVE NODRIZA" },
];

export function createGame(canvas: HTMLCanvasElement, cb: Callbacks) {
  const lang = () => (cb.getLang ? cb.getLang() : "en");
  const tx = (b: Bi) => b[lang()];
  const mobile = typeof window !== "undefined" && (window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 700);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02040b, 0.0042);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 2000);
  const camBase = new THREE.Vector3(0, 5.2, 12.5);
  camera.position.copy(camBase);
  const camLook = new THREE.Vector3(0, 0.4, -26);
  camera.lookAt(camLook);

  scene.environment = makeEnv(renderer);
  scene.environmentIntensity = 0.9;

  /* lights */
  scene.add(new THREE.AmbientLight(0x2a3558, 0.55));
  const sun = new THREE.DirectionalLight(0xfff1df, 2.6); sun.position.set(30, 22, 18); scene.add(sun);
  const rim = new THREE.DirectionalLight(0x3b82f6, 2.2); rim.position.set(-20, 8, -40); scene.add(rim);
  const under = new THREE.DirectionalLight(0x7c3aed, 0.5); under.position.set(0, -10, 5); scene.add(under);

  /* background */
  const sky = makeSky(); scene.add(sky);
  const pl = makePlanet();
  pl.group.scale.setScalar(210); pl.group.position.set(-520, 245, -800); scene.add(pl.group);
  const tex = glowTexture();
  const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(2.4, 2.2, 1.9), blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  sunGlow.scale.set(150, 150, 1); sunGlow.position.set(260, 330, -950); scene.add(sunGlow);
  {
    const sd = sunGlow.position.clone().sub(pl.group.position).normalize();
    ((pl.planet.material as THREE.ShaderMaterial).uniforms.uSun.value as THREE.Vector3).copy(sd);
    ((pl.atmo.material as THREE.ShaderMaterial).uniforms.uSun.value as THREE.Vector3).copy(sd);
  }

  // moving star field (streaks get longer with speed)
  const STAR_N = mobile ? 900 : 2200;
  const starPos = new Float32Array(STAR_N * 3);
  const starCol = new Float32Array(STAR_N * 3);
  for (let i = 0; i < STAR_N; i++) {
    starPos[i * 3] = rand(-140, 140); starPos[i * 3 + 1] = rand(-60, 70); starPos[i * 3 + 2] = rand(-420, 20);
    const b = rand(0.5, 1.6), blue = Math.random() < 0.25;
    starCol[i * 3] = b * (blue ? 0.6 : 1); starCol[i * 3 + 1] = b * (blue ? 0.8 : 1); starCol[i * 3 + 2] = b * 1.1;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: mobile ? 0.32 : 0.24, vertexColors: true, map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  scene.add(stars);
  // speed lines
  const LINE_N = mobile ? 50 : 120;
  const linePos = new Float32Array(LINE_N * 6);
  const lineSeeds: { x: number; y: number; z: number; s: number }[] = [];
  for (let i = 0; i < LINE_N; i++) lineSeeds.push({ x: rand(-60, 60), y: rand(-20, 30), z: rand(-300, 10), s: rand(0.6, 1.4) });
  const lineGeo = new THREE.BufferGeometry(); lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: new THREE.Color(0.35, 0.55, 1.2), transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(lines);

  /* player */
  const P = makeShip(); P.ship.scale.setScalar(1.3); scene.add(P.ship);
  const engineGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(0.6, 1.0, 3.2), blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  engineGlow.scale.set(1.3, 0.7, 1); scene.add(engineGlow);

  /* assets */
  const rockGeos = Array.from({ length: mobile ? 4 : 7 }, (_, i) => makeAsteroidGeometry(i + 3, mobile ? 4 : 5));
  const rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88, metalness: 0.12, envMapIntensity: 0.6 });
  const boltGeo = new THREE.CapsuleGeometry(0.07, 1.1, 4, 8); boltGeo.rotateX(Math.PI / 2);
  const boltMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 1.7, 4.2), toneMapped: false });
  const eBoltMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(4.0, 0.45, 0.6), toneMapped: false });
  const podMat = new THREE.MeshStandardMaterial({ color: 0xeef2ff, metalness: 0.5, roughness: 0.25, emissive: 0x334466, emissiveIntensity: 0.4 });

  /* particles (pooled, additive) */
  const PART_N = mobile ? 1400 : 3200;
  const pPos = new Float32Array(PART_N * 3), pCol = new Float32Array(PART_N * 3), pSize = new Float32Array(PART_N);
  const pVel = new Float32Array(PART_N * 3), pLife = new Float32Array(PART_N), pMax = new Float32Array(PART_N), pBase = new Float32Array(PART_N * 3), pS0 = new Float32Array(PART_N);
  let pHead = 0;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
  pGeo.setAttribute("size", new THREE.BufferAttribute(pSize, 1));
  const pMat = new THREE.ShaderMaterial({
    uniforms: { uMap: { value: tex }, uScale: { value: 300 } },
    vertexShader: `attribute float size; attribute vec3 color; varying vec3 vC; uniform float uScale;
      void main(){ vC=color; vec4 mv=modelViewMatrix*vec4(position,1.); gl_PointSize=size*uScale/max(-mv.z,0.1); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform sampler2D uMap; varying vec3 vC; void main(){ vec4 t=texture2D(uMap,gl_PointCoord); gl_FragColor=vec4(vC*t.a, t.a); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  const particles = new THREE.Points(pGeo, pMat); particles.frustumCulled = false; scene.add(particles);
  function emit(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, size: number, r: number, g: number, b: number) {
    const i = pHead; pHead = (pHead + 1) % PART_N;
    pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
    pVel[i * 3] = vx; pVel[i * 3 + 1] = vy; pVel[i * 3 + 2] = vz;
    pLife[i] = life; pMax[i] = life; pS0[i] = size; pBase[i * 3] = r; pBase[i * 3 + 1] = g; pBase[i * 3 + 2] = b;
  }

  /* debris chunks (instanced rocks) */
  const DEB_N = mobile ? 60 : 160;
  const debris = new THREE.InstancedMesh(rockGeos[0], rockMat, DEB_N); debris.frustumCulled = false; scene.add(debris);
  const dState = Array.from({ length: DEB_N }, () => ({ p: new THREE.Vector3(0, -999, 0), v: new THREE.Vector3(), r: new THREE.Euler(), w: new THREE.Vector3(), s: 0, life: 0 }));
  let dHead = 0;
  const dm = new THREE.Matrix4(), dq = new THREE.Quaternion(), ds = new THREE.Vector3();

  /* shockwave rings + flash lights */
  const ringGeo = new THREE.RingGeometry(0.85, 1, 64); ringGeo.rotateX(-Math.PI / 2);
  const rings: { m: THREE.Mesh; t: number; max: number; size: number }[] = [];
  const flashes = [0, 1, 2].map(() => { const l = new THREE.PointLight(0x9cc3ff, 0, 30, 2); scene.add(l); return l; });
  let flashHead = 0;

  /* post-processing */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), mobile ? 0.6 : 0.72, 0.45, 0.85);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* 2D overlay for text (countdown, banners, popups) */
  const overlay = document.createElement("canvas");
  overlay.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
  canvas.after(overlay); // sits right above the canvas, below any UI layered on top
  const octx = overlay.getContext("2d")!;

  /* state */
  let W = 800, H = 600, halfX = 7;
  const s = {
    phase: "ready" as Phase, t: 0, score: 0, lives: 3, wave: 1, waveT: 0, mult: 1, comboT: 0, shieldT: 0, tripleT: 0,
    rescued: 0, invT: 0, fireCd: 0, spawnCd: 1, droneCd: 6, podCd: 14, cdT: 0, overT: 0, shake: 0, speed: 1,
    shipX: 0, shipVX: 0, targetX: 0, keys: { left: false, right: false }, boss: null as Ent | null, bossDone: 0,
    banner: null as { text: string; sub: string; t: number } | null,
  };
  const ents: Ent[] = [];
  const bolts: Bolt[] = [];
  const popups: Popup[] = [];
  let lastHud = "";

  function hud() {
    const h: HudState = { score: Math.floor(s.score), lives: s.lives, wave: s.wave, mult: s.mult, shield: s.shieldT > 0, triple: Math.max(0, s.tripleT), boss: s.boss ? clamp(s.boss.hp / s.boss.maxHp, 0, 1) : null, rescued: s.rescued };
    const key = JSON.stringify({ ...h, triple: Math.ceil(h.triple * 10) / 10, boss: h.boss === null ? null : Math.round(h.boss * 100) });
    if (key !== lastHud) { lastHud = key; cb.onHud(h); }
  }

  /* ---------- spawning ---------- */
  function addRock(x: number, z: number, size: number, vz?: number) {
    const m = new THREE.Mesh(rockGeos[Math.floor(Math.random() * rockGeos.length)], rockMat);
    m.scale.setScalar(size); m.rotation.set(rand(0, 6), rand(0, 6), rand(0, 6));
    scene.add(m);
    ents.push({ kind: "rock", obj: m, x, z, vx: rand(-0.6, 0.6), vz: vz ?? rand(11, 16) + s.wave * 1.2, r: size * 0.92, hp: Math.ceil(size * 1.4), maxHp: Math.ceil(size * 1.4), spin: new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).multiplyScalar(1.2 / size), t: 0, fireCd: 0, size, baseX: x });
  }
  function addDrone() {
    const g = makeDrone(); g.scale.setScalar(0.85); scene.add(g);
    const x = rand(-halfX, halfX);
    ents.push({ kind: "drone", obj: g, x, z: -150, vx: 0, vz: 13, r: 1.25, hp: 3, maxHp: 3, spin: new THREE.Vector3(), t: rand(0, 6), fireCd: rand(1.2, 2.2), size: 1, baseX: x });
  }
  function addBoss() {
    const g = makeBoss(); scene.add(g);
    const hp = 45 + s.wave * 8;
    const b: Ent = { kind: "boss", obj: g, x: 0, z: -190, vx: 0, vz: 18, r: 4.6, hp, maxHp: hp, spin: new THREE.Vector3(), t: 0, fireCd: 2, size: 1, baseX: 0 };
    ents.push(b); s.boss = b;
  }
  function addPickup(kind: "pod" | "shieldUp" | "tripleUp", x: number, z: number) {
    let obj: THREE.Object3D;
    if (kind === "pod") {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.7, 6, 16), podMat); body.rotation.z = Math.PI / 2; g.add(body);
      const win = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 1.4, 3), toneMapped: false })); win.position.set(0.25, 0.1, 0.2); g.add(win);
      const beacon = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(1.5, 2.5, 3.5), blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); beacon.scale.set(2.4, 2.4, 1); g.add(beacon);
      obj = g;
    } else {
      const c = kind === "shieldUp" ? new THREE.Color(3.2, 2.5, 0.4) : new THREE.Color(2.2, 0.8, 3.6);
      const g = new THREE.Group();
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 0), new THREE.MeshStandardMaterial({ color: 0x111111, emissive: c, emissiveIntensity: 1, metalness: 0.5, roughness: 0.2 })); g.add(core);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: c, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); halo.scale.set(3, 3, 1); g.add(halo);
      obj = g;
    }
    scene.add(obj);
    ents.push({ kind, obj, x, z, vx: 0, vz: 10, r: 0.9, hp: 1, maxHp: 1, spin: new THREE.Vector3(0.8, 1.6, 0.4), t: 0, fireCd: 0, size: 1, baseX: x });
  }
  function removeEnt(e: Ent) {
    scene.remove(e.obj);
    e.obj.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh && m.geometry && !rockGeos.includes(m.geometry as THREE.BufferGeometry)) m.geometry.dispose(); });
    const i = ents.indexOf(e); if (i >= 0) ents.splice(i, 1);
    if (e === s.boss) s.boss = null;
  }
  function fire(x: number, z: number, vx: number, vz: number, enemy: boolean) {
    const m = new THREE.Mesh(boltGeo, enemy ? eBoltMat : boltMat);
    m.position.set(x, 0, z); m.rotation.y = Math.atan2(-vx, -vz);
    if (enemy) m.scale.set(1.6, 1.6, 0.8);
    scene.add(m); bolts.push({ mesh: m, x, z, vx, vz, enemy });
  }

  /* ---------- effects ---------- */
  function explode(x: number, z: number, size: number, color = new THREE.Color(3.2, 1.6, 0.6), big = false) {
    const n = Math.floor((big ? 260 : 70) * size * (mobile ? 0.6 : 1));
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), e = rand(-1, 1), sp = rand(2, big ? 26 : 13) * Math.sqrt(size);
      const vx = Math.cos(a) * Math.sqrt(1 - e * e) * sp, vy = e * sp * 0.6, vz = Math.sin(a) * Math.sqrt(1 - e * e) * sp;
      const hot = Math.random() < 0.15;
      emit(x, 0, z, vx, vy, vz + 6, rand(0.4, big ? 1.8 : 1.0), rand(0.25, 0.7) * (big ? 2 : 1) * Math.sqrt(size), hot ? 2.4 : color.r * 0.7, hot ? 2.0 : color.g * 0.7, hot ? 1.5 : color.b * 0.7);
    }
    // smoke
    for (let i = 0; i < 18 * size; i++) emit(x + rand(-0.5, 0.5), rand(-0.3, 0.3), z + rand(-0.5, 0.5), rand(-2, 2), rand(-1, 1), rand(0, 4), rand(0.8, 1.6), rand(1.2, 2.4) * size, 0.18, 0.2, 0.28);
    // debris
    const dn = Math.min(DEB_N / 4, Math.floor(6 * size + (big ? 20 : 0)));
    for (let i = 0; i < dn; i++) {
      const d = dState[dHead]; dHead = (dHead + 1) % DEB_N;
      d.p.set(x, 0, z); d.v.set(rand(-8, 8), rand(-4, 6), rand(-6, 10)).multiplyScalar(Math.sqrt(size)); d.r.set(rand(0, 6), rand(0, 6), rand(0, 6)); d.w.set(rand(-6, 6), rand(-6, 6), rand(-6, 6)); d.s = rand(0.08, 0.22) * size; d.life = rand(1, 2);
    }
    // shockwave
    const rm = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: big ? new THREE.Color(1.6, 1.2, 3) : new THREE.Color(1.8, 1.6, 2.4), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }));
    rm.position.set(x, 0, z); scene.add(rm); rings.push({ m: rm, t: 0, max: big ? 1.2 : 0.55, size: (big ? 14 : 4) * size });
    // light flash
    const l = flashes[flashHead]; flashHead = (flashHead + 1) % flashes.length;
    l.position.set(x, 1.5, z); l.color.setRGB(color.r / 3, color.g / 3, color.b / 3); l.intensity = big ? 220 : 60 * size;
    s.shake = Math.min(1.2, s.shake + (big ? 1 : 0.18 * size));
  }
  function popup(x: number, z: number, text: string, color: string) { popups.push({ x, z, text, life: 1.1, color }); }
  function banner(text: string, sub = "") { s.banner = { text, sub, t: 0 }; }

  /* ---------- game flow ---------- */
  function clearAll() {
    for (const e of [...ents]) removeEnt(e);
    for (const b of bolts) scene.remove(b.mesh); bolts.length = 0;
    popups.length = 0;
  }
  function start() {
    clearAll();
    Object.assign(s, { phase: "countdown", t: 0, score: 0, lives: 3, wave: 1, waveT: 0, mult: 1, comboT: 0, shieldT: 0, tripleT: 0, rescued: 0, invT: 0, fireCd: 0, spawnCd: 1.2, droneCd: 9, podCd: 12, cdT: 3.2, overT: 0, bossDone: 0, banner: null });
    s.shipX = 0; s.targetX = 0; s.boss = null;
    cb.onPhase("countdown"); hud();
  }
  function nextWave() {
    s.wave++; s.waveT = 0;
    const name = WAVE_NAMES[(s.wave - 1) % WAVE_NAMES.length];
    banner(`${tx({ en: "WAVE", es: "OLEADA" })} ${s.wave}`, tx(name));
    if (s.wave % 4 === 0) setTimeout(() => { if (s.phase === "playing") addBoss(); }, 1800);
    hud();
  }
  function gameOver() {
    s.phase = "over"; s.overT = 0;
    explode(s.shipX, 0, 2.2, new THREE.Color(1.2, 2, 3.6), true);
    P.ship.visible = false; engineGlow.visible = false;
    setTimeout(() => cb.onOver(Math.floor(s.score)), 1300);
  }
  function hitPlayer() {
    if (s.invT > 0 || s.phase !== "playing") return;
    if (s.shieldT > 0) { s.shieldT = 0; s.invT = 1.2; explode(s.shipX, 0.5, 1, new THREE.Color(3, 2.4, 0.5)); hud(); return; }
    s.lives--; s.mult = 1; s.invT = 2.2; s.shake = 1;
    explode(s.shipX, 0.5, 1.2, new THREE.Color(1.2, 2, 3.6));
    hud();
    if (s.lives <= 0) gameOver();
  }
  function kill(e: Ent) {
    let pts = 0;
    if (e.kind === "rock") {
      pts = e.size > 1.4 ? 50 : 100;
      explode(e.x, e.z, e.size * 0.9, new THREE.Color(3.2, 1.5, 0.5));
      if (e.size > 1.5) for (let k = 0; k < 2; k++) addRock(e.x + rand(-1, 1), e.z, e.size * 0.5, e.vz * 1.05);
    } else if (e.kind === "drone") {
      pts = 150; explode(e.x, e.z, 1.3, new THREE.Color(3.4, 0.5, 0.6));
    } else if (e.kind === "boss") {
      pts = 2500; explode(e.x, e.z, 3, new THREE.Color(2, 0.8, 3.6), true);
      for (let k = 0; k < 5; k++) setTimeout(() => explode(e.x + rand(-4, 4), e.z + rand(-2, 2), 1.5, new THREE.Color(2.4, 1, 3.6)), 120 * k);
      banner(tx({ en: "MOTHERSHIP DESTROYED", es: "NAVE NODRIZA DESTRUIDA" }), "+2500");
      setTimeout(() => { if (s.phase === "playing") nextWave(); }, 2200);
    }
    s.comboT = 1.6; s.mult = Math.min(5, s.mult + (e.kind === "rock" ? 0.25 : 0.5));
    const m = Math.floor(s.mult);
    s.score += pts * m;
    popup(e.x, e.z, `+${pts * m}`, e.kind === "boss" ? "#d8b4fe" : "#bfdbfe");
    if (e.kind !== "boss" && Math.random() < 0.1) addPickup(Math.random() < 0.5 ? "shieldUp" : "tripleUp", e.x, e.z);
    removeEnt(e);
    hud();
  }

  /* ---------- update ---------- */
  const tmpV = new THREE.Vector3();
  function update(dt: number) {
    s.t += dt;
    const live = s.phase === "playing";
    const attract = s.phase === "ready" || s.phase === "over";
    s.speed = lerp(s.speed, live ? 1 + s.wave * 0.08 : 0.7, dt * 2);

    // countdown
    if (s.phase === "countdown") {
      s.cdT -= dt;
      if (s.cdT <= 0) { s.phase = "playing"; cb.onPhase("playing"); banner(`${tx({ en: "WAVE", es: "OLEADA" })} 1`, tx(WAVE_NAMES[0])); }
    }

    // ship movement
    if (s.phase !== "over") {
      if (attract) s.targetX = Math.sin(s.t * 0.6) * halfX * 0.55 + Math.sin(s.t * 1.7) * 1.2;
      if (s.keys.left) s.targetX -= 16 * dt;
      if (s.keys.right) s.targetX += 16 * dt;
      s.targetX = clamp(s.targetX, -halfX, halfX);
      const prev = s.shipX;
      s.shipX = lerp(s.shipX, s.targetX, 1 - Math.exp(-dt * 9));
      s.shipVX = (s.shipX - prev) / Math.max(dt, 1e-4);
    }
    P.ship.position.set(s.shipX, Math.sin(s.t * 2.2) * 0.08, 0);
    P.ship.rotation.z = clamp(-s.shipVX * 0.05, -0.75, 0.75);
    P.ship.rotation.x = Math.sin(s.t * 1.7) * 0.03;
    P.ship.rotation.y = clamp(-s.shipVX * 0.012, -0.2, 0.2);
    P.ship.visible = s.phase !== "over" && !(s.invT > 0 && Math.floor(s.t * 14) % 2 === 0);
    P.flameMat.uniforms.uTime.value = s.t;
    P.flameMat.uniforms.uPower.value = 0.85 + Math.sin(s.t * 40) * 0.08;
    for (const fl of P.flames) fl.scale.set(1, 0.85 + Math.random() * 0.3, 1);
    const sm = P.shield.material as THREE.ShaderMaterial;
    sm.uniforms.uTime.value = s.t; sm.uniforms.uAlpha.value = lerp(sm.uniforms.uAlpha.value, s.shieldT > 0 ? 1 : 0, dt * 6);
    engineGlow.position.set(s.shipX, 0, 1.85); engineGlow.visible = P.ship.visible;
    // engine trail particles
    if (P.ship.visible) for (const sx of [-0.42, 0.42]) emit(s.shipX + sx + rand(-0.03, 0.03), rand(-0.05, 0.05), 2.05, rand(-0.3, 0.3), rand(-0.2, 0.2), rand(9, 14), rand(0.15, 0.3), rand(0.25, 0.45), 0.8, 1.4, 3.4);

    // timers
    s.invT = Math.max(0, s.invT - dt); s.shieldT = Math.max(0, s.shieldT - dt);
    const hadTriple = s.tripleT > 0; s.tripleT = Math.max(0, s.tripleT - dt);
    if (hadTriple && s.tripleT === 0) hud();
    if (s.tripleT > 0 && Math.floor(s.tripleT * 10) !== Math.floor((s.tripleT + dt) * 10)) hud();
    s.comboT -= dt; if (s.comboT <= 0 && s.mult > 1) { s.mult = 1; hud(); }

    // firing
    if (live || attract) {
      s.fireCd -= dt;
      if (s.fireCd <= 0 && P.ship.visible) {
        s.fireCd = live ? 0.15 : 0.32;
        fire(s.shipX - 0.42, -0.6, 0, -95, false); fire(s.shipX + 0.42, -0.6, 0, -95, false);
        if (s.tripleT > 0) { fire(s.shipX, -1, -18, -92, false); fire(s.shipX, -1, 18, -92, false); }
        for (const sx of [-0.42, 0.42]) for (let k = 0; k < 4; k++) emit(s.shipX + sx, 0, -1.2, rand(-1, 1), rand(-1, 1), rand(-8, -2), 0.1, 0.35, 0.6, 1.2, 3.5);
      }
    }

    // spawning
    if (live) {
      s.waveT += dt;
      if (!s.boss && s.waveT > 24 && s.wave % 4 !== 0) nextWave();
      s.spawnCd -= dt;
      const rate = s.boss ? 1.9 : Math.max(0.32, 1.05 - s.wave * 0.09);
      if (s.spawnCd <= 0) { s.spawnCd = rate * rand(0.7, 1.3); addRock(rand(-halfX * 1.25, halfX * 1.25), -170, rand(0.55, s.wave > 2 ? 2.4 : 1.9)); }
      if (s.wave >= 2 && !s.boss) { s.droneCd -= dt; if (s.droneCd <= 0) { s.droneCd = Math.max(2.5, 7 - s.wave * 0.6); addDrone(); } }
      s.podCd -= dt; if (s.podCd <= 0) { s.podCd = rand(13, 20); addPickup("pod", rand(-halfX, halfX), -170); }
    } else if (attract) {
      s.spawnCd -= dt;
      if (s.spawnCd <= 0) { s.spawnCd = rand(0.5, 1.0); addRock(rand(-halfX * 1.4, halfX * 1.4), -170, rand(0.6, 2.2), rand(9, 13)); }
      s.droneCd -= dt; if (s.droneCd <= 0) { s.droneCd = rand(5, 9); addDrone(); }
    }

    // entities
    for (const e of [...ents]) {
      e.t += dt;
      if (e.kind === "drone") {
        e.z += e.vz * s.speed * dt * (e.z > -35 ? 0.35 : 1);
        e.x = e.baseX + Math.sin(e.t * 1.3) * 3.2;
        e.obj.rotation.y += dt * 2.2;
        e.obj.rotation.z = Math.cos(e.t * 1.3) * 0.25;
        e.fireCd -= dt;
        if (live && e.fireCd <= 0 && e.z > -110 && e.z < -8) {
          e.fireCd = rand(1.4, 2.4);
          const dx = s.shipX - e.x, dz = 0 - e.z, d = Math.hypot(dx, dz);
          fire(e.x, e.z + 1, (dx / d) * 30, (dz / d) * 30, true);
        }
      } else if (e.kind === "boss") {
        e.z = Math.min(-55, e.z + e.vz * dt);
        e.x = Math.sin(e.t * 0.55) * halfX * 0.6;
        e.obj.rotation.y += dt * 0.35;
        e.fireCd -= dt;
        if (live && e.fireCd <= 0 && e.z >= -56) {
          e.fireCd = Math.max(0.9, 1.9 - s.wave * 0.05);
          for (let k = -2; k <= 2; k++) { const a = k * 0.16 + (s.shipX - e.x) * 0.005; fire(e.x + k * 0.8, e.z + 4, Math.sin(a) * 34, Math.cos(a) * 34, true); }
        }
      } else {
        e.z += e.vz * s.speed * dt; e.x += e.vx * dt;
        e.obj.rotation.x += e.spin.x * dt; e.obj.rotation.y += e.spin.y * dt; e.obj.rotation.z += e.spin.z * dt;
      }
      e.obj.position.set(e.x, e.kind === "boss" ? 1.2 : 0, e.z);
      if (e.kind === "pod" || e.kind === "shieldUp" || e.kind === "tripleUp") e.obj.position.y = Math.sin(e.t * 3) * 0.25;
      // reached the ship
      if (live && Math.abs(e.z) < e.r + 1.0 && Math.abs(e.x - s.shipX) < e.r + 0.9) {
        if (e.kind === "pod") { s.rescued++; s.score += 300 * Math.floor(s.mult); popup(e.x, e.z, tx({ en: "CREW RESCUED +300", es: "TRIPULANTE RESCATADO +300" }), "#a5f3fc"); explode(e.x, e.z, 0.6, new THREE.Color(0.8, 2.4, 3.4)); removeEnt(e); hud(); continue; }
        if (e.kind === "shieldUp") { s.shieldT = 12; popup(e.x, e.z, tx({ en: "SHIELD", es: "ESCUDO" }), "#fde68a"); removeEnt(e); hud(); continue; }
        if (e.kind === "tripleUp") { s.tripleT = 9; popup(e.x, e.z, tx({ en: "TRIPLE SHOT", es: "DISPARO TRIPLE" }), "#d8b4fe"); removeEnt(e); hud(); continue; }
        if (e.kind !== "boss") { explode(e.x, e.z, e.size); removeEnt(e); hitPlayer(); continue; }
      }
      if (e.z > 18 || Math.abs(e.x) > 90) removeEnt(e);
    }

    // bolts
    for (let i = bolts.length - 1; i >= 0; i--) {
      const b = bolts[i];
      b.x += b.vx * dt; b.z += b.vz * dt; b.mesh.position.set(b.x, 0, b.z);
      let dead = b.z < -200 || b.z > 20;
      if (!dead && !b.enemy) {
        for (const e of ents) {
          if (e.kind === "pod" || e.kind === "shieldUp" || e.kind === "tripleUp") continue;
          if (Math.abs(e.z - b.z) < e.r + 0.6 && Math.abs(e.x - b.x) < e.r) {
            dead = true; e.hp--;
            for (let k = 0; k < 10; k++) emit(b.x, 0, e.z + e.r * 0.6, rand(-4, 4), rand(-3, 3), rand(2, 9), rand(0.15, 0.35), rand(0.2, 0.4), 1.4, 2.2, 3.6);
            e.obj.traverse((o) => { const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial; if (m && "emissive" in m && m !== rockMat) m.emissiveIntensity = 2; });
            if (e.hp <= 0) kill(e); else if (e.kind === "boss") hud();
            break;
          }
        }
      } else if (!dead && b.enemy && Math.abs(b.z) < 1.1 && Math.abs(b.x - s.shipX) < 1.1) {
        dead = true; hitPlayer();
      }
      if (dead) { scene.remove(b.mesh); bolts.splice(i, 1); }
    }

    // particles
    for (let i = 0; i < PART_N; i++) {
      if (pLife[i] <= 0) { pSize[i] = 0; continue; }
      pLife[i] -= dt;
      const k = Math.max(0, pLife[i] / pMax[i]);
      pVel[i * 3] *= 1 - dt * 1.5; pVel[i * 3 + 1] *= 1 - dt * 1.5; pVel[i * 3 + 2] *= 1 - dt * 1.2;
      pPos[i * 3] += pVel[i * 3] * dt; pPos[i * 3 + 1] += pVel[i * 3 + 1] * dt; pPos[i * 3 + 2] += (pVel[i * 3 + 2] + 6 * s.speed) * dt;
      pSize[i] = pS0[i] * (0.4 + 0.6 * k);
      pCol[i * 3] = pBase[i * 3] * k; pCol[i * 3 + 1] = pBase[i * 3 + 1] * k; pCol[i * 3 + 2] = pBase[i * 3 + 2] * k;
    }
    (pGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (pGeo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    (pGeo.getAttribute("size") as THREE.BufferAttribute).needsUpdate = true;

    // debris
    for (let i = 0; i < DEB_N; i++) {
      const d = dState[i];
      if (d.life > 0) {
        d.life -= dt; d.p.addScaledVector(d.v, dt); d.p.z += 6 * s.speed * dt; d.v.multiplyScalar(1 - dt * 0.6);
        d.r.x += d.w.x * dt; d.r.y += d.w.y * dt; d.r.z += d.w.z * dt;
        dq.setFromEuler(d.r); ds.setScalar(d.s * Math.min(1, d.life * 2)); dm.compose(d.p, dq, ds);
      } else { ds.setScalar(0); dm.compose(tmpV.set(0, -999, 0), dq.identity(), ds); }
      debris.setMatrixAt(i, dm);
    }
    debris.instanceMatrix.needsUpdate = true;

    // rings + flashes
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i]; r.t += dt; const k = r.t / r.max;
      r.m.scale.setScalar(0.2 + k * r.size); (r.m.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.9;
      r.m.position.z += 6 * s.speed * dt;
      if (k >= 1) { scene.remove(r.m); (r.m.material as THREE.Material).dispose(); rings.splice(i, 1); }
    }
    for (const l of flashes) l.intensity *= Math.exp(-dt * 7);

    // stars + speed lines
    const sp = 18 * s.speed;
    for (let i = 0; i < STAR_N; i++) { starPos[i * 3 + 2] += sp * dt * 0.35; if (starPos[i * 3 + 2] > 20) starPos[i * 3 + 2] -= 440; }
    (starGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    for (let i = 0; i < LINE_N; i++) {
      const L = lineSeeds[i]; L.z += sp * 3.2 * L.s * dt; if (L.z > 15) { L.z = -300; L.x = rand(-60, 60); L.y = rand(-20, 30); }
      const len = 3 + s.speed * 4 * L.s;
      linePos.set([L.x, L.y, L.z, L.x, L.y, L.z - len], i * 6);
    }
    (lineGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;

    // background motion
    (sky.material as THREE.ShaderMaterial).uniforms.uTime.value = s.t;
    (pl.planet.material as THREE.ShaderMaterial).uniforms.uTime.value = s.t;

    // camera: follows the ship a little, shakes on hits
    s.shake = Math.max(0, s.shake - dt * 2.2);
    const sh = s.shake * s.shake * 0.6;
    camera.position.set(camBase.x + s.shipX * 0.35 + rand(-sh, sh), camBase.y + rand(-sh, sh) + Math.sin(s.t * 0.5) * 0.15, camBase.z);
    camLook.set(s.shipX * 0.25, 0.4, -26);
    camera.lookAt(camLook);
    camera.rotation.z += -s.shipVX * 0.0025;

    if (s.banner) { s.banner.t += dt; if (s.banner.t > 2.6) s.banner = null; }
    for (let i = popups.length - 1; i >= 0; i--) { popups[i].life -= dt; popups[i].z += 6 * dt; if (popups[i].life <= 0) popups.splice(i, 1); }
  }

  /* ---------- 2D text overlay ---------- */
  const proj = new THREE.Vector3();
  function drawOverlay() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, W, H);
    octx.textAlign = "center"; octx.textBaseline = "middle";
    const F = '"Inter Display","Inter",system-ui,sans-serif';
    if (s.phase === "countdown") {
      const n = Math.ceil(s.cdT - 0.2);
      const label = n > 0 ? String(n) : tx({ en: "GO", es: "¡YA!" });
      const f = (s.cdT - 0.2) % 1; const sc = 1 + (f < 0 ? 0 : f) * 0.35;
      octx.save(); octx.translate(W / 2, H * 0.42); octx.scale(sc, sc);
      octx.font = `800 ${Math.min(120, W * 0.2)}px ${F}`; octx.shadowColor = "rgba(59,130,246,0.9)"; octx.shadowBlur = 30; octx.fillStyle = "#fff";
      octx.fillText(label, 0, 0); octx.restore();
    }
    if (s.banner) {
      const b = s.banner, a = Math.min(1, b.t * 4, (2.6 - b.t) * 3);
      octx.save(); octx.globalAlpha = a;
      const y = H * 0.3;
      const g = octx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "rgba(37,99,235,0)"); g.addColorStop(0.5, "rgba(37,99,235,0.28)"); g.addColorStop(1, "rgba(37,99,235,0)");
      octx.fillStyle = g; octx.fillRect(0, y - 40, W, 80);
      octx.font = `800 ${Math.min(34, W * 0.06)}px ${F}`; octx.fillStyle = "#fff"; octx.shadowColor = "rgba(59,130,246,0.9)"; octx.shadowBlur = 18;
      octx.fillText(b.text, W / 2, y - (b.sub ? 10 : 0));
      if (b.sub) { octx.font = `600 ${Math.min(14, W * 0.03)}px ${F}`; octx.fillStyle = "#93c5fd"; octx.shadowBlur = 0; octx.fillText(b.sub.split("").join(" "), W / 2, y + 20); }
      octx.restore();
    }
    if (s.phase === "playing") for (const p of popups) {
      proj.set(p.x, 1.2, p.z).project(camera);
      const x = (proj.x * 0.5 + 0.5) * W, y = (-proj.y * 0.5 + 0.5) * H - (1.1 - p.life) * 40;
      octx.save(); octx.globalAlpha = Math.min(1, p.life * 2.5);
      octx.font = `800 15px ${F}`; octx.fillStyle = p.color; octx.shadowColor = "rgba(0,0,0,0.8)"; octx.shadowBlur = 8;
      octx.fillText(p.text, x, y); octx.restore();
    }
  }

  /* ---------- resize ---------- */
  function resize(w: number, h: number) {
    W = Math.max(1, w); H = Math.max(1, h);
    renderer.setSize(W, H, false);
    composer.setSize(W, H);
    bloom.resolution.set(W / 2, H / 2);
    camera.aspect = W / H;
    // keep a playable width on narrow screens
    camera.fov = W / H < 0.8 ? 68 : W / H < 1.2 ? 60 : 52;
    camera.updateProjectionMatrix();
    P.ship.scale.setScalar(W / H < 0.8 ? 0.95 : 1.3);
    const dist = camBase.length();
    halfX = clamp(Math.tan((camera.fov * Math.PI) / 360) * dist * camera.aspect * 0.78, 3.2, 10);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    overlay.width = Math.round(W * dpr); overlay.height = Math.round(H * dpr);
    pMat.uniforms.uScale.value = H * renderer.getPixelRatio() * 0.55;
  }

  /* ---------- pointer → world X on the ship plane ---------- */
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  function setTarget(px: number) {
    proj.set(s.shipX, 0, 0).project(camera);
    ray.setFromCamera(new THREE.Vector2((px / W) * 2 - 1, proj.y), camera);
    if (ray.ray.intersectPlane(plane, hit)) s.targetX = clamp(hit.x, -halfX, halfX);
  }

  /* ---------- loop (pauses when off-screen or tab hidden) ---------- */
  let raf = 0, last = performance.now(), visible = true, checkT = 0, manual = false;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    checkT -= dt;
    if (checkT <= 0) {
      checkT = 0.25;
      const r = canvas.getBoundingClientRect();
      visible = !document.hidden && r.bottom > 0 && r.top < window.innerHeight;
    }
    if (!visible || manual) return; // freezes the action while scrolled away
    update(dt);
    composer.render();
    drawOverlay();
  }
  raf = requestAnimationFrame(frame);
  hud();

  return {
    resize,
    start,
    setTarget,
    setKey: (key: "left" | "right", down: boolean) => { s.keys[key] = down; },
    isLive: () => s.phase === "playing" || s.phase === "countdown",
    destroy: () => {
      cancelAnimationFrame(raf);
      clearAll();
      overlay.remove();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else mat?.dispose();
      });
      rockGeos.forEach((g) => g.dispose());
      tex.dispose();
      composer.dispose();
      renderer.dispose();
    },
    debug: {
      s,
      /** test hook: freeze the real-time loop and advance n fixed steps */
      step(n: number, dt = 1 / 60) { manual = true; for (let i = 0; i < n; i++) update(dt); composer.render(); drawOverlay(); },
      fire: () => explode(0, -14, 2, new THREE.Color(3.2, 1.6, 0.6), true),
    },
  };
}
