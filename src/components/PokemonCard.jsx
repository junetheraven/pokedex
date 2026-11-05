export default function PokemonCard({ pokemon, onClick }) {
    return (
        <div className="card" onClick={() => onClick(pokemon)}>
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">#{pokemon.id}</div>
                </div>

                <div className="window-body" style={{ textAlign: 'center', margin: '8px' }}>
                    <img src={pokemon.sprites.front_default} alt="" />
                    <h4 style={{ margin: '4px 0', textTransform: 'capitalize', fontSize: '13px' }}>
                        {pokemon.name}
                    </h4>

                    <div className="tipos">
                        {pokemon.types.map((t) => (
                            <span key={t.type.name} className={`tipo ${t.type.name}`}>
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}