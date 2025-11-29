import { Droplet, Airplay, Wifi } from "lucide-react";
import CardImg from "../assets/landingpage/card_img.png";
import { useNavigate } from "react-router-dom";

const necessities = ["Aircon", "CR", "Internet"];

export const FullRoomCard = ({
  image,
  name,
  address,
  aircon,
  comfortroom,
  internet,
  price,
  dataID,
}) => {
  const navigate = useNavigate();

  const RentNowHandler = async (slug_name) => {
    console.log(slug_name);
    navigate(`/room/${slug_name}`);
  };
  return (
    <div className="border-gray-400 shadow-md border rounded-xl animate-fadeIn">
      <img src={image} alt={name} className="w-full h-auto rounded-t-xl" />
      <div className="px-4 py-5 flex flex-col gap-2 bg-white rounded-b-xl">
        <h1 className="text-md font-bold">{name}</h1>
        <div className="flex items-center mb-6">
          {" "}
          <img
            src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
            alt="Location"
            className="w-5 h-5 mr-1"
          />
          <p className="text-gray-500">{address}</p>
        </div>
        <div className="flex gap-1 border-b-2 border-gray-300 pb-4">
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
              aircon
                ? "badge badge-neutral text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <Droplet className="w-4 h-4" />
            Aircon
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
              comfortroom
                ? "badge badge-neutral text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <Airplay className="w-4 h-4" />
            CR
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
              internet
                ? "badge badge-neutral text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <Wifi className="w-4 h-4" />
            Internet
          </div>
        </div>

        <div className="flex w-full items-center gap-2 justify-around">
          <div className="flex flex-col text-center">
            <p className="text-2xl font-bold">
              ₱{price}
              <br />
            </p>
            <span className="text-xs font-normal">per month</span>
          </div>
          <button
            className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all w-3/5"
            onClick={() => RentNowHandler(dataID)}
          >
            Rent Me
          </button>
        </div>
      </div>
    </div>
  );
};

export const DummyFullRoomCard = () => {
  return (
    <div className="border-gray-400 shadow-md border rounded-xl">
      <img src={CardImg} alt="Room" className="w-full h-auto" />
      <div className="px-4 py-5 flex flex-col gap-2 bg-white rounded-b-xl">
        <h1 className="text-md font-bold">
          Modern Boarding House near SM Lucena
        </h1>
        <div className="flex items-center mb-6">
          {" "}
          <img
            src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
            alt="Location"
            className="w-5 h-5 mr-1"
          />
          <p className="text-gray-500">Barangay Ibabang Dupay</p>
        </div>
        <div className="flex gap-1 border-b-2 border-gray-300 pb-4">
          {necessities.map((e) => (
            <div
              key={e}
              className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-xs"
            >
              {e}
            </div>
          ))}
        </div>

        <div className="flex w-full items-center gap-2 justify-around">
          <div className="flex flex-col text-center">
            <p className="text-2xl font-bold">
              ₱4,500
              <br />
            </p>
            <span className="text-xs font-normal">per month</span>
          </div>
          <button className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all w-3/5">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalCard = ({ name, address, availability, price, dataID }) => {

  const navigate = useNavigate();

  const RentNowHandler = async (slug_name) => {
    console.log(slug_name);
    navigate(`/room/${slug_name}`);
  };

  return (
    <div className="border-gray-400 shadow-md border rounded-xl">
      <div className="px-4 py-5 flex flex-col gap-2 bg-white rounded-xl">
        <h1 className="text-lg font-bold">{name}</h1>
        <div className="flex items-center mb-6">
          {" "}
          <img
            src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
            alt="Location"
            className="w-5 h-5 mr-1"
          />
          <p className="text-gray-500 text-sm">{address}</p>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
            availability == "Available"
              ? "badge badge-neutral text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {availability == "Available" ? "Available" : "Not Available"}
        </div>
        <div className="flex w-full items-center gap-2 justify-around border-t-2 border-gray-300 pt-4">
          <div className="flex flex-col text-center">
            <p className="text-2xl font-bold">
              ₱{price}
              <br />
            </p>
            <span className="text-xs font-normal">per month</span>
          </div>
          <button
            className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all w-3/5"
            onClick={() => RentNowHandler(dataID)}
          >
            Rent Me
          </button>
        </div>
      </div>
    </div>
  );
};
