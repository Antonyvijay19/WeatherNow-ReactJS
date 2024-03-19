import { useState ,useEffect} from 'react'

import axios from 'axios'

import search_icon from '../Assets/images/search.png'
import clear_icon from '../Assets/images/clear.png'
import cloud_icon from '../Assets/images/cloud.png'
import drizzle_icon from '../Assets/images/drizzle.png'
import humidity_icon from '../Assets/images/humidity.png'
import rain_icon from '../Assets/images/rain.png'
import snow_icon from '../Assets/images/snow.png'
import wind_icon from '../Assets/images/wind.png'
import scattered_icon from '../Assets/images/03d.png'
import brokencloud_icon from '../Assets/images/04d.png'
import nightcloud_icon  from '../Assets/images/02n.png'
import nightsky_icon  from '../Assets/images/01n.png'
import nightrain_icon  from '../Assets/images/10n.png'
import thunderstorm_icon  from '../Assets/images/11d.png'
import drizzlenight_icon from "../Assets/images/09d.png"
import mist_icon from "../Assets/images/50d.png"


const weatherIcons = [
    { code: '01d', icon: clear_icon },
    { code: '01n', icon: nightsky_icon },
    { code: '02d', icon: cloud_icon },
    { code: '02n', icon: nightcloud_icon },
    { code: '03d', icon: scattered_icon },
    { code: '03n', icon: scattered_icon },
    { code: '04d', icon: brokencloud_icon },
    { code: '04n', icon: brokencloud_icon },
    { code: '09d', icon: drizzle_icon },
    { code: '09n', icon: drizzlenight_icon },
    { code: '10d', icon: rain_icon },
    { code: '10n', icon: nightrain_icon },
    { code: '11d', icon: thunderstorm_icon },
    { code: '11n', icon: thunderstorm_icon },
    { code: '13d', icon: snow_icon },
    { code: '13n', icon: snow_icon },
    { code: '50d', icon: mist_icon },
    { code: '50n', icon: mist_icon },
];

function Weatherapp(){
const [icon ,seticon] =useState("")
const[city, setcity] =useState("chennai")
const [temp, settemp]=useState("")
const [name, setname]=useState("")
const [humidity, sethumidity]=useState("")
const [wind, setwind]=useState("")
const [cityNotFound, setCityNotFound] = useState(false);


  function handlecity(e){
    setcity(e.target.value)
  }

  useEffect(function () {
      search()
  },[]);


function search(){
    var weatherData =axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=9412e915b1c32e3cab94029daf204699`)

    weatherData.then(function(wdata){
        console.log(wdata.data)
        setCityNotFound(false)
        settemp(Math.floor(wdata.data.main.temp))
        setname(wdata.data.name)
        sethumidity(wdata.data.main.humidity)
        setwind(wdata.data.wind.speed)

        seticon(getWeatherIcon(wdata.data.weather[0].icon))




    }).catch((errormsg)=>{
        console.log("Data not found")
         setCityNotFound(true); 
    })
 
    function getWeatherIcon(weathercode){
        const foundicon =weatherIcons.find((icon) => (icon.code === weathercode))

        return foundicon?foundicon.icon:""
    }

}



    return(<div className="sm:w-screen bg-gradient-to-b from-violet-700 to-fuchsia-500 h-screen border rounded-xl m-auto md:w-[607px]">
       <div className='pt-16 flex justify-center gap-4 items-center'>
        <input value={city} onChange={handlecity} className='w-80 border-none outline-none h-12 pl-4 text-xl rounded-3xl text-gray-600' type="text"  placeholder='search'/>
        <div onClick={search} className="bg-white p-4 rounded-3xl cursor-pointer">
            <img src={search_icon} alt="searchicon" /></div>  
       </div>
        
       {cityNotFound ? (<div className="text-5xl text-center mt-44 text-white">City not found</div>):
       (
       <>
           <div className="flex flex-col justify-center items-center">
            <img className='w-[224px] h-[224px]' src={icon} alt="icon" />
            <h1 className='text-7xl text-white font-bold'>{temp}&deg;c</h1>
            <h1 className="text-4xl mt-2 text-white font-medium">{name}</h1>
        </div>


<div className="flex justify-around mt-8">
    <div className="flex gap-3 items-center">
        <div className='mb-2'>
             <img src={humidity_icon} alt="humidity" />
        </div>
            <div className='text-white'> 
                <h1 className='text-3xl'>{humidity} %</h1>
                <h1 className='text-xl'>Humidity</h1>
            </div>
        
    </div> 
     
    <div className="flex gap-3 items-center">
        <div className='mb-2'>
             <img src={wind_icon} alt="wind" />
        </div>
            <div className='text-white'> 
                <h1 className='text-3xl'>{wind}Km/Hr</h1>
                <h1 className='text-xl'>Wind Speed</h1>
            </div>
        
    </div> 
   
    

</div>    
</>
)}
       
        
    </div>)
}




export default Weatherapp