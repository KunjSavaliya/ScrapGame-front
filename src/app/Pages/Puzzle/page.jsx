'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Carousel from '../../Components/Carousel'
import { useSearch } from '../../Components/SerchContext';
import { RiCloseLine } from 'react-icons/ri';
import 'animate.css';
function Puzzle() {
  const router = useRouter();
  const { isSearchVisible, setIsSearchVisible } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const handleImageClick = (game) => {
    const encodedTitle = encodeURIComponent(game.title);
    router.push(`/GameDescription?title=${encodedTitle}`);
  };
  const clearSearch = () => {
    setIsSearchVisible(false);
  };
  const filteredPhotos = [].filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const length = filteredPhotos?.length
  return (
    <div className="flex flex-col items-center justify-center p-5  mb-[17%]">
      {isSearchVisible && (
        <div className="relative w-full max-w-sm mb-4 sm:max-w-md md:max-w-lg lg:max-w-xl animate__animated animate__fadeInDown">
          <input
            type="text"
            placeholder="Search game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-[#69a2ff] p-2 pl-10 border border-[#ff56f8] focus:bg-none rounded-lg  focus:outline-none"
          />
          {isSearchVisible && (
            <RiCloseLine
              className="absolute text-[#ff56f8] transform -translate-y-1/2 cursor-pointer top-1/2 left-3"
              onClick={clearSearch}
            />
          )}
        </div>
      )}
      <Carousel />
      <div className="bg-[#69a2ff] p-2 grid grid-cols-3 gap-6 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-7 rounded-lg mb-3 border-white " style={{ boxShadow: "rgb(157 194 255) 0px 2px 4px, rgb(157 194 255) 0px 7px 13px -3px, rgb(157 194 255) 0px -2px 0px inset" }}>
        <h1 className="pl-4 text-2xl text-white font-lighter ">Puzzle</h1>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((item, index) => (
            <div
              className="relative group animate__animated animate__backInUp"
              key={item.id || index}
              onClick={() => handleImageClick(item)}
            >
              <div className="relative overflow-hidden rounded-[30px] w-36 h-36 cursor-pointer">
                <Image
                  src={item.img}
                  alt={item.title}
                  className="bg-cover rounded-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  width={500}
                  height={300}
                />
                <div
                  style={{ borderRadius: '30%' }}
                  className="absolute inset-x-0 bottom-0 flex items-center justify-center p-2 bg-opacity-80 bg-[#ff56f8] opacity-0 group-hover:opacity-100 animate__animated group-hover:animate__backInUp"
                >
                  <p className="text-lg text-white truncate font-lighter">{item.title}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2 text-center'>No game found</h1>
        )}
      </div>
      <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2 text-center'>{length === 0 && "No game found"}</h1>
    </div>
  );
}

export default Puzzle;
