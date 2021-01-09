import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = (props) => {
    const { course } = props;

    return (
        <>
            <Header heading={course.name} />
            <Content coursePart={course.parts} />
        </>
    )
};

export default Course;