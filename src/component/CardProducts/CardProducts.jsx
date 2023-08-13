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

  return (
    <Container className="product-card">
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} md={4} sm={6} className="mb-4">
            <Card
              className="product-card"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleBuyClick(product.id)}
            >
              <Card.Img
                src={product.image}
                alt={product.name}
                className="card-image"
              />

              <Card.Body>
                <h3 className="titulo">{product.name}</h3>
                <br />
                <br />
                <Card.Text className="precio">${product.price}</Card.Text>
                <br />
                <br />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Paginado
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Body>
          <ProductDetail
            productId={modalProductId}
            setShowModal={setShowModal}
          />
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CardProducts;
