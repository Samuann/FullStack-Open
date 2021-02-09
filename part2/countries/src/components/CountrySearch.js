import React from 'react';

const CountrySearch = (props) => {
    const {searchAction} = props
    return (
        <form>
            <label>find country:</label>
            <input onChange={searchAction}/>
        </form>
    )
}

export default CountrySearch;