process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
let User = require("../models/user");

let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require("../server");

url = "http://localhost:3001";

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
]

describe("/USERS", function () {

    beforeEach((done) => {
        // console.log("Before")
        User.remove({}, (err) => {
            done();
        })
    });

    it('Error message valid shit', function (done) {
        var user = new User();
        user.validate(function (err) {
            expect(err.errors.address.message).to.exist;
            expect(err.errors.name.message).to.exist;
            expect(err.errors.email.message).to.exist;
            expect(err.errors.password.message).to.exist;
            err.errors.address.message.should.equal('Address is required.');
            err.errors.email.message.should.equal('Email Address is required.');
            err.errors.password.message.should.equal('Password is required.');
            err.errors.name.message.should.equal('Name is required.');
            done();
        });
    });

    describe("/ALL users", function () {
        it("it should return nothing when db is empty.", function (done) {
            chai.request(url)
                .get('/api/users/all')
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                })
        });
    });

    describe("/REGISTER users", function () {
        it("it should make a user", function (done) {
            chai.request(url)
                .post('/api/users/register')
                .send(user[0])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(true);
                    res.body.should.be.a('object');
                    done();
                })
        });
        it("it should not make dupe user", function (done) {
            chai.request(url).post('/api/users/register').send(user[0]).end();
            chai.request(url)
                .post('/api/users/register')
                .send(user[0])
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body))
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                })
        })
    });
});