import { useState } from "react";

const API_KEY = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  async function HandleGetPokemons() {
    const res = await fetch(API_KEY);
    const data = await res.json();
    const pokemonsData = data.results.map((pokemon) =>
      getFullData(pokemon.url)
    );
    const pokemonsList = await Promise.all(pokemonsData);
    setPokemons(pokemonsList);
  }
  async function getFullData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  function handlePokemonSelected(pokemon) {
    setSelectedPokemon(pokemon);
  }

  return (
    <div className="App">
      {pokemons.length > 0 ? (
        <div className="pokedex">
          <PokemonsList
            pokemons={pokemons}
            onPokemonSelection={handlePokemonSelected}
          />
          <PokmeonDisplay pokemon={selectedPokemon} />
        </div>
      ) : (
        <button onClick={HandleGetPokemons}>
          <span>Get Pokemons</span>
        </button>
      )}
    </div>
  );
}

function PokemonsList({ pokemons, onPokemonSelection }) {
  return (
    <ul className="pokemon-list">
      {pokemons.map((pokemon, i) => (
        <Pokemon
          pokemon={pokemon}
          key={i}
          onPokemonSelection={onPokemonSelection}
        />
      ))}
    </ul>
  );
}

function Pokemon({ pokemon, onPokemonSelection }) {
  const type = pokemon.types[0].type.name;
  return (
    <li className={type} onClick={() => onPokemonSelection(pokemon)}>
      <span className="img-box">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </span>
      <span>{pokemon.name}</span>
    </li>
  );
}

function PokmeonDisplay({ pokemon }) {
  if (!pokemon) return <p>Select Pokemon from the list</p>;
  const type = pokemon.types[0].type.name;

  console.log(pokemon);
  return (
    <div className="pokmeon-display">
      <header className={type}>
        <h2>
          <span>{pokemon.id} </span>
          {pokemon.name}
        </h2>
        <ul></ul>
        <img
          className="header-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </header>
      <div className="pokemon-data">
        <ul className="types">
          {pokemon.types.map((type) => (
            <PokemonType type={type} />
          ))}
        </ul>
        <div className="height-weight">
          <p>
            <span className="stat-num">{pokemon.weight / 10}</span>
            <span>KG</span>
          </p>
          <p>
            <span className="stat-num">{pokemon.height / 10}</span>
            <span>m</span>
          </p>
        </div>
        <ul className="stats">
          {pokemon.stats.map((stat) => (
            <PokemonStat stat={stat} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function PokemonStat({ stat }) {
  return (
    <li>
      <span className="stat-num">{stat.base_stat}</span>
      <span className="stat-title">{stat.stat.name}</span>
    </li>
  );
}
function PokemonType({ type }) {
  return (
    <li className={`lable ${type.type.name}`}>
      <span>{type.type.name} </span>
    </li>
  );
}
