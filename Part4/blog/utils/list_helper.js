const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => acc+blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {return null}
	return blogs.reduce((best, blog) => blog.likes>best.likes?blog:best, blogs[0])
}

//generic map constructor from array.
//Kind of like a SQL group by over keyName.
const getMap = (arr, keyName, aggregator) => {
	const res = new Map()
	arr.forEach((el)=>{
		if (res.has(el[keyName])) {
			res.set(el[keyName], res.get(el[keyName]) + aggregator(el))
		}
		else {
			res.set(el[keyName], aggregator(el))
		}
	})

	return res
}

//get best entry from constructed map
const getBest = (m, keyName, prop) => {

	return Array.from(m.keys()).reduce(
		(best, key) => {
			const current = m.get(key)
			if (current>best[prop]) {
				return {[keyName]: key, [prop]: current}
			}
			return best
		},
		{[keyName]: null, [prop]: -1}
	)

}

//instance of map/best functionality for most blogs
const mostBlogs = (blogs) => {

	if (blogs.length === 0) {return null}
	const blogCounts = getMap(blogs, 'author', (_blog)=>1)
	return getBest(blogCounts, 'author', 'blogs')

}

//instance of map/best functionality for most likes
const mostLikes = (blogs) => {

	if (blogs.length === 0) {return null}
	const likeCounts = getMap(blogs, 'author', (blog)=>blog.likes)
	return getBest(likeCounts, 'author', 'likes')

}

module.exports = {
  dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}