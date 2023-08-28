import React, { useEffect, useState } from "react";
import { RiLineChartLine } from "react-icons/ri";
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import NavbarAdmin from "./NavBarAdmin/NavbarAdmin";
import UserControl from "./UsersControl/UserControl";
import NewProduct from "../NewProduct/NewProduct";
import VentanaDeProductos from "./VentanaEmergente/VentanaDeProductos";
import { useDispatch, useSelector } from "react-redux";
import { getReview, getUsers } from "../../redux/actions";
import "../../App.css";
import "./dashboardAdmin.css";
import { useDarkMode } from "../DarkModeContext/DarkMode";
import RevivewAdmin from "./ReviewAdmin";

const DashboardAdmin = () => {
  const { isDarkMode } = useDarkMode();

  const [selectedComponent, setSelectedComponent] = useState("default");
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getReview());
  }, []);
  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  let ganancia = 0;

  const gananciasTotal = () => {
    users.forEach((user) => {
      if (user.Purchases.length > 0) {
        user.Purchases.forEach((purchase) => {
          ganancia +=
            parseInt(purchase.quantity) *
            purchase.Products.reduce(
              (acc, product) => acc + parseInt(product.price),
              0
            );
        });
      }
    });
  };
  gananciasTotal();

  return (
    <div className={isDarkMode ? "modo-oscuro" : "cart-modo-normal"}>
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen admin-container">
        <NavbarAdmin handleComponentChange={handleComponentChange} />
        <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll info-product-admin">
          <HeaderAdmin />
          {/* Section 1 */}
          {selectedComponent === "userControl" && <UserControl />}
          {selectedComponent === "newProduct" && (
            <>
              {" "}
              <NewProduct />
              <div>
                <VentanaDeProductos />
              </div>
            </>
          )}

          {selectedComponent === "default" && (
            <div>
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8 ">
                {/* Card 1 */}
                <div className="bg-primary-204 p-8 rounded-xl text-gray-300  h-80 flex flex-col gap-6 mini-container-admin">
                  <RiLineChartLine className="text-5xl" />
                  <h4 className="text-2xl">Ganancias</h4>
                  <span className="text-5xl text-white">{ganancia}</span>
                  <span className="py-1 px-3 bg-primary-300/80 rounded-full">
                    Ganancias de este mes
                  </span>
                </div>
                {/* Card 2 */}
                <div className="col-span-1 md:col-span-2 flex flex-col justify-between mini-container-admin">
                  <h1 className="text-2xl font-bold mb-8 info-reseñas">
                    Reseñas
                  </h1>

                  <div className="rounded-xl shadow-2xl mini-container-admin h-60 overflow-auto ">
                    <RevivewAdmin />
                  </div>
                </div>
              </section>
              {/* Section 2 */}
              <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
                <div>
                  <h1 className="text-2xl font-bold mb-8 info-reseñas">
                    Compras
                  </h1>
                  <div className="rounded-xl shadow-2xl mb-8 flex flex-col gap-8 mini-container-admin">
                    {/* Subsection 2 Card 1 */}
                    {users.map((user) => {
                      console.log(user)
                      if (user.Purchases.length > 0) {
                        return (
                          <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-4 mb-2  px-9">
                            <div className="col-span-2 flex items-center gap-1">
                              <img
                                src={user.Purchases[0].Products[0].image}
                                className="w-14 h-14 object-cover rounded-xl"
                                alt="product"
                              />
                              <div>
                                <h3 className="font-bold info-reseñas">
                                  {user.name} {user.surname}
                                </h3>
                                <p className="text-gray-500 info-reseñas">
                                  {user.Purchases[0].Products[0].name}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                                Pagado
                              </span>
                            </div>
                            <div>
                              <span className="font-bold info-reseñas">
                                ${user.Purchases[0].Products[0].price}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* para agregar mas section*/}
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
