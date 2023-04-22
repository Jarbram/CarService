import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect} from 'react'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './post.css'

const Post = () => {
  const [noticia, setNoticia] = useState([]);
  const { id } = useParams();

  const getNoticia = async () => {
    try {
      const response = await fetch(`http://localhost:3000/noticias/${id}`);
      const data = await response.json();
      setNoticia(data.data);
      console.log(data.data);
    } catch (error) {
      console.log('Hubo un error en la petición fetch:', error.message);
    }
  }

  useEffect(() => {
    getNoticia();
  }, [])


  return (
    <div>
      <Navbar isHamburgerVisible ={true} />
      <div className='news-container'>
      {
        noticia.map(news => {
          const { id, titulo, fecha_publicacion, autor, contenido,imagen} =news;
          return <article  
          key={id}>
          <h3  >
          {titulo}
          </h3> 
          <p>
          {fecha_publicacion}
          </p>
          <p>
          {autor}
          </p>
          <p className='news-contenido'>
          {contenido}
          </p>
          <img src={imagen} alt={titulo} />
        </article>
        })
      }
      </div>
    </div>
  )
      }
export default Post