import React from 'react';

const Persons = (props) => {
    const {personsList, newSearchValue } = props;

    const displayAllNames = () => personsList.map( person => <li key={person.name}> {person.name} {person.number}</li>);

    const displayFilteredName = () => {
        return personsList.filter(people =>  people.name.toLowerCase().includes(newSearchValue.toLowerCase()))
        .map(human => <li key={human.name}> {human.name} {human.number} </li>);
    }

    return (
        <ul>
            {newSearchValue.length ? displayFilteredName(): displayAllNames()}
        </ul>
    );
};

export default Persons;