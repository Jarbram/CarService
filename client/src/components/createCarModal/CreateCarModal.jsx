import React, {useState} from 'react'
import './CreateCarModal.css'
import axios from 'axios';

const CreateCarModal = ({ userID, onClose, onUpdate }) => {
const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    color: '',
    status: '',
    comment: '',
    user_id: parseInt(userID),
  });
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
      const response = await axios.post('http://localhost:3000/car', newCar);
      console.log(response.data);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='createModalCar'>   
    <div className="modal-content">
    <span className="close" onClick={onClose}>
      &times;
    </span>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="brand">Brand:</label>
          <input
          type='text'
          className='inputCar'
          id="brand"
          value={newCar.brand}
          onChange={(event) =>
            setNewCar({ ...newCar, [event.target.id]: event.target.value })
          }
          required
          />
      </div>
      <div className="form-group">
        <label htmlFor="model">Model:</label>
          <input
            type='text'
            className='inputCar'
            id='model'
            value={newCar.model}
            onChange={(event) =>
              setNewCar({ ...newCar, [event.target.id]: event.target.value })
            }
            required
          />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year:</label>
          <input
            type='text'
            className='inputCar'
            id='year'
            value={newCar.year}
            onChange={(event) =>
              setNewCar({ ...newCar, [event.target.id]: event.target.value })
            }
            />
      </div>
      <div className="form-group">
        <label htmlFor="color">Color:</label>
          <input
          type='text'
          className='inputCar'
          id='color'
          value={newCar.color}
          onChange={(event) =>
            setNewCar({ ...newCar, [event.target.id]: event.target.value })
          }
          />
      </div>
      <div className="form-group">
      <label htmlFor="status">Status:</label>
        <select
        className='option'
        id="status"
        value={newCar.status}
        onChange={(event) => setNewCar({...newCar, status: event.target.value})}
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
        <label htmlFor="comment">Comment:</label>
          <input
          type='text'
          className='inputCar'
          id='comment'
          value={newCar.comment}
          onChange={(event) =>
            setNewCar({ ...newCar, [event.target.id]: event.target.value })
          }
          />
      </div>
      <button type="submit">Crear</button>
    </form>
  </div>
    </div>
  )
}

export default CreateCarModal