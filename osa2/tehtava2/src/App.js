import { useEffect, useState } from 'react'

import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])




  const addName = (event) =>{
 
    event.preventDefault()      //estää mm. sivun uudelleen lataamisen submitissa
    console.log('button clicked', event.target)

    const nameObject = {    //luodaan objekti jossa määritellään nimi ja id
      name: newName,
      number: newNumber,
      id : persons.length + 1
    }

    const contains = persons.some(element => {
      if (element.name === nameObject.name) {
        return true;
      }
      return false;
    });

    if(contains){
      alert(`${nameObject.name} is already added to phonebook`)
    }else{
      setPersons(persons.concat(nameObject))    //lisätään henkilö henkilöihin
    }

  }


  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)      //kenttään syötetty nimi

  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  

  return (
    <div>
      <h1>Phonebook</h1>

    

      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}/>
        </div>

        <div>number: <input
        value={newNumber}
        onChange={handleNumberChange}/>
        </div>
        <div>

          <button type="submit">add</button>
         </div>
      </form>
      <h2>Numbers</h2>
      <Filter persons = {persons}></Filter>
      
    </div>
  )

}

const RenderPerson = (props) =>{
  return(
    <div>
        <li key={props.person.id}>{props.person.name} {props.person.number}</li>
    </div>
    
  )
}


const RenderPersons = (props)=>{
  return(
    <div>
       <ul>
    {props.persons.map(person =>
        <RenderPerson key = {person.id} person = {person}></RenderPerson>)}
    </ul>
    </div>
  )
}


const Filter = (props) =>{
  const[newValue, setValue] = useState('')
 

  const handleFilterChange = (event) =>{
    setValue(event.target.value)
    console.log(event.target.value)
  
  }

  const filtered = props.persons.filter(person =>{
 
    return person.name.toLowerCase().includes(newValue.toLowerCase()); //näyttää nimet jotka sisältää syötetyn tekstin, case insensitiivinen
  })

  return(
    <div>
      <form>
      filter shown with<input
      value={newValue}
      onChange={handleFilterChange}
      ></input>
      </form>

    <RenderPersons persons = {filtered}></RenderPersons>
   
  </div>
  )
}



export default App