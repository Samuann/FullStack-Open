import React, {useEffect, useState} from 'react';
import Country from '../components/Country';
import Countries from '../components/Countries';

const CountryList = (props) => {
    const {searchValue, allCountryList} = props;
    const [filteredList, setFilteredList] = useState([]);

    const filteredCountryList = allCountryList.length && searchValue.length && allCountryList.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()));

    const handleCountrySearch = () => filteredCountryList.length ? setFilteredList([...filteredCountryList]): null;
     // eslint-disable-next-line
    useEffect(handleCountrySearch, [searchValue]);

    const toggleCountryInfo = () => (
        filteredList.map(country => (
            <div>
                <Countries countryName={country.name} country={country}/>
            </div>
        )   
    ));


    const displayFirstTenCountryList = () => filteredList.length < 10 ? 
        toggleCountryInfo() : <p>Too many matches, specify another filter</p>
    
    return (
        <>
            {filteredList.length === 1 && searchValue.length? <Country countryData={filteredList}/> : 
            (<ul style={{paddingInlineStart: '0px'}}>
                {searchValue.length ? displayFirstTenCountryList() : null}
            </ul>)
            }
        </>
    )
}

export default CountryList;