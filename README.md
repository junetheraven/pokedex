<div align="center">

<h1>
  <img src="https://31.media.tumblr.com/97e194ba74257cad03d826bbae846491/tumblr_inline_myrg86dlpP1qbq39l.png" width="32" height="32" alt="" />
  Pokédex — PokéAPI
</h1>

**Aplicação front-end em React com visual Windows 7**

Navegue por mais de mil Pokémon, busque por nome ou número, filtre por tipo e veja os detalhes completos de cada um.

![React](https://img.shields.io/badge/REACT-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![7.css](https://img.shields.io/badge/7.CSS-0078D7?style=for-the-badge)
![PokéAPI](https://img.shields.io/badge/POKÉAPI-EF5350?style=for-the-badge)

[Sobre o projeto](#sobre) · [Funcionalidades](#funcionalidades) · [Como Executar](#como-executar) · [Decisões de implementação](#decisões-de-implementação)

</div>

---

## <img src="https://31.media.tumblr.com/5f5e9f6a7ea8e9a3f9a377203b2a4934/tumblr_inline_myrg8fhwUf1qbq39l.png" width="" height="24" alt="" id="sobre"/> Sobre o Projeto

Este projeto foi desenvolvido como atividade avaliativa de front-end. O objetivo foi criar uma interface interativa que consome a PokéAPI para listar, buscar e filtrar Pokémon, com detalhes completos de cada um.

## <img src="https://31.media.tumblr.com/012bb3ecd63c18b1a8df05b65b46c718/tumblr_inline_myrg8qqOEU1qbq39l.png" width="24" height="24" alt="" id="funcionalidades"/> Funcionalidades

- **Listagem paginada:** 20 Pokémon por página, com nome, número, sprite e tipos.
- **Modal de detalhes:** altura, peso, habilidades, estatísticas base e sprite de frente.
- **Filtro por tipo:** usa o endpoint `/type`, mostra o total de Pokémon do tipo e permite voltar à lista completa.
- **Busca por nome ou número:** filtro client-side sobre a página atual (nome parcial ou número exato).
- **Carregamento e erros:** mensagem "Carregando Pokémon..." e mensagem de erro amigável caso a API esteja indisponível.
- **Responsividade:** grid adaptável a desktop, tablet e celular.

---

## <img src="https://31.media.tumblr.com/6236a0b06a9b1fdb88e569959a7c4fa2/tumblr_inline_myrgb3MDkD1qbq39l.png" width="24" height="24" alt="" id="como-executar"/> Como Executar o Projeto

**Pré-requisito:** Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

**Dependências:** `react`, `react-dom`, `7.css`, `vite` e `@vitejs/plugin-react`.

---

## <img src="https://31.media.tumblr.com/e34114ed94d9406dbc5e9ea2de74d8d3/tumblr_inline_myrg923Z1V1qbq39l.png" width="" height="24" alt="" /> Estrutura do Projeto

```
src/
├── main.jsx
├── App.jsx
├── style.css
└── components/
    ├── FilterWindow.jsx
    ├── PokemonCard.jsx
    └── PokemonModal.jsx
```

- `App.jsx`: estados, requisições, filtro de busca e paginação.
- `FilterWindow.jsx`: campo de busca, select de tipos e total do tipo.
- `PokemonCard.jsx`: card de cada Pokémon na lista.
- `PokemonModal.jsx`: detalhes do Pokémon selecionado.

---

## <img src="https://31.media.tumblr.com/e87846763582f67ed308dee88d2065fa/tumblr_inline_myrg9ppCSf1qbq39l.png" width="24" height="24" alt="" id="decisões-de-implementação"/> Decisões de Implementação

- **Estado no `App`:** página (`offset`), tipo, busca e Pokémon selecionado afetam a mesma lista, então ficam no pai e os filhos recebem por props.
- **Dois `useEffect`:** um com `[]` carrega os tipos uma única vez; outro com `[offset, tipoSelecionado]` refaz a busca dos Pokémon só quando a página ou o tipo mudam.
- **`fetch` com `.then`:** a cadeia termina em `.catch` (mostra a mensagem de erro) e `.finally` (desliga o "Carregando"), centralizando o tratamento em um único lugar.
- **`Promise.all`:** a lista da API traz só nome e URL, então os detalhes dos 20 Pokémon (id, sprite, tipos, stats) são buscados em paralelo.
- **Paginação:** sem filtro, usa `limit/offset` da API. Com filtro por tipo, a API devolve todos os Pokémon do tipo e a paginação é feita com `slice` no cliente. O botão "Próximo" é desabilitado na última página, usando o total.
- **Busca por nome ou número:** filtra apenas a página atual, conforme o enunciado (client-side). Não faz requisição: é uma variável recalculada a cada render a partir de `pokemons` e `busca`.
- **Botões de página desabilitados durante o carregamento:** evita cliques rápidos que disparariam várias requisições ao mesmo tempo.
- **Mensagem única de status:** carregando, erro ou "nenhum Pokémon encontrado" usam o mesmo bloco na tela.
