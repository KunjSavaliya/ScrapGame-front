import React, { useEffect } from 'react';
import Image from 'next/image';
import "../globals.css";
import { useSearchParams } from 'next/navigation';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const GameSlider = () => {
  const searchParams = useSearchParams();
  const link = searchParams.get('pageLink');
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (link) {
      dispatch(fetchGameDetails(link));
    }
  }, [link, dispatch]); 

  
  return (
    <div className="relative w-full max-w-6xl mx-auto my-8">
      {loading ? ( 
        <div className="flex flex-col items-center justify-center h-64">
        <BiLoaderCircle className="text-6xl text-blue-500 animate-spin" />
        <p className='text-blue-500 '>Please Wait</p>
    </div>
      ) : (
        <div className="flex py-4 space-x-4 overflow-x-scroll cursor-pointer custom-scrollbar">
          {[]?.map((src, index) => {
            // Check if the src is a valid URL
            const isValidImageUrl = src && !src.includes("No screenshots available") && 
                                     (src.startsWith("http://") || src.startsWith("https://"));

            return isValidImageUrl ? (
              <div
                key={index}
                className="min-w-[250px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[280px] xl:min-w-[300px]"
              >
                <Image
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  className="bg-cover rounded-lg" 
                  width={500}
                  height={300}
                />
              </div>
            ) : null; // Render nothing if the URL is invalid
          })}
        </div>
      )}
    </div>
  );
};

export default GameSlider;
