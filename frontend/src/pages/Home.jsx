import { useState, useEffect } from "react"
import api from "src/utils/api"
import Maps from "src/components/Maps"
import NavBar from "src/components/NavBar"

// "Incorrect type. Expected pk value, received str."

/*
    TODO HERE... If not avaiable na yung room either disable the button or prompt a error
    message sa user.
*/

const Home = () => {
    const [rentals, setRentals] = useState([])

    useEffect(() => {
        const caller = async () => {
            try {
                const res = await api.get('room/')
                setRentals(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        caller()
    }, [])

    const RentNowHandler = async (index) => {
        try {
            const res = await api.post('transaction/', { room: rentals[index].id })
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

            <section>
                <Maps />
            </section> */}

            {/* dapat card yung mga rentals */}
            {/* {rentals.map((rental, index) => (
                <div key={rental.room_id}>
                    <img src={rental.room_picture} alt={rental.name} />
                    <h1>Room name: {rental.name}</h1>
                    <p>address: {rental.address}</p>
                    <p>Airconditioned: {rental.air_condition ? "It has aircon" : "it does not have aircon"}</p>
                    <p>Comfortroom: {rental.comfort_room ? "it has cr" : "no cr"}</p>
                    <p>Internet: {rental.internet ? "yes internet" : "no internet"}</p>
                    <p>Avaiable: {rental.room_availability}</p>
                    <p>Price: {rental.price}</p>
                    <button onClick={() => RentNowHandler(index)}>rent now</button>
                    <button>detail view</button>
                </div>
            ))} */}


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