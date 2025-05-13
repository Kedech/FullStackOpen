import { useState } from 'react'
import Statistics from './Statistics'
import Content from './Content'

function App() {
  const textArray = ['good', 'neutral', 'bad']
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0) 
  const [bad, setBad] = useState(0)
  
  
  
  const setFunctions = [setGood, setNeutral, setBad];
  const values = [good, neutral, bad];

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Content textArray={textArray} setFunctions={setFunctions} values={values} />
        <Statistics textArray={textArray} values={values} title={'Statistics'}/>
      </div>      
    </>
  )
}

export default App
