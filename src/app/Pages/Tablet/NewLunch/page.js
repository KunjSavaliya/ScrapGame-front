'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseLine } from 'react-icons/ri';
import 'animate.css';
import { BiLoaderCircle } from 'react-icons/bi';
import { fetchNewLaunchGame } from '../../../Redux/Tablet/Tablet';

function NewLunch({ filteredGames }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { NewLaunchGame, loading, error } = useSelector((state) => state.TabletGame);

    const handleImageClick = (item) => {
        router.push(`/GameDescription?pageLink=${encodeURIComponent(item.link)}`);
    };
    console.log("filteredGames", filteredGames);

    useEffect(() => {
        dispatch(fetchNewLaunchGame());
    }, [dispatch]);

    const filteredGamess = NewLaunchGame?.data?.filter((item) =>
        item.title.toLowerCase().includes(filteredGames?.toLowerCase()) &&
        item.title !== "No title available" &&
        item.image !== "No image available"
    );
    const length = filteredGamess?.length;

    return (

        <div className="flex flex-col items-center justify-center p-5 ">
            {
                loading ?
                    '' :
                    <>
                        {length === 0 ?
                            '' :

                            <div className="grid grid-cols-1 gap-6 p-2 mb-3 bg-red-400 rounded-lg pr-28 border-whitespace-normal sm:pr-20 md:pr-28 lg:pr-60 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 " >
                                <h1 className="  ml-5 text-[22px] text-center text-white font-lighter">Newly launched </h1>
                            </div>
                        }
                    </>
            }

            <div className="flex flex-col items-center justify-center">

                <>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {filteredGamess?.length > 0 ? (
                            filteredGamess?.map((item, index) => {
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
                            <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2 text-center'></h1>
                        )}
                    </div>
                </>
            </div>
        </div>
    );
}

export default NewLunch;
