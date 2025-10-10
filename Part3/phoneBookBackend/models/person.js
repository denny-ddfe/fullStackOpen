const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
		type:String, 
		required:true, 
		minLength:[3, 'Must be at least 3 characters']
	},
  number: {
		type:String, 
		required:true,
		validate: {
			validator: (v)=>{
				return v.length>=8 && /\d{2,3}-\d+/.test(v)
			},
			message: props=>'Must match /\\d{2,3}-\\d+/ ' +
				'and have at least 8 characters' 
		}
	},
}, {
	strict: 'throw'
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

Person = mongoose.model('Person', personSchema)

const checkIdFormat = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Bad ID' });
  }
  next();
};

module.exports = {Person, checkIdFormat}