import React from "react";
import styled from "styled-components";


const ContainerHeader = styled.div`
    display:flex;
    justify-content: space-between; 

    @media(max-width: 800px) {
    flex-direction: column;
    position: relative;   
  }
`
const Logo = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

const Menu = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

const Imagem = styled.img`
    width: fit-content;
    height: 15vh;
`

const Titulo = styled.h1`
    color:#00baff;
`

const Botao = styled.button`
    cursor: pointer;
    transition: .3s ease-in-out;
    padding: 10px 50px;
    font-size: 18px;
    border:none;
    background: white;

    &:hover{
        border-bottom: 3px solid #00baff;
        color:#00baff;
    }

`

const Header = (props) => {
    return (
        <div>

            <ContainerHeader>
                <Logo>
                    <Imagem src="https://st.depositphotos.com/9251776/53578/v/600/depositphotos_535788194-stock-illustration-set-of-cute-bunny-ninjas.jpg" />
                    <h1>Bun</h1><Titulo>Ninjas</Titulo>
                </Logo>

                <Menu>
                    <Botao onClick={() => props.trocaPagina("inicial")} >Página inicial </Botao>
                    <Botao onClick={() => props.trocaPagina("carrinho")} >Carrinho</Botao>
                </Menu>
            </ContainerHeader>

            <hr />

        </div>
    )
}

export default Header;