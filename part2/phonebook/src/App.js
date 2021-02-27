import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsServices from './services/personsService';

const Notification = (props) => {
  const { message } = props;

  const successStyle = {
    border: '2px green solid',
    backgroundColor: '#d8d9dd',
    padding:'10px',
    color: 'green'
  }

  const failureStyle = {
    border: '2px red solid',
    backgroundColor: '#d8d9dd',
    padding:'10px',
    color: 'red'
  }

  return message ? (
    <h3 style={!message.isError ? successStyle : failureStyle}> {message.message}</h3>
  ) : null
};

const App = () => {
  const [ persons, setPersons ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  const [ newNotificationMessage, setNewNotificationMessage ] = useState(null);

  const getPersonsData = () => {
    personsServices.readPersonData()
    .then(response => {
      setPersons(response)
    });
  };

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

  const ensureBothInputExistNotification = () => {
    setNewNotificationMessage(
      { 
        message: `Please ensure both name and phone number is added`, 
        isError: true
      }
    );
    setTimeout(() => {
      setNewNotificationMessage(null)
    }, 5000);
  }
  
  // if person's name exist on the list check for difference in phone number, i.e new input versus already existing number, 
  // if there is a difference then list is updated and the phone number for person's matching id is replaced
  const isNotSameNumber = (person) => {
    const [personMatch] = person;
    const updatedNumber = {...personMatch, number: newNumber};
    const confirmNumberMessage = window.confirm(`${updatedNumber.name} is already added to phonebook, replace old number with new one?`);

    return confirmNumberMessage && updatedNumber.name.length && updatedNumber.number.length ? (personsServices.updatePersonData(updatedNumber, updatedNumber.id)
    .then(response => setPersons(persons.map(peps => peps.name === newName ? response : peps))))
    .then(setNewNotificationMessage(
      { 
        message: `Phone number updated  `, 
        isError: false
      }
      ))
    .then(setTimeout(() => {
      setNewNotificationMessage(null)
    }, 5000))
    .catch(error => {
      setNewNotificationMessage(
        {
        message: `Information of ${updatedNumber.name} has already been removed from server`, 
        isError: true
        }
      );
      setTimeout(() => {
        setNewNotificationMessage(null);
      }, 5000);
    }) 
    : ensureBothInputExistNotification();
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

    // if name with phone number exists return alert to show this
    if(filterJustName?.length) {
      return alert(`${newName} is already added to phonebook`)
    }
    
    // to ensure that both input fields for name and phone number is filled before a new list is created in phonebook
    return newName.length && newNumber.length  ?  (personsServices.createPersonData(noteObject)
    .then(response => setPersons(persons.concat(response)))
    .then(setNewNotificationMessage(
      { 
        message: `Added ${noteObject.name}`, 
        isError: false
      }
      ))
    .then(setTimeout(() => {
      setNewNotificationMessage(null)
    }, 5000))) : ensureBothInputExistNotification();

  };

  const filterPersonsDeletion = (id, response) => {
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
        <Notification message={newNotificationMessage}/>
        <h2>Phonebook</h2>
        <Filter searchAction={handleSearch} />
      </div>  
      <div>
        <h2>add a new phone number</h2>
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

