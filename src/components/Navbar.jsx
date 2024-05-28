import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between px-10 md:px-20 py-5 items-center h-16 fixed top-0 w-full z-50 shadow-2xl'>
        <ul className='flex '>
            <li className='logo font-bold text-green-500 text-3xl'>&lt;</li>
            <li className='logo font-bold text-white text-3xl'>Pass</li>
            <li className='logo font-bold  text-green-500 text-3xl'>OP/&gt;</li>
        </ul>


      <button className='text-white flex items-center gap-1 md:gap-3 bg-green-800 md:p-2 rounded-full shadow-lg' onClick={() => window.location.href = 'https://github.com/hadityakumar'}>
      <img className='md:w-8 w-4 cursor-pointer' src="github.png" alt="" />
      <span className='font-bold'>
      Github
      </span>
      
      </button>
      
      
    </nav>
  )
}

export default Navbar