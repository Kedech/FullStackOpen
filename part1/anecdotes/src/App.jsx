import { useState } from "react";

const Anecdotes = ({ anecdote, vote }) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdote}</p>
            <p>Has {vote} votes</p>
        </div>
    )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

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

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnecdoteClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteClick = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <div>
        <Anecdotes anecdote={anecdotes[selected]} vote={vote[selected]} />
        <Button text={"Next Anecdote"} onClick={nextAnecdoteClick}></Button>
        <Button text={"Vote"} onClick={voteClick}></Button>
        <MostVoted anecdotes={anecdotes} votes={vote} />
      </div>
    </>
  );
}

export default App;
