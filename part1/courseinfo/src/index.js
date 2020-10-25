import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  const {course} = props;

  return (
    <h1>{course}</h1> 
  )
};

const Part = (props) => {
  const { chapter } = props
  return (
    <p> {chapter.part} {chapter.exercises}</p>
  )
}

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      <Part chapter={parts[0]}/>
      <Part chapter={parts[1]}/>
      <Part chapter={parts[2]}/>
    </div>
  )
};

const Total = (props) => {
    const { parts } = props;
    const totalExercises = parts && parts.length ? 
    parts.map(part => part.exercises).reduce((acc,next) => acc + next, 0): null;

    return (
      <p>
        {`Number of exercises ${totalExercises}`}
      </p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      part: 'Fundamentals of React',
      exercises: 10 
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))