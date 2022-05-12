import React from "react";
import styled from "styled-components";
import axios from "axios"

const Botao = styled.button`
    cursor: pointer;
    transition: .3s ease-in-out;
    padding: 20px 60px;
    font-size: 20px;
    border: 1px solid #00baff;
    background: white;
    width: 70vw;
    margin: 10px;
    text-align: center;

    &:hover{
        border-bottom: 3px solid #00baff;
        background-color:#00baff;
        color: white;
    }

`
const Titulo = styled.h2`
    margin: 20px;
`

export default class PaginaInicial extends React.Component {
    render() {
        return (
            <div>

                    <Titulo>Bem-vindes ao BunNinjas!</Titulo>
                    <p>Sua plataforma online de oferta e busca de serviços</p>
                
                    <Botao onClick={() => this.props.trocaPagina("cadastro")}>Cadastrar um Job</Botao>
                    <Botao onClick={() => this.props.trocaPagina("lista")} >Contratar Jobs</Botao>
                
            </div>
        )
    }
}