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

    });
})