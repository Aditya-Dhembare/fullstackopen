import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

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
  }

  const countriesToShow = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const showCountry = (country) => {
    setSelectedCountry(country)
  }

  const country = selectedCountry || (
    countriesToShow.length === 1 ? countriesToShow[0] : null
  )

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
        </div>
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length > 1 ? (
        <div>
          {countriesToShow.map(country => (
            <p key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => showCountry(country)}>
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