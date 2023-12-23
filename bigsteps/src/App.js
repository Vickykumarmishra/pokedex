import React, { useEffect, useState, useRef, useCallback } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
import "./App.css";
function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState("https://pokeapi.co/api/v2/pokemon?limit=50");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const observer = useRef();

  const getAllPokemons = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const res = await fetch(loadPoke);
    const data = await res.json();

    setLoadPoke(data.next);

    const newPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return res.json();
      })
    );

    setAllPokemons((currentList) => [...currentList, ...newPokemons]);
    setIsLoading(false);
  };

  const loadMorePokemons = useCallback(() => {
    getAllPokemons();
  }, []);

  const lastPokemonRef = useRef();

  useEffect(() => {
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMorePokemons();
      }
    }, options);

    if (lastPokemonRef.current) {
      observer.current.observe(lastPokemonRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [lastPokemonRef, loadMorePokemons]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMorePokemons();
      }
    }, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadMorePokemons]);

  const filteredPokemons = allPokemons.filter((pokemon) => {
    const matchesSearchTerm =
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(pokemon.id).includes(searchTerm);

    return matchesSearchTerm;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
   <center> <div className="container">
      <center>
        
        <h1 style={{color:'white',borderColor:'red',textDecorationColor:"red"}}>Pokedex website</h1>
      
       <center> <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{borderRadius:"1rem",borderColor:'red'}}
        /></center>
      </center>

      <div className="pokemon-container">
        <div className="all-container">
          {filteredPokemons.map((pokemon, index) => {
            const isLast = index === filteredPokemons.length - 1;
            const ref = isLast ? lastPokemonRef : null;

            return (
              <div key={index} ref={ref}>
                
                <PokemonThumbnail
                
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                  height={pokemon.height}
                  weight={pokemon.weight}
                  stat1={pokemon.stats[0].stat.name}
                  stat2={pokemon.stats[1].stat.name}
                  stat3={pokemon.stats[2].stat.name}
                  stat4={pokemon.stats[3].stat.name}
                  stat5={pokemon.stats[4].stat.name}
                  stat6={pokemon.stats[5].stat.name}
                  bs1={pokemon.stats[0].base_stat}
                  bs2={pokemon.stats[1].base_stat}
                  bs3={pokemon.stats[2].base_stat}
                  bs4={pokemon.stats[3].base_stat}
                  bs5={pokemon.stats[4].base_stat}
                  bs6={pokemon.stats[5].base_stat}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div></center>
  );
}

export default App;
