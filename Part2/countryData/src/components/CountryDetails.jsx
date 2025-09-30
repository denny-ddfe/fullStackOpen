const CountryDetails = ({selectedCountry, weatherData}) => {

	if (selectedCountry===null) {return null}

	return <>
		<h1>{selectedCountry.name.common}</h1>
		Capital: {selectedCountry.capital}<br></br>
		Area: {selectedCountry.area}

		<h2>Languages</h2>
		<ul>
			{Object.values(
				selectedCountry.languages).map((lang)=><li key={lang}>{lang}</li>
			)}
		</ul>

		<img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt}></img>		

		<h1>Weather in {selectedCountry.capital}</h1>
		Temperature {weatherData.main.temp} Celsius

		Wind {weatherData.wind.speed} m/s
	</>
}

export default CountryDetails