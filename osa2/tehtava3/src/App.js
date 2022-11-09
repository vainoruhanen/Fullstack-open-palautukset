import { render } from '@testing-library/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {

  const [countries, setCountries] = useState([])

 useEffect(()=>{
  axios.get('https://restcountries.com/v3.1/all')   //haetaan maiden tiedot REST Countries APIsta
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



const RenderCountry = ( {country} ) =>{   //huolehtii yksittäisen maan renderöinnistä

  const [showClicked, setShowClicked] = useState(false)   //tämän ollessa tosi näytetään yksityiskohtaiset tiedot maasta (jonka "show" napista painettiin)

  const renderSpecific = (event) =>{
    event.preventDefault()
    setShowClicked(true)
  }
  
    if(showClicked){
      return(
        <RenderCountryInformation country={country}></RenderCountryInformation>
      )
    } //renderöi maan lisätiedot

    return(
      <div>
          <li key={country.name.common}>{country.name.common} <button onClick={renderSpecific}>show</button> </li>    
          
         
      </div>
    )   //renderöi maan nimen sekä napin jota painamalla näytetään lisätietoja maasta
    

  
}

const RenderCountryInformation = ( {country} ) =>{    //huolehtii yksittäisen maan lisätieto näkymästä
  const api_key = process.env.REACT_APP_API_KEY
  
  const latitude = country.capitalInfo.latlng[0]

  const longitude = country.capitalInfo.latlng[1]

  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')

  console.log(latitude, longitude)
 
 

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`)  
    .then(response =>{
      console.log(response)

      setTemp(response.data.main.temp)
      setWind(response.data.wind.speed)
      setIcon(response.data.weather[0].icon)

      console.log('wind: ', wind)
      console.log('temp: ', temp)
      console.log('icon: ', icon)
    })
   })

   
   return(
    <div>
      <h3>{country.name.common}</h3>

    <ul>
      <li>capital:  {country.capital}</li>
      <li>area: {country.area}</li>
    </ul>

<h4>languages</h4>

<ul>
  {Object.values(country.languages).map((language)=>
  <li key={language}>{language}</li>)}
</ul>


  <img src={country.flags.png} alt="flag"></img>    


  <h4>Weather in {country.capital}</h4>

  <p>Temperature {temp} Celcius</p>

<img src={`http://openweathermap.org/img/w/${icon}.png`} alt="sää ikoni"></img>  

  <p>Wind {wind} m/s</p>
    </div>

  )
 
 
}


const RenderCountries =  ( {countries} ) =>{    //huolehtii maiden renderöinnistä
  
  
  if(countries.length <= 10 && countries.length > 1){   //jos maita on alle 10 mutta yli 1, näytetään maiden nimet
    return(
      <div>
      <ul>
     {countries.map(country =>
       <RenderCountry key = {country.name.common} country = {country}></RenderCountry>)}
   </ul>
   </div>
    )
  }else if(countries.length > 10){    //jos maita on yli kymmenen, pyydetään tarkentamaan hakua
    return(
      <div>
        <p>Too many matches, specify</p>
      </div>
    )
  }else if(countries.length == 1){    //jos maita on yksi, näytetään lisätietoja
    return(
    <div>
     <RenderCountryInformation country = {countries[0]}></RenderCountryInformation>
    </div>
    )
  }
  
}



const SearchCountry = (props) =>{ //huolehtii maan hakemisesta

  const [searchValue, setSearchValue] = useState('')    

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    console.log(event.target.value)
    console.log(filtered)
  }

  const filtered = props.countries.filter(country =>{   //palauttaa kaikki maat jotka sisältävät syötetyn merkkijonon, case insensitiivinen
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
