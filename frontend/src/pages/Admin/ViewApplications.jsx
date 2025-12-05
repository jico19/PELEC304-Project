import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "src/components/SideBar"
import api from "src/utils/Api"


const ViewApplications = () => {
    const { application_id } = useParams()
    const [application, setApplication] = useState([])


    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const res = await api.get(`application/${application_id}/`)
                setApplication(res.data)
            } catch (error) {
                console.log(error)
                console.log(application_id)
            }
        }

        fetchApplication()
    }, [application_id])



    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-8 space-y-10">
                <h1></h1>
            </div>

        </div>
    )
}

export default ViewApplications