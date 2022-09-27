




const Header = (props) =>{
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}




const Total = (props) =>{
  return(
    <div>
      <p>Numbers of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
    </div>
  )
}


const Content = (props) =>{
  return(
    <div>
      <Part sisalto = {props.teksti1} maara = {props.maara1}></Part>
      <Part sisalto = {props.teksti2} maara = {props.maara2}></Part>
      <Part sisalto = {props.teksti3} maara = {props.maara3}></Part>
  </div>
  )
}

const Part = (props) =>{
  return(
    <div>
       <p>{props.sisalto} {props.maara}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    
    <div>
      <Header title ={course}/>
      
      <Content teksti1 = {part1} teksti2 = {part2} teksti3 = {part3}
       maara1 = {exercises1}  maara2 = {exercises2}  maara3 = {exercises3}></Content>
       
      <Total exercise1 ={exercises1} exercise2 ={exercises2} exercise3 ={exercises3}></Total>
    </div>
  )
}

export default App
