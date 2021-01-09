import React from 'react';
import Part from './Part';

const Content = (props) => {
    const { coursePart } = props;
    const exercises = coursePart.map(exercise => exercise.exercises);
    const total = exercises.reduce((sum, parts) => sum + parts, 0);
    return(
        <>
            {coursePart.map( part => <Part parts={part.exercises} courseContent={part.name} key={part.id}/>)}
            <p style={{fontWeight: 600}}> {`total is ${total} exercises`} </p>
        </>    
    )
};

export default Content;