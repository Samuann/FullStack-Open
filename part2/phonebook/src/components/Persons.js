import React from 'react';

const Persons = (props) => {
    const {personsList, newSearchValue, deleteAction } = props;

    const displayAllNames = () => personsList.map( person => 
        (
            <React.Fragment key={person.id}> 
                <li> 
                    {person.name} {person.number}
                </li>
                <button onClick={() => deleteAction(person.id, person.name)}>delete</button>
            </React.Fragment>
        ));

    const displayFilteredName = () => {
        return personsList.filter(people =>  people.name.toLowerCase().includes(newSearchValue.toLowerCase()))
        .map(human => <li key={human.name}> {human.name} {human.number} </li>);
    }

    return (
        <>
            <ul>
                {newSearchValue.length ? displayFilteredName(): displayAllNames()}
            </ul>
        </>    
    );
};

export default Persons;
