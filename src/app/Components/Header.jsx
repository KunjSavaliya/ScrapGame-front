'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { HiMenu, HiX } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useSearch } from './SerchContext';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const router = useRouter();
  const { toggleSearch, setIsSearchVisible } = useSearch();
  const dropdownRef = useRef(null);

  const handleNavigation = (path) => {
    router.push(path);
    setIsSidebarOpen(false);
    setIsPhoneDropdownOpen(false);
    setIsSearchVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPhoneDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header>
      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 text-white transition-transform z-30 ${isSidebarOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden flex flex-col`}
      >
        <div className="absolute top-4 right-4">
          <HiX className="text-2xl cursor-pointer text-[#ff56f8]" onClick={toggleSidebar} />
        </div>
        <div className="flex items-center justify-center mt-4">
          <div className="w-[130px]">
            <Image src="/gamesforyou.png" alt="Logo" width={500} height={500} className="relative" priority />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 text-xl text-center cursor-pointer ">
          <p className="hover:bg-[#ff56f8] p-2 rounded-lg hover:text-white  transition-all duration-300" onClick={() => handleNavigation('/Pages/Windows')}>
            Windows
          </p>
          <p className="hover:bg-[#ff56f8] p-2 rounded-lg hover:text-white transition-all duration-300  " onClick={() => handleNavigation('/Pages/PhoneGames/Phone')}>
            Phone
          </p>
          <p className="hover:bg-[#ff56f8] p-2 rounded-lg hover:text-white transition-all duration-300" onClick={() => handleNavigation('/Pages/Tablet')}>
            Tablet
          </p>
          <p className="hover:bg-[#ff56f8] p-2 rounded-lg hover:text-white transition-all duration-300" onClick={() => handleNavigation('/Pages/TV')}>
            TV
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full p-5 text-black lg:justify-center lg:gap-8 lg:flex-row">
        <div className="top-5 left-5 lg:hidden">
          <HiMenu className="text-2xl cursor-pointer text-[#ff56f8]" onClick={toggleSidebar} />
        </div>
        <div className="flex-shrink-0 w-[130px] lg:w-[180px] cursor-pointer" onClick={() => handleNavigation('/')}>
          <Image src="/gamesforyou.png" alt="Description of the image" width={500} height={500} className="relative" priority />
        </div>
        <div className="hidden gap-10 text-2xl cursor-pointer text-[#69a2ff] lg:flex">
          <p className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300" onClick={() => handleNavigation('/Pages/Windows')}>
            Windows
          </p>
          <p className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300 flex items-center cursor-pointer" onClick={() => handleNavigation('/Pages/PhoneGames/Phone')}>
            Phone
          </p>
          <p className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300" onClick={() => handleNavigation('/Pages/Tablet')}>
            Tablet
          </p>
          <p className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300" onClick={() => handleNavigation('/Pages/TV')}>
            TV
          </p>
        </div>
        <div className="text-xl lg:mr-8">
          <PiMagnifyingGlass className="text-2xl text-[#ff56f8] cursor-pointer" onClick={toggleSearch} />
        </div>
      </div>
    </header>
  );
}

export default Header;
