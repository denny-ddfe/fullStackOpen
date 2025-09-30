import CountryDetails from './CountryDetails'

export const manyMatches = () => {
	return <p>Too many matches. Specify another filter</p>
}

export const someMatches = (filteredCountries, setSearch) => {
	return filteredCountries.map((country)=>
		<p key={country.name}>
			{country.name}
			<button onClick={()=>setSearch(country.name)}>Show</button>
		</p>
	)
}

export const noMatches = () => {
	return <p>No matches.</p>
}

export const oneMatch = (selectedCountry, weatherData) => {
	return <CountryDetails 
		selectedCountry={selectedCountry} 
		weatherData={weatherData}
	/>
}

