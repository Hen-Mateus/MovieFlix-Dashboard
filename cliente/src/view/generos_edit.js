import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import '../css/generos.css';
const baseUrl = "http://localhost:3000";

export default function EditComponent() {

    const [dataGeneros, setdataGeneros] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [error, setError] = useState("");

    const { generosId } = useParams();
    useEffect(() => {
        const url = baseUrl + "/generos/" + generosId;
        console.log(url)
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataGeneros(data);
                    setcampDescricao(data.descricao);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }, []);

    function sendUpdate() {
        if (campDescricao === "") {
            setError("Insira um gênero!");
        } else {
            const url = baseUrl + "/generos/update/" + generosId;
            const dataput = {
                descricao: campDescricao,
            };
            axios.put(url, dataput)
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'O gênero "' + campDescricao + '" foi atualizado!',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                    else {
                        alert("Error");
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
                            <div className="booking-bg-update">
                                <div className="form-header">
                                    <h2>Atualizar Gênero</h2>
                                    <p>Aqui pode mudar o nome deste gênero!</p>
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
                                    <button className="submit-btn" onClick={() => sendUpdate()}>
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
