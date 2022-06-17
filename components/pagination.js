import React from 'react'

export default function Pagination({pokePerPage, totalPoke, paginate}) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPoke / pokePerPage); i++){
        pageNumbers.push(i)
    }
  return (
    <nav>
        <ul className='mb-5 flex justify-center gap-0 cursor-pointer'>
            {pageNumbers.map(number =>(
                <li key={number} className='p-1 bg-slate-200' onClick={() => paginate(number)}>
                    <a onClick={() => paginate(number)}>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}
