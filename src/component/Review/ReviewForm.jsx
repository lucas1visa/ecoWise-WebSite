import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/actions/index";
import Modal from "react-bootstrap/Modal"; 
import Button from "react-bootstrap/Button";  

const ReviewForm = ({ id, UserId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0); // Estado para la puntuación
  const [comment, setComment] = useState(""); // Estado para el comentario
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setModalOpen(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = () => {
    dispatch(addReview(id, UserId, rating, comment));
    setRating(0);
    setComment("");
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <svg
              key={index}
              className={`w-6 h-6 cursor-pointer ${
                rating >= index ? "text-yellow-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleRatingChange(index)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-yellow-500">{rating} estrellas</span>
      </div>

      
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Deja un comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="border rounded p-2 w-full mb-4"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Escribe tu comentario aquí..."
            rows="4"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Enviar Reseña
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewForm;

