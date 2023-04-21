import React, { useState, useEffect } from 'react';

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
    <div>
    {
      noticias.map(noticia => (
      <div key={noticia.id}>
        <h2>{noticia.titulo}</h2>
        <p>{noticia.fecha_publicacion}</p>
        <p>{noticia.autor}</p>
        <p>{noticia.contenido}</p>
      </div>
    ))
  }
    </div>
  )
}

export default ListPost;
