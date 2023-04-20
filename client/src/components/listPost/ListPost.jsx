import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// Función para realizar la solicitud HTTP y actualizar el estado de noticias
async function obtenerNoticias(setNoticias) {
  try {
    const respuesta = await axios.get('http://localhost:3000/noticias');
    setNoticias(respuesta.data);
  } catch (error) {
    console.log(error);
  }
}

function ListPost() {
  const [noticias, setNoticias] = useState([]);

  // useEffect se utiliza para realizar la solicitud HTTP una vez que el componente se ha montado
  useEffect(() => {
    obtenerNoticias(setNoticias);
  }, []);

  // Renderiza la lista de noticias
  return (
    <div>
      {noticias.length > 0 ? (
        noticias.map(noticia => {
          return (
            <Link to={`/noticias/${noticia.id}`} key={noticia.id}>
              <article>
                <h3>{noticia.titulo}</h3>
                <p>{noticia.autor}</p>
              </article>
            </Link>
          )
        })
      ) : (
        <p>No hay noticias disponibles</p>
      )}
    </div>
  );
}

export default ListPost;


