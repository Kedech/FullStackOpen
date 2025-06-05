import Languages from "./Languages";
import Weather from "./Weather";

function Country({ country }) {
    
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <Languages languages={Object.entries(country.languages)} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <Weather capital={country.capital[0]} />
    </div>
  );
}

export default Country;