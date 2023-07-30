import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import '../css/generos_list.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ListComponent() {
    const [dataGeneros, setdataGeneros] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3000/generos/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataGeneros(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }, []);

    function LoadFillData() {
        return dataGeneros.map((data, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{data.id}</th>
                    <td>{data.descricao}</td>
                    <td><Link className="more" to={"/generos/update/" + data.id}><i className="fas fa-edit"></i></Link></td>
                    <td>
                        <Link className="more" onClick={() => OnDelete(data.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    function OnDelete(id) {
        Swal.fire({
            title: 'Tem a certeza que quer apagar?',
            text: 'Não poderá recuperar este gênero de filmes!',
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
                    'Este gênero de filmes não foi apagado.',
                    'error'
                );
            }
        });
    }

    function SendDelete(userId) {
        const baseUrl = "http://localhost:3000/generos/delete";
        axios.delete(baseUrl, {
            data: { id: userId }
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Gênero apagado!',
                        'O gênero foi apagado com sucesso.',
                        'success'
                    );
                    LoadGeneros();
                }
            })
            .catch(error => {
                alert("Error 325");
            });
    }

    useEffect(() => {
        LoadGeneros();
    }, []);

    function LoadGeneros() {
        const url = "http://localhost:3000/generos/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataGeneros(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    return (
        <div className="content">
            <div className="container">
                <div className="table-container">
                    <div className="title">
                        <div className="title-line"></div>
                        <h2>Gêneros</h2>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Gênero</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Apagar</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <LoadFillData />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}
