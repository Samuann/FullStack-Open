import React, {useEffect, useState} from 'react';

import Countries from '../components/Countries';
import Country from '../components/Country';

const CountryList = (props) => {
    const {searchValue, allCountryList} = props;
    const [filteredList, setFilteredList] = useState([]);
    const [toggle, setToggle] = useState({});
    const handleToggle = (id) => {
        setToggle(
            {
                ...toggle,
                [id]: !toggle[id],
            }
        );
    }

    const filteredCountryList = allCountryList.length && searchValue.length && allCountryList.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()));

    const handleCountrySearch = () => filteredCountryList.length ? setFilteredList([...filteredCountryList]): null;
     // eslint-disable-next-line
    useEffect(handleCountrySearch, [searchValue]);

    const toggleCountryInfo = () => (
        filteredList.map(country => {
            const indexCountry = filteredCountryList.indexOf(country);
            return (
                <div key={indexCountry}>
                    <Countries 
                    countryName={country.name} 
                    country={country} 
                    toggleAction={handleToggle} 
                    selected={toggle[indexCountry]} 
                    id={indexCountry}/>
                </div>
            )
        }   
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