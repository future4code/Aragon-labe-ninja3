import React from "react";
import styled from "styled-components";
import axios from "axios"
import { headers, url } from "../constants/urls";
import JobCard from "../components/JobCard";


export default class ListaServicos extends React.Component {
    state = {
        listaDeJobs: [],
        valorMinimo: "",
        valorMaximo: "",
        titulo: "",
        ordenacao: "",
        listaDeJobsFiltradas: [],
    }

    onChangeInputs = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value })
    }

    handleOrder = (e) => {
        this.setState({ ordenacao: e.target.value })
    }

    componentDidMount() {
        this.pegarJobs()
        /* this.filtrarJobs() */
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.valorMinimo !== prevState.valorMinimo ||
            this.state.valorMaximo !== prevState.valorMaximo ||
            this.state.titulo !== prevState.titulo ||
            this.state.ordenacao !== prevState.ordenacao) {
            this.filtrarJobs()
        }
    }

    pegarJobs = () => {
        axios.get(`${url}jobs`, headers)
            .then((res) => {
                this.setState({ listaDeJobs: res.data.jobs })
            })
            .catch((err) => {
                console.log(err.res.data)
            })
    }


    filtrarJobs = () => {
        const maximo = this.state.valorMaximo
            ? Number(this.state.valorMaximo)
            : Infinity

        const minimo = this.state.valorMinimo
            ? Number(this.state.valorMinimo)
            : -Infinity


        const listaFiltrada = this.state.listaDeJobs
            .filter((job) => job.price >= minimo)
            .filter((job) => job.price <= maximo)
            .filter((job) => {
                const tituloJob = job.title.toLowerCase()
                const descricaoJob = job.description.toLowerCase()
                const pesquisa = this.state.titulo.toLowerCase()

                return tituloJob.includes(pesquisa) || descricaoJob.includes(pesquisa)
            })
            .sort((a, b) => {
                switch (this.state.ordenacao) {
                    case "Menor valor":
                        return a.price - b.price
                    case "Maior valor":
                        return b.price - a.price
                    case "Título":
                        return a.title.localeCompare(b.title)
                    case "Prazo":
                        return a.dueDate.localeCompare(b.dueDate)
                }
            })
        this.setState({ listaDeJobs: listaFiltrada })
    }

    deletarJob = (idJob) => {
        const querDeletar = window.confirm("Tem certeza que deseja remover este serviço?")

        if (querDeletar) {
        
            axios.delete(`${url}jobs/${idJob}`, headers)
                .then((res) => {
                    alert("Job apagado com sucesso!")
                    console.log(res.data)

                    this.pegarJobs()
                })
                .catch((err) => {
                    alert("Erro ao apagar")
                    console.log(err.message)
                })
        }
    }

    


    render() {
        console.log(this.state.listaDeJobsFiltradas)

        const jobsMapeados =
            this.state.listaDeJobs &&
            this.state.listaDeJobs.map((job) => {
                return (
                    <JobCard
                        deletarJob={this.deletarJob}
                        irParaDetalhes={this.props.irParaDetalhes}
                        adicionarAoCarrinho={this.props.adicionarAoCarrinho}
                        key={job.id}
                        job={job}
                    />
                );
            });

        return (
            <div>
                <div>
                    <h2>Busca por Jobs</h2>

                    <label>
                        <input
                            placeholder="Valor mínimo"
                            name="valorMinimo"
                            value={this.state.valorMinimo}
                            onChange={this.onChangeInputs}
                        />
                    </label>

                    <label>
                        <input
                            placeholder="Valor maxímo"
                            name="valorMaximo"
                            value={this.state.valorMaximo}
                            onChange={this.onChangeInputs} />
                    </label>

                    <label>
                        <input
                            placeholder="Nome ou descrição"
                            name="titulo"
                            value={this.state.titulo}
                            onChange={this.onChangeInputs} />
                    </label>

                    <select name="ordenacao" onChange={this.handleOrder}>
                        <option value={""}>Sem Ordenação</option>
                        <option value={"Menor valor"}>Menor Valor</option>
                        <option value={"Maior valor"}>Maior Valor</option>
                        <option value={"Título"}>Título</option>
                        <option value={"Prazo"}>Prazo</option>
                    </select>


                </div>

                <hr />
                <div>
                    <h2>Lista de Jobs</h2>
                    {jobsMapeados}
                </div>

            </div>
        )
    }
}