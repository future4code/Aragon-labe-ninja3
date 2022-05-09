import React from "react";
import styled from "styled-components";
import axios from "axios"


export default class PaginaInicial extends React.Component{
    render(){
        return (
            <div>
                <h2>Bem-vindes a LabeNinjas!</h2>

                <button onClick={()=> this.props.trocaPagina("cadastro")}>Cadastrar um Job</button>
                <button onClick={()=> this.props.trocaPagina("lista")} >Contratar Jobs</button>
            </div>
        )
    }
}