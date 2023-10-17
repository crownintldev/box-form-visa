import React from 'react'
import Header from '../header/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='space-y-2'>
            <div className='w-10/12 mx-auto mt-10'>
                <Header />
            </div>
            <div className=' bg-gray-900 h-[2px] w-11/12 mx-auto'></div>
            <div className='w-10/12 mx-auto mt-10'>
                {children}
            </div>
        </div>
    )
}

export default Layout