import React from "react";
import styled from "styled-components";
import axios from "axios"
import { headers, url } from "../constants/urls";
import JobCard from "../components/JobCard";

const Inputs = styled.input`
    border: 1px solid black;
    margin: 2px;
`

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

    handleMin = (e) => {
        this.setState({ valorMinimo: e.target.value })
    }

    handleMax = (e) => {
        this.setState({ valorMaximo: e.target.value })
    }

    handleTitulo = (e) => {
        this.setState({ titulo: e.target.value })
    }

    componentDidMount() {
        this.pegarJobs()
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.valorMinimo !== prevState.valorMinimo ||
            this.state.valorMaximo !== prevState.valorMaximo ||
            this.state.titulo !== prevState.titulo ||
            this.state.ordenacao !== prevState.ordenacao) {
            this.filtrarJobs()
        }
        if(this.state.listaDeJobs !== prevState.listaDeJobs){
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

            if(this.state.ordenacao !== ""){
                listaFiltrada.sort((a, b) => {
                    switch (this.state.ordenacao) {
                        case "Menor valor":
                            return a.price - b.price
                        case "Maior valor":
                            return b.price - a.price
                        case "T??tulo":
                            return a.title.localeCompare(b.title)
                            case "Prazo":
                                return a.dueDate.localeCompare(b.dueDate)
                            default:
                                return a.price - b.price
                        }
                    })

                }            
        this.setState({ listaDeJobsFiltradas: listaFiltrada })
    }

    deletarJob = (idJob) => {
        const querDeletar = window.confirm("Tem certeza que deseja remover este servi??o?")

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


        const jobsMapeados =
            this.state.listaDeJobs &&
            this.state.listaDeJobsFiltradas.map((job) => {
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
                        <Inputs
                            placeholder="Valor m??nimo"
                            name="valorMinimo"
                            value={this.state.valorMinimo}
                            onChange={this.handleMin}
                        />
                    </label>

                    <label>
                        <Inputs
                            placeholder="Valor m??ximo"
                            name="valorMaximo"
                            value={this.state.valorMaximo}
                            onChange={this.handleMax}
                        />
                    </label>

                    <label>
                        <Inputs
                            placeholder="Nome ou descri????o"
                            name="titulo"
                            value={this.state.titulo}
                            onChange={this.handleTitulo} />
                    </label>

                    <select name="ordenacao" onChange={this.handleOrder}>
                        <option value={""}>Sem Ordena????o</option>
                        <option value={"Menor valor"}>Menor Valor</option>
                        <option value={"Maior valor"}>Maior Valor</option>
                        <option value={"T??tulo"}>T??tulo</option>
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