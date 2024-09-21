'use client'; // Required for client-side hooks in the App Router

import React, { Suspense } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

function AboutUs() { // Get the title from the URL
  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-full max-w-screen-lg">
        <h1 className='text-5xl mt-2 text-[#69a2ff] mb-2'>About Us</h1>
        <hr className="w-full border-gray-300 border-t-1" />
        <div className="mt-2 ">
        <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base">
  Welcome to onlinegameforyou, your go-to platform for safe and reliable game downloads. We offer a vast collection of top-rated games across multiple genres, including action, adventure, puzzles, and more. At onlinegameforyou, we prioritize your safety and gaming experience by providing direct download links from trusted sources like the App Store and Google Play, ensuring all downloads are secure and free from malware. Our mission is to connect gamers worldwide with the best games, offering seamless downloads and the latest updates. Beyond downloading, we foster a community of passionate gamers who share tips, experiences, and the joy of gaming. Whether you&apos;re a casual player or a dedicated gamer, you&apos;ll find your next favorite game here. Explore, download, and start playing today with onlinegameforyou!
</h2>

          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base">
  Welcome to onlinegameforyou, your go-to platform for safe and reliable game downloads. We offer a vast collection of top-rated games across multiple genres, including action, adventure, puzzles, and more. At onlinegameforyou, we prioritize your safety and gaming experience by providing direct download links from trusted sources like the App Store and Google Play, ensuring all downloads are secure and free from malware. Our mission is to connect gamers worldwide with the best games, offering seamless downloads and the latest updates. Beyond downloading, we foster a community of passionate gamers who share tips, experiences, and the joy of gaming. Whether you&apos;re a casual player or a dedicated gamer, you&apos;ll find your next favorite game here. Explore, download, and start playing today with onlinegameforyou!
</h2>


            <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
            At onlinegameforyou, we go beyond just downloading games—we’re creating a hub where gamers can come together to discover new titles, share insights, and stay connected with the gaming community. Our user-friendly platform makes it easy to browse, download, and dive into your favorite games without hassle. Whether you’re looking to pass time with a quick mobile game or immerse yourself in a deep gaming experience, onlinegameforyou is here to be your one-stop destination for all things gaming. Join our growing community and experience gaming like never before!
              </h2>
        </div>
      </div>
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
      <AboutUs />
    </Suspense>
  );
}
