import React from "react";
import styled from "styled-components";
import axios from "axios"
import { headers, url } from "../constants/urls";
import JobCard from "../components/JobCard";



export default class ListaServicos extends React.Component {
    state = {
        listaDeJobs: [],
        valorMinimo:"",
        valorMaximo:"",
        titulo:"",
        ordenacao:"",
        listaDeJobsFiltradas: [],
    }

    onChangeInputs = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    componentDidMount() {
        this.pegarJobs()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.valorMinimo !== prevState.valorMinimo || 
            this.state.valorMaximo !== prevState.valorMaximo ||
            this.state.titulo !== prevState.titulo ||
            this.state.ordenacao !== prevState.ordenacao)
            {
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
        .filter((job)=> job.price >= minimo)
        .filter((job)=> job.price <= maximo)
        .filter((job)=>{
            const tituloJob = job.title.toUpperCase()
            const descricaoJob = job.description.toLowerCase()
            const pesquisa = this.state.titulo.toLowerCase()

            return tituloJob.includes(pesquisa)||descricaoJob.includes(pesquisa)
        })
        .sort((a,b)=>{
            switch(this.state.ordenacao){
                case "Menor valor":
                    return a.price - b.price
                case "Maior valor":
                    return b.price - a.price 
                case "Título":
                    return 
                case "Prazo":
                    return 
            }
        })
        this.setState({listaDeJobsFiltradas: listaFiltrada })
    }

    render() {
        console.log(this.state.listaDeJobsFiltradas)
        const jobs = this.state.listaDeJobsFiltradas.map((job) => {
            return <JobCard
                key={job.id}
                job={job}
            />
        })
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
                        onChange={this.onChangeInputs}/>
                    </label>

                    <label>
                        <input
                        placeholder="Nome ou título"
                        name="titulo"
                        value={this.state.titulo}
                        onChange={this.onChangeInputs} />
                    </label>

                    <select value={this.state.ordenacao} name="ordenacao" onChange={this.onChangeInputs}>
                        <option>Sem Ordenação</option>
                        <option>Menor Valor</option>
                        <option>Maior Valor</option>
                        <option>Título</option>
                        <option>Prazo</option>
                    </select>

                    
                </div>

                <hr />
                <div>
                    <h2>Lista de Jobs</h2>
                    {jobs}
                </div>

            </div>
        )
    }
}