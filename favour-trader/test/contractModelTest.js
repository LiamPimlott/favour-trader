let User = require("../models/user");
let Skill = require("../models/skill");
let Contract = require("../models/contract");
const mongoose = require("mongoose");
let ObjectID = require("mongodb").ObjectID;

let chai = require("chai");
let expect = chai.expect;
let should = chai.should();

const userId = [new ObjectID(), new ObjectID]

const users = [
    { _id: userId[0], email: "who@cares.ca", password: "apathy", name: { first: "Staniel", last: "Heckman" } },
    { _id: userId[1], email: "i_really@cares.ca", password: "password", name: { first: "Staniel", last: "Manheck" } },
]

const skillId = [
    new ObjectID(),
    new ObjectID()
]

const skills = [
    { _id: skillId[0], skill: "Dodging" },
    { _id: skillId[1], skill: "Blocking" }
]

const favours = [
    {skillId: skillId[0] },
    {skillId: skillId[1] },
    {skillId: ""}
]

const contracts = [
    {
        offeror: { id: userId[0], favours: favours[0], name: { first: "Staniel", last: "Heckman" } },
        offeree: { id: userId[1], favours: favours[1], name: { first: "Staniel", last: "Manheck" } }
    },
    {
        offeree: { id: userId[1], favours: favours[1], name: { first: "Staniel", last: "Manheck" } }
    },
    {
        offeror: { id: userId[0], favours: favours[0], name: { last: "Heckman" } },
        offeree: { id: userId[1], favours: favours[1], name: { first: "Staniel", last: "Manheck" } }
    },
    {
        offeror: { id: userId[0], favours: favours[0], name: { first: "Staniel" } },
        offeree: { id: userId[1], favours: favours[1], name: { first: "Staniel", last: "Manheck" } }
    },
    {
        offeror: { id: userId[0], favours: favours[0], name: { first: "Staniel", last: "Heckman" } }
    },
    {
        offeror: { id: userId[0], favours: favours[0], name: { first: "Staniel", last: "Heckman" } },
        offeree: { id: userId[1], favours: favours[1], name: { last: "Manheck" } }
    },
    {
        offeror: { id: userId[0], favours: favours[0], name: { first: "Staniel", last: "Heckman" } },
        offeree: { id: userId[1], favours: favours[1], name: { first: "Staniel" } }
    }
]

function connect() {
    return new Promise((resolve, reject) => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        process.env.NODE_ENV = 'test';
        let db = require("../db");
        db.getConnection(false);
        resolve('connected')
    })
}

function addUsers() {
    return new Promise((resolve, reject) => {
        User.insertMany(users, (error, docs) => {
            if (err) {
                console.log(err)
                reject()
            }
            else {
                resolve()
            }
        })
    })
}

function addSkills() {
    return new Promise((resolve, reject) => {
        Skill.insertMany(skills, (error, docs) => {
            if (err) {
                console.log(err)
                reject()
            }
            else {
                resolve()
            }
        })
    })
}

function clearDB() {
    return new Promise((resolve, reject) => {
        Skill.remove({}, (err, res) => {
            if (err) {
                console.log(err)
                reject()
            }
            else {
                resolve()
            }
        })
    })
}

describe.only("Contract Model Tests", (done) => {
    before((done) => {
        connect().then(addSkills()).then(addUsers()).then(done())
    })

    it("Should validate a proper contract", (done) => {
        (new Contract(contracts[0])).validate((err, res) => {
            expect(err).to.equal(null)
            done()
        })
    })

    it("Should not validate without an offeror", (done) => {
        (new Contract(contracts[1])).validate((err, res) => {
            expect(err).to.exist
            done()
        })
    })

    it("Should not validate without a offeror first name", (done) => {
        (new Contract(contracts[2])).validate((err, res) => {
            expect(err).to.exist
            done()
        })
    })

    it("Should not validate without an offeror last name", (done) => {
        (new Contract(contracts[3])).validate((err, res) => {
            expect(err).to.exist
            done()
        })
    })

    it("Should not validate without an offeree", (done) => {
        (new Contract(contracts[4])).validate((err, res) => {
            expect(err).to.exist
            done()
        })
    })

    it("Should not validate without a offeree first name", (done) => {
        (new Contract(contracts[5])).validate((err, res) => {
            expect(err).to.exist
            done()
        })
    })

    it("Should not validate without an offeree last name", (done) => {
        (new Contract(contracts[6])).validate((err, res) => {
            expect(err).to.exist
            done()
        })
    })

    after((done)=>{
        clearDB().then(done())
    })

})