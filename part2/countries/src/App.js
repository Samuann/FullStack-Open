import React, {useEffect, useState} from 'react';

import CountryList from './components/CountryList';
import CountrySearch from './components/CountrySearch';
import axios from 'axios';

const App = () => {
  const [allCountryList, setAllCountryList] = useState([]);
  const [countrySearchInput, setCountrySearchInput] = useState('');

  const getCountryData = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setAllCountryList(response.data))
  };

  useEffect(getCountryData, []);

  const handleSearchInput = (event) => {
    setCountrySearchInput(event.target.value);
  };

  return (
    <div>
      <CountrySearch searchAction={handleSearchInput} />
      <CountryList searchValue = {countrySearchInput} allCountryList={allCountryList}/>
    </div>
  );
}

export default App;
