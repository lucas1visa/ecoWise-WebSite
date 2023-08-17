import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./CardProducts.css";
import Paginado from "../Paginado/Paginado";
import ProductDetail from "../ProductDetail/ProductDetail";

const CardProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = useSelector((state) => state.products) || [];

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const [hoveredProductId, setHoveredProductId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);

  const handleBuyClick = (productId) => {
    setModalProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalProductId(null);
    setShowModal(false);
  };
  // <div className="bg-[#1F1D2B] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300">

  return (
    <div className="p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center p-8 ">
      {currentProducts.map((product) => (
        <div
          key={product.id}
          className=" shadow-md rounded-lg p-4 transition transform hover:scale-105 cursor-pointer m-4 bg-green-200"
          onMouseEnter={() => handleMouseEnter(product.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleBuyClick(product.id)}
        >
          <img
            src={product.image}
            alt={product.name}
            // className="mx-auto mb-2 rounded-lg h-40 object-cover"
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full"

          />
          <h3 className="text-lg font-bold mb-2 text-start text-white">{product.name}</h3>
          <p className="font-bold text-start text-white">${product.price}</p>
          <p className="text-black font-bold text-white">{product.category}</p>
        </div>
      ))}
    </div>
    <Paginado
      productsPerPage={productsPerPage}
      totalProducts={totalProducts}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
      <Modal show={showModal} onHide={handleCloseModal} size="xl" >
        
          <ProductDetail
            productId={modalProductId}
            setShowModal={setShowModal}
          />
          
        
      </Modal>
  </div>
  
  );
};

export default CardProducts;
