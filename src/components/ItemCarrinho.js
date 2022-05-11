import React from "react";

const ItemCarrinho = (props)=>{
    return(
        <div>
            <h4>{props.title}</h4>
            <p>R${props.price},00</p>
            <button onClick={()=> props.removerDoCarrinho(props.id)}>Remover</button>
        </div>
    )
}

export default ItemCarrinho;