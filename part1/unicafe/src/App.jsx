import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad

  if (all === 0) {
    return <p>No feedback given</p>
  }

  const average = (props.good - props.bad) / all
  const positive = (props.good / all) * 100

  return (
    <div>
      <h2>Statistics</h2>

      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>

      <Button
        onClick={() => setGood(good + 1)}
        text="good"
      />

      <Button
        onClick={() => setNeutral(neutral + 1)}
        text="neutral"
      />

      <Button
        onClick={() => setBad(bad + 1)}
        text="bad"
      />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App