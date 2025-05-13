const Anecdotes = ({ anecdote, vote }) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdote}</p>
            <p>Has {vote} votes</p>
        </div>
    )
}

export default Anecdotes