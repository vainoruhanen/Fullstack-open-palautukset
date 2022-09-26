const Header = (props) =>{
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}




const Total = (props) =>{
  
  const total = props.parts.reduce((
    previousValue, currentValue) => previousValue + currentValue.exercises, 0)
  return(
    <div>
      <p>total of {total} exercises</p>
    </div>
  )
}


const Content = (props) =>{
  return(
    <div>
      <ul>
        {props.course.parts.map(part =>             //tekee listan kurssin johon merkitään nimi ja määrä
        <li key =  {part.id}>
          {part.name} {part.exercises}
        </li>)}
      </ul>
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

const Course = (props) => {
  const { course } = props
  return(
    <div>
      <Header title = {course.name}></Header>
      <Content course = {course}></Content>  
      <Total parts = {course.parts}></Total>
       </div>
      
  
  )
}


const Courses = (props) =>{
    const {courses} = props

  return(
    courses.map((course) =>
    <li key = {course.id}><Course course = {course}></Course></li>
    )
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses}/>
    </div>
  )
}

export default App