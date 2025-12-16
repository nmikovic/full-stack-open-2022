const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mikovicnm_db_user:${password}@cluster0.mmctcxh.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    Person
        .find({})
        .then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
} else {

    const person = new Person({
        name: process.argv[3], number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}