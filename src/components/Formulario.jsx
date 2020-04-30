import React, { useState } from 'react';

import Error from './Error';

const Formulario = ({ setBusquedaLetra }) => {
    const [busqueda, setBusqueda] = useState({
        artista: '',
        cancion: ''
    });
    const [error, setError] = useState(false);

    const { artista, cancion } = busqueda;

    const actualizarState = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    };

    const buscarInformacion = e => {
        e.preventDefault();

        if (artista.trim() === '' || cancion.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        setBusquedaLetra(busqueda);
    };

    return (
        <div className="bg-info">

            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <div className="container">
                <div className="row">
                    <form
                        onSubmit={buscarInformacion}
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                    >
                        <fieldset>
                            <legend className="text-center">Buscador de Letras - Canciones</legend>

                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="artista">Artista</label>
                                        <input
                                            onChange={actualizarState}
                                            autoFocus
                                            autoComplete="off"
                                            type="text"
                                            id="artista"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            value={artista}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="cancion">Cancion</label>
                                        <input
                                            onChange={actualizarState}
                                            autoComplete="off"
                                            type="text"
                                            id="cancion"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Cancion"
                                            value={cancion}
                                        />
                                    </div>
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Formulario;