import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import FilterWindow from "./components/FilterWindow";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState('');
  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [total, setTotal] = useState(0);
  const [selecionado, setSelecionado] = useState(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((res) => res.json())
      .then((dados) => setTipos(dados.results))
      .catch((e) => console.error(e))
  }, [])

  useEffect(() => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    if (tipoSelecionado) {
      url = `https://pokeapi.co/api/v2/type/${tipoSelecionado}`
    }

    fetch(url)
      .then((res) => res.json())
      .then((dados) => {
        let lista

        if (tipoSelecionado) {
          lista = dados.pokemon.map((p) => p.pokemon)
          setTotal(lista.length)
          lista = lista.slice(offset, offset + 20);
        } else {
          lista = dados.results
          setTotal(dados.count)
        }

        return Promise.all(
          lista.map((item) => fetch(item.url).then((res) => res.json()))
        )
      })
      .then((detalhes) => setPokemons(detalhes))
      .catch((e) => console.error(e))
  }, [tipoSelecionado, offset])

  let termo = busca.toLowerCase().trim()
  let listaFiltrada = pokemons.filter((p) => {
    if (p.name.includes(termo)) return true;
    if (String(p.id) === termo) return true;
    return false;
  })

  function limpar() {
    setBusca('')
    if (tipoSelecionado) {
      setBusca('')
      setOffset(0)
    }
  }

  function mudarTipo(tipo) {
    setTipoSelecionado(tipo)
    setOffset(0)
  }

  let mensagem = ''
  if (listaFiltrada.length === 0) {
    mensagem = 'Nenhum Pokémon Encontrado.'
  }

  let ultimaPagina = Math.ceil((total / 20) - 1) * 20

  let inicio = pokemons.length === 0 ? 0 : offset + 1
  let fim = offset + pokemons.length

  return (
    <div className="container">

      <FilterWindow busca={busca} setBusca={setBusca} tipos={tipos} tipoSelecionado={tipoSelecionado} mudarTipo={mudarTipo} limpar={limpar} total={total} inicio={inicio} fim={fim} />

      {mensagem && (
        <div className="window">
          <div className="window-body" style={{ textAlign: 'center', padding: '16px' }}>
            <p>{mensagem}</p>
          </div>
        </div>
      )}

      <div className="grid">
        {listaFiltrada.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={setSelecionado} />
        ))}
      </div>

      <div className="window">
        <div className="window-body paginacao">
          <button disabled={offset === 0} onClick={() => setOffset(0)}>
            &laquo;&laquo; Primeira
          </button>

          <button disabled={offset === 0} onClick={() => setOffset(offset - 20)}>
            &laquo; Anterior
          </button>

          <span>Página {offset / 20 + 1}</span>

          <button disabled={offset + 20 >= total} onClick={() => setOffset(offset + 20)}>
            Próximo &raquo;
          </button>

          <button disabled={offset + 20 >= total} onClick={() => setOffset(ultimaPagina)}>
            Última &raquo;&raquo;
          </button>
        </div>
      </div>

      <PokemonModal pokemon={selecionado} fechar={() => setSelecionado(null)} />
    </div>
  )
}