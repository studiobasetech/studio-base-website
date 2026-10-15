const navigation = [
  "Home",
  "Products & Services",
  "Portfolio",
  "About Studio Base",
  "Contact",
];

const resources = [
  "Case Studies",
  "Blog",
  "Careers",
  "FAQ",
];


export default function Footer() {

  return (

    <footer className="
      bg-black
      border-t
      border-white/10
      px-6
      py-16
      lg:px-12
    ">


      <div className="
        mx-auto
        max-w-7xl
      ">


        <div className="
          grid
          gap-12
          lg:grid-cols-4
        ">


          {/* BRAND */}

          <div>

            <img
              src="/images/studio-base-logo.png"
              alt="Studio Base"
              className="
                h-12
                w-auto
              "
            />


            <p className="
              mt-5
              max-w-xs
              text-sm
              leading-relaxed
              text-zinc-500
            ">
              A technology and creative company building
              digital infrastructure for forward-thinking
              businesses.
            </p>


            <div className="
              mt-6
              flex
              gap-5
              text-sm
              text-zinc-400
            ">

              <a href="#">in</a>
              <a href="#">◎</a>
              <a href="#">𝕏</a>
              <a href="#">▶</a>

            </div>


          </div>





          {/* NAVIGATION */}

          <div>

            <h3 className="
              text-sm
              font-semibold
              text-white
            ">
              Navigation
            </h3>


            <ul className="
              mt-5
              space-y-3
            ">

              {navigation.map((item)=>(

                <li key={item}>

                  <a
                    href="#"
                    className="
                      text-sm
                      text-zinc-500
                      transition
                      hover:text-yellow-400
                    "
                  >
                    {item}
                  </a>

                </li>

              ))}

            </ul>

          </div>





          {/* RESOURCES */}

          <div>

            <h3 className="
              text-sm
              font-semibold
              text-white
            ">
              Resources
            </h3>


            <ul className="
              mt-5
              space-y-3
            ">

              {resources.map((item)=>(

                <li key={item}>

                  <a
                    href="#"
                    className="
                      text-sm
                      text-zinc-500
                      transition
                      hover:text-yellow-400
                    "
                  >
                    {item}
                  </a>

                </li>

              ))}

            </ul>

          </div>





          {/* CONTACT */}

          <div>

            <h3 className="
              text-sm
              font-semibold
              text-white
            ">
              Contact
            </h3>


            <p className="
              mt-5
              text-sm
              text-zinc-500
            ">
              hello@studiobase.com
            </p>


            <p className="
              mt-2
              text-sm
              text-zinc-500
            ">
              +52 998 123 4567
            </p>


            <p className="
              mt-2
              text-sm
              text-zinc-500
            ">
              Cancun, Mexico
            </p>


          </div>


        </div>





        {/* BOTTOM */}

        <div className="
          mt-12
          flex
          flex-col
          gap-3
          border-t
          border-white/10
          pt-6
          text-xs
          text-zinc-600
          md:flex-row
          md:justify-between
        ">


          <p>
            © 2026 Studio Base. All rights reserved.
          </p>


          <div className="
            flex
            gap-5
          ">

            <span>
              Privacy Policy
            </span>

            <span>
              Terms of Service
            </span>

          </div>


        </div>


      </div>


    </footer>

  );

}