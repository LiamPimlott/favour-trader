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

//DATA
var invalidId = new ObjectID()

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
    {//user[0] - the one we log in with
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
            },
        ],
        wants: [
            {
                category: {
                    _id: skillIds[1],
                },
                description: "I need some quark gluon plasma."
            },
            {
                category: {
                    _id: skillIds[2],
                },
                description: "Like the sport."
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

var favours = [
    {
       skillId: skillIds[0],
       description: "Winky Face",
       completed: false
    },
    {
        skillId: skillIds[1],
        description: "Wonky Face",
        completed: false
     },
     {
        skillId: skillIds[2],
        description: "Wanky Face (eww)",
        completed: false
     },
     {//favours[3]
        skillId: skillIds[0],
        description: "Cranky Face",
        completed: true
     },
     {
         skillId: skillIds[1],
         description: "Chunky Face",
         completed: true
      },
      {
         skillId: skillIds[2],
         description: "Lanky Face (eww)",
         completed: true
      }
 ]

var contracts = [
    {//contracts[0] - pending contract between user0 and user2
        offeror: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        offeree: {
            id: userIds[2],
            favours: favours[2],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[1] - pending contract between user1 and user2
        offeror: {
            id: userIds[1],
            favours: favours[2],
            name: {
                first: users[1].name.first,
                last: users[1].name.last
            },
            requestTermination: false
        },
        offeree: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[2] - accepted contract between user2 and user0
        offeror: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },  
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Accepted',
        messages: []
    },
    {//contracts[3] - declined contract between user2 and user0
        offeror: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },  
            requestTermination: true
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Declined',
        messages: []
    },
    {//contracts[4] all zeroes
        offeror: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[5] - pending contract between user2 and user0
        offeror: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },  
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[6] - accepted contract between user2 and user0
        offeror: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },  
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Accepted',
        messages: []
    },
    {//contracts[7] - accepted contract between user2 and user0, user 2 has requested termination
        offeror: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },  
            requestTermination: true
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Accepted',
        messages: []
    },
    {//contracts[8] - accepted contract between user2 and user0
        offeror: {
            id: userIds[2],
            favours: favours[1],
            name: {
                first: users[2].name.first,
                last: users[2].name.last
            },  
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Accepted',
        messages: []
    },
]

var badContracts = [
    {//contracts[0] - missing offeror
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[1] - missing offeree
        offeror: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[2] - missing a user id in offeror
        offeror: {
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[3] - missing a favour in offeror
        offeror: {
            id: userIds[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    },
    {//contracts[4] - missing a name in offeror
        offeror: {
            id: userIds[0],
            favours: favours[0],
            requestTermination: false
        },
        offeree: {
            id: userIds[0],
            favours: favours[0],
            name: {
                first: users[0].name.first,
                last: users[0].name.last
            },
            requestTermination: false
        },
        status: 'Pending',
        messages: []
    }
]
//END OF DATA
//PROMISES
var addUsers = users.map((user) => {
    return new Promise((resolve, reject) => {
        newUser = new User(user)
        newUser.save((err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
})

function addSkills() {
return new Promise((resolve, reject) => {
    Skill.insertMany(skills, (error, docs) => {
        if (error) {
            reject(error)
        }
        else {
            resolve(docs)
        }
    })
})
}

function connect() {
    return new Promise((resolve, reject) => {
    require('dotenv').config({ path: __dirname + '/../.env' })
    process.env.NODE_ENV = 'test'
    let db = require("../db")
    server = require('../server')
    db.getConnection(false)
    resolve('connected')
})
}

function login() {
    return new Promise((resolve, reject) => {
        chai.request(baseUrl)
        .post("/api/users/login")
        .send({
            email: "test@test.ca",
            password: "password"
        })
        .end((err, res) => {
            if (err) {
                reject(err)
            }
            token = res.body.token;
            resolve(res.body.token)
        })
    })
}

function clearDB() {
    return new Promise((resolve, reject) => {
        User.remove({}, () => {
            Skill.remove({}, () => {
                Contract.remove({}, () => {
                    resolve()
                })
            })
        })
    })
}
//END OF PROMISES

//TESTS
describe.only("Contract API Tests", () => {
    before((done) => {
        connect().then((connectionResult) => {
            clearDB().then((clearDBResult) => {
                addSkills().then((skillsResult) => {
                    Promise.all(addUsers).then((userResults) => {
                        login().then((loginResult) => {
                                //console.log(loginResult)
                                done()
                            })
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
                    expect(res.body.contracts).to.have.lengthOf(0)
                    done()
                })
        })

        it("Should return some stuff if current user has contracts", (done) => {
            newContract = new Contract(contracts[0])
            newContract.save((err, res) => {
                chai.request(endpointUrl)
                .get('/')
                .set("Authorization", token)
                    .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.contracts).to.have.lengthOf(1)
                    done()
                })
            })
        })

        it("Should return both active and inactive contracts if current user has contracts", (done) => {
            Contract.insertMany([contracts[0], contracts[2], contracts[3]], (err, docs) => {
                chai.request(endpointUrl)
                .get('/')
                .set("Authorization", token)
                    .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.contracts).to.have.lengthOf(3)
                    done()
                })
            })
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
        it("Should return the complete contract we create if the contract is valid.", (done) => {
            chai.request(endpointUrl)
            .post('/')
            .set("Authorization", token)
            .send(contracts[0])
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.status).to.equal(200)
                    expect(res.body.contract.offeror.id).to.equal(String(contracts[0].offeror.id))
                    expect(res.body.contract.offeree.id).to.equal(String(contracts[0].offeree.id))
                    expect(res.body.contract.status).to.equal('Pending')
                    done()
            })
        })

        it("Should say required fields are missing when we have no offeror", (done) => {
            chai.request(endpointUrl)
            .post('/')
            .set("Authorization", token)
            .send(badContracts[0])
                .end((err, res) => {
                    expect(err.name).to.equal('Error')
                    expect(res.status).to.equal(400)
                    expect(res.text).to.equal("Required fields are missing.")
                    done()
            })
        })

        it("Should say required fields are missing when we have no offeree", (done) => {
            chai.request(endpointUrl)
            .post('/')
            .set("Authorization", token)
            .send(badContracts[1])
                .end((err, res) => {
                    expect(err)
                    expect(res.status).to.equal(400)
                    expect(res.text).to.equal("Required fields are missing.")
                    done()
            })
        })

        it("Should say required fields are missing when we have no user id in offeror", (done) => {
            chai.request(endpointUrl)
            .post('/')
            .set("Authorization", token)
            .send(badContracts[2])
                .end((err, res) => {
                    expect(err)
                    expect(res.status).to.equal(400)
                    expect(res.text).to.equal("Required fields are missing.")
                    done()
            })
        })

        it("Should still create when we have no favours for a party", (done) => {
            chai.request(endpointUrl)
            .post('/')
            .set("Authorization", token)
            .send(badContracts[3])
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.status).to.equal(200)
                    done()
            })
        })

        it("Should say required fields are missing when we have no name in offeror", (done) => {
            chai.request(endpointUrl)
            .post('/')
            .set("Authorization", token)
            .send(badContracts[4])
                .end((err, res) => {
                    expect(err)
                    expect(res.status).to.equal(400)
                    expect(res.text).to.equal("Required fields are missing.")
                    done()
            })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
            .post("/")
            .end((err, res) => {
                expect(err.status).to.equal(401)
                done()
            })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .post("/")
                .set("Authorization", token + "101010101010001010")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe("get /active Test", (done) => {

        it("Should return correct message", (done) => {
            chai.request(endpointUrl)
                .get("/active")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.message).to.equal("All user's active contracts retrieved.")
                    done()
                })
        })

        it("Should return 1 contract", (done) => {
            Contract.insertMany([contracts[2]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/active")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(1)
                        done()
                    })
            })
        })

        it("Should return more than one contract", (done) => {
            Contract.insertMany([contracts[2], contracts[6]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/active")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(2)
                        done()
                    })
            })
        })

        it("Should return nothing if the user has no contracts", (done) => {
            chai.request(endpointUrl)
                .get("/active")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.contracts).to.have.a.lengthOf(0)
                    done()
                })
        })

        it("Should return nothing if user has no active contracts", (done) => {
            Contract.insertMany([contracts[5]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/active")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(0)
                        done()
                    })
            })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
            .get("/active")
            .end((err, res) => {
                expect(err.status).to.equal(401)
                done()
            })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .get("/active")
                .set("Authorization", token + "101010101010001010")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe("get /received Test", (done) => {
        
        it("Should return correct message", (done) => {
            chai.request(endpointUrl)
                .get("/received")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.message).to.equal("All user's received contracts retrieved.")
                    done()
                })
        })
        
        it("Should return nothing if the user has no contracts", (done) => {
            chai.request(endpointUrl)
                .get("/received")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.contracts).to.have.a.lengthOf(0)
                    done()
                })
        })

        it("Should return nothing if the user has contracts, but they initiated all of them.", (done) => {
            Contract.insertMany([contracts[0]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/received")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(0)
                        done()
                    })
            })
        })

        it("Should return 1 contract if the user has one initiated by someone else.", (done) => {
            Contract.insertMany([contracts[5]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/received")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(1)
                        done()
                    })
            })
        })

        it("Should return 1 contract if the user has one initiated by someone else and also ones they initiated.", (done) => {
            Contract.insertMany([contracts[0],contracts[5]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/received")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(1)
                        done()
                    })
            })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
            .get("/received")
            .end((err, res) => {
                expect(err.status).to.equal(401)
                done()
            })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .get("/received")
                .set("Authorization", token + "101010101010001010")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe("get /sent Test", (done) => {
         
        it("Should return correct message", (done) => {
            chai.request(endpointUrl)
                .get("/sent")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.message).to.equal("All user's sent contracts retrieved.")
                    done()
                })
        })

        it("Should return nothing if the user has no contracts", (done) => {
            chai.request(endpointUrl)
                .get("/sent")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.contracts).to.have.a.lengthOf(0)
                    done()
                })
        })
        
        it("Should return 1 contract if the user has initiated it.", (done) => {
            Contract.insertMany([contracts[0]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/sent")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(1)
                        done()
                    })
            })
        })

        it("Should return no contract if the user has one initiated by someone else.", (done) => {
            Contract.insertMany([contracts[2]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/sent")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(0)
                        done()
                    })
            })
        })

        it("Should return 1 contract if the user has one they initiated and also ones they initiated.", (done) => {
            Contract.insertMany([contracts[0],contracts[2]], (error, docs) => {
                chai.request(endpointUrl)
                    .get("/sent")
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(err).to.equal(null)
                        expect(res.body.contracts).to.have.a.lengthOf(1)
                        done()
                    })
            })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
            .get("/sent")
            .end((err, res) => {
                expect(err.status).to.equal(401)
                done()
            })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .get("/sent")
                .set("Authorization", token + "101010101010001010")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe.skip("put /:id/offeror/favours Test", (done) => {
        var contractIds = []
        var invalidId = new ObjectID()

        beforeEach((done)=>{
            //We're logged in as user0. user0 is the 
            Contract.insertMany([contracts[0],contracts[1],contracts[2]],(error,docs)=>{
                for(var i = 0;i<docs.length;i++){
                    contractIds.push(docs[i]._id)
                }
                done()
            })
        })

        afterEach((done)=>{
            contractIds = []
            done()
        })

        it("Should return an success if user is the offeror", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/offeror/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[3]})
                .end((err, res) => {
                    var body = JSON.parse(res.text)
                    expect(body.success).to.equal(true)
                    expect(body.message).to.equal("Offeror favours updated.")
                    expect(body.favours.offeror[0].completed).to.equal(true)
                    done()
                })
        })

        it("Should return a failure without a valid id", (done) => {
            chai.request(endpointUrl)
                .put("/"+invalidId+"/offeror/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Contract not found.")
                    done()
                })
        })

        it("Should return a failure if you aren't involved in a contract", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[1]+"/offeror/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Sorry, you are not the offeror.")
                    done()
                })
        })

        it("Should return a failure if you aren't the offeror in a contract", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/offeror/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Sorry, you are not the offeror.")
                    done()
                })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/offeror/favours")
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/offeror/favours")
                .set("Authorization", token+"010101001001")
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe.skip("put /:id/offeree/favours Test", (done) => {
        var contractIds = []
        var invalidId = new ObjectID()

        beforeEach((done)=>{
            //We're logged in as user0. user0 is the offeror in 0, nothing in 1, and offeree in 2
            Contract.insertMany([contracts[0],contracts[1],contracts[2]],(error,docs)=>{
                for(var i = 0;i<docs.length;i++){
                    contractIds.push(docs[i]._id)
                }
                done()
            })
        })

        afterEach((done)=>{
            contractIds = []
            done()
        })

        it("Should return an success if user is the offeree", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/offeree/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[3]})
                .end((err, res) => {
                    var body = JSON.parse(res.text)
                    expect(body.success).to.equal(true)
                    expect(body.message).to.equal("Offeror favours updated.")
                    expect(body.favours.offeree[0].completed).to.equal(true)
                    done()
                })
        })

        it("Should return an error without a valid id", (done) => {
            chai.request(endpointUrl)
                .put("/"+invalidId+"/offeree/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Contract not found.")
                    done()
                })
        })

        it("Should return unsuccessful if you aren't involved in a contract", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[1]+"/offeree/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Sorry, you are not the offeree.")
                    done()
                })
        })

        it("Should return unsuccessful if you aren't the offeree in a contract", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/offeree/favours")
                .set("Authorization", token)
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Sorry, you are not the offeree.")
                    done()
                })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/offeree/favours")
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/offeree/favours")
                .set("Authorization", token+"010101001001")
                .send({updatedFavours: favours[0]})
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe("put /:id/terminate Test", (done) => {
        var contractIds = []
        var invalidId = new ObjectID()
        var user2Token = null

        before((done) => {
            chai.request(baseUrl)
                .post("/api/users/login")
                .send({
                    email: users[2].email,
                    password: users[2].password
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    user2Token = res.body.token

                    Contract.insertMany([contracts[7], contracts[8], contracts[0]],(error,docs)=>{
                        for(var i = 0;i<docs.length;i++){
                            contractIds.push(docs[i]._id)
                        }
                        done()
                    })
                })
        })

        it("Should terminate/complete contract", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/terminate")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    expect(res.body.message).to.equal("Contract has been terminated/completed.")
                    done()
                })
        })

        it.skip("Should notify of other party approval needed", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[1]+"/terminate")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    expect(res.body.message).to.equal("Waiting for other party to terminate.")
                    done()
                })
        })

        it.skip("Should return unsuccessful if the contract is not active", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/terminate")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Contract must be active.")
                    done()
                })
        })

        it("Should return not without a valid id", (done) => {
            chai.request(endpointUrl)
                .put("/"+invalidId+"/terminate")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Contract not found.")
                    done()
                })
        })

        it("Should return unsuccessful if you aren't involved in a contract", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[1]+"/terminate")
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Contract not found.")
                    done()
                })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/terminate")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/terminate")
                .set("Authorization", token+"010101001001")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe.only("get /contract/:id Test",(done)=>{
        var contractIds = []

        before((done)=>{
            Contract.insertMany([contracts[0],contracts[1],contracts[2]],(error,docs)=>{
                for(var i = 0;i<docs.length;i++){
                    contractIds.push(docs[i]._id)
                }
                done()
            })
        })

        it("Should return contract", (done) => {
            chai.request(endpointUrl)
                .get("/contract/"+contractIds[0])
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    expect(res.body.message).to.equal("Contract retrieved.")
                    expect(res.body.contract._id).to.equal(String(contractIds[0]))
                    done()
                })
        })

        it("Should return unsuccessfull with an improper id", (done) => {
            chai.request(endpointUrl)
                .get("/contract/"+invalidId)
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Trade does not exist.")
                    done()
                })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
                .get("/contract/"+contractIds[0])
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .get("/contract/"+contractIds[0])
                .set("Authorization", token+"010101001001")
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })

    describe("put /:id/status",(done)=>{
        var contractIds = []
        var invalidId = new ObjectID()

        beforeEach((done)=>{
            //We're logged in as user0. user0 is the offeror in 0, nothing in 1, and offeree in 2
            Contract.insertMany([contracts[0],contracts[1],contracts[2]],(error,docs)=>{
                for(var i = 0;i<docs.length;i++){
                    contractIds.push(docs[i]._id)
                }
                done()
            })
        })

        afterEach((done)=>{
            contractIds = []
            done()
        })

        it("Should return a success if the user sends over Accepted", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/status")
                .set("Authorization", token)
                .send({status:'Accepted'})
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.message).to.equal("Status updated!")
                    expect(res.body.success).to.equal(true)
                    expect(res.body.contract.status).to.equal("Accepted")
                    done()
                })
        })

        it("Should return a success if the user sends over Declined", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/status")
                .set("Authorization", token)
                .send({status:'Declined'})
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.message).to.equal("Status updated!")
                    expect(res.body.success).to.equal(true)
                    expect(res.body.contract.status).to.equal("Declined")
                    done()
                })
        })

        it("Should return a failure if the user sends over no status", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/status")
                .set("Authorization", token)
                .send({})
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("You must provide a new status.")
                    done()
                })
        })

        it("Should return a failure if the user sends over an invalid status", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/status")
                .set("Authorization", token)
                .send({status:'Status'})
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Invalid status provided.")
                    done()
                })
        })

        it("Should return a failure if the user is not the offeree", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[0]+"/status")
                .set("Authorization", token)
                .send({status:'Accepted'})
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Sorry, you are not the Offeree.")
                    done()
                })
        })

        it("Should return a failure with an invalid id", (done) => {
            chai.request(endpointUrl)
                .put("/"+invalidId+"/status")
                .set("Authorization", token)
                .send({status:'Accepted'})
                .end((err, res) => {
                    expect(err).to.equal(null)
                    expect(res.body.success).to.equal(false)
                    expect(res.body.message).to.equal("Contract not found.")
                    done()
                })
        })

        it("Should return an error without authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/status")
                .send({status:'Accepted'})
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })

        it("Should return an error without valid authorization", (done) => {
            chai.request(endpointUrl)
                .put("/"+contractIds[2]+"/status")
                .set("Authorization", token+"010101001001")
                .send({status:'Accepted'})
                .end((err, res) => {
                    expect(err.status).to.equal(401)
                    done()
                })
        })
    })
})