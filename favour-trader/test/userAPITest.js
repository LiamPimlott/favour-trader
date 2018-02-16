process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
let User = require("../models/user");

let chai = require("chai");
let chaiHttp = require('chai-http');

url = "http://localhost:3001";

let server;

let expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);

const users = [
    {
        email: "test@test.ca",
        password: "assword",
            firstName: "Mark",
            lastName: "Ripptoe",
            postalCode: "r3p1z2"
    }
];

    describe("/ALL users", function () {
        beforeEach(function (done) {
            const setting = new Promise(function (resolve) {
                require('dotenv').config({path: __dirname + '/../.env'});
                process.env.NODE_ENV = 'test';
               server = require('../server');
                let db = require("../db");
                db.getConnection(false);
                resolve('connected')
            });

            function clearDB() {
                User.remove(done);
            }

            setting.then(function (result) {
                clearDB();
            });
        });

        afterEach(function (done) {
            mongoose.disconnect();
            done();
        });
        it("it should return nothing when db is empty.", function (done) {
            chai.request(url)
                .get('/api/users/all')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.length.should.be.equal(0);
                    done();
                })
        });

        it("it should return one user.", function (done) {
            const user = new User();
            user.name = {
                "first": "Mark",
                "last": "Ripptoe",
            };
            user.address = {
                "postalCode": "r0x0x0"
            };
            user.email = "haa@haha@email.com";
            user.password = "asdsad";

            const saveUser = new Promise( (resolve) => {
                user.save(()=>{
                    resolve('created');
                })
            });

            saveUser.then(()=>{
                chai.request(url)
                    .get('/api/users/all')
                    .end((err, res) => {
                        if (err) return done(err);
                        res.should.have.status(200);
                        res.body.length.should.be.equal(1);
                        done();
                    })
            });
        });
    });

    describe("/REGISTER users", function () {
        beforeEach(function (done) {
            const setting = new Promise(function (resolve) {
                require('dotenv').config({path: __dirname + '/../.env'});
                process.env.NODE_ENV = 'test';
                server = require('../server');
                let db = require("../db");
                db.getConnection(false);
                resolve('connected')
            });

            function clearDB() {
                User.remove(done);
            }

            setting.then(function (result) {
                clearDB();
            });
        });

        afterEach(function (done) {
            mongoose.disconnect();
            done();
        });
        it("it should make a user", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[0])
                .end((err, res) => {
                    res.body.should.have.property("success").eql(true);
                    res.body.should.be.a('object');
                    done();
                })
        });
        it("it should not make dupe user", function (done) {
            const user = new User();
            user.name = {
                "first": "Mark",
                "last": "Ripptoe",
            };
            user.address = {
                "postalCode": "r0x0x0"
            };
            user.email = "test@test.ca";
            user.password = "asdsad";

            const saveUser = new Promise( (resolve) => {
                user.save(()=>{
                    resolve('created');
                })
            });

            saveUser.then(() => {
                chai.request(url).post('/api/users/register').send(user[0]).end();
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[0])
                    .end((err, res) => {
                        // console.log(JSON.stringify(res.body))
                        res.body.should.have.property("success").eql(false);
                        res.body.should.be.a('object');
                        done();
                    })
            });

        })
     });