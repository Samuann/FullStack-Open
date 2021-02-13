import React from 'react';
import Weather from './Weather';

const Country = (props) => {
    const {countryData} = props;
    const [allDataOnCountry] = countryData;
    return (
        <div style={{maxWidth: '50%'}}>
            <section>
                <h1>{allDataOnCountry.name}</h1>
                <p>{`capital ${allDataOnCountry.capital}`}</p>
                <p>{`population ${allDataOnCountry.population}`}</p>
            </section>
            <section>
                <h3>languages</h3>
                <ul>
                    {allDataOnCountry.languages.map(language => <li key={language.nativeName} > {language.name} </li>)}
                </ul>
                <img style= {{height: '150px', weight: '150px' }} src={allDataOnCountry.flag} alt="flag"/>
            </section>
            <section style={{marginBottom: '50px'}}>
                <Weather countryName={allDataOnCountry.name}/>
            </section>
        </div>
        
    )
};

export default Country;