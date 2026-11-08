export default function FilterWindow({ busca, setBusca, tipos, tipoSelecionado, mudarTipo, limpar, total, inicio, fim }) {
    return (
        <div className="window glass active">
            <div className="title-bar">
                <div className="title-bar-text">Pokédex</div>

                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>

            <div className="window-body has-space">
                <div className="filter">
                    <div className="campo">
                        <label htmlFor="busca">Busca por nome ou ID:</label>

                        <input type="text" id="busca" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="ex.: pikachu, 25" style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>

                    <div className="campo">
                        <label htmlFor="tipo">Filtrar por tipo: </label>

                        <select name="" id="tipo" value={tipoSelecionado} onChange={(e) => mudarTipo(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }}>
                            <option value="">Todos</option>

                            {tipos.map((t) => (
                                <option value={t.name} key={t.name} >{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <button onClick={limpar}>Limpar filtro</button>
                </div>

                <p style={{ marginTop: '8px', fontSize: '12px' }}>
                    {tipoSelecionado
                        ? <>
                            Tipo <strong>{tipoSelecionado}</strong>: {total} Pokémon(s).
                        </> : <>
                            Exibindo {inicio} a {fim} de {total} Pokémons.
                        </>}
                </p>
            </div>
        </div>
    )
}