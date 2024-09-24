'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSearch } from '../../Components/SerchContext';
import { RiCloseLine } from 'react-icons/ri';
import 'animate.css';
import { BiLoaderCircle } from 'react-icons/bi';
import { fetchTabletGame } from '../../Redux/Tablet/Tablet';

function Tablet() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { TabletGame, loading, error } = useSelector((state) => state.TabletGame);

  const { isSearchVisible, setIsSearchVisible } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleImageClick = (item) => {
    router.push(`/GameDescription?pageLink=${encodeURIComponent(item.link)}`);
  };

  const clearSearch = () => {
    setIsSearchVisible(false);
  };

  useEffect(() => {
    dispatch(fetchTabletGame());
  }, [dispatch]);

  const filteredGames = TabletGame?.data?.filter((item) => 
    item.title !== "No title available" && 
    item.image !== "No image available" && 
    item.link !== "No link available"
  );

  const length = filteredGames?.length;
  
  // Group games by section
  const groupedGames = {};
  filteredGames?.forEach((game) => {
    const sectionKey = game.section; // Assuming section is part of the game object
    if (!groupedGames[sectionKey]) {
      groupedGames[sectionKey] = [];
    }
    groupedGames[sectionKey].push(game);
  });

  return (
    <div className="flex flex-col items-center justify-center p-5 mb-[17%]">
      {isSearchVisible && (
        <div className="relative w-full max-w-sm mb-4 sm:max-w-md md:max-w-lg lg:max-w-xl animate__animated animate__fadeInDown">
          <input
            type="text"
            placeholder="Search game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-[#69a2ff] p-2 pl-10 border border-[#ff56f8] focus:bg-none rounded-lg focus:outline-none"
          />
          {isSearchVisible && (
            <RiCloseLine
              className="absolute text-[#ff56f8] transform -translate-y-1/2 cursor-pointer top-1/2 left-3"
              onClick={clearSearch}
            />
          )}
        </div>
      )}

      <div className="bg-[#69a2ff] p-2 grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 rounded-lg mb-3 border-white" style={{ boxShadow: "rgb(157 194 255) 0px 2px 4px, rgb(157 194 255) 0px 7px 13px -3px, rgb(157 194 255) 0px -2px 0px inset" }}>
        <h1 className="pl-5 text-2xl text-white font-lighter">Tablet</h1>
      </div>

      <div className="flex flex-col items-center justify-center p-5">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <BiLoaderCircle className="text-6xl text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <h1 className='mt-2 text-2xl text-center text-red-500'>{error}</h1>
        ) : (
          <>
            {Object.keys(groupedGames).map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl text-[#69a2ff] mb-2">{section}</h2> {/* Display section title */}
                <h3 className="text-lg text-gray-700 mb-4">{groupedGames[section][0]?.sectionSubtitle || 'No subtitle available'}</h3> {/* Display section subtitle */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {groupedGames[section].map((item, index) => {
                    const validImageUrl = item.image || null;

                    return (
                      <div
                        className="relative group animate__animated animate__backInUp"
                        key={item.title || index}
                        onClick={() => handleImageClick(item)}
                      >
                        <div className="relative w-40 h-40 overflow-hidden cursor-pointer rounded-3xl">
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
                          <div
                            style={{ borderRadius: '25%' }}
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center p-2 bg-opacity-80 bg-[#ff56f8] opacity-0 group-hover:opacity-100 animate__animated group-hover:animate__backInUp"
                          >
                            <p className="text-lg text-white truncate font-lighter">{item.title}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2 text-center'>{length === 0 && "No game found"}</h1>
    </div>
  );
}

export default Tablet;
