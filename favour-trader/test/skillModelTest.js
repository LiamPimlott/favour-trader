let Skill = require("../models/skill");
const mongoose = require("mongoose");

let chai = require("chai");
let expect = chai.expect;
let should = chai.should();

var skills = 
[
    new Skill({skill: "Unit Testing"}),
    new Skill({skill: "Unit Testing"}),
    new Skill({skill: "Integration Testing"}),
    new Skill({skill: ""}),
    new Skill(),
]

function connect(){
    return new Promise((resolve,reject)=>{
        require('dotenv').config({path: __dirname + '/../.env'});
        process.env.NODE_ENV = 'test';
        let db = require("../db");
        db.getConnection(false);
        resolve('connected')
    })
}

function saveSkill(){
    return new Promise((resolve,reject)=>{
        skills[0].save((err,res)=>{
            console.log("Done")
            if(err){
                console.log(err)
                reject()
            } else {
                resolve()
            }
        })
    })
}

function clearDB(){
    return new Promise((resolve,reject)=>{
        Skill.remove({},(err,res)=>{
            if(err){
                console.log(err)
                reject()
            } 
            else {
                resolve()
            }
        })
    })
}


describe("Skill Model Tests",(done)=>{
    before((done)=>{
        connect().then((result)=>{
            saveSkill().then((result)=>{
                done()
            })
        })
    })

    it("Should successfully validate a unique skill",(done)=>{
        skills[2].validate((err,res)=>{
            expect(err).to.equal(null)
            done()
        })
    })

    it("Should fail to write a duplicate skill",(done)=>{
        skills[1].save((err,res)=>{
            expect(err.name).to.equal("BulkWriteError")
            done()
        })
    })

    it("Should fail to validate a skill that's an empty string",(done)=>{
        skills[3].validate((err,res)=>{
            expect(err.errors.skill.message).to.equal("Path `skill` is required.")
            expect(err.errors.skill.name).to.equal("ValidatorError")
            done()
        })
    })

    it("Should fail to validate a skill that has no skill",(done)=>{
        skills[4].validate((err,res)=>{
            expect(err.errors.skill.message).to.equal("Path `skill` is required.")
            expect(err.errors.skill.name).to.equal("ValidatorError")
            done()
        })
    })

    after((done)=>{
        clearDB().then((result)=>{
            mongoose.disconnect()
            done()
        })
    })
})