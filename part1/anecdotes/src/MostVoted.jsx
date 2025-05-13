const MostVoted = ({ anecdotes, votes }) => {
    const maxVotes = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(maxVotes)

    if (maxVotes === 0) {
        return <p>No votes yet</p>
    }

    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[mostVotedIndex]}</p>
            <p>Has {maxVotes} votes</p>
        </div>
    )
}

export default MostVoted