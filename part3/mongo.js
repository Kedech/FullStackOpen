const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const passwordEncoded = encodeURIComponent(password)
const url = `mongodb+srv://cdelgadc:${passwordEncoded}@cluster0.o9ayp6d.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema, 'phonebooks')

const person = new Phone({
    name: process.argv[3],
    number: process.argv[4],
})

if(process.argv.length === 5){
    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    }).catch(err => {
        console.error('Error saving person:', err)
        mongoose.connection.close()
    })
}
else{
    Phone.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).catch(err => {
        console.error('Error fetching phonebook:', err)
        mongoose.connection.close()
    })
}