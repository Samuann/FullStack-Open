import React, {useState} from 'react';
import Country from '../components/Country';

const Countries = (props) => {
    const {countryName, country} = props;
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [toggleOn, setToggleOn] = useState(false);

    const selectCountry = (event) => {
        setSelectedCountry(event.target.attributes.country.value);
        setToggleOn(!toggleOn);
    };
    
    return (
        <div>
            <li style={{display: 'inline-block'}}> {countryName}</li>
            <button onClick={selectCountry} country={countryName}> 
                {selectedCountry === countryName && toggleOn? 'hide' : 'show'} 
            </button>
            {selectedCountry === countryName && toggleOn && <Country countryData={[country]} />}
    </div>
    )
}

export default Countries;