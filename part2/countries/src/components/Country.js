import React from 'react';

const Country = (props) => {
    const {countryData} = props;
    const [allDataOnCountry] = countryData;

    return (
        <div>
            <section>
                <h1>{allDataOnCountry.name}</h1>
                <p>{`capital ${allDataOnCountry.capital}`}</p>
                <p>{`population ${allDataOnCountry.population}`}</p>
            </section>
            <section>
                <h1>languages</h1>
                <ul>
                    {allDataOnCountry.languages.map(language => <li key={language.nativeName} > {language.name} </li>)}
                </ul>
                <img style= {{height: '150px', weight: '150px' }} src={allDataOnCountry.flag} alt="flag"/>
            </section>
        </div>
        
    )
};

export default Country;