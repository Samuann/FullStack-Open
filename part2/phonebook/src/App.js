import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [ newName, setNewName ] = useState('')
  
  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  
  const filterName = persons.filter(person => (person.name.toLowerCase() === newName.toLowerCase()));

  const addNewName = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName
    };
    
    if (filterName && filterName.length) {
      return alert(`${newName} is already added to phonebook}`)
    } 
    return setPersons(persons.concat(noteObject))

  }

  const Persons = () => (
          <ul>
        {persons.map( person => 
          <li key={person.name}> {person.name} </li>
        )}
      </ul>
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          <label for='personName'>name:</label>
          <input value={newName} name='personName' onChange={handleChange}/>
        </div>
        <div>
        <label for='phoneNumber'>number:</label>
        <input name='phoneNumber'/>
        </div>
        <div>
          <button type="submit">add</button>
          <div> {newName} </div>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons/>
    </div>
  );
}

export default App;
