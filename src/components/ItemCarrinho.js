import React from "react";
import styled from "styled-components";

const ItemCarrinhoContainer = styled.div `
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

const ItemCarrinho = (props)=>{
    return(
        <ItemCarrinhoContainer>
            <h3>{props.title}</h3>
            <p>R${props.price},00</p>
            <Botao onClick={()=> props.removerDoCarrinho(props.id)}>Remover</Botao>
        </ItemCarrinhoContainer>
    )
}

export default ItemCarrinho;