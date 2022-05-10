import React from "react";
import styled from "styled-components";
import axios from "axios";
import { headers, url } from "../constants/urls";


export default class CadastroServico extends React.Component{
    state = {
        titulo: "",
        descricao: "",
        preco: 0,
        prazo: "",
        metodosPagamento: []
    };

    handleInputValues = (ev) => {
        this.setState({[ev.target.name]: ev.target.value });
    };

    handleMetodosPagamentos = (ev) => {
        const pagamento = [ev.target.value];
        this.setState({metodosPagamento: pagamento});
    };

    criarServico = (ev) => {
        ev.preventDefault();

        const body = {
            titulo: this.state.titulo,
            descricao: this.state.descricao,
            preco: Number(this.state.preco),
            prazo: this.state.prazo,
            metodosPagamento: this.state.metodosPagamento,
        };
        axios.post(`${url}/jobs`, body, headers)
            .then(() => {
                alert(`O serviço ${this.state.title} foi criado com sucesso!`);
                this.setState({
                    titutlo: "",
                    descricao: "",
                    preco: 0,
                    prazo: "",
                    metodosPagamento: []
                });
            })
            .catch((err) => {
                alert(err.res.data);
            });
    };

    render() {
        return (
            <>
                <h2>Cadastre um Novo Serviço</h2>
                <form onSubmit={this.criarServico}>
                    <label htmlFor={'titulo'}>Título: </label>
                    <input
                        id={'titulo'}
                        name={"titulo"}
                        value={this.state.titulo}
                        onChange={this.handleInputValues}
                    />
                    <label htmlFor={'descricao'}>Descrição: </label>
                    <input
                        id={'descricao'}
                        name={"descricao"}
                        value={this.state.descricao}
                        onChange={this.handleInputValues}
                    />
                    <label htmlFor={'preco'}>Preço: </label>
                    <input
                        id={'preco'}
                        type="number"
                        name={"preco"}
                        value={this.state.preco}
                        onChange={this.handleInputValues}
                    />
                    <section>
                        <h4>Formas de pagamento:</h4>
                        <select onChange={this.handleMetodosPagamentos}>
                            <option selected disabled>Selecione uma opção:</option>
                            <option value={"credito"}>Cartão de Crédito</option>
                            <option value={"debito"}>Cartão de Débito</option>
                            <option value={"paypal"}>PayPal</option>
                            <option value={"boleto"}>Boleto</option>
                            <option value={"pix"}>Pix</option>
                        </select>
                    </section>
                    <label htmlFor={'date'}>Prazo: </label>
                    <input
                        id={'prazo'}
                        type={"date"}
                        name={"prazo"}
                        value={this.state.prazo}
                        onChange={this.handleInputValues}
                    />
                    <br />
                    <button type={"submit"}>Cadastrar Serviço</button>
                </form>
            </>
        );
    };
};