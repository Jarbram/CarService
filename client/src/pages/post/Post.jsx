import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect} from 'react'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './post.css'

const Post = () => {
  const [noticia, setNoticia] = useState({});
  const { id } = useParams();

  const getNoticia = async () => {
    try {
      const response = await fetch(`http://localhost:3000/noticias/${id}`);
      const data = await response.json();
      console.log(data.data);
      setNoticia(data.data);
    } catch (error) {
      console.log('Hubo un error en la petición fetch:', error.message);
    }
  }

  useEffect(() => {
    getNoticia();
  }, [])


  return (
    <div>
      <Navbar isHamburgerVisible={true} currentPage="home" />
      <div className='news-container'>
        <article key={noticia.id}>
          <h3>{noticia.titulo}</h3>
          <p>{noticia.fecha_publicacion}</p>
          <p>{noticia.autor}</p>
          <p className='news-contenido'>{noticia.contenido}</p>
          <img src={noticia.imagen} alt={noticia.titulo} />
        </article>
      </div>
    </div>
  );
  
      }
export default Post