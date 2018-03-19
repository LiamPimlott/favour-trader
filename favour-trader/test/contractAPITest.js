let User = require("../models/user.js");
let Skill = require("../models/skill");
let Contract = require("../model/contract.js");
let ObjectID = require('mongodb').ObjectID;
const mongoose = require("mongoose");

let chai = require("chai");
let expect = chai.expect;
let should = chai.should();

var skillIds = [ 
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

var addUsers = new Promise((resolve)=>{
    User.insertMany(users,(error,docs)=>{
        if(error){
            console.log(error) 
         }
         resolve()
    })
})

var addSkills = new Promise((resolve)=>{
    Skill.insertMany(skills,(error,docs)=>{
        if(error){
            console.log(error) 
        }
        resolve()
    })
})

var connect = new Promise((resolve)=>{
    require('dotenv').config({ path: __dirname + '/../.env' });
    process.env.NODE_ENV = 'test';
    let db = require("../db");
    server = require('../server');
    db.getConnection(false);
    resolve('connected')
})

describe.only("Contract API Tests", () => {
    before((done)=>{
        connect.then((result)=>{
            addSkills.then((result)=>{
                addUsers.then((result)=>{
                    done();
                })
            })
        })
    })

    afterEach((done)=>{
        Contract.remove({},()=>{
            done();
        })
    })

    after((done)=>{
        User.remove({},()=>{
            Skill.remove({},()=>{
                mongoose.disconnect();
                done();
            })
        })
    })

    describe("get /ALL Test",(done)=>{
        
    })

    describe("get / Test",(done)=>{
        
    })
    
    describe("post / Test",(done)=>{
        
    })

    describe("get /active Test",(done)=>{
        
    })

    describe("get /received Test",(done)=>{
        
    })

    describe("get /sent Test",(done)=>{
        
    })

    describe("put /:id Test",(done)=>{
        
    })

    describe("put /:id/terminate Test",(done)=>{
        
    })
})