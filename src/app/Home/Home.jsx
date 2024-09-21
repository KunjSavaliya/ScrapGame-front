'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../Redux/gamesSlice';
import Carousel from '../Components/Carousel';
import 'animate.css';
import Image from 'next/image';
import { BiLoaderCircle } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const HomeGames = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { games, loading, error } = useSelector((state) => state.games);
  
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleImageClick = (item) => {
    router.push(`/GameDescription?pageLink=${encodeURIComponent(item.link)}`);
  };

  // Filter out entries with default values
  const filteredGames = games?.data?.filter((item) => 
    item.title !== "No title available" && 
    item.image !== "No image available" && 
    item.link !== "No link available"
  );

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <Carousel />
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <BiLoaderCircle className="text-6xl text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <h1 className='mt-2 text-2xl text-center text-red-500'>{error}</h1>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredGames?.length > 0 ? (
            filteredGames.map((item, index) => {
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
            })
          ) : (
            <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2 text-center'>No games found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeGames;
