import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [data,setData]=useState({})
  const [location, setLocation]=useState('Delhi')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=09cb620635238f65547c82ed8abb8d3b&units=metric`;

  
  const searchLocation = (event) => {
    event.preventDefault();
    if(event.key==='Enter'|| event.type==='submit'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className='w-full h-screen inset-0 bg-cover bg-center text-slate-200' style={{
      backgroundImage: "url('https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
     }}>
      <form onSubmit={searchLocation}>
        <div className='  flex  justify-center '>
          <input
            type='text'
            placeholder='Enter The Location'
            value={location}
            onChange={event => setLocation(event.target.value)}
            
            className='p-2 rounded-xl border-gray-300 bg-white mt-10 w-40 text-black sm:w-80'
            style={{backgroundColor: 'rgba(170, 172, 174, 0.5)', backdropFilter: 'blur(10px)' }}
          />
          <button type='submit' className='bg-blue-400 mt-10 ml-1 rounded-lg w-15 h-10 sm:w-20'>Search</button>
        </div>
      </form>
      {data.main && (
        <>
        <div className='flex   h-96 mt-20'>
          <div className='text-4xl sm:text-8xl mt-20 ml-20 font-bold font-body'>
          {Math.round(data.main.temp)}°C
          </div>
          <div className='ml-1 sm:ml-4 flex flex-col mt-24 sm:mt-28  '>
            <div className='text-2xl sm:text-4xl  transform rotate-90 font-bold font-body'>
              {data.name}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center h-32 bottom-0 fixed inset-x-0 font-body font-medium' >
          <div className='flex w-96 h-16 rounded-full items-center place-content-between' style={{backgroundColor: 'rgba(169, 169, 169, 0.3)', backdropFilter: 'blur(10px)' }}>
            <div className='justify-center items-center ml-3'><span className='ml-2'>{Math.round(data.main.feels_like)}°C</span> <h2>Feels Like</h2></div>
            <div> <span className='ml-3'>{data.main.humidity}%</span> <h2>Humidity</h2></div>
            <div> <span className='ml-1'>{Math.round(data.wind.speed * 3.6)} KMPH</span> <h2 className='mr-2'>Wind Speed</h2></div>
          </div>
        </div>
       </>
      )}
    </div>
  );
}

export default App;
