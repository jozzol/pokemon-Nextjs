import Layout from "../components/Layout";
import { useState } from "react";
import Pokemon from "../components/pokemon";
import Pagination from "../components/pagination";


export default function Home({initPokemon}) {

    const [pokemon, setPokemon] = useState(initPokemon);
    const [allPokemon] = useState(initPokemon)
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage, setPokePerPage] = useState(20);
    const [name, setName] = useState('')

    // console.log(initPokemon)
    const fetchPokemon = async(url, next) =>{
        const response = await fetch(url)
        const nextPokemon = await response.json()
        
        setOffset(next? offset + 150: offset - 150)
        setPokemon(nextPokemon)
    }
    
    const indexOfLastPoke = currentPage * pokePerPage;
    const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
    const currentPoke = pokemon.results? pokemon.results.slice(indexOfFirstPoke, indexOfLastPoke): [];
    // console.log(currentPoke)
    // console.log(currentPage)
    // console.log(pokePerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    function handleInputChange(e){
        // console.log(allPokemon)
        e.preventDefault()
        setName(e.target.value)
        // console.log(name)

    }

    function handleSubmit(e){
        setPokemon(allPokemon.results.filter((p) => p.name == name))
        console.log(pokemon)
    }

    return (
        <Layout title={'Pokedex'}>
            <div>
                <input
                    type = 'text'
                    placeholder="Search pokemon..."
                    onChange={(e) => handleInputChange(e)}
                />
                <button type='submit' onClick={(e) => handleSubmit(name)}>Search</button>
            </div>
            <div className="mt-5 flex justify-center gap-2">
                <button disabled={!pokemon.previous} className="disabled:bg-gray-500 p-1 bg-slate-200 h-8" onClick={() => fetchPokemon(pokemon.previous, false)}>prev 150</button>
                <Pagination pokePerPage={pokePerPage} totalPoke={pokemon.results? pokemon.results.length: 0} paginate={paginate} />
                <button disabled={!pokemon.next} className="disabled:bg-gray-500 p-1 bg-slate-200 h-8" onClick={() => fetchPokemon(pokemon.next, true)}>next 150</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {currentPoke.map((p, index) => (
                    <Pokemon key={index} pokemon={p} index={index + (currentPage - 1) * pokePerPage + offset}/>
                ))}
            </div>

            

        </Layout>
    )
}

export async function getStaticProps(context) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=905")
    const initPokemon = await response.json()

    return {
        props:{
            initPokemon
        }
    }
}