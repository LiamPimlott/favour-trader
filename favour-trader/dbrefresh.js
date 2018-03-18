const mongoose = require("mongoose");
let User = require("./models/user");
let Skill = require("./models/skill");
let Contract = require("./models/contract");
let ObjectID = require('mongodb').ObjectID

require('dotenv').config({ path: __dirname + '/../.env' });
server = require('./server');
let db = require("./db");
db.getConnection(false);

var skillIds = [ 
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
    new ObjectID(),
]

var skills = [
    {
        _id: skillIds[0],
        skill: "Fencing"
    },
    {
        _id: skillIds[1],
        skill: "Dancing"
    },
    {
        _id: skillIds[2],
        skill: "Programming"
    },
    {
        _id: skillIds[3],
        skill: "Mathematics"
    },
    {
        _id: skillIds[4],
        skill: "Plumbing"
    },
    {
        _id: skillIds[5],
        skill: "Taxidermy"
    },
    {
        _id: skillIds[6],
        skill: "Nuclear Physics"
    },
    {
        _id: skillIds[7],
        skill: "Genetic Engineering"
    },
    {
        _id: skillIds[8],
        skill: "Painting"
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
                    _id: skillIds[6],
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
                    _id: skillIds[3],
                },
                description: "Like the sport. Mathletics."
            },
            {
                category: {
                    _id: skillIds[4],
                },
                description: "Not the porno kind, just the regular kind. Sorry."
            },
            {
                category: {
                    _id: skillIds[5],
                },
                description: "Mostly freaky meat eating llamas."
            }
        ],
        wants: [
            {
                category: {
                    _id: skillIds[0],
                },
                description: "I need someone to take my stolen goods."
            }
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
                    _id: skillIds[8],
                },
                description: "Like the sport."
            }
        ],
        wants: [
            {
                category: {
                    _id: skillIds[6],
                },
                description: "I need some quark gluon plasma."
            }
        ]
    }
]

var removeSkills = new Promise((resolve) => {
    Skill.remove({},(err) => {
        if(err){
            console.log(err)        
        } else {
            resolve(true)
        }
    })
})

var removeUsers = new Promise((resolve) => {
    User.remove({},(err) => {
        if(err){
            console.log(err)        
        } else {
            resolve(true)
        }
    })
})

var removeContracts = new Promise((resolve) => {
    Contract.remove({},(err) => {
        if(err){
            console.log(err)        
        } else {
            resolve(true)
        }
    })
})

var addSkills = new Promise((resolve) => {
    Skill.insertMany(skills, (error, docs) => {
        if(!error){
            resolve(true)
        } else {
            console.log(error)
            resolve(false)
        }
    })
})

var addUsers = new Promise(async function(resolve){
        for (const user of users){
            newUser = new User(user)
            await newUser.save((err)=>{
                console.log(err)
            })
        }
        resolve();
})

removeContracts.then((result)=>{
    removeUsers.then((result)=>{
        removeSkills.then((result)=>{
            addSkills.then((result)=>{
                addUsers.then((result)=>{
                            mongoose.disconnect();
                            console.log("We're done.")
                            process.exit()
                })
            })
        })
    })
})