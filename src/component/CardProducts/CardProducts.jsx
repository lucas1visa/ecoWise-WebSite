import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './CardProducts.css';
import Paginado from '../Paginado/Paginado';

const CardProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = useSelector((state) => state.products) || []; // Asegura que products sea un arreglo válido

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
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const [hoveredProductId, setHoveredProductId] = useState(null);

  return (
    <Container  className='product-card'>
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} md={4} sm={6} className="mb-4">
            <Card
              className="product-card"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
              >
              <Link to={`/product/${product.id}`}>
                <Card.Img  src={product.image} alt={product.name} className="card-image" />
                {hoveredProductId === product.id && (
                  <div className="hover-button">
                    <Link to={`/product/${product.id}`} className='boton-comprar'>
                      COMPRAR
                    </Link>
                  </div>
                )}
              </Link>
              <Card.Body>
                <h3 className='titulo'>{product.name}</h3>
                <br /><br />
                <Card.Text className='precio'>${product.price}</Card.Text>
                <br /><br />
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
    </Container>
  );
};

export default CardProducts;
