import React from 'react';

const Filter= (props) => {
    const {searchAction} = props
    return(
        <form>
            <label>filter shown with:</label>
            <input onChange={searchAction}/>
        </form>
    )
};

export default Filter;

