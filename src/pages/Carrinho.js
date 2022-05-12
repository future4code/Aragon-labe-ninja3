import React from "react";
import styled from "styled-components";
import axios from "axios"
import ItemCarrinho from "../components/ItemCarrinho";

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


export default class Carrinho extends React.Component {
    render() {

        const listaCarrinho = this.props.carrinho.map((job) => {
            return <ItemCarrinho
                key={job.id}
                title={job.title}
                price={job.price}
                id={job.id}
                removerDoCarrinho={this.props.removerDoCarrinho}
            />
        })

        let valorTotal = 0

        this.props.carrinho.forEach((job) => {
            valorTotal += job.price
        });

        return (
            <div>
                {listaCarrinho.length > 0 ? (
                    <div>
                        <h2>Dados da compra</h2>
                        <p>Preço total: R$ {valorTotal.toFixed(2)}</p>

                        <Botao onClick={() => this.props.trocaPagina("lista")}>Voltar para lista de jobs</Botao>
                        <Botao onClick={()=> this.props.finalizaCompras()}>Finalizar compra</Botao>

                        <hr />

                        <h2>Carrinho</h2>
                        {listaCarrinho}


                    </div>
                        ): (
                        <h2>Carrinho vazio :(</h2>
                )}

            </div>
        )

    }
}