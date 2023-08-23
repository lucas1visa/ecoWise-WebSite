import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/actions/index";
import Modal from "react-bootstrap/Modal"; 
import Button from "react-bootstrap/Button"; 
import { FaStar } from 'react-icons/fa'; 

const ReviewForm = ({id}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0); // Estado para la puntuación
  const [comment, setComment] = useState(""); // Estado para el comentario
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
  
const UserId = localStorage.getItem("userid")

const handleRatingChange = (newRating) => {
  setRating(newRating);
  if (UserId) {
    setModalOpen(true);
  }
};

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = () => {
    if (!UserId) {
      return;
    }

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
            <FaStar
              key={index}
              className={`w-6 h-6 cursor-pointer ${
                rating >= index ? 'text-yellow-500' : 'text-gray-400'
              }`}
              onClick={() => handleRatingChange(index)}
            />
          ))}
        </div>
       
      </div>

      {UserId && (
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
      )}
    </div>
  );
};

export default ReviewForm;

