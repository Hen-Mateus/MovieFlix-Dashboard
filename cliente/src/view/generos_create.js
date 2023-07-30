import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import React, { useState } from "react";

import '../css/generos.css';

export default function EditComponent() {
    const [campDescricao, setcampDescricao] = useState("");
    const [error, setError] = useState("");

    function sendSave() {
        if (campDescricao === "") {
            setError("Insira um gênero!");
        } else {
            const baseUrl = "http://localhost:3000/generos/create";
            const datapost = {
                descricao: campDescricao,
            };
            axios.post(baseUrl, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'O gênero "' + campDescricao + '" foi adicionado!',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    } else {
                        alert(response.data.message);
                    }
                }).catch(error => {
                    alert("Error 34 " + error);
                });
        }
    }

    return (
        <div className="section">
            <div className="section-center">
                <div className="container">
                    <div className="row">
                        <div className="booking-form-g">
                            <div className="booking-bg">
                                <div className="form-header">
                                    <h2>Adicionar um novo Gênero</h2>
                                    <p>Aqui pode adicionar um novo gênero para os filmes!</p>
                                </div>
                            </div>
                            <div className='form row'>
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span className="form-label">Gênero</span>
                                            <input
                                                type="text"
                                                className={`form-control ${error ? "error" : ""}`}
                                                placeholder="Gênero de Filme"
                                                value={campDescricao}
                                                onChange={value => {
                                                    setcampDescricao(value.target.value);
                                                    setError("");
                                                }}
                                            />
                                            {error && <span className="error-msg">{error}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4"></div>
                                <div className="form-btn col-md-4">
                                    <button className="submit-btn" onClick={() => sendSave()}>
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
