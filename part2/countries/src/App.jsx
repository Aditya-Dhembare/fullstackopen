import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  const showCountry = (country) => {
    setSelectedCountry(country)
    setWeather(null)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const country = selectedCountry || (
    countriesToShow.length === 1
      ? countriesToShow[0]
      : null
  )

  useEffect(() => {
    if (!country || !country.capital) {
      return
    }

    const capital = country.capital[0]

    axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          capital
        )}&count=1&language=en&format=json`
      )
      .then(response => {
        if (!response.data.results) {
          return
        }

        const location = response.data.results[0]

        return axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m&timezone=auto`
        )
      })
      .then(response => {
        if (response) {
          setWeather(response.data.current)
        }
      })
      .catch(error => {
        console.log('Weather error:', error)
      })
  }, [country])

  return (
    <div>
      <h1>Countries</h1>

      <div>
        find countries:{' '}
        <input
          value={search}
          onChange={handleSearch}
        />
      </div>

      {search === '' ? (
        <p>Type a country name to search</p>
      ) : country ? (
        <div>
          <h2>{country.name.common}</h2>

          <p>
            Capital: {country.capital?.[0]}
          </p>

          <p>
            Area: {country.area}
          </p>

          <h3>Languages</h3>

          <ul>
            {Object.values(country.languages || {}).map(
              language => (
                <li key={language}>
                  {language}
                </li>
              )
            )}
          </ul>

          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="150"
          />

          {weather && (
            <div>
              <h3>
                Weather in {country.capital?.[0]}
              </h3>

              <p>
                Temperature: {weather.temperature_2m} °C
              </p>

              <p>
                Wind speed: {weather.wind_speed_10m} km/h
              </p>
            </div>
          )}
        </div>
      ) : countriesToShow.length > 10 ? (
        <p>
          Too many matches, specify another filter
        </p>
      ) : countriesToShow.length > 1 ? (
        <div>
          {countriesToShow.map(country => (
            <p key={country.cca3}>
              {country.name.common}{' '}
              <button
                onClick={() => showCountry(country)}
              >
                show
              </button>
            </p>
          ))}
        </div>
      ) : (
        <p>No countries found</p>
      )}
    </div>
  )
}

export default App