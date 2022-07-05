import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Counter = (props) => {
  return (
    <div>
      {props.name} {props.counter}
    </div>  
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
        <Header title='statistics'/>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <Header title='statistics'/>
      <Counter name={'good'} counter={good}/>
      <Counter name={'neutral'} counter={neutral}/>
      <Counter name={'bad'} counter={bad}/>
      <Counter name={'all'} counter={feedbackCounter}/>
      <Counter name={'average'} counter={(good - bad) / feedbackCounter}/>
      <Counter name={'positive'} counter={(good / feedbackCounter * 100) + '%'}/>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App