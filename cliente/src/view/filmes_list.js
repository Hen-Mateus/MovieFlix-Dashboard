import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from 'react-bootstrap';

import '../css/filmes_list.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ListComponent() {
    const [dataFilmes, setdataFilmes] = useState([]);

    useEffect(() => {
        LoadFilmes();
    }, []);

    function LoadFilmes() {
        const url = "http://localhost:3000/filmes/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataFilmes(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadFillData() {
        return dataFilmes.map((data, index) => {
            return (
                <Col key={index} xs={12} sm={6} md={4} lg={4}>
                    <Card className="custom-card">
                        <div className="card-image">
                            <Card.Img variant="top" src={data.foto} alt={'Cartaz do filme "' + data.titulo + '"'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "image_notfound.jpg"; // Caminho para uma imagem de substituição
                                }} />
                        </div>
                        <Card.Body>
                            <div className="card-content">
                                <h5 className="card-title">{data.titulo}</h5>
                                <p className="card-synopsis">{data.descricao}</p>
                            </div>
                            <div className="card-genre">
                                <strong className="red-text">{data.genero.descricao}</strong>
                                <div className="card-buttons">
                                    <Link className="btn" to={"/update/" + data.id}><i className="fas fa-edit"></i></Link>
                                    <Link className="btn" onClick={() => OnDelete(data.id)}><i className="fas fa-trash-alt"></i></Link>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
    }

    function OnDelete(id) {
        Swal.fire({
            title: 'Tem a certeza que quer apagar?',
            text: 'Não poderá recuperar este filme!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, quero apagar',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                SendDelete(id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Este filme não foi apagado.',
                    'error'
                );
            }
        });
    }

    function SendDelete(userId) {
        const baseUrl = "http://localhost:3000/filmes/delete";
        axios.delete(baseUrl, {
            data: { id: userId }
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Filme apagado!',
                        'O filme foi apagado com sucesso.',
                        'success'
                    );
                    LoadFilmes();
                }
            })
            .catch(error => {
                alert("Error 325");
            });
    }

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="title-f">
                        <div className="title-line-f"></div>
                        <h2>Filmes</h2>
                    </div>
                    <Row>{LoadFillData()}</Row>
                </div>
            </div>
        </section>
    );
}
