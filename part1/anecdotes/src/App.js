import { useState } from 'react'

const Button = (props) => {
  return(
      <button onClick={props.onClick}>
        {props.text}
      </button>
  )
}

const Anecdote = (props) => {
  const {anecdote, points} = props

  return(
    <div>
      {anecdote}
      <br/>
      has {points} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setNewPoints] = useState(new Array(7).fill(0))
  const [max, setMax] = useState(0)

  const increasePoints = (index) => () => {
    const copy = [...points]
    copy[index] += 1
    const maxVotes = copy.indexOf(Math.max(...copy))
    setNewPoints(copy)
    setMax(maxVotes)
  } 

  const setNewAnecdote = () => {
    const newValue = Math.floor(Math.random() * 7)
    setSelected(newValue)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]}/>
      <div>
        <Button onClick={setNewAnecdote} text={'next anecdote'}/>
        <Button onClick={increasePoints(selected)} text={'vote'}/>
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[max]} points={points[max]}/>
    </div>
  )
}

export default App