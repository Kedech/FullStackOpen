const TotalExercises = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div>
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}

const Part = ({part}) => {
    return(
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Content = ({parts}) => {
    return(
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Course = ({course}) =>{
    return(
        <div>
            <h1>{course.name}</h1>
            <Content parts={course.parts} />
            <TotalExercises parts={course.parts} />
        </div>
    )
}

export default Course;