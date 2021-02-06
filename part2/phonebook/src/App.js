import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  const getPersonsData = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    });
  }

  //useEffect by default is runs after every completed render
  useEffect(getPersonsData, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  }
  
  const filterName = persons ? persons.filter(person => (person.name.toLowerCase() === newName.toLowerCase())) : null;

  const addNewName = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number: newNumber
    };
    
    if (filterName && filterName.length) {
      return alert(`${newName} is already added to phonebook`)
    } 
    return setPersons(persons.concat(noteObject))

  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter searchAction={handleSearch} />
      </div>  
      <div>
        <h2>add a new</h2>
        <PersonForm 
          submitAction={addNewName}
          newNameValue={newName}
          nameChangeAction={handleNameChange} 
          newNumberValue={newNumber}
          numberChangeAction={handleNumberChange}
        />
        <h2>Numbers</h2>
        {persons && <Persons personsList={persons} newSearchValue={newSearch} />}
      </div>
    </>
  );
}

export default App;

