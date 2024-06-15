"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function InputForm(){

    const defaultAqi = {
        value : null,
        text : "",
        valcolor : 'text-[#1B1212]',
        textcolor : 'text-[#F9F6EE]'
    }

    const [location,setLocation] = useState("")
    const [date,setDate] = useState("")
    const [aqi,setAqi] = useState(defaultAqi)
    const [locationError,setLocationError] = useState("")
    const [dateError,setDateError] = useState("")
    const [loading,setLoading] = useState(false)

    const showAqi = (result) => {
        if(result>=0 && result<=50){
            setAqi({
                value : Math.round(result),
                text : "perfect",
                valcolor : 'text-[#008000]',
                textcolor : 'text-[#008000]'
            })
        }
        else if(result>50 && result<=100){
            setAqi({
                value : Math.round(result),
                text : "acceptable",
                valcolor : 'text-[#9ACD32]',
                textcolor : 'text-[#9ACD32]'
            })
        }
        else if(result>100 && result<=200){
            setAqi({
                value : Math.round(result),
                text : "moderate",
                valcolor : 'text-[#FFFF00]',
                textcolor : 'text-[#FFFF00]'
            })
        }
        else if(result>201 && result<=300){
            setAqi({
                value : Math.round(result),
                text : "unhealthy",
                valcolor : 'text-[#FFD700]',
                textcolor : 'text-[#FFD700]'
            })
        }
        else if(result>301 && result<=400){
            setAqi({
                value : Math.round(result),
                text : "unbearable",
                valcolor : 'text-[#FFA500]',
                textcolor : 'text-[#FFA500]'
            })
        }
        else{
            setAqi({
                value : Math.round(result),
                text : "hazardous",
                valcolor : 'text-[#FF0000]',
                textcolor : 'text-[#FF0000]'
            })
        }
    }

    const handleClick = async(e) => {
        e.preventDefault()
        setLocationError("")
        setDateError("")
        setAqi(defaultAqi)
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
            setLoading(true)
            const response = await axios.post(`https://aqi-server.onrender.com/predict?location=${location}&exact_date=${date}`,{},{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const {result,error} = response.data
            console.log(result);
            setLoading(false)
            if(error){
                setLocationError('Invalid location')
            }
            else{
                showAqi(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = (e) => {
        e.preventDefault()
        setLocation("")
        setDate("")
        setAqi(defaultAqi)
        setLocationError("")
        setDateError("")
    }    

    useEffect(() => {

    }, [aqi])
    

    return(
        <div className="w-full flex flex-col flex-grow justify-center">
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
                    <button className="bg-[#F9F6EE] lg:h-10 lg:w-24 sm:h-6 sm:w-16 lg:rounded-md sm:rounded-sm lg:text-xl sm:text-base lg:tracking-wide sm:tracking-normal font-signika font-bold lg:border-2 sm:border border-gray-500 hover:bg-[#F5F5DC]" onClick={handleClick} disabled={loading}>Predict</button>
                    <button className={`bg-[#F9F6EE] lg:h-10 lg:w-24 sm:h-6 sm:w-16 lg:rounded-md sm:rounded-sm lg:text-xl sm:text-base lg:tracking-wide sm:tracking-normal font-signika font-bold lg:border-2 sm:border border-gray-500 hover:bg-[#F5F5DC] disabled:bg-[#F9F6EE] disabled:opacity-50`} onClick={handleReset} disabled={!aqi.value}>Reset</button>
                </div>
            </form>
            <div className="w-full flex flex-col flex-grow items-center sm:mt-8">
                <div className="lg:h-[150px] lg:w-[150px] sm:h-[120px] sm:w-[120px] flex flex-col bg-[#F9F6EE] rounded-[50%] ring-2 ring-gray-500 lg:mb-8 sm:mb-4">
                    <div className="h-3/4 flex justify-center items-end">
                        <p className={`lg:text-[4rem] lg:leading-[5rem] sm:text-[3rem] sm:leading-[4rem] text-black font-signika font-extrabold`}>
                            <span className={`${aqi.valcolor}`}>{aqi.value ? aqi.value : '-'}</span>
                        </p>
                    </div>
                    <div className="h-1/4 flex justify-center items-center">
                        <p className="text-gray-500 font-signika font-bold">AQI</p>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    {loading && <p className={`lg:text-[28px] sm:text-lg text-white font-signika`}>Loading...</p>}
                    {!loading && <p className={`lg:text-[28px] sm:text-lg text-white font-signika`}>{aqi.value ? "The air quality will be " : "Check your aqi scores here"}<span className={`${aqi.textcolor}`}>{aqi.text}</span></p>}
                </div>
            </div>
        </div>
    )
}