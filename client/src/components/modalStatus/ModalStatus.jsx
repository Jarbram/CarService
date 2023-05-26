import React,{useState} from 'react'
import './ModalStatus.css'
import axios from 'axios'

const ModalStatus = ({ carId, onClose, onUpdate }) => {
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');

    const Process =[
      {
        id: 1,
        name: 'En cola para atención, muy pronto será atendido'
      },
      {
        id: 2,
        name: 'En servicio, trabajando en el vehículo'
      },
      {
        id: 3,
        name: 'Servicio finalizado, listo para entrega'
      },
      {
        id: 4,
        name: 'Entregado'
      }
    ]
  
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
                <select
                className='option'
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                >
                  <option 
                  value=""
                  disabled
                  defaultValue=""
                  hidden
                  >Seleccione un estado</option>
                {
                  Process.map((process) => { 
                    return <option key={process.id} value={process.name}>{process.name}</option>
                  },this)}
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comentario:</label>
              <input
                className='textarea'
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    );
    };
export default ModalStatus