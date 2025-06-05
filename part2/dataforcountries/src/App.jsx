import { use, useState, useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/Country'
import CountriesList from './components/CountriesList'

function App() {
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const handleCountryChange = (event) => setFilter(event.target.value)

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <div>
          Find Countries <input type='text' value={filter} onChange={handleCountryChange} />
      </div>
      <div>
        <CountriesList countries={filteredCountries} />        
      </div>
    </>
  )
}

export default App
