const Header = (props) => {
  return (<h1>{props.course.name}</h1>)
}

const Content = (props) => {
  return(
    <>
      {props.course.parts.map((item) => (
      <Part key={item.id} part={item}/>
      ))}
    </>
  )
}

const Part = ({part}) => {
	return <p>{part.name} {part.exercises}</p>
}

const Total = (props) => {
  return (<b>
		Number of exercises{' '}
		{props.course.parts.reduce((acc, el)=>acc+el.exercises,0)}
		</b>
	)
}

const Course = ({course}) => {
	return <>
	<Header course={course} />
	<Content course={course} />
	<Total course={course} />
</>
}

export default Course