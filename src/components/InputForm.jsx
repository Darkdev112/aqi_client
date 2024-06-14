"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function InputForm(){
    const [location,setLocation] = useState("")
    const [date,setDate] = useState("")
    const [aqi,setAqi] = useState(null)
    const [locationError,setLocationError] = useState("")
    const [dateError,setDateError] = useState("")

    const handleClick = async(e) => {
        e.preventDefault()
        setLocationError("")
        setDateError("")
        setAqi(null)
        let flag = 0
        
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!regex.test(date)) {
            setDateError('invalid date format')
            flag = 1
        }

        const year = date.split('-')[0]
        if(year<2024 || year>2044){
            setDateError('date out of range')
            flag=1
        }

        if(!location){
            setLocationError('invalid location')
            flag = 1
        }

        if(flag == 1){
            return
        }

        try {
            const response = await axios.post(`https://aqi-server.onrender.com/predict?location=${location}&exact_date=${date}`,{},{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const {result,error} = response.data
            if(error){
                setLocationError('Invalid location')
            }
            else{
                setAqi(Number(result))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = (e) => {
        e.preventDefault()
        setLocation("")
        setDate("")
        setAqi(null)
        setLocationError("")
        setDateError("")
    }    

    return(
        <div className="w-full flex flex-grow justify-center">
            <form className="w-full flex flex-col items-center lg:my-[80px] sm:my-[50px]">
                <div className="lg:w-[1024px] sm:w-full flex flex-row justify-evenly items-center">
                    <div className="flex flex-col font-signika">
                        <label htmlFor="location" className="lg:text-[28px] sm:text-lg text-[#F9F6EE] lg:ml-1 lg:mb-1 ">Location</label>
                        <input className="lg:h-10 lg:w-80 sm:h-8 sm:w-40 p-2 lg:rounded-md sm:rounded-[4px] bg-[#F9F6EE] ring-2 ring-gray-500 sm:text-base lg:text-lg" type="text" placeholder="e.g. Delhi" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <p className="lg:text-base sm:text-sm text-rose-500 font-signika lg:tracking-wide sm:tracking-normal lg:mt-1 lg:ml-1 min-h-[24px]">{locationError}</p>
                    </div>
                    <div className="flex flex-col font-signika">
                        <label htmlFor="date" className="lg:text-[28px] sm:text-lg text-[#F9F6EE] lg:ml-1 lg:mb-1 ">Date</label>
                        <input className="lg:h-10 lg:w-80 sm:h-8 sm:w-40 p-2 lg:rounded-md sm:rounded-[4px] bg-[#F9F6EE] ring-2 ring-gray-500 sm:text-base lg:text-lg" type="text" placeholder="YYYY-MM-DD" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                        <p className="lg:text-base sm:text-sm text-rose-500 font-signika lg:tracking-wide sm:tracking-normal lg:mt-1 lg:ml-1 min-h-[24px]">{dateError}</p>
                    </div>
                </div>
                <div className="flex flex-row lg:mt-[50px] sm:mt-[30px] gap-10">
                    <button className="bg-[#F9F6EE] lg:h-10 lg:w-24 sm:h-6 sm:w-16 lg:rounded-md sm:rounded-sm lg:text-xl sm:text-base lg:tracking-wide sm:tracking-normal font-signika font-bold lg:border-2 sm:border border-gray-500 hover:bg-[#F5F5DC]" onClick={handleClick}>Predict</button>
                    <button className={`bg-[#F9F6EE] lg:h-10 lg:w-24 sm:h-6 sm:w-16 lg:rounded-md sm:rounded-sm lg:text-xl sm:text-base lg:tracking-wide sm:tracking-normal font-signika font-bold lg:border-2 sm:border border-gray-500 hover:bg-[#F5F5DC] disabled:bg-[#F9F6EE] disabled:opacity-50`} onClick={handleReset} disabled={!aqi}>Reset</button>
                </div>
            </form>
        </div>
    )
}