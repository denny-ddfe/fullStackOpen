import Toggleable from "./Toggleable"

const Blog = ({ blog, like, remove, showDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className='blogHeading'>{blog.title} by {blog.author}</div>
      <Toggleable buttonLabel='view' hideLabel='hide' >
        <br></br>
        <span className="blogUrl">url: {blog.url}</span>
        <br></br>
        <span className='blogLikes'>likes: {blog.likes}</span><button
          onClick={async()=>{
            await like(blog)
          }
        }>like</button>
        <br></br>
        <span className="blogContributor">contributor: {blog.user.name}</span>
      </Toggleable>
      {showDelete && <button onClick={async()=>{
        remove(blog)
      }}>remove</button>}
    </div>
  )
}

export default Blog