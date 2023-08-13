import React, { useState } from "react";
import { RiLineChartLine } from "react-icons/ri";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import UserControl from "./UsersControl/UserControl";
import { useLocation } from "react-router-dom";
import NewProduct from "../NewProduct/NewProduct";

const DashboardAdmin = () => {
  const [selectedComponent, setSelectedComponent] = useState("default")
  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };
  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
     <NavbarAdmin handleComponentChange={handleComponentChange}/>
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <HeaderAdmin />
        {/* Section 1 */}
        {selectedComponent === "userControl" && <UserControl />}
        {selectedComponent === "newProduct" && <NewProduct />}

        {selectedComponent === "default" && (<div><section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
          {/* Card 1 */}
          <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <RiLineChartLine className="text-5xl" />
            <h4 className="text-2xl">Ganancias</h4>
            <span className="text-5xl text-white">$ 10,000</span>
            <span className="py-1 px-3 bg-primary-300/80 rounded-full">
              Ganancias de este mes
              
            </span>
          </div>
          {/* Card 2 */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
            <h1 className="text-2xl font-bold mb-8">Reseñas</h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              {/* Review Card 1 */}
              <div className="flex items-center gap-4 mb-8">
                <img
                  src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                  className="w-14 h-14 object-cover rounded-full"
                  alt="User"
                />
                <div>
                  <p>★★★★★</p>
                  <h3 className="font-bold">Jabón Artesanal Natural Vegano</h3>
                  <p className="text-gray-500">Excelente producto</p>
                </div>
              </div>
              {/* Review Card 2 */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                  className="w-14 h-14 object-cover rounded-full"
                  alt="User"
                />
                <div>
                  <p>★★★★★</p>
                  <h3 className="font-bold">Cepillo Dental de Bambú</h3>
                  <p className="text-gray-500">Excelente producto</p>
                </div>
              </div>
              {/* More reviews link */}
              <div className="flex justify-end">
                <a
                  href=""
                  style={{
                    textDecoration: "none",
                  }}
                  className="hover:text-primary-100 transition-colors hover:underline"
                  >
                  Ver más
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-8">Compras</h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              {/* Subsection 2 Card 1 */}
              <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                    className="w-14 h-14 object-cover rounded-xl"
                    alt="User"
                  />
                  <div>
                    <h3 className="font-bold">Jose Soria</h3>
                    <p className="text-gray-500">Jabón</p>
                  </div>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                    Pagado
                  </span>
                </div>
                <div>
                  <span className="font-bold">$ 1,600</span>
                </div>
              </div>
              {/* para agregar mas section*/}
            </div>
          </div>
        </section></div>)}
      </main>
    </div>
  );
};

export default DashboardAdmin;
