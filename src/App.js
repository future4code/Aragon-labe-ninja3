import React from "react";
import styled from "styled-components"
import axios from "axios"
import Header from "./components/Header";
import PaginaInicial from "./pages/PaginaInicial";
import Carrinho from "./pages/Carrinho";
import DetalhesServicos from "./pages/DetalhesServicos";
import ListaServicos from "./pages/ListaServicos";
import CadastroServico from "./pages/CadastroServico";

const ContainerGeral = styled.div`
  text-align: center;
  font-family:'Roboto', sans-serif;
`

export default class App extends React.Component {
  state = {
    paginaAtual: "inicial",
    carrinho: [],
    detalhesAtivo:"",
  }

  trocaPagina = (nomeDaPagina) => {
    this.setState({ paginaAtual: nomeDaPagina })
  }

  adicionarAoCarrinho = (job) => {
    const novoCarrinho = [...this.state.carrinho, job]

    this.setState({ carrinho: novoCarrinho })
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
          removerDoCarrinho={this.removerDoCarrinho}
          trocaPagina={this.trocaPagina}
          carrinho={this.state.carrinho}
          finalizaCompras={this.finalizaCompras}
        />
      case "detalhes":
        return <DetalhesServicos
          jobId={this.state.detalhesAtivo}
          trocaPagina={this.trocaPagina}
        />
      case "lista":
        return <ListaServicos
          irParaDetalhes={this.irParaDetalhes}
          adicionarAoCarrinho={this.adicionarAoCarrinho}
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

  finalizaCompras = () => {
    this.setState({ carrinho: [] })
    alert("Volte sempre!")
  }

  irParaDetalhes = (jobId)=>{
    this.setState({paginaAtual: "detalhes", detalhesAtivo: jobId })
  }

  removerDoCarrinho = (id)=>{
    const querDeletar = window.confirm("Tem certeza que deseja remover este serviço?")

    if(querDeletar){
      const novoCarrinho = this.state.carrinho.filter((itemCarrinho)=>{
        return itemCarrinho.id !== id
      })
      this.setState({carrinho: novoCarrinho})
    }
  }


  render() {
    return (
      <ContainerGeral>
        <Header
          trocaPagina={this.trocaPagina}
        />

        {this.renderizaPaginaAtual()}

      </ContainerGeral>
    );
  }
}


