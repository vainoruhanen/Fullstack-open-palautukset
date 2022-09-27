
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
      <dt key = {course.id}><Course course = {course}></Course></dt>
      )
    )
  }

  export default Courses