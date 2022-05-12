import axios from "axios";
import React from "react";
import styled from "styled-components";
import { headers, url } from "../constants/urls";

const converterData = (date) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    return `${day}/${month}/${year}`
}

const JobCardContainer = styled.div `
    border: 1px solid black;
    margin: 1% auto;
    width: 70vw;
    text-align: center;
`
const Botao = styled.button`
    cursor: pointer;
    transition: .3s ease-in-out;
    padding: 10px 30px;
    font-size: 15px;
    border: 1px solid #00baff;
    background: white;

    &:hover{
        border-bottom: 3px solid #00baff;
        background-color:#00baff;
        color: white;
    }

`

const JobCard = (props) => {
    return (
        <JobCardContainer>
            <h4>{props.job.title}</h4>
            <p>Preço: R$ {props.job.price},00</p>
            <p>Prazo: {converterData(props.job.dueDate)}</p>

            <Botao onClick={()=> props.irParaDetalhes(props.job.id)}>Detalhes</Botao>
            <Botao onClick={() => props.deletarJob(props.job.id)}>Remover job</Botao>
            <Botao onClick={() => props.adicionarAoCarrinho(props.job)}>Adicionar ao carrinho</Botao>
        </JobCardContainer>
    )

}


export default JobCard;