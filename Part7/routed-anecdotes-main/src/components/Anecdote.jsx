const Anecdote = ({ anecdote, vote }) => (
	<div>
		<h2>{anecdote.content}</h2>
		<p>{`author: ${anecdote.author}`}</p>
		<p>
			{`votes: ${anecdote.votes} `}
			<button onClick={()=>{vote(anecdote)}}>vote for this anecdote</button>
		</p>
		<p>{'info: '}<a href={anecdote.info}>link</a></p>
	</div>
)

export default Anecdote