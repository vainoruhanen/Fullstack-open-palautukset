import RenderPersons from './Render'
import { useState } from 'react'

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
  
      <RenderPersons deleteNumber = {props.deleteNumber} persons = {filtered}></RenderPersons>
     
    </div>
    )
  }


  export default Filter
  