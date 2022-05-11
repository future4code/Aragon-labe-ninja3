import axios from "axios";
import React from "react";
import { headers, url } from "../constants/urls";

const converterData = (date) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    return `${day}/${month}/${year}`
}


const JobCard = (props) => {
    return (
        <div>
            <h4>{props.job.title}</h4>
            <p>Preço: R$ {props.job.price},00</p>
            <p>Prazo: {converterData(props.job.dueDate)}</p>

            <button onClick={()=> props.irParaDetalhes(props.job.id)}>Detalhes</button>
            <button onClick={() => props.deletarJob(props.job.id)}>Remover job</button>
            <button onClick={() => props.adicionarAoCarrinho(props.job)}>Adicionar ao carrinho</button>
        </div>
    )

}


export default JobCard;