import React from 'react'
import './CreateCarModal.css'

const CreateCarModal = (props) => {
  const initialState = {
    brand: "",
    model: "",
    year: "",
    color: "",
    price: "",
    comment: "",
    status: "",
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "updateField":
        return { ...state, [action.field]: action.value }
      case "setError":
        return { ...state, error: action.error }
      case "reset":
        return initialState
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/signup", state)
      console.log(response)
      dispatch({ type: "reset" })
      history.push("/login")
    } catch (err) {
      console.error(err)
      dispatch({ type: "setError", error: "Hubo un problema" + err.message })
    }
  }

  return (
    <div className='createModalCar'>   
        
    </div>
  )
}

export default CreateCarModal