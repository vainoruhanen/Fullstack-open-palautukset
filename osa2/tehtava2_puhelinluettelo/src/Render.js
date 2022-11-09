

const RenderPerson = (props) =>{    //renderöi yksittäisen henkilön

    return(
      <div>
          <li key={props.person.id}>{props.person.name} {props.person.number} <button onClick={() => props.deleteNumber(props.person.id, props.person.name)}>Delete</button></li>  
      </div>
      
    )
}

  
  const RenderPersons = (props)=>{
    return(
      <div>
         <ul>
      {props.persons.map(person =>
          <RenderPerson deleteNumber = {props.deleteNumber} key = {person.id} person = {person}></RenderPerson>)}
      </ul>
      </div>
    )
  }

  export default RenderPersons