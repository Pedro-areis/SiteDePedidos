import "./sumario.css"; //importa o código css;

function Sumario({ setPagina }) {
  //função responsável pelo encaminhamento das páginas;
  return (
    <nav>
      {/*div container para cada botão de direcionamento*/}
      
      <button onClick={() => setPagina("home")}>Home</button> {/*botão Home para acionar o componente*/}
      
      <button onClick={() => setPagina("carrinho")}>Carrinho</button> {/*botão Carrinho para acionar o componente*/} 
      
      <button onClick={() => setPagina("pedidos")}>Pedidos</button> {/*botão Pedidos para acionar o componente*/}
    </nav>
  );
}

export default Sumario; //exporta a função para a página App.jsx
