import StatisticsLine from "./StatisticsLine"

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

export default Statistics