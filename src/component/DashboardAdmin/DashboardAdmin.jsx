import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

const DashboardAdmin = ()=>{
    return(
        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen" >
        <NavbarAdmin />
        <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
          <HeaderAdmin />
          {/* Section 1 */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
            {/* Card 1 */}
            <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
              <RiLineChartLine className="text-5xl" />
              <h4 className="text-2xl">Earnings</h4>
              <span className="text-5xl text-white">$ 10,000</span>
              <span className="py-1 px-3 bg-primary-300/80 rounded-full">
                 Gancias de este mes
              </span>
            </div>
        
            {/* Card 2 */}
            <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
              <h1 className="text-2xl font-bold mb-8">Reseñas</h1>
              <div className="bg-white p-8 rounded-xl shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div><p>★★★★★</p>
                    <h3 className="font-bold">Jabón Artesanal Natural Vegano </h3>
                    
                    <p className="text-gray-500">Exelente producto</p>
  
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                     src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div>
              <p>★★★★★</p>  
                    <h3 className="font-bold">Cepillo Dental de Bambú</h3>
                    <p className="text-gray-500">Exelente producto</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="hover:text-primary-100 transition-colors hover:underline"
                  >
                    Ver mas
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* Section 2 */}
          <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
            <div>
              <h1 className="text-2xl font-bold mb-8">Recent invoices</h1>
              <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                {/* Card 1 */}
                <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                       src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-bold">Jose Soria</h3>
                      <p className="text-gray-500">jabon</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                      pagado
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">$ 1,600</span>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-bold">Jose Soria</h3>
                    </div>
                  </div>
                  <div>
                    <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
                      Pagado
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">$ 8.000</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary-900 text-gray-300 p-8 rounded-xl shadow-2xl flex items-center justify-between flex-wrap xl:flex-nowrap gap-8">
                <div>
                  <RiHashtag className="text-4xl -rotate-12" />
                </div>
                <div>
                  <h5 className="font-bold text-white">Engage with clients</h5>
                  <h5>Join slack channel</h5>
                </div>
                <div className="w-full xl:w-auto">
                  <button className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                    Join now
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-8">Recommended project</h1>
              <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                      className="w-14 h-14 object-cover rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">Thomas Martin</h3>
                      <p className="text-gray-500">Updated 10m ago</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-primary-100 py-2 px-4 rounded-full text-white">
                      Design
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-lg font-bold">
                    prueba
                  </h5>
                  <p className="text-gray-500">
                  prueba
                  </p>
                </div>
                <div className="bg-primary-100/10 flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4 rounded-lg">
                  <div>
                    <sup className="text-sm text-gray-500">&euro;</sup>{" "}
                    <span className="text-2xl font-bold mr-2"></span>
                    <span className="text-sm text-gray-500"></span>
                  </div>
                  <div>
                    <span className="border border-primary-100 text-primary-100 py-2 px-4 rounded-full">
                    prueba
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
}


export default DashboardAdmin