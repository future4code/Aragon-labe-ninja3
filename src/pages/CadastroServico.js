import React from "react";
import styled from "styled-components";
import axios from "axios";
import { headers, url } from "../constants/urls";

const CadastroContainer = styled.div `
    

`

const Formulario = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const Titulo = styled.h2`
    margin-top: 20px;
    margin-bottom: 0;
`

const Botao = styled.button`
    cursor: pointer;
    transition: .3s ease-in-out;
    padding: 10px 30px;
    font-size: 15px;
    border: 1px solid #00baff;
    background: white;
    border-radius: 5px;

    &:hover{
        border-bottom: 3px solid #00baff;
        background-color:#00baff;
        color: white;
    }

    @media (max-width:800px) {
        display: flex;
        flex-direction: column;
        width: 122px;
    }

`
const Input = styled.input `
`
const Label = styled.label `
    margin: 10px;
`

const InputDescricao = styled.input `
    width: 30vw;
    height: 20vh;
`

export default class CadastroServico extends React.Component{
    state = {
        titulo: "",
        descricao: "",
        preco: "",
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
            title: this.state.titulo,
            description: this.state.descricao,
            price: Number(this.state.preco),
            dueDate: this.state.prazo,
            paymentMethods: this.state.metodosPagamento,
        };
        axios.post(`${url}jobs`, body, headers)
            .then(() => {
                alert(`O serviço "${this.state.titulo}" foi criado com sucesso!`);
                this.setState({
                    titulo: "",
                    descricao: "",
                    preco: "",
                    prazo: "",
                    metodosPagamento: []
                });
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    render() {
        return (
            <CadastroContainer>
                <Titulo>Cadastre um Novo Serviço</Titulo>
                <Formulario onSubmit={this.criarServico}>
                    <Label htmlFor={'titulo'}>Título: </Label>
                    <Input
                        id={'titulo'}
                        name={"titulo"}
                        value={this.state.titulo}
                        onChange={this.handleInputValues}
                    />
                    <Label htmlFor={'descricao'}>Descrição: </Label>
                    <InputDescricao
                        id={'descricao'}
                        name={"descricao"}
                        value={this.state.descricao}
                        onChange={this.handleInputValues}
                    />
                    <Label htmlFor={'preco'}> Preço:</Label>
                    <Input
                        id={'preco'}
                        type="number"
                        name={"preco"}
                        placeholder={"R$"}
                        value={this.state.preco}
                        onChange={this.handleInputValues}
                    />
                    <section>
                        <h4>Formas de pagamento:</h4>
                        <select onChange={this.handleMetodosPagamentos}>
                            <option selected disabled>Selecione uma opção:</option>
                            <option value={"Crédito"}>Cartão de Crédito</option>
                            <option value={"Débito"}>Cartão de Débito</option>
                            <option value={"Paypal"}>PayPal</option>
                            <option value={"Boleto"}>Boleto</option>
                            <option value={"Pix"}>Pix</option>
                        </select>
                    </section>
                    <Label htmlFor={'date'}>Prazo: </Label>
                    <Input
                        id={'prazo'}
                        type={"date"}
                        name={"prazo"}
                        value={this.state.prazo}
                        onChange={this.handleInputValues}
                    />
                    <br />
                    <Botao type={"submit"}>Cadastrar Serviço</Botao>
                </Formulario>
            </CadastroContainer>
        );
    };
};
