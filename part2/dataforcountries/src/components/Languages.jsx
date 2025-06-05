function Languages({ languages }) {
  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {languages.map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
    </div>
  );
}

export default Languages;