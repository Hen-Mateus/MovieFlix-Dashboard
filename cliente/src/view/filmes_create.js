import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import React, { useEffect, useState } from "react";

import '../css/filmes.css';

export default function EditComponent() {
    const [campDescricao, setcampDescricao] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [generos, setGeneros] = useState([]);
    const [sinopseLength, setSinopseLength] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const url = "http://localhost:3000/generos";
                const response = await axios.get(url);
                if (response.data.success) {
                    setGeneros(response.data.data);
                } else {
                    alert("Error web service");
                }
            } catch (error) {
                alert("Error server: " + error);
            }
        };

        fetchGeneros();
    }, []);

    function sendSave() {
        const newErrors = {};

        if (selectGenero === "") {
            newErrors.genero = "Selecione um Gênero!";
        }

        if (campTitulo === "") {
            newErrors.titulo = "Insira o título do filme!";
        }

        if (campDescricao === "") {
            newErrors.descricao = "Escreva uma sinopse do filme!";
        }

        if (campFoto === "") {
            newErrors.foto = "Insira um cartaz do filme!";
        }

        if (Object.keys(newErrors).length === 0) {
            const baseUrl = "http://localhost:3000/filmes/create"
            const datapost = {
                descricao: campDescricao,
                titulo: campTitulo,
                foto: campFoto,
                generoId: selectGenero
            }
            axios.post(baseUrl, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'O filme "' + campTitulo + '" foi adicionado!',
                            showConfirmButton: false,
                            timer: 2500
                        })
                    } else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }

        setErrors(newErrors);
    }

    const handleSinopseChange = (event) => {
        const value = event.target.value;
        setcampDescricao(value);
        setSinopseLength(value.length);
    };
    const sinopseExcedida = sinopseLength > 255;

    return (
        <div className="section">
            <div className="section-center">
                <div className="container">
                    <div className="row">
                        <div className="booking-form">
                            <div className="booking-bg">
                                <div className="form-header">
                                    <h2>Adicionar um novo Filme</h2>
                                    <p>Aqui pode adicionar um novo filme para a MovieFlix!</p>
                                </div>
                            </div>
                            <div className='form'>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <span className="form-label">Título</span>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.titulo ? "error" : ""}`}
                                                placeholder="Título do Filme"
                                                value={campTitulo}
                                                onChange={event => setcampTitulo(event.target.value)}
                                            />
                                            {errors.titulo && <span className="error-msg">{errors.titulo}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span className="form-label">Cartaz</span>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.foto ? "error" : ""}`}
                                                id="inputFoto"
                                                placeholder="Cartaz do Filme"
                                                value={campFoto}
                                                onChange={event => setcampFoto(event.target.value)}
                                            />
                                            {errors.foto && <span className="error-msg">{errors.foto}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span className="form-label">Gênero</span>
                                            <select
                                                id="inputState"
                                                className={`form-control ${errors.genero ? "error" : ""}`}
                                                value={selectGenero}
                                                onChange={event => setselectGenero(event.target.value)}
                                            >
                                                <option value="">Selecione um Gênero</option>
                                                {generos.map(genero => (
                                                    <option key={genero.id} value={genero.id}>
                                                        {genero.descricao}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.genero && <span className="error-msg">{errors.genero}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <span className="form-label">Sinopse do Filme</span>
                                            <textarea
                                                className={`form-control sinopse textarea-sinopse ${sinopseExcedida ? "error" : ""}`}
                                                placeholder="Insira uma pequena sinopse do filme..."
                                                value={campDescricao}
                                                onChange={handleSinopseChange}
                                            />
                                            {sinopseExcedida && <span className="error-msg">Limite de 255 caracteres para a sinopse excedido!</span>}
                                            {errors.descricao && <span className="error-msg">{errors.descricao}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-btn">
                                    <button className="submit-btn" onClick={sendSave} disabled={sinopseExcedida}>
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
