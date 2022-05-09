import React from "react";


const JobCard = (props)=> {
    return (
        <div>
            <h4>{props.job.title}</h4>
            <p>Preço: {props.job.price}</p>
            <p>Prazo:</p>

            <button>Detalhes</button>
            <button>Remover job</button>
            <button>Adicionar ao carrinho</button>
        </div>
    )
    
}


export default JobCard;