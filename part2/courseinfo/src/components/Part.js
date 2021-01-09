import React from 'react';


const Part = (props) => {
    const { parts, courseContent } = props;
    return(
        <>
            <p> {courseContent} {parts}</p>
        </>    
    )
};

 export default Part;