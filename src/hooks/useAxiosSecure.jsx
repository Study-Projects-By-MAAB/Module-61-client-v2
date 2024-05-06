import axios from "axios"
import { useEffect } from "react"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"

const axiosSecure = axios.create({
    baseURL: "https://car-doctor-server-v2-nine.vercel.app",
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (res) => {
                return res
            },
            (error) => {
                console.log("error tracked in the interceptors:", error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    logout()
                        .then(() => {
                            navigate("/login")
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    return console.log("logout the user")
                }
            },
        )
    }, [logout, navigate])

    return axiosSecure
}

export default useAxiosSecure
