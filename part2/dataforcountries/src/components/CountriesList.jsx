import Country from "./Country";
import { useState } from "react";

function CountriesList({countries}) {    
    const [selectedCountry, setSelectedCountry] = useState(null);

    if(selectedCountry) {
        return <Country country={selectedCountry} />
    }

    if(countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if(countries.length === 0) {
        return <div>No countries found</div>
    }
    if(countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return (
        <>
        {countries.map((country) => (
            <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>show</button>
            </div>
        ))}
        </>
    ) 
}

export default CountriesList;