'use client';

import React from 'react';
import Image from 'next/image';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { HiMenu, HiX } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useSearch } from './SerchContext';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const router = useRouter();
  const { isSearchVisible, toggleSearch, setIsSearchVisible } = useSearch(); // Use the context
  const handleNavigation = (path) => {
    router.push(path);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    setIsSearchVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <div
        className={`fixed top-0 z-30 left-0 w-full h-[50%] bg-gray-800 text-white transition-transform ${isSidebarOpen ? 'translate-y-0' : '-translate-y-full'
          } lg:hidden flex flex-col`}
      >
        <div className="absolute top-4 right-4">
          <HiX className="text-2xl cursor-pointer text-[#ff56f8]" onClick={toggleSidebar} />
        </div>
        <div className="flex items-center justify-center mt-4">
          <div className="w-[130px]">
            <Image
              src="/gamesforyou.png"
              alt="Logo"
              width={500}
              height={500}
              className="relative"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 space-y-3 cursor-pointer">
          <p
            className="py-2 cursor-pointer hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
            onClick={() => handleNavigation('/Pages/Action')}
          >
            Action
          </p>
          <p
            className="py-2 cursor-pointer hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
            onClick={() => handleNavigation('/Pages/Adventure')}
          >
            Adventure
          </p>
          <p
            className="py-2 cursor-pointer hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
            onClick={() => handleNavigation('/Pages/Card')}
          >
            Card
          </p>
          <p
            className="py-2 cursor-pointer hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
            onClick={() => handleNavigation('/Pages/Racing')}
          >
            Racing
          </p>
          <p
            className="py-2 cursor-pointer hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
            onClick={() => handleNavigation('/Pages/Puzzle')}
          >
            Puzzle
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between lg:justify-center lg:gap-8 w-[100%] lg:w-full p-5 text-black lg:flex-row">
        <div className="top-5 left-5 lg:hidden">
          <HiMenu className="text-2xl cursor-pointer text-[#ff56f8]" onClick={toggleSidebar} />
        </div>
        <div className="flex-shrink-0 w-[130px] lg:w-[180px] cursor-pointer" onClick={() => handleNavigation('/')}>
          <Image
            src="/gamesforyou.png"
            alt="Description of the image"
            width={500}
            height={500}
            className="relative"
            priority
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-[#69a2ff] lg:space-x-5 mt-4 lg:mt-0">
          <div className="hidden gap-10 text-2xl cursor-pointer lg:flex">
            <p
              className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
              onClick={() => handleNavigation('/Pages/Action')}
            >
              Action
            </p>
            <p
              className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
              onClick={() => handleNavigation('/Pages/Adventure')}
            >
              Adventure
            </p>
            <p
              className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
              onClick={() => handleNavigation('/Pages/Card')}
            >
              Card
            </p>
            <p
              className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
              onClick={() => handleNavigation('/Pages/Racing')}
            >
              Racing
            </p>
            <p
              className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
              onClick={() => handleNavigation('/Pages/Puzzle')}
            >
              Puzzle
            </p>
          </div>
          <div className="flex items-center justify-center bg-[#ff56f8] rounded-full p-2 cursor-pointer lg:mt-[-2px] mt-[-15px]" onClick={toggleSearch}>
            <PiMagnifyingGlass className="text-xl font-extrabold text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
