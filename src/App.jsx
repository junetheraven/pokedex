import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState('');
  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((res) => res.json())
      .then((dados) => setTipos(dados.results))
      .catch((e) => console.error(e))
  }, [])

  useEffect(() => {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20'
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
          lista = lista.slice(0, 20);
        } else {
          lista = dados.results
        }

        return Promise.all(
          lista.map((item) => fetch(item.url).then((res) => res.json()))
        )
      })
      .then((detalhes) => setPokemons(detalhes))
      .catch((e) => console.error(e))
  }, [tipoSelecionado])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((res) => res.json())
      .then((dados) =>
        Promise.all(
          dados.results.map((item) => fetch(item.url).then((res) => res.json()))
        )
      )
      .then((detalhes) => setPokemons(detalhes))
      .catch((e) => console.error(e))
  }, [])

  let termo = busca.toLowerCase().trim()
  let listaFiltrada = pokemons.filter((p) => {
    if (p.name.includes(termo)) return true;
    if (String(p.id) === termo) return true;
    return false;
  })

  return (
    <div>

      <select value={tipoSelecionado} onChange={(e) => setTipoSelecionado(e.target.value)} name="" id="">
        <option value="">Todos os tipos</option>
        {tipos.map((t) => (
          <option value={t.name} key={t.name} >{t.name}</option>
        ))}
      </select>

      {tipoSelecionado && <p>Total no tipo {tipoSelecionado}: {total} Pokémon(s)</p>}

      <br />

      <label htmlFor="busca">busca por nome ou id</label>
      <input id="busca" type="text" value={busca} onChange={(e) => setBusca(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} /> <br /><br /><br />

      <div className="grid">
        {listaFiltrada.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}