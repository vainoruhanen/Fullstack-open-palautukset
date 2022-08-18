const Header = (props) =>{
  return(
    <h1>{props.title}</h1>
  )
}

const Total = (props) =>{
    return(
      <p>Number of exercises {props.taulukko[0].exercises + props.taulukko[1].exercises + props.taulukko[2].exercises}</p>
    )
}

const Content = (props) =>{
    return(
      <div>
      <Part name = {props.taulukko[0].name} amount = {props.taulukko[0].exercises}></Part>
      <Part name = {props.taulukko[1].name} amount = {props.taulukko[1].exercises}></Part>
      <Part name = {props.taulukko[2].name} amount = {props.taulukko[2].exercises}></Part>
      </div>
    )
}


const Part = (props) =>{
  
  return(
    <div>
      <p>{props.name} {props.amount}</p>
    </div>   
    )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (

    <div>
      <Header title = {course.name}></Header>

      <Content taulukko = {course.parts}></Content>
      
     <Total taulukko = {course.parts}></Total>
    </div>
  )
}

export default App