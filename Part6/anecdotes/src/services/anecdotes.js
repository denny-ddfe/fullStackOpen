const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

const voteFor = async(anecdote) => {
	const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
			content: anecdote.content, 
			votes: anecdote.votes+1
		}),
  }

	const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

	if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

export default { getAll, createNew, voteFor }