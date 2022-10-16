import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {

  const [countries, setCountries] = useState([])

 useEffect(()=>{
  axios.get('https://restcountries.com/v3.1/all')
  .then(response =>{
    setCountries(response.data)
  })
 })
 
 return (
  <div>
<SearchCountry countries = {countries}></SearchCountry>
  </div>

)
 
}

const RenderCountry = (props) =>{
  return(
    <div>
        <li key={props.country.name.common}>{props.country.name.common}</li>
    </div>
  )
}

const RenderCountries = (props) =>{
  return(
    <div>
    <ul>
   {props.countries.map(country =>
     <RenderCountry key = {country.name.common} country = {country}></RenderCountry>)}
 </ul>
 </div>
  )
}



const SearchCountry = (props) =>{

  const [searchValue, setSearchValue] = useState('paska')

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    console.log(event.target.value)
    console.log(props.countries[1].name.common)
  }

  const filtered = props.countries.filter(country =>{
    return country.name.common.toLowerCase().includes(searchValue.toLowerCase());
  })

  

  return (
    <div>
      <form>
        find countries
        <input
         value={searchValue}
         onChange={handleSearch}
         ></input>
  <RenderCountries countries = {filtered}></RenderCountries>
      </form>
    </div>
  )
}

export default App;
