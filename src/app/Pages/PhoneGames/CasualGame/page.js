'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSearch } from '../../../Components/SerchContext';
import { RiCloseLine } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi'; // Import BiSearch icon
import 'animate.css';
import { BiLoaderCircle } from 'react-icons/bi';
import Carousel from '../../../Components/Carousel';
import { fetchCasualGame } from '../../../Redux/PhoneGame/CasualGame';
import { FaStar } from 'react-icons/fa';

function CasualGame() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { CasualGame, loading, error } = useSelector((state) => state.CasualGame);
    const { isSearchVisible, setIsSearchVisible } = useSearch();
    const [searchQuery, setSearchQuery] = useState('');

    // Handle game card click
    const handleImageClick = (item) => {
        router.push(`/GameDescription?pageLink=${encodeURIComponent(item.link)}`);
    };

    const clearSearch = () => {
        setIsSearchVisible(false); 
        setSearchQuery(''); // Clear the search input when closing
    };

    useEffect(() => {
        dispatch(fetchCasualGame()); // Dispatch the action to fetch the game data
    }, [dispatch]);

    // Filter games to remove invalid data and apply search query filter
    const filteredGames = CasualGame?.data
        ?.filter((item) => item.title !== "No title available" && item.image !== "No image available")
        ?.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Group the games by their section
    const groupedGames = filteredGames?.reduce((acc, game) => {
        const section = game.section || 'Uncategorized'; // Default to 'Uncategorized' if no section
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(game);
        return acc;
    }, {});

    return (
        <div className="flex flex-col items-center justify-center p-5 mb-[17%]">
        {isSearchVisible && (
            <div className="relative w-full max-w-sm mb-4 sm:max-w-md md:max-w-lg lg:max-w-xl animate__animated animate__fadeInDown">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search game"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    className="w-full text-[#69a2ff] p-2 pl-10 border border-[#ff56f8] rounded-lg focus:outline-none"
                />
                
                {/* Search Icon */}
                <BiSearch 
                    className="absolute text-[#ff56f8] transform -translate-y-1/2 top-1/2 left-3 cursor-pointer" 
                />

                {/* Close Icon */}
                <RiCloseLine
                    className="absolute text-[#ff56f8] transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
                    onClick={clearSearch}
                />
            </div>
        )}
    
        <div className="bg-[#69a2ff] p-2 grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 rounded-lg mb-3 border-white" style={{ boxShadow: "rgb(157 194 255) 0px 2px 4px, rgb(157 194 255) 0px 7px 13px -3px, rgb(157 194 255) 0px -2px 0px inset" }}>
            <h1 className="pl-8 text-2xl text-white font-lighter">Phone</h1>
        </div>
    
        <div className="flex flex-col items-center justify-center p-5">
            <Carousel />
    
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
              <BiLoaderCircle className="text-6xl text-blue-500 animate-spin" />
              <p className='text-blue-500 '>Please Wait</p>
          </div>
            ) : error ? (
                <h1 className='mt-2 text-2xl text-center text-red-500'>{error}</h1>
            ) : (
                Object.keys(groupedGames).map((section) => (
                    <div key={section} className="w-full mb-6">
  <div className='bg-red-400 rounded-lg '>
                  <h2 className="ml-5 text-[22px] p-2 mb-2 text-white ">{section}</h2>
                </div>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2">
                            {groupedGames[section].map((item, index) => {
                                const validImageUrl = item.image || null;
    
                                return (
                                    <div
                                        className="flex flex-col items-center p-3 rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] md:flex-row group animate__animated animate__backInUp"
                                        key={item.title || index}
                                        onClick={() => handleImageClick(item)}
                                    >
                                        <div className="relative w-20 h-20 overflow-hidden cursor-pointer rounded-3xl">
                                            {validImageUrl ? (
                                                <Image
                                                    src={validImageUrl}
                                                    alt={item.title}
                                                    className="object-cover rounded-3xl"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-3xl">
                                                    <span className="text-gray-500">Image not available</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className='text-[#69a2ff]  sm:ml-4 truncate hidden md:flex md:flex-col '>
                                            <h1>{item?.title}</h1>
                                            <h1 className="flex items-center">
                                                <FaStar className="mb-1 mr-1 text-yellow-400" /> 
                                                {item?.rating}
                                            </h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
    );
}

export default CasualGame;
