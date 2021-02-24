import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsServices from './services/personsService';

const App = () => {
  const [ persons, setPersons ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  const getPersonsData = () => {
    personsServices.readPersonData()
    .then(response => {
      setPersons(response)
    });
  };

  //useEffect by default runs after every completed render
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
  
  //check for difference in phone number, if there is a difference then list is updated and the number for matching id is replaced
  const isNotSameNumber = (person) => {
    const [personMatch] = person;
    const updatedNumber = {...personMatch, number: newNumber};
    const confirmNumberMessage = window.confirm(`${updatedNumber.name} is already added to phonebook, replace old number with new one?`);

    return confirmNumberMessage ? (personsServices.updatePersonData(updatedNumber, updatedNumber.id)
    .then(response => setPersons(persons.map(peps => peps.name === newName ? response : peps)))) : null;
  };

  const addNewName = (event) => {
    event.preventDefault();

    const noteObject = {
      name: newName,
      number: newNumber
    };

  const filterNameAndNumber = persons ? persons.filter(person => (person.name.toLowerCase() === newName.toLowerCase()) && (person.number !== newNumber) ) : null;
  const filterJustName = persons ? persons.filter(person => (person.name.toLowerCase() === newName.toLowerCase()) && (person.number === newNumber) ) : null;

    if (filterNameAndNumber?.length) {
      return isNotSameNumber(filterNameAndNumber);
    };

    if(filterJustName?.length) {
      return alert(`${newName} is already added to phonebook`)
    }
    
    return personsServices.createPersonData(noteObject)
    .then(response => setPersons(persons.concat(response)))

  };

  const filterPersonsDeletion = (id, response) => {
    console.log(response, 'response');
    return persons.filter(person => person.id !== id);
  }

  const deletePersons = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      return personsServices.deletePersonData(id)
      .then(response => setPersons(filterPersonsDeletion(id)))
      .catch(error => alert('error has occured'));
    }
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
        {persons && <Persons personsList={persons} newSearchValue={newSearch} deleteAction={deletePersons}/>}
      </div>
    </>
  );
}

export default App;

