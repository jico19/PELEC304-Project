import { useState, useEffect } from "react";
import api from "src/utils/api";
import Maps from "src/components/Maps";
import NavBar from "src/components/NavBar";
import PropertyCards from "src/components/PropertyCards";
import { FullRoomCard } from "src/components/RoomCard";
import Search from "src/components/Search";
import Footer from "src/components/Footer";

const Home = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const caller = async () => {
      try {
        const res = await api.get("room/");
        setRentals(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    caller();
  }, []);

  const RentNowHandler = async (room_id) => {
    try {
      const res = await api.post("transaction/", { room: room_id });
      console.log(res.data);
      console.log("Successfuly rented a room!");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-200">
      <NavBar />
      {/* <h1>This is Home!</h1>
            <h1>!!notes!! dapat andito yung maps tas parang cards nung mga Avaiable na rental homes</h1>
            ))} */}

      <section className=" sticky top-0 z-10 w-full pt-30 pb-10 shadow px-10 flex flex-col items-center bg-white">
        <h1 className="text-3xl font-bold mb-2">Search Destinations</h1>
        <p className="text-sm text-gray-500 mb-5">
          Discover our hand picked of the best rentals in Lucena City.
        </p>
        <Search />
      </section>

      <section className=" w-full pt-10 pb-30 px-10 flex flex-col items-center bg-white">
        <h1 className="w-full text-2xl font-bold mb-2 text-start lg:ml-30">
          Available Rentals
        </h1>

        <div className="w-full lg:w-3/5 grid p-5 gap-6 mb-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
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
              handler={() => RentNowHandler(data.id)}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
{
  /* 
    sa detail view pweding gumamit ka ng modal to dispaly the information nung room
    like sa card kunti lang pakita mo like yung name tas price lang tas lagay ka nalang ng detailview
    tas dun mo lagay kung air conditioned ba o hindi yung mga ganun
    naacess isya through slug name
    api/room/slug_name/
*/
}
