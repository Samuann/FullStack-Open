import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Ada Lovelace', number: '049-12345678'},
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  }
  
  const filterName = persons.filter(person => (person.name.toLowerCase() === newName.toLowerCase()));

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
        <Persons personsList={persons} newSearchValue={newSearch} />
      </div>
    </>
  );
}

export default App;

