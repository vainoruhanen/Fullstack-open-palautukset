import { useState } from 'react'



const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
  {props.text}
</button>
  )
}

const StatisticsLine = (props) =>{
    return(
        <tr>
          <td>{props.text}</td> 
          <td>{props.value}</td>
        </tr>       
    )

}

const Statistics = (props) =>{
    if(props.bad == 0 && props.good == 0 && props.neutral == 0){
      return(
        <div>
             No feedback given
        </div>
      )
    }

   
  return(
    <div>
      <table>
        <thead>
        <StatisticsLine text="good" value = {props.good}></StatisticsLine>
        <StatisticsLine text="neutral" value = {props.neutral}></StatisticsLine>
        <StatisticsLine text="bad" value = {props.bad}></StatisticsLine>
        <StatisticsLine text="all" value = {props.total}></StatisticsLine>
        <StatisticsLine text="average" value = {props.average}></StatisticsLine>
        <StatisticsLine text="positive" value = {props.positive}></StatisticsLine>
        </thead>
      </table>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral;
  const average =  (good + (-bad)) /total
  const positive = good / total * 100 + " %"

    const handleGood = () =>{
      setGood(good + 1)
    }

    const handleNeutral = () =>{
      setNeutral(neutral + 1)
    }

    const handleBad = () =>{
      setBad(bad + 1)
    }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text = 'Good'></Button>
      <Button handleClick={handleNeutral} text = 'Neutral'></Button>
      <Button handleClick={handleBad} text = 'Bad'></Button>

      <h2>Statistics</h2>
    
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} average = {average} positive = {positive}></Statistics>
</div>
  )
}

export default App