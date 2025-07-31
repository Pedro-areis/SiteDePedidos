import { useContext } from "react";
import "./home.css"; //importa o css da página;
import { PedidosContext } from "../../context/pedidosContext";

//função que cria os metodos do componente home;
function Home() {
  const {pedidos} = useContext(PedidosContext);
  const {handleChange} = useContext(PedidosContext);
  const {handleSubmit} = useContext(PedidosContext);

  return (
    <div className="home">
      <img src="src/assets/img-tela-inicial.jpg" alt="img-tela-inicial" />
      <div className="inicio">
        <p>Promoções do dia</p>
      </div>
      <form className="form-home" onSubmit={handleSubmit}>
        <ul>
          <p className="itens">Prato Principal</p>
          <li>
            <input
              type="checkbox"
              id="arroz-com-frango"
              value="Arroz com Frango"
              onChange={handleChange}
              checked={pedidos.includes("Arroz com Frango")}
            />
            <label for="arroz-com-frango">Arroz com Frango</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="feijoada"
              value="Feijoada"
              onChange={handleChange}
              checked={pedidos.includes("Feijoada")}
            />
            <label for="feijoada">Feijoada</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="churrasco"
              value="Churrasco"
              onChange={handleChange}
              checked={pedidos.includes("Churrasco")}
            />
            <label for="churrasco">Churrasco</label>
          </li>
        </ul>

        <ul>
          <p className="itens">Bebidas</p>
          <li>
            <input
              type="checkbox"
              id="refrigerante"
              value="Refrigerante"
              onChange={handleChange}
              checked={pedidos.includes("Refrigerante")}
            />
            <label for="refrigerante">Refrigerante</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="suco"
              value="Suco"
              onChange={handleChange}
              checked={pedidos.includes("Suco")}
            />
            <label for="suco">Suco</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="cerveja"
              value="Cerveja"
              onChange={handleChange}
              checked={pedidos.includes("Cerveja")}
            />
            <label for="cerveja">Cerveja</label>
          </li>
        </ul>

        <ul>
          <p className="itens">Sobremesa</p>
          <li>
            <input
              type="checkbox"
              id="arroz-doce"
              value="Arroz doce"
              onChange={handleChange}
              checked={pedidos.includes("Arroz doce")}
            />
            <label for="arroz-doce">Arroz doce</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="sorvete"
              value="Sorvete"
              onChange={handleChange}
              checked={pedidos.includes("Sorvete")}
            />
            <label for="sorvete">Sorvete</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="cocada"
              value="Cocada"
              onChange={handleChange}
              checked={pedidos.includes("Cocada")}
            />
            <label for="cocada">Cocada</label>
          </li>
        </ul>
        <div id="pedidosSelecionados">
          <button>Enviar Pedidos</button>
        </div>
      </form>
    </div>
  );
}

export default Home; //exporta a função para a página main.jsx
