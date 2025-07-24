# Site de Pedidos (Restaurante tia nastácia)
Estou desenvolvendo um sistema para pedidos de um restaurante, nele terá a opção de selecionar itens do cardápio e finalizar o pedido por ali mesmo! O objetivo desse projeto é aplicar meus conhecimentos nas tecnologias de desenvolvimento web, tenho a meta de levá-lo ao Deploy.

Para desenvolvimento do sistema, utilizei as tecnologias: React.js (Frontend), Node.js (Backend), Express.js (Rotas), API REST FULL e MySQL (Banco de dados). O sistema está totalmente estruturado em JavaScript, tenho me aprofundado na linguagem a cada dia.

## Funcionalidade do sistema - HOME
Ao entrar no site, você irá para a tela Home, um componente apenas para mostrar os itens no cadápio (inicialmente possui apenas alguns itens, mas em breve será possível até mesmo a edição pelo admin do site), o usuário seleciona os itens e os envia para o carrinho.

## Funcionalidade do sistema - CARRINHO
Nesse componente ocorre o envio dos produtos selecionados para o banco de dados, após a confirmação do usuário. Será possível excluir os itens e por fim, finalizar o pedido.

## Funcionalidade do sistema - PEDIDOS/HISTORICO
Aqui ficam todos os pedidos realizados no restaurante, com data, ID único e valor (R$), aqui é apenas para visualização do usuário, realiza um GET para coletar as informações em tempo real com o banco de dados.
