function PersonForm({handleNameChange, handleNumberChange, addPhone, newName, newNumber}) {
  return (
    <form onSubmit={addPhone}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />            
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />            
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )  
}

export default PersonForm