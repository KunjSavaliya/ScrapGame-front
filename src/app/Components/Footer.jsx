
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
function Footer() {
    const router = useRouter();
    const handleNavigation = (path) => {
        router.push(path);
    };
    return (
        <>
            <div className="flex flex-col items-center p-5">
                <div className="w-full max-w-screen-lg">
                    <hr className="w-full mb-4 border-gray-300 border-t-1" />
                    <div className='flex gap-12 '>
                        <h1 className='font-light text-[#696969] cursor-pointer' onClick={() => handleNavigation('/Privacy/AboutUs')}>About Us</h1>
                        <h1 className='font-light text-[#696969] cursor-pointer' onClick={() => handleNavigation('/Privacy/Privacy')}>Privacy</h1>
                        <h1 className='font-light text-[#696969] cursor-pointer' onClick={() => handleNavigation('/Privacy/TermsOfUse')}>Terms of Use</h1>
                    </div>
                    <h1 className='font-light text-[#696969] mt-6'>Copyright © 2024 onlinegameforyou.com</h1>
                </div>
            </div>
        </>
    );
}

export default Footer;
