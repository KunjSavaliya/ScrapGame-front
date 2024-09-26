import { useState, useEffect } from 'react';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

import { useRouter } from 'next/navigation';
import { useSearch } from './SerchContext';
import { fetchGames } from '../Redux/gamesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCasualGame } from '../Redux/PhoneGame/CasualGame';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const { isSearchVisible, setIsSearchVisible } = useSearch();
  const dispatch = useDispatch();

  const router = useRouter();
  const { CasualGame, loading, error } = useSelector((state) => state.CasualGame);

  useEffect(() => {
    dispatch(fetchCasualGame());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(5);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(7);
      } else {
        setItemsPerPage(10);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredGames = CasualGame?.data?.filter((item) => 
    item.title !== "No title available" && 
    item.image !== "No image available" && 
    item.link !== "No link available"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const totalItems = filteredGames?.length || 0;
        return (prevIndex + 1) % Math.ceil(totalItems / itemsPerPage);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredGames, itemsPerPage]);

  const handleImageClick = (item) => {
    router.push(`/GameDescription?pageLink=${encodeURIComponent(item.link)}`);
  };

  return (
    <div className="relative mb-6">
      <div className="relative grid grid-cols-3 gap-4 transition-transform duration-500 ease-in-out sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
        {filteredGames?.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage).map((game, index) => (
          <div key={index} className="flex-shrink-0 w-full" onClick={() => handleImageClick(game)}>
            <div className="relative overflow-hidden rounded-[20px] w-[70px] h-[70px] cursor-pointer">
              <Image
                src={game.image}
                alt={game.title}
                className="object-cover w-full h-full rounded-lg"
                width={100}
                height={100}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center p-2 bg-opacity-80 bg-[#ff56f8] opacity-0 group-hover:opacity-100 animate__animated group-hover:animate__backInUp">
                <p className="text-sm text-white truncate font-lighter">{game.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="px-4 py-2 text-[#69a2ff] rounded-full focus:outline-none"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(filteredGames.length / itemsPerPage) - 1 : prevIndex - 1))
          }
        >
          &#9664;
        </button>
      </div>
      <div className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="px-4 py-2 text-[#69a2ff] rounded-full focus:outline-none"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(filteredGames.length / itemsPerPage))
          }
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
