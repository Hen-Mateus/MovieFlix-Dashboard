import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from './logo.png';
import './css/App.css';

import FilmeCreate from './view/filmes_create';
import FilmeList from './view/filmes_list';
import FilmeEdit from './view/filmes_edit';

import GeneroCreate from './view/generos_create';
import GeneroList from './view/generos_list';
import GeneroEdit from './view/generos_edit';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <div className="navbar-right-container"></div>
          <div className="collapse navbar-collapse space-left" id="navbarNav">
            <ul className="navbar-nav mx-auto ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-film icon"></i>
                  <span className="items">Filmes</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  <i className="fas fa-plus icon"></i>
                  <span className="items">Adicionar Filme</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/generos/">
                  <i className="fas fa-list icon"></i>
                  <span className="items">Gêneros</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/generos/create">
                  <i className="fas fa-plus icon"></i>
                  <span className="items">Criar Gênero</span>
                </Link>
              </li>
            </ul>
            <div className="div-direita"></div>
          </div>
        </nav>
        <div className="custom-background"></div>
        <div className="container py-4 d-flex align-items-center justify-content-center">
          <div className="row space-top">
            <Routes>
              <Route path="/" element={<FilmeList />} />
              <Route path="/create" element={<FilmeCreate />} />
              <Route path="/update/:filmesId" element={<FilmeEdit />} />
              <Route path="/generos/" element={<GeneroList />} />
              <Route path="/generos/create" element={<GeneroCreate />} />
              <Route path="/generos/update/:generosId" element={<GeneroEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
