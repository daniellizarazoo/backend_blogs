const bycrypt = require('bcrypt')
const {test,describe,after,beforeEach} = require('node:test')
const assert = require('assert');
const helper = require('../utils/test_helper')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

describe('when there is initially one user in db',()=>{

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bycrypt.hash('secret',10)
        const user = new User({
            username: 'root',
            email: 'admin@gmail.com',
            password: passwordHash
        })

        await user.save()
    })

    test('creation succeeds with a fresh username', async() =>{

        const usersAtStart = await helper.usersInDb()
        console.log('usersAtStart :>> ', usersAtStart);

        const newUser = {
                username: 'daniel',
                email: 'daniel@gmail.com',
                password: 'natasha11'
            }
        
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length,usersAtStart.length+1)

        const usernames = usersAtEnd.map(u=>u.username)
        assert(usernames.includes(newUser.username))
    })

    after(async ()=>{
        await mongoose.connection.close()
    })


})