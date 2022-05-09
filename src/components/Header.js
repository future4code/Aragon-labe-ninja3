import React from "react";
import styled from "styled-components";
import axios from "axios"


const Header = (props) =>{
    return (
        <div>
            <h1>LabeNinjas</h1>

            <button onClick={()=>props.trocaPagina("inicial")} >Ir para página inicial</button>
            <button onClick={()=>props.trocaPagina("carrinho")} >Ir para carrinho de compras</button>
            <hr/>
            
        </div>
    )
}

export default Header;