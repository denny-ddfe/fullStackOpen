require('dotenv').config()
const mongoose = require('mongoose')

//exactly 3: no number given
if (process.argv.length===3) {
	console.log('invalid argument count')
	process.exit(1)
}

//get the password from dotenv

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

//make data schema and 
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===2) {

	Person.find({}).then(result => {
		console.log('phonebook:')
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})

} else {

	const person = new Person({
		name: process.argv[2],
		number: process.argv[3]
	})

	person.save().then(result => {
		console.log(result)
		console.log(`added ${result.name} number ${result.number} to phonebook`)
		mongoose.connection.close()
	})

}
