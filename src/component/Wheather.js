//api.openweathermap.org/data/2.5/weather?q=delhi&appid=5ce1db8afe73fa4ddad815bb9d0e85eb

import React,{useState ,useEffect} from "react";
import "./Wheather.css";
import WheatherCard from "./WheatherCard";

const Wheather = () => {
  const [data, setData] = useState("delhi");
  const [tempinfo,setTempinfo]=useState({})
  // console.log(tempinfo)
  const AddApi=async()=>{
   try{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=5ce1db8afe73fa4ddad815bb9d0e85eb`;
    let res=await fetch(url)
    const result=await res.json()

    console.log(result);
     
    const {temp,pressure,humidity}=result.main;
    const {main:weathermood}=result.weather[0];
    const {speed}=result.wind
    const {name}=result
    const {country,sunset}=result.sys

    const weatherinfo={
      temp,pressure,humidity,weathermood,speed,name,country,sunset
    }
    setTempinfo(weatherinfo)
    setData('')
    
   } catch(error){
    console.log(error);
   }
    
  }

  useEffect(()=>{
    AddApi()
 
  },[])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={()=>AddApi()}>
            Search
          </button>
        </div>
      </div>
      {/* {our temp card} */}
      <WheatherCard tempinfo={tempinfo}/>
    </>
  );
};

export default Wheather;
