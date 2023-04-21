import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './listPost.css';


const ListPost = () => {
  const [noticias, setNoticias] = useState([]);

  const getNoticias = async () => {
    try {
      const response = await fetch('http://localhost:3000/noticias');
      const data = await response.json();
      setNoticias(data.data);
      console.log(data.data);
    } catch (error) {
      console.log('Hubo un error en la petición fetch:', error.message);
    }
  }

  useEffect(() => {
    getNoticias();
  }, [])

  return (
    <div className='post-container'>
    {
      noticias.map(noticia => {
        const { id, titulo, fecha_publicacion, autor} =noticia;
        return <Link to={`/noticias/${id}`} className='post-container-card' 
        key={id}>
        <article >
          <h3 className='post-card_title' >
          {titulo}
          </h3> 
          <p>
          {fecha_publicacion}
          </p>
          <p>
          {autor}
          </p>      
        </article>
      </Link>
      })
  }
    </div>
  )
}

export default ListPost;
