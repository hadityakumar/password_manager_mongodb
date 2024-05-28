import React from 'react'

const Footer = () => {
    return (
        <div className='flex bg-slate-800 text-white items-center justify-between fixed w-full bottom-0 md:px-20'>
            <ul className='flex'>
                <li className='logo font-bold text-green-500 text-xl'>&lt;</li>
                <li className='logo font-bold text-white text-xl'>Pass</li>
                <li className='logo font-bold  text-green-500 text-xl'>OP/&gt;</li>
            </ul>

            <span className=''>Created by hadityakumar</span>

        </div>
    )
}

export default Footer