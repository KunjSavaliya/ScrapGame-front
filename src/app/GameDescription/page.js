'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { AiFillSafetyCertificate, AiOutlineLoading } from "react-icons/ai";
import Carousel from '../Components/Carousel';
import GameSlider from '../Components/Slider.jsx';
import { useSearch } from '../Components/SerchContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameData, fetchGamesizeData, selectGameDetails } from '../Redux/gameDetailsSlice'; 
import { BiLoaderCircle } from 'react-icons/bi';

function GameDetails() {
  const searchParams = useSearchParams();
  const link = searchParams.get('pageLink');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setIsSearchVisible } = useSearch();
  const dispatch = useDispatch();
  const { gameData, gameSizeData } = useSelector(selectGameDetails);

  const ludoObject = {};
  gameData[0]?.description?.forEach((description, index) => {
    ludoObject[`description${index + 1}`] = description;
  });

  useEffect(() => {
    if (link) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false); // Stop loading after 20 seconds
      }, 20000); // 20 seconds

      const fetchData = async () => {
        try {
          await dispatch(fetchGameData(link)).unwrap();
          await dispatch(fetchGamesizeData(link)).unwrap();
        } catch (error) {
          console.error('Failed to fetch game data:', error);
        } finally {
          clearTimeout(timeoutId); // Clear timeout if data is fetched before 20 seconds
          setLoading(false); // Stop loading after fetching
        }
      };
      fetchData();
    }
  }, [link, dispatch]);

  const handleClick = () => router.push('/');

  const [isExpanded, setIsExpanded] = useState(false);
  const visibleDescriptions = isExpanded ? Object.values(ludoObject) : Object.values(ludoObject).slice(0, 10);

  const renderStars = (rating) => {
    const starCount = parseFloat(rating);
    if (isNaN(starCount) || starCount < 0) {
      return null;
    }

    const fullStars = Math.min(5, Math.max(0, Math.floor(starCount)));
    const halfStar = starCount % 1 >= 0.5 && fullStars < 5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">&#9733;</span>
        ))}
        {halfStar && <span className="text-yellow-500">&#9734;</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="text-gray-400">&#9734;</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-5">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <BiLoaderCircle className="text-6xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          <div className="w-full max-w-screen-lg">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <p className="text-gray-400 cursor-pointer" onClick={handleClick}>Home</p>
                <span className="font-light text-[#696969]"> {'>'} </span>
                <span className="font-light text-[#696969]">{gameSizeData?.name}</span>
              </div>
              <hr className="w-full mb-4 border-gray-300 border-t-1" />
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1 font-light text-[#696969]">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="relative w-[50%] h-auto overflow-hidden rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <Image
                      src={gameSizeData?.images?.[0]}
                      alt={gameSizeData?.name}
                      className="bg-cover rounded-lg"
                      layout="responsive"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      width={500}
                      height={300} />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-1">
                    <h1 className="text-2xl text-[#69a2ff] mb-4">{gameSizeData?.name}</h1>
                    <div className="flex gap-3 md:flex-row md:gap-6">
                      <div>
                        <h2 className="font-semibold">Developer</h2>
                        <p>{gameSizeData?.developer}</p>
                      </div>
                      <div>
                        <h2 className="font-semibold">Rating</h2>
                        {renderStars(gameSizeData?.rating)}
                      </div>
                      <div>
                        <h2 className="font-semibold">Reviews</h2>
                        <p>{gameSizeData?.reviews}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 cursor-pointer">
                <div className="p-4 text-white bg-black rounded-lg" onClick={() => { }}>
                  <h2 className="flex items-center gap-2">
                    <FaApple className="text-xl font-extrabold text-white" />
                    APK Download from App Store
                  </h2>
                </div>
                <div className="p-4 text-white bg-black rounded-lg" onClick={() => { }}>
                  <h2 className="flex items-center gap-2">
                    <IoLogoGooglePlaystore className="text-xl font-extrabold text-white" />
                    APK Download from Google Play
                  </h2>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base">
                <AiFillSafetyCertificate className="text-lg md:text-xl font-extrabold text-[#696969]" />
                All download links on this website jump to official platforms such as App Store and Google Play. No viruses, No malware.
              </h2>
            </div>
            <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2'>Description</h1>
            <hr className="w-full border-gray-300 border-t-1" />
            <div className="mt-2">
              {visibleDescriptions.map((description, index) => (
                <h2
                  className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-1"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: description }} />
              ))}
            </div>
            <button
              className="mt-2 text-blue-500"
              onClick={() => setIsExpanded(prev => !prev)}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2'>Screenshot</h1>
            <hr className="w-full border-gray-300 border-t-1" />
            <GameSlider />
          </div>
          <div className='mt-5'>
            <Carousel />
          </div>
        </>
      )}
    </div>
  );
}

export default function GameDescription() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <AiOutlineLoading className="text-4xl animate-spin" />
        </div>
      }
    >
      <GameDetails />
    </Suspense>
  );
}
