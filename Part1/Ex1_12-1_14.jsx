import { useState } from 'react'

const anecdotes = [
	'If it hurts, do it more often.',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	'The only way to go fast, is to go well.'
]

const Anecdote = ({ix, votes}) => {
	if (ix==-1) {
		return <>No votes yet.</>
	}
	return <>
		{anecdotes[ix]}<br></br>
		has {votes} votes<br></br>
	</>
}

const App = () => {

	const [selected, setSelected] = useState(0)
	const [voteArr, setVotes] = useState(new Array(anecdotes.length).fill(0))
	const [highestIx, setHighest] = useState(-1)
  
	const handleButtonClick = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length))
	}

	//update vote count, and update highest if it's exceeded
	const vote = (selected) => {
		const copy = [...voteArr]
		copy[selected]+=1
		setVotes(copy)
		if (highestIx == -1 || copy[selected] > copy[highestIx]) {
			setHighest(selected)
		}
	}

	//alternative approach for votes - calculate highest index when page is loaded
	const highest = voteArr.reduce((acc, el, ix) => {
		if (el > acc.val) {
			return {index: ix, val: el}
		}
		return acc
	}, {index: 0, val: 0})

  return (
    <div>
			<h1>Anecdote of the day</h1>
      <Anecdote ix={selected} votes={voteArr[selected]}/>
			<button onClick={()=>vote(selected)}>vote</button>
			<button onClick={handleButtonClick}>next anecdote</button>
			<h1>Anecdote with most votes</h1>
			<Anecdote ix={highestIx} votes={voteArr[highestIx]}/>
    </div>
  )
}

export default App
