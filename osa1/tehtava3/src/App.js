import { useState } from 'react'


const Button = (props) =>{
  return(
<button onClick={props.handleClick}>{props.text}</button>
  )
}

const PrintVotes = (props) =>{
    const array = props.points
  return(
    <p>has {array[props.selected]} votes</p>
  )
}





const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const  [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const  [mostVoted, setmostVoted] = useState(0)
  

  const handleClick = () =>{
    setSelected(Math.floor(Math.random() * 6))
    console.log("Selected", selected)
    console.log(points)
  }

  const handleVote = () =>{
    const copy = [...points]
    copy[selected] += 1 
    setPoints(copy)
    console.log("points", points)
    setmostVoted( copy.indexOf(Math.max(...copy)))
  }
 

  return (
    <div>
       <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
    <br></br>
    <PrintVotes points = {points} selected = {selected}></PrintVotes>
      <Button text="next anecdote" handleClick = {handleClick}></Button>
      <Button text="vote" handleClick = {handleVote}></Button>
      <br></br>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

export default App