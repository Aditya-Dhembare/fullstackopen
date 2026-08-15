import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
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
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length > 1 ? (
        <div>
          {countriesToShow.map(country => (
            <p key={country.cca3}>
              {country.name.common}
            </p>
          ))}
        </div>
      ) : countriesToShow.length === 1 ? (
        <div>
          <h2>{countriesToShow[0].name.common}</h2>

          <p>
            Capital: {countriesToShow[0].capital?.[0]}
          </p>

          <p>
            Area: {countriesToShow[0].area}
          </p>

          <h3>Languages</h3>

          <ul>
            {Object.values(countriesToShow[0].languages || {}).map(
              language => (
                <li key={language}>
                  {language}
                </li>
              )
            )}
          </ul>

          <img
            src={countriesToShow[0].flags.png}
            alt={`Flag of ${countriesToShow[0].name.common}`}
            width="150"
          />
        </div>
      ) : (
        <p>No countries found</p>
      )}
    </div>
  )
}

export default App