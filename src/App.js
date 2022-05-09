import React from "react";
import styled from "styled-components"
import axios from "axios"
import Header from "./components/Header";
import PaginaInicial from "./pages/PaginaInicial";
import Carrinho from "./pages/Carrinho";
import DetalhesServicos from "./pages/DetalhesServicos";
import ListaServicos from "./pages/ListaServicos";
import CadastroServico from "./pages/CadastroServico";

export default class App extends React.Component {
  state = {
    paginaAtual: "inicial",
    carrinho: []
  }

  trocaPagina = (nomeDaPagina) => {
    this.setState({ paginaAtual: nomeDaPagina })
  }

  adicionarAoCarrinho = (job) => {
    const novoCarrinho = [...this.state.carrinho, job]

    this.setState({carrinho: novoCarrinho})
    alert("Job adicionado ao carrinho")
  }

  renderizaPaginaAtual = () => {
    switch (this.state.paginaAtual) {
      case "inicial":
        return <PaginaInicial 
        trocaPagina={this.trocaPagina}
        />
      case "carrinho":
        return <Carrinho 
        trocaPagina={this.trocaPagina}
        carrinho = {this.state.carrinho}
        finalizaCompras = {this.finalizaCompras}
        />
      case "detalhes":
        return <DetalhesServicos 
        trocaPagina={this.trocaPagina}
        />
      case "lista":
        return <ListaServicos 
        trocaPagina={this.trocaPagina}
        />
      case "cadastro":
        return <CadastroServico 
        trocaPagina={this.trocaPagina}
        />
      default:
        return <div>Página não encontrada!</div>
    }
  }

  finalizaCompras = ()=>{
    this.setState({carrinho:[]})
    alert("Volte sempre!")
  }



  render() {
    return (
      <div>
        <Header
          trocaPagina={this.trocaPagina}
        />

        {this.renderizaPaginaAtual()}

      </div>
    );
  }
}


