import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = ({course}) => {
    const sumOfexercises = course.parts.reduce((sum, part) => {return sum + part.exercises}, 0);
    return(
        <>
            <Header title = {course.name}/>
            <Content parts = {course.parts}/>
            <b>total of {sumOfexercises} exercises</b>
        </>
    )
}
export default Course