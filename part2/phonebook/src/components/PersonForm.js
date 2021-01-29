import React from 'react';

const PersonForm = (props) => {
    const { submitAction, newNameValue, nameChangeAction, newNumberValue, numberChangeAction } = props;

    return (
        <form onSubmit={submitAction}>
        <div>
            <label htmlFor='personName'>name:</label>
            <input value={newNameValue} name='personName' onChange={nameChangeAction}/>
        </div>
        <div>
            <label htmlFor='phoneNumber'>number:</label>
            <input value={newNumberValue} name='phoneNumber' onChange={numberChangeAction}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
};

export default PersonForm;