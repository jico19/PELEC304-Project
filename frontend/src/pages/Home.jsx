import { useState, useEffect } from "react"
import api from "src/utils/api"
import Maps from "src/components/Maps"
import NavBar from "src/components/NavBar"
import PropertyCards from "src/components/PropertyCards"


const Home = () => {
    const [rentals, setRentals] = useState([])

    
    useEffect(() => {
        const caller = async () => {
            try {
                const res = await api.get('room/')
                setRentals(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        caller()
    }, [])

    const RentNowHandler = async (room_id) => {
        try {
            const res = await api.post('transaction/', { room: room_id })
            console.log(res.data)
            console.log("Successfuly rented a room!")
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (
        <div className="w-full h-screen flex flex-col">
            <NavBar />
            {/* <h1>This is Home!</h1>
            <h1>!!notes!! dapat andito yung maps tas parang cards nung mga Avaiable na rental homes</h1>
            ))} */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-10 place-items-center">
                {rentals.map((data) => (
                    <PropertyCards
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

        </div>
    )
}

export default Home
{/* 
    sa detail view pweding gumamit ka ng modal to dispaly the information nung room
    like sa card kunti lang pakita mo like yung name tas price lang tas lagay ka nalang ng detailview
    tas dun mo lagay kung air conditioned ba o hindi yung mga ganun
    naacess isya through slug name
    api/room/slug_name/
*/}