import { useEffect, useState } from 'react'

import axios from 'axios'
import RenderPersons from './Render'
import Filter from './Filter'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('something happened...')
  const [errorMessage, setErrorMessage] = useState('something bad happened...')   //tähän muuttujaan asetetaan mahdollinen virhe viesti

  useEffect(() => {
    personService         
      .getAll()     //hakee tiedot serveriltä
      .then(response => {
        setPersons(response.data)
        setMessage(null)
        setErrorMessage(null)
      })
  }, [])


const deleteNumber = (id, name) =>{   //poistaa numeron
  if(window.confirm(`Delete ${name}?`)){    //käyttäjän painaessa ok poistetaan haluttu numero
    personService.deleteNumber(id)
    .then(response => {
      (personService         
        .getAll()     //hakee tiedot serveriltä
        .then(response => {
          setPersons(response.data)
        }))
        setMessage(
          `Deleted ${name}`
        )
        setTimeout(() =>{
          setMessage(null)
        }, 5000)
    }) 
    .catch(error =>{
      setErrorMessage(
        `Information of ${name} has already been removed from server`
      )
      setTimeout(() =>{
        setErrorMessage(null)
      }, 5000)
    })
  }
  
}

const replaceNumber = name =>{    //korvaa numeron uudella
  if(window.confirm(`${name} is already added to phonebook, replace old number with a new one?`)){
    const person = persons.find(p => p.name === name) //etsii henkilön nimellä
    const id = person.id
    const url = `http://localhost:3001/persons/${person.id}`  //hakee osoitteen id:llä

  const changedNumber = { ...person, number: newNumber}   //Luo kopion objektista uudella numerolla

 
  personService
  .replace(id, changedNumber)
  .then(response => {
    setPersons(persons.map(person => person.id !== id ? person : response.data))
    setMessage(
      `Replaced ${person.name}`
    )
    setTimeout(() =>{
      setMessage(null)
    }, 5000)
  
  })
  .catch(error =>{
    setErrorMessage(
      `Information of ${person.name} has already been removed from server`
    )
    setTimeout(() =>{
      setErrorMessage(null)
    }, 5000)
  })
  }
}

  const addName = (event) =>{
 
    event.preventDefault()      //estää mm. sivun uudelleen lataamisen submitissa
    console.log('button clicked', event.target)

    const nameObject = {    //luodaan objekti jossa määritellään nimi ja id
      name: newName,
      number: newNumber
    }

    const contains = persons.some(element => {
      if (element.name === nameObject.name) {
        return true;
      }
      return false;
    });

    if(contains){
      replaceNumber(nameObject.name)
    }else{
      personService
      .create(nameObject)               //lisää  henkilön serverille
      .then(response => {
        setPersons(persons.concat(response.data))   
        
        setMessage(
          `Added ${nameObject.name}`
        )
        setTimeout(() =>{
          setMessage(null)
        }, 5000)
      })
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

    
    <Notification message={message}></Notification>
    <ErrorNotification message={errorMessage}></ErrorNotification>
    
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
      <Filter deleteNumber = {deleteNumber} persons = {persons}></Filter>
      
    </div>
  )

}


const Notification = ({message}) =>{
  if(message===null){
    return null
  }

  return(
    <div className='message'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) =>{
  if(message===null){
    return null
  }

  return(
    <div className='errormessage'>
      {message}
    </div>
  )
}




export default App