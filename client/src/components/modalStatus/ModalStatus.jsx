import React,{useState} from 'react'
import './ModalStatus.css'
import axios from 'axios'

const ModalStatus = ({ carId, onClose, onUpdate }) => {
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.put(`http://localhost:3000/car/${carId}`, {
          status,
          comment,
        });
        onUpdate(response.data);
        console.log(response.data);
        onClose();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="status">Estado:</label>
              <input
                type="text"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comentario:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>
            <button type="submit">Actualizar</button>
          </form>
        </div>
      </div>
    );
    };
export default ModalStatus