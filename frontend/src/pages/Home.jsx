import { useState, useEffect, useRef } from "react";
import api from "src/utils/api";
import NavBar from "src/components/NavBar";
import PropertyCards from "src/components/PropertyCards";
import { FullRoomCard} from "src/components/RoomCard";
import Search from "src/components/Search";
import Footer from "src/components/Footer";
import Pagination from "src/components/PaginationButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const limit = 9;

  const fetchRooms = async (pageNumber = 1) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const res = await api.get(`room/?limit=${limit}&offset=${offset}`);
      setRentals(res.data.results);
      setCount(res.data.count);
      setPage(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show full section only when near the top (within 100px)
      if (currentScrollY < 100) {
        setIsSearchCollapsed(false);
      }
      // Collapse when user scrolls down
      else {
        setIsSearchCollapsed(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isSearchCollapsed]);



  return (
    <div className="w-full flex flex-col bg-gray-200 overflow-x-hidden">
      <NavBar />
      <section className={`fixed top-0 z-10 w-full shadow px-10 flex flex-col text-center bg-white transition-all duration-500 ease-in-out ${
        isSearchCollapsed ? "pt-23 pb-10" : "pt-30 pb-10"
      }`}>
        {!isSearchCollapsed && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-2">Search Destinations</h1>
            <p className="text-sm text-gray-500 mb-5">
              Discover our hand picked of the best rentals in Lucena City.
            </p>
          </div>
        )}
          <Search isSearchCollapsed={isSearchCollapsed} />
      </section>
      <section className=" w-full pt-90 pb-30 px-10 flex flex-col items-center bg-white">
        <h1 className="w-full text-2xl font-bold mb-2 text-start lg:ml-30">
          Available Rentals
        </h1>

        <div className="w-full xl:w-4/5 grid p-5 gap-6 mb-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          {rentals.map((data) => (
            <FullRoomCard
              key={data.room_id}
              image={data.room_picture}
              name={data.name}
              address={data.address}
              aircon={data.air_condition}
              comfortroom={data.comfort_room}
              internet={data.internet}
              price={data.price}
              dataID={data.id}
            />
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <Pagination
            count={count}
            limit={limit}
            page={page}
            onPageChange={fetchRooms}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
