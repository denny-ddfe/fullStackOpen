import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

function App() {
  
	const [search, setSearch] = useState('')
	const countryList = useRef([])

	useEffect(()=>{
		axios.get(`${baseURL}/all`).then(
			(response)=>{
				countryList.current=response.data.map((country)=>country.name.common)

			}
		)
	},[])

  return (
    <>
      <input 
				value={search} 
				onChange={(event)=>setSearch(event.target.value)}
			></input>



    </>
  )
}

export default App
