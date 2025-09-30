import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import * as comp from './components/CountryComponents'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherURL = (city, token) => {
	return 'https://api.openweathermap.org/data/2.5/weather?q=' + city + 
		'&appid=' + token +
		'&units=metric'
}

const api_key = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  
	//states
	const [search, setSearch] = useState('')
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [weatherData, setWeatherData] = useState(null)
	const [countryList, setCountryList] = useState([])

	//Get list of country stubs when loading the app
	useEffect(()=>{
		axios.get(`${baseURL}/all`).then(
			(response)=>{
				setCountryList(response.data.map(
					(country)=>({name:country.name.common, capital:country.capital})
				))
			}
		)
	},[])

	//controlled state of input box
	const handleSearchChange = (event) => {
		setSearch(event.target.value)
	}

	//use memo for filtering countries and picking one particular country.
	//It is calculated from countryList and search, so doesn't need to be a state
	const {filteredCountries, selectedCountryStub} = useMemo(()=> {
		const s = search.toLowerCase()

		const tmp = countryList.filter(
			(country)=>country.name.toLowerCase().includes(s)
		)
		return { 	
			filteredCountries: tmp, 
			selectedCountryStub: tmp.length === 1 ? tmp[0] : null 
		}
	}, [search, countryList])

	//when the selected country is updated, get country and weather data
	useEffect(()=>{
		//Except when null - just do nothing
		if (selectedCountryStub === null) {
			setSelectedCountry(null)
			return
		}

		axios.get(`${baseURL}/name/${selectedCountryStub.name}`)
			.then(
				(response)=>{
					setSelectedCountry(response.data)
				}
			)
		
		axios.get(weatherURL(selectedCountryStub.capital, api_key))
			.then(
				(response)=>{
					setWeatherData(response.data)
				}
			)
	},[selectedCountryStub])

	//Country list is fetched when app starts up. 
	//If length is zero, the app is not yet ready to use -> show loading message
	if (countryList.length===0) {
		return <p>Loading countries...</p>
	}

	const numMatches = filteredCountries.length

  return (
    <> 
			<input 
				value={search} 
				onChange={handleSearchChange}
			></input>

			{numMatches>10?		comp.manyMatches()	:null}
			{numMatches===0?	comp.noMatches()		:null}

			{numMatches>1 && numMatches<=10?	
				comp.someMatches(filteredCountries, setSearch)	
				:null
			}

			{numMatches===1?
				comp.oneMatch(selectedCountry, weatherData)
				:null
			}
		
    </>
  )
}

export default App
