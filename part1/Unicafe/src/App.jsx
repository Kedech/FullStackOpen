import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ textArray, values, title }) => {

    const sumAll = values.reduce((accumulative, currentValue) => accumulative + currentValue)
    if (sumAll === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    const average = (values[0] * 1 + values[1] * 0 + values[2] * -1) / sumAll
    const positive = (values[0] / sumAll) * 100
    return(
        <>
            <div>
                <h1>{title}</h1>
                <table>
                    <tbody>
                        <StatisticsLine text = {textArray[0]} value = {values[0]} />
                        <StatisticsLine text = {textArray[1]} value = {values[1]} />
                        <StatisticsLine text = {textArray[2]} value = {values[2]} />
                        <StatisticsLine text = {'All'} value = {sumAll} />
                        <StatisticsLine text = {'Average'} value = {average.toFixed(2)} />
                        <StatisticsLine text = {'Positive'} value = {`${positive.toFixed(2)} %`} />
                    </tbody>
                </table>
                
            </div>
        </>
    )
}

const Button = ({text, onClick}) => {
    
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Content = ({textArray, setFunctions, values}) => {
    return (
        <div>            
        {
            textArray.map((type, index) => (<Button key={type} text={type} onClick={() => setFunctions[index](values[index] + 1)}/>))
        }                  
        </div>
    )
}

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
