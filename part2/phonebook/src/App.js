import React, { useState } from 'react';


const FilterSearch = (props) => {
  const {searchAction} = props
  return(
    <div>
      <h2>Phonebook</h2>
      <form>
        <label>filter shown with:</label>
        <input onChange={searchAction}/>
      </form>
    </div>
  )
};

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    {name: 'Ada Lovelace', number: '049-12345678'}
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  console.log(newSearch.toLowerCase(), 'lowerCase')
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

  const displayAllNames = () => persons.map( person => <li key={person.name}> {person.name} {person.number}</li>);

  const displayFilteredName = () => {
    return persons.filter(people =>  people.name.toLowerCase().includes(newSearch.toLowerCase())).map(per => <li> {per.name} {per.number} </li>)
  }

  const personsList = () => (
      <ul>
        {newSearch.length ? displayFilteredName(): displayAllNames()}
      </ul>
  );
  
  return (
    <>
      <FilterSearch searchAction={handleSearch} />
      <div>
        <h2>add a new</h2>
        <form onSubmit={addNewName}>
          <div>
            <label htmlFor='personName'>name:</label>
            <input value={newName} name='personName' onChange={handleNameChange}/>
          </div>
          <div>
          <label htmlFor='phoneNumber'>number:</label>
          <input value={newNumber} name='phoneNumber' onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
            <div> {newName} </div>
          </div>
        </form>
        <h2>Numbers</h2>
        {personsList()}
      </div>
    </>
  );
}

export default App;
