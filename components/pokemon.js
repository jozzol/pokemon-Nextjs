import react from "react";
import Image from 'next/image'
import Link from "next/link";

const Pokemon = ({pokemon, index}) => {
    const pokeIndex = ('000' + (index + 1)).slice(-3)
    // console.log(index)

    return(
        <Link  href={`/pokemon/${pokemon.name}`}>
        <a>
        <div className="bg-slate-200 rounded p-5 flex-col justify-center items-center relative">
            <Image 
            width={150}
            height={150}
            alt={pokemon.name}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`}
            />
            <span className="z-0 absolute text-5xl text-slate-900 top-0 right-3 font-bold">
                #{pokeIndex}
            </span>
            <span className="uppercase font-semibold tracking-wider text-black">

                {pokemon.name}
            </span>
        </div>
            </a>
        </Link>
    )
}

export default Pokemon;