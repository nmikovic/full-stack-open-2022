import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Statistics = (props) => {

  const {good, neutral, bad} = props
  const feedbackCounter = good + neutral + bad
  
  if(feedbackCounter === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <StatisticLine text={'good'} value={good}/>
      <StatisticLine text={'neutral'} value={neutral}/>
      <StatisticLine text={'bad'} value={bad}/>
      <StatisticLine text={'all'} value={feedbackCounter}/>
      <StatisticLine text={'average'} value={(good - bad) / feedbackCounter}/>
      <StatisticLine text={'positive'} value={(good / feedbackCounter * 100) + '%'}/>
    </div>
    
  )
}

const StatisticLine = (props) => {
  const {text, value} = props

  return (
    <div>
      {text} {value}
    </div>  
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header title='give feedback'/>
      <Button onClick={increaseGood} text={'good'}></Button>
      <Button onClick={increaseNeutral} text={'neutral'}></Button>
      <Button onClick={increaseBad} text={'bad'}></Button>
      <Header title='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App