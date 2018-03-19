process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
let Skill = require("../models/skill");

let chai = require("chai");
let chaiHttp = require('chai-http');

url = "http://localhost:3002";

let server;

let expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);

var skills = [
    {
        skill: "Fencing"
    },
    {
        skill: "Dancing"
    },
    {
        skill: "Programming"
    },
    {
        skill: "Mathematics"
    },
    {
        skill: "Plumbing"
    },
    {
        skill: "Taxidermy"
    },
    {
        skill: "Nuclear Physics"
    },
    {
        skill: "Genetic Engineering"
    },
    {
        skill: "Painting"
    }
]

describe("Skill API Tests", () => {
    before((done) => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        process.env.NODE_ENV = 'test';
        server = require('../server');
        let db = require("../db");
        db.getConnection(false);
        done()
    });

    afterEach((done) => {
        Skill.remove({}, (err) => {
            done();
        })
    })

    after((done) => {
        mongoose.disconnect();
        done();
    });

    describe("/ALL",()=>{

        it("Should return a bunch of skills.",(done)=>{
            Skill.insertMany(skills,(error,docs)=>{
                chai.request(url)
                .get("/api/skills/all")
                .end((err,res)=>{
                    expect(err).to.equal(null);
                    expect(res.body).to.have.lengthOf(9);
                    done();
                })
            })
        })

        
        it("Should return nothing.",(done)=>{
                chai.request(url)
                .get("/api/skills/all")
                .end((err,res)=>{
                    expect(err).to.equal(null);
                    expect(res.body).to.have.lengthOf(0);
                    done();
                })
        })
    });
})