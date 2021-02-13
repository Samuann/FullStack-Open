import React, {useState} from 'react';
import Country from '../components/Country';

const Countries = (props) => {
    const {countryName, toggleAction, selected, id, country} = props;

    const countrySelected = () => toggleAction(id);
    return (
        <div>
            <li style={{display: 'inline-block'}}> {countryName}</li>
            <button onClick={countrySelected} country={countryName}> 
                {selected? 'hide' : 'show'} 
            </button>
            {selected && <Country countryData={[country]} />}
    </div>
    )
}

export default Countries;