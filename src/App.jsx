import React, { Fragment, useState, useEffect } from 'react';

import axios from 'axios';

import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {
  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [info, setInfo] = useState({});
  const [letra, setLetra] = useState('');

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarAPILetra = async ({ artista, cancion }) => {
      try {
        const [letra, informacion] = await Promise.all([
          axios.get(`https://api.lyrics.ovh/v1/${artista}/${cancion}`),
          axios.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`)
        ]);

        document.querySelector('.cancion').classList.add('animated', 'fadeIn');
        
        setLetra(letra.data.lyrics);
        setInfo(informacion.data.artists[0]);
      } catch (error) {
        return {
          ok: false,
          error
        };
      }
    };

    consultarAPILetra(busquedaLetra);
  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario setBusquedaLetra={setBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 cancion">
            <Info info={info} />
          </div>
          <div className="col-md-6 cancion">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
