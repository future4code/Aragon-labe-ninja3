import React from "react";
import styled from "styled-components";
import axios from "axios"
import { headers, url } from "../constants/urls";


export default class DetalhesServicos extends React.Component {
    state = {
        job: {},
    }


    componentDidMount() {
        this.pegarJob()
    }

    pegarJob = () => {
        axios.get(`${url}jobs/${this.props.jobId}`, headers)
            .then((res) => {
                console.log(res)
                this.setState({ job: res.data })
            })
            .catch((err) => {
                alert("Erro ao carregar detalhes do job.")
            })
    }

    converterData = (date) => {
        const day = date.substring(8, 10)
        const month = date.substring(5, 7)
        const year = date.substring(0, 4)
        return `${day}/${month}/${year}`
    }

    render() {
        const formasPagamento = this.state.job.paymentMethods && this.state.job.paymentMethods.map((pagamento) => {
            return <p>
                <li key={pagamento}>{pagamento}</li>
            </p>
        })

        return (
            <div>
                <h1>{this.state.job.title}</h1>
                <p>Preço: R${this.state.job.price},00</p>
                <p>Prazo: {this.state.job.dueDate}</p>
                <p>Descrição: {this.state.job.description}</p>
                <p>Formas de pagamento:</p>
                {formasPagamento}

                <button onClick={()=>this.props.trocaPagina("lista")}>Voltar para lista de jobs</button>
            </div>
        )
    }
}