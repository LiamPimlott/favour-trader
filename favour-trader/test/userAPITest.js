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
    {//user[0] is for the http requests.
        email: "test@test.ca",
        password: "assword",
        firstName: "Mark",
        lastName: "Ripptoe",
        postalCode: "r3p1z2"
    },
    {//user[1] is one for the direct database insertions. It is also a duplicate of user[0]
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
        password: "assword",
        has: []
    },
    {//user[2] is for the http requests. It doesn't have all the required info.
        password: "assword",
        firstName: "Mark",
        lastName: "Ripptoe",
        postalCode: "r3p1z2"
    },
    {//user[3] is for the http requests. It doesn't have all the required info.
        email: "test@test.ca",
        firstName: "Mark",
        lastName: "Ripptoe",
        postalCode: "r3p1z2"
    },
    {//user[4] is for the http requests. It doesn't have all the required info.
        email: "test@test.ca",
        password: "assword",
        postalCode: "r3p1z2"
    },
    {//user[5] is for the http requests. It doesn't have all the required info.
        email: "test@test.ca",
        password: "assword",
        firstName: "Mark",
        lastName: "Ripptoe",
    },
    {//user[6] is for the http requests. It has invalid name info,
        email: "test@test.ca",
        password: "password",
        firstName: "M",
        lastName: "Ripptoe",
        postalCode: "r3p1z2"
    },
    {//user[7] is for the http requests. It has invalid name info,
        email: "test@test.ca",
        password: "password",
        firstName: "Ma",
        lastName: "R",
        postalCode: "r3p1z2"
    },
];

describe("User API Tests", function () {
    beforeEach(function (done) {
        const setting = new Promise(function (resolve) {
            require('dotenv').config({ path: __dirname + '/../.env' });
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

    describe("/ALL", function () {
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
            const newUser = new User(users[1]);
            const saveUser = new Promise((resolve) => {
                newUser.save(() => {
                    resolve('created');
                })
            });

            saveUser.then(() => {
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

    describe("/REGISTER", function () {
        it("it should register a user", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[0])
                .end((err, res) => {
                    res.body.should.have.property("success").eql(true);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it("it should not register a duplicate user", function (done) {
            const newUser = new User(users[1]);
            const saveUser = new Promise((resolve) => {
                newUser.save(() => {
                    resolve('created');
                })
            });

            saveUser.then(() => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[0])
                    .end((err, res) => {
                        res.body.should.have.property("success").eql(false);
                        res.body.should.be.a('object');
                        done();
                    })
            });
        });

        it("it should not make a user without an email", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[2])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("it should not make a user without a password", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[3])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("it should not make a user without a name", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[4])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("it should not make a user without a valid first name", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[6])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("it should not make a user without a valid last name", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(users[7])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("/MATCH", function () {

    });

    describe("/AUTH", function () {

    });

    describe("/PROFILE", function () {
    });

    describe("/ID/PROFILE", function () {

    });

    describe("/HAS", function () {

    });

    describe("/WANTS", function () {

    });

    describe("/LOGIN", () => {
        it("should log in for a valid email and password", function() {
            const newUser = new User(users[1]);
            const saveUser = new Promise((resolve) => {
                newUser.save(() => {
                    resolve('created');
                })
            });

            saveUser.then(() => {
                chai.request(url)
                .post('api/users/login')
                .send({
                    email: "test@test.ca",
                    password: "assword"
                })
                .end( (err,res) => {
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Login successful.");
                    res.body.should.have.property("token");
                })
            })
        });

        it("should fail log in for a invalid email", function() {
            const newUser = new User(users[1]);
            const saveUser = new Promise((resolve) => {
                newUser.save(() => {
                    resolve('created');
                })
            });

            saveUser.then(() => {
                chai.request(url)
                .post('api/users/login')
                .send({
                    email: "nestest@test.ca",
                    password: "assword"
                })
                .end( (err,res) => {
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Incorrect password.");
                })
            })
        });

        it("should fail log in for a invalid password", function() {
            const newUser = new User(users[1]);
            const saveUser = new Promise((resolve) => {
                newUser.save(() => {
                    resolve('created');
                })
            });

            saveUser.then(() => {
                chai.request(url)
                .post('api/users/login')
                .send({
                    email: "test@test.ca",
                    password: "password"
                })
                .end( (err,res) => {
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Incorrect password.");
                })
            })
        });
    });

    describe("/UPDATE", function () {

    });

    describe("/DELETE", function () {

    });
});
