'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Carousel from '../Components/Carousel';
import { AiOutlineLoading } from 'react-icons/ai';
import GameSlider from '../Components/Slider.jsx'
import { useSearch } from '../Components/SerchContext';

function AppDetails() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const router = useRouter();
  const { isSearchVisible, setIsSearchVisible } = useSearch();
  if (isSearchVisible === true) {
    router.push('/')
  }
  const game = [].find((game) => game?.title === title);
  if (!game) {
    return <p>Game not found!</p>;
  }
  const handleClick = () => {
    router.push('/');
  };
  const handleAppStoreClick = () => {
    const userConfirmed = window.confirm("Are you sure you want to continue?");
    if (userConfirmed) {
      window.location.href = game.Appto;
    }
  };
  const handlePlayStoreClick = () => {
    const userConfirmed = window.confirm("Are you sure you want to continue?");
    if (userConfirmed) {
      window.location.href = game.Playto;
    }
  };
  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-full max-w-screen-lg">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <p className="text-gray-400 cursor-pointer" onClick={handleClick}>Home</p>
            <span className="font-light text-[#696969]"> {'>'} </span>
            <span className="font-light text-[#696969]">{game?.title}</span>
          </div>
          <hr className="w-full mb-4 border-gray-300 border-t-1" />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1 font-light text-[#696969]">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative w-[50%] h-auto overflow-hidden rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/4">
                <Image
                  src={game.img}
                  alt={game.title}
                  className="bg-cover rounded-lg"
                  layout="responsive"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  width={500}
                  height={300}
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-1">
                <h1 className="text-2xl text-[#69a2ff] mb-4">{game?.title}</h1>
                <div className="flex gap-3 md:flex-row md:gap-6">
                  <div>
                    <h2 className="font-semibold">File Size:</h2>
                    <p>{game?.fileSize}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Current Version:</h2>
                    <p>{game?.version}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Updated Time:</h2>
                    <p>{game?.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 cursor-pointer">
            <div className="p-4 text-white bg-black rounded-lg" onClick={handleAppStoreClick} >
              <h2 className="flex items-center gap-2">
                <FaApple className="text-xl font-extrabold text-white" />
                Get it from App Store
              </h2>
              <p>Link Provided by App Store</p>
            </div>
            <div className="p-4 text-white bg-black rounded-lg" onClick={handlePlayStoreClick}>
              <h2 className="flex items-center gap-2">
                <IoLogoGooglePlaystore className="text-xl font-extrabold text-white" />
                Get it from Google Play
              </h2>
              <p>Link Provided by Google Store</p>
            </div>
          </div>
        </div>
        <div className="mt-8 ">
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base">
            <AiFillSafetyCertificate className="text-lg md:text-xl font-extrabold text-[#696969]" />
            All download links on this website jump to official platforms such as App Store and Google Play. No viruses, No malware.
          </h2>
        </div>
        <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2'>Description</h1>
        <hr className="w-full border-gray-300 border-t-1" />
        <div className="mt-2 ">
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            {game?.description}
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            {game?.description1}
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            {game?.description2}
          </h2>
        </div>
        <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2'>Screenshot</h1>
        <hr className="w-full border-gray-300 border-t-1" />
        <GameSlider />
        <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2'>How To Play</h1>
        <hr className="w-full border-gray-300 border-t-1" />
        <div className="mt-2 ">
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            {game?.play}
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            {game?.play1}
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            {game?.play2}
          </h2>
        </div>
      </div>
      <div className='mt-5'>
        <Carousel />
      </div>
    </div>
  );
}
export default function AppDownload() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <AiOutlineLoading className="text-4xl animate-spin" />
        </div>
      }
    >
      <AppDetails />
    </Suspense>
  );
}
