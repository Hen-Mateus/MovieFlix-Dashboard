import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import '../css/filmes.css';
const baseUrl = "http://localhost:3000";

export default function EditComponent() {
    const [dataFilmes, setdataFilmes] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringGenero, setstringGenero] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const [sinopseLength, setSinopseLength] = useState(0);
    const { filmesId } = useParams();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const url = baseUrl + "/filmes/" + filmesId;
        console.log(url);
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataFilmes(data);
                    setcampTitulo(data.titulo);
                    setcampDescricao(data.descricao);
                    setcampFoto(data.foto);
                    setstringGenero(data.genero.descricao);
                    setselectGenero(data.generoId);
                    console.log(JSON.stringify(data.genero.descricao));
                } else {
                    alert("Error web service");
                }
            })
            .catch(error => {
                alert("Error server: " + error);
            });
    }, []);

    function sendUpdate() {
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
            const url = baseUrl + "/filmes/update/" + filmesId;
            const dataput = {
                titulo: campTitulo,
                descricao: campDescricao,
                foto: campFoto,
                generoId: selectGenero
            };

            axios.put(url, dataput)
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'O filme "' + campTitulo + '" foi atualizado!',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    } else {
                        alert("Error");
                    }
                })
                .catch(error => {
                    alert("Error 34 " + error);
                });
        }
        setErrors(newErrors);
    }

    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const url = baseUrl + "/generos";
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
                            <div className="booking-bg-update">
                                <div className="form-header">
                                    <h2>Atualizar Filme</h2>
                                    <p>Aqui pode mudar a informação sobre este filme!</p>
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
                                                onChange={value => setcampTitulo(value.target.value)}
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
                                                onChange={(value) => setcampFoto(value.target.value)}
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
                                                onChange={(event) => setselectGenero(event.target.value)}
                                            >
                                                <option value="">Selecione um Gênero</option>
                                                {generos.map((genero) => (
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
                                    <button className="submit-btn" onClick={() => sendUpdate()} disabled={sinopseExcedida}>
                                        Atualizar
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
