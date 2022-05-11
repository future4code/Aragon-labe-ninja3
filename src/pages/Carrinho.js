import React from "react";
import styled from "styled-components";
import axios from "axios"
import ItemCarrinho from "../components/ItemCarrinho";


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
                        <p>Preço total:R${valorTotal},00</p>

                        <button onClick={() => this.props.trocaPagina("lista")}>Voltar para lista de jobs</button>
                        <button onClick={()=> this.props.finalizaCompras()}>Finalizar compra</button>

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