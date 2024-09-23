'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from 'react-icons/hi'; // Import the dropdown icon
import { useRouter } from 'next/navigation';
import { useSearch } from './SerchContext';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false); // For dropdown state
  const router = useRouter();
  const { isSearchVisible, toggleSearch, setIsSearchVisible } = useSearch(); // Use the context
  const dropdownRef = useRef(null); // Reference to the dropdown

  const handleNavigation = (path) => {
    router.push(path);
    setIsSidebarOpen(false);
    setIsPhoneDropdownOpen(false); // Close dropdown after navigation
    setIsSearchVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const togglePhoneDropdown = () => {
    setIsPhoneDropdownOpen(!isPhoneDropdownOpen); // Toggle dropdown
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPhoneDropdownOpen(false); // Close dropdown if clicked outside
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

          {/* Dropdown for "Phone" in mobile view */}
          <div ref={dropdownRef} className="w-full text-center">
            <div
              className="py-2 flex items-center justify-center cursor-pointer hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300"
              onClick={togglePhoneDropdown}
            >
              <span>Phone</span>
            {isPhoneDropdownOpen ?<HiChevronDown className="ml-2 text-xl" /> :<HiChevronUp className="ml-2 text-xl" /> }
            </div>
            {isPhoneDropdownOpen && (
              <div className="z-10 flex flex-col items-center mt-2 space-y-2">
                <p
                  className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer text-[#69a2ff] hover:text-white transition-all duration-300"
                  onClick={() => handleNavigation('/Pages/Phone/Android')}
                >
                  Android
                </p>
                <p
                  className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer text-[#69a2ff] hover:text-white transition-all duration-300"
                  onClick={() => handleNavigation('/Pages/Phone/iOS')}
                >
                  iOS
                </p>
                <p
                  className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer text-[#69a2ff] hover:text-white transition-all duration-300"
                  onClick={() => handleNavigation('/Pages/Phone/WindowsPhone')}
                >
                  Windows Phone
                </p>
                <p
                  className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer text-[#69a2ff] hover:text-white transition-all duration-300"
                  onClick={() => handleNavigation('/Pages/Phone/Blackberry')}
                >
                  Blackberry
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header for larger screens */}
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
              onClick={() => handleNavigation('/Pages/Windows')}
            >
              Windows
            </p>

            {/* Phone menu with dropdown and icon */}
            <div ref={dropdownRef} className="relative">
              <p
                className="hover:bg-[#ff56f8] p-1 rounded-lg hover:text-white transition-all duration-300 flex items-center cursor-pointer"
                onClick={togglePhoneDropdown}
              >
                Phone
                {isPhoneDropdownOpen ?<HiChevronDown className="ml-2 text-xl" /> :<HiChevronUp className="ml-2 text-xl" /> }

              </p>
              {/* Dropdown */}
              {isPhoneDropdownOpen && (
                <div className="absolute z-10 w-40 py-2 mt-1  text-[17px]  text-[#69a2ff] bg-white rounded-lg shadow-lg">
                  <p 
                    className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer  hover:text-white transition-all duration-300"
                    onClick={() => handleNavigation('/Pages/PhoneGames/TopFree')} 
                  >
                    Top free
                  </p>
                  <p
                    className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer  hover:text-white transition-all duration-300"
                    onClick={() => handleNavigation('/Pages/Phone/iOS')}
                  >
                    Top grossing
                  </p>
                  <p
                    className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer  hover:text-white transition-all duration-300"
                    onClick={() => handleNavigation('/Pages/Phone/WindowsPhone')}
                  >
                   Top paid
                  </p>
                  <p
                    className="hover:bg-[#ff56f8] px-4 py-2 cursor-pointer  hover:text-white transition-all duration-300"
                    onClick={() => handleNavigation('/Pages/Phone/Blackberry')}
                  >
                    Blackberry
                  </p>
                </div>
              )}
            </div>

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
          </div>
        </div>
        <div className="text-xl lg:mr-8">
          <PiMagnifyingGlass className="text-2xl text-[#ff56f8] cursor-pointer" onClick={toggleSearch} />
        </div>
      </div>
    </header>
  );
}

export default Header;
