const MostVoted = ({ anecdotes, votes }) => {
    const maxVotes = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(maxVotes)

    if (maxVotes === 0) {
        return <p>No votes yet</p>
    }

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVotedIndex]}</p>
            <p>Has {maxVotes} votes</p>
        </div>
    )
}

export default MostVoted