const assert = require('node:assert')
const { test, after, beforeEach, describe, before } = require('node:test')
const supertest = require('supertest')
const app = require('../app')

const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./userAPIHelper')

const api = supertest(app)

beforeEach(async () => {
    
	await User.deleteMany({})
    //console.log(await User.countDocuments())
    
	await User.insertMany(helper.initialUsers)
    
})

//##############################################################################

describe('Creating', () => {

    test('password length restriction (<3) returns error', async ()=>{
        
        const newUser = {username: 'abcd', password: 'a', name: 'name'}
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
    })

    ////////////////////////////////////////////////////////////////////////////

    test('username length restriction (<3) returns error', async ()=>{
        
        const newUser = {username: 'a', password: 'fdghfdg', name: 'gdfdfgb'}
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

    })

    ////////////////////////////////////////////////////////////////////////////

    test('username must be unique', async ()=>{
        
        const newUser = {
            username: helper.initialUsers[0].username, 
            password: 'abcd', 
            name: 'name'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
    })

})

after(async() => {

	await mongoose.connection.close()
})