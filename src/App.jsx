import { useEffect, useState } from "react";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState('');

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
      <label htmlFor="busca">busca por nome ou id</label>
      <input id="busca" type="text" value={busca} onChange={(e) => setBusca(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />

      {listaFiltrada.map((p) => (
        <div key={p.id}>
          <img src={p.sprites.front_default} alt="" />
          <p>#{p.id} {p.name}</p>
        </div>
      ))}
    </div>
  )
}