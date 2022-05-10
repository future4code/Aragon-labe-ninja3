import React from "react";

const converterData = (date) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    return `${day}/${month}/${year}`
}


const JobCard = (props)=> {
    return (
        <div>
            <h4>{props.job.title}</h4>
            <p>Preço: R$ {props.job.price},00</p>
            <p>Prazo: {converterData(props.job.dueDate)}</p>

            <button>Detalhes</button>
            <button>Remover job</button>
            <button>Adicionar ao carrinho</button>
        </div>
    )
    
}


export default JobCard;