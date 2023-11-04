import React from 'react'
import Image from 'next/image'
const Header = () => {
    return (
        <div className='flex justify-between'>
            <h1 className='italic text-[10px]  font-bold'>
                VISA APPLICATION FORM
            </h1>
            <div className='font-bold text-center flex flex-col items-center justify-center'>
                <Image src={"/eagle.jpeg"}
                    className='h-12 w-20'
                    width={18}
                    height={10}
                    alt='eagle'
                />
                <div className='text-[9px]'>
                    <p>EMBASSY OF THE REPUBLIC OF INDONESIA</p>
                    <p>ISLAMABAD-PAKISTAN</p>
                </div>
            </div>
            <div className='text-[7px]'>
                <p className='space-x-1'>
                    <span>Phone</span>
                    <span>:92(51) 2832017-20</span>
                </p>
                <p className='space-x-1'>
                    <span>Fax</span>
                    <span>:92(51) 2832017-20</span>
                </p>
                <p className='space-x-1'>
                    <span>Web</span>
                    <span>:https://kemiu.go.id/islamabad</span>
                </p>
                <p className='space-x-1'>
                    <span>Email</span>
                    <span>:info@indonesian-embassy.pk</span>
                </p>
                <p className='space-x-1'>
                    <span>Address</span>
                    <span>:Diplomatic Enclave I, Street 5 <br /> G-5, Islamabad</span>
                </p>
            </div>
        </div>
    )
}

export default Header