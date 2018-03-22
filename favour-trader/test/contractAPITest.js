let User = require("../models/user.js")
let Skill = require("../models/skill")
let Contract = require("../models/contract.js")
let ObjectID = require('mongodb').ObjectID
const mongoose = require("mongoose")

process.env.NODE_ENV = 'test'

let chai = require("chai")
let chaiHttp = require('chai-http');

let expect = chai.expect
let should = chai.should()
chai.use(chaiHttp);


var token
var baseUrl = "http://localhost:3002"
var endpointUrl = baseUrl + "/api/contracts"

var skillIds = [
    new ObjectID(),
    new ObjectID(),
    new ObjectID()
]

var userIds = [
    new ObjectID(),
    new ObjectID(),
    new ObjectID()
]

var skills = [
    {
        _id: skillIds[0],
        skill: "Cool Skateboard Tricks"
    },
    {
        _id: skillIds[1],
        skill: "Skullduggery"
    },
    {
        _id: skillIds[2],
        skill: "Shenanigans"
    }
]

var users = [
    {
        _id: userIds[0],
        name: {
            first: "Mark",
            last: "Ripptoe"
        },
        address: {
            postalCode: "r3p1z2",
            street: "Fake St",
            number: 55,
            city: "Soykaf",
            state: "Machine",
            country: "Glorious Nihon"
        },
        about: "I'm the testiest user there is!",
        email: "test@test.ca",
        password: "password",
        has: [
            {
                category: {
                    _id: skillIds[0],
                },
                description: "Like the sport."
            }
        ],
        wants: [
            {
                category: {
                    _id: skillIds[1],
                },
                description: "I need some quark gluon plasma."
            }
        ]
    },
    {
        _id: userIds[1],
        name: {
            first: "Shark",
            last: "Hamil"
        },
        address: {
            postalCode: "x0x0xA",
            street: "Last Jedi Road",
            number: 8,
            city: "Tattoo Knee",
            state: "Decay",
            country: "Alderode"
        },
        about: "I'm the testiest teacher there is!",
        email: "jebi@theforke.rom",
        password: "password",
        has: [
            {
                category: {
                    _id: skillIds[2],
                },
                description: "I can do Processing and not much else."
            },
            {
                category: {
                    _id: skillIds[0],
                },
                description: "Like the sport. Mathletics."
            }
        ],
        wants: [
            {
                category: {
                    _id: skillIds[1],
                },
                description: "I need someone to take my stolen goods."
            },
        ]
    },
    {
        _id: userIds[2],
        name: {
            first: "Clark",
            last: "Kent"
        },
        address: {
            postalCode: "123456",
            street: "Fake St",
            number: 7890,
            city: "ABCD",
            state: "EF",
            country: "Free Country USA"
        },
        about: "I'm the not testiest user there is :c",
        email: "uber@mensch.de",
        password: "crassword",
        has: [
            {
                category: {
                    _id: skillIds[1],
                },
                description: "Like the sport."
            },
            {
                category: {
                    _id: skillIds[2],
                },
                description: "Like the sport."
            }
        ],
        wants: [
            {
                category: {
                    _id: skillIds[0],
                },
                description: "I need some quark gluon plasma."
            }
        ]
    }
]

var contracts = [

]


// //PROMISES
// var addUsers = new Promise(async function(resolve,reject){
//     var results = []
//     for (const user of users){
//         newUser = new User(user)
//         await newUser.save((err,newUser)=>{
//             if(err){
//                 console.log(err)
//                 reject(err)
//             } else {
//                 results.push(newUser)
//             }
//         })
//     }
//     resolve(results);
// })

var addUsers = users.map((user)=>{
    return new Promise((resolve,reject)=>{
        newUser = new User(user)
        newUser.save((err,res)=>{
            if(err){
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
})

var addSkills = new Promise((resolve, reject) => {
    Skill.insertMany(skills, (error, docs) => {
        if (error) {
            reject(err)
        }
        else {
            resolve(docs)
        }
    })
})

var connect = new Promise((resolve, reject) => {
    require('dotenv').config({ path: __dirname + '/../.env' })
    process.env.NODE_ENV = 'test'
    let db = require("../db")
    server = require('../server')
    db.getConnection(false)
    resolve('connected')
})

function login(){
    return new Promise((resolve,reject)=>{
        chai.request(baseUrl)
        .post("/api/users/login")
        .send({
            email: "test@test.ca",
            password: "password"
        })
        .end((err, res) => {
            if (err) {
                // console.log(err)
                reject(err)
            }
            token = res.body.token;
            console.log("Token" + token)
            resolve(res.body.token)
        })
    })
}
//END OF PROMISES

//TESTS
describe("Contract API Tests", () => {
    before((done) => {
        connect.then((connectionResult) => {
            addSkills.then((skillsResult) => {
                Promise.all(addUsers).then((userResults) => {
                        // console.log("Here's what happened:\nConnection: "+connectionResult+"\nSkills: "+skillsResult+"\nUsers: "+userResults+"\nLogin: \n")
                        login().then((loginResult)=>{
                            done()
                        })
                })
            })
        })
    })

    afterEach((done) => {
        Contract.remove({}, () => {
            done()
        })
    })

    after((done) => {
        User.remove({}, () => {
            Skill.remove({}, () => {
                mongoose.disconnect()
                done()
            })
        })
    })

    describe("get / Test", (done) => {
        it("Should return nothing if current user hasn't made any contracts", (done) => {
            chai.request(endpointUrl)
                .get("/")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body).to.have.lengthOf(0)
                    done()
                })
        })

        it("Should return some stuff if current user has contracts", (done) => {
            done()
        })

        it("Should return both active and inactive contracts if current user has contracts", (done) => {
            done()
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
                .get("/")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .get("/")
                .set("Authorization", token + "101010101010001010")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe("post / Test", (done) => {

    })

    describe("get /active Test", (done) => {

    })

    describe("get /received Test", (done) => {

    })

    describe("get /sent Test", (done) => {

    })

    describe("put /:id Test", (done) => {

    })

    describe("put /:id/terminate Test", (done) => {

    })
})