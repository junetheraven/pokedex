export default function PokemonModal({ pokemon, fechar }) {
    if (!pokemon) return null

    return (
        <div className="modal">
            <div className="window glass active">
                <div className="title-bar">
                    <div className="title-bar-text">
                        #{pokemon.id} — {pokemon.name}
                    </div>

                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close" onClick={fechar}></button>
                    </div>
                </div>

                <div className="window-body has-space">
                    <div className="detalhe-topo">
                        <img src={pokemon.sprites.front_default}alt="" />
                        <img src={pokemon.sprites.back_default}alt="" />
                    </div>

                    <div className="tipos" style={{ marginTop: '8px' }}>
                        {pokemon.types.map((t) => (
                            <span key={t.type.name} className={`tipo ${t.type.name}`}>
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    <fieldset style={{ marginTop: '10px' }}>
                        <legend>Informações</legend>
                        <div className="info">
                            <strong>Altura: </strong>
                            <span>{pokemon.height / 10} m</span>
                            <strong>Peso: </strong>
                            <span>{pokemon.weight / 10} kg</span>
                            <strong>Habilidades: </strong>
                            <span>{pokemon.abilities.map((a) => a.ability.name).join(', ')}</span>
                        </div>
                    </fieldset>

                    <fieldset style={{ marginTop: '10px' }}>
                        <legend>Estatística base</legend>
                        {pokemon.stats.map((s) => (
                            <div key={s.stat.name} className="stat">
                                <span>{s.stat.name}</span>
                                <div role="progressbar">
                                    <div style={{ width: `${(s.base_stat / 255) * 100}%` }}></div>
                                </div>
                                <span>{s.base_stat}</span>
                            </div>
                        ))}
                    </fieldset>
                </div>
            </div>
        </div>
    )
}