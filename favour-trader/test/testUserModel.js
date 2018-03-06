let User = require("../models/user.js");
let Skill = require("../models/skill");
const mongoose = require("mongoose");

let chai = require("chai");
let expect = chai.expect;
let should = chai.should();


describe('User Validation Error.', function () {

    it('should throw all required validation errors', function (done) {
        let user = new User();
        user.validate((err) => {
            expect(err.errors.name.message).to.exist;
            expect(err.errors.password.message).to.exist;
            expect(err.errors.email.message).to.exist;
            err.errors.name.message.should.equal("Name is required.");
            err.errors.password.message.should.equal("Password is required.");
            err.errors.email.message.should.equal("Email Address is required.");
            done();
        })
    });

    it('should throw invalid First Name', function (done) {
        let user = new User();
        user.name = {first: "I", last: "Khow"};
        user.address = {
            number: '50',
            street: 'sample',
            postalCode: 'r0x0x0',
            city: 'winnipeg',
            state: 'manitoba',
            country: 'canada'
        };
        user.password = 'password';
        user.email = "example@example.com";
        user.validate((err) => {
            expect(err.errors.name.message).to.exist;
            let thisError = "Validation failed: first: Path `first` (`I`) is shorter than the minimum allowed length (2).";
            err.errors.name.message.should.equal(thisError);
            done();
        })
    });

    it('should throw invalid Last Name', function (done) {
        let user = new User();
        user.name = {first: "Ism", last: "K"};
        user.address = {
            number: '50',
            street: 'sample',
            postalCode: 'r0x0x0',
            city: 'winnipeg',
            state: 'manitoba',
            country: 'canada'
        };
        user.password = 'password';
        user.email = "example@example.com";
        user.validate((err) => {
            expect(err.errors.name.message).to.exist;
            let thisError = "Validation failed: last: Path `last` (`K`) is shorter than the minimum allowed length (2).";
            err.errors.name.message.should.equal(thisError);
            done();
        })
    });

    it('should throw invalid Street Number', function (done) {
        let user = new User();
        user.name = {first: "Ism", last: "Kh"};
        user.address = {
            number: 'aa',
            street: 'sample',
            postalCode: 'r0x0x0',
            city: 'winnipeg',
            state: 'manitoba',
            country: 'canada'
        };
        user.password = 'password';
        user.email = "example@example.com";
        user.validate((err) => {
            expect(err.errors.address.message).to.exist;
            let thisError = "Validation failed: number: Cast to Number failed for value \"aa\" at path \"number\"";
            err.errors.address.message.should.equal(thisError);
            done();
        })
    });
});

describe('User with Number of Skills', function () {

    beforeEach(function (done) {
        const setting = new Promise(function (resolve) {
            require('dotenv').config({path: __dirname + '/../.env'});
            process.env.NODE_ENV = 'test';

            let db = require("../db");
            db.getConnection(false);
            resolve('connected')
        });

        function clearDB() {
            User.remove({}, () => {
                Skill.remove(done);
            })
        }

        setting.then(function (result) {
            clearDB();
        });
    });

    afterEach(function (done) {
        mongoose.disconnect();
        done();
    });

    it('user with no Skill', function (done) {
        let user = new User();
        user.name = {first: "Ism", last: "Kh"};
        user.address = {
            number: '10',
            street: 'sample',
            postalCode: "r0x0x0",
            city: 'winnipeg',
            state: 'manitoba',
            country: 'canada'
        };
        user.password = 'password';
        user.email = "example@example.com";
        user.save((err, person) => {
            expect(person).to.exist;
            expect(err).to.not.exist;
            done();
        });
    });

    it('user with one \'Has\' Skill', function (done) {
        let user = new User();
        user.name = {first: "Ism", last: "Kh"};
        user.address = {
            number: '10',
            street: 'sample',
            postalCode: "r0x0x0",
            city: 'winnipeg',
            state: 'manitoba',
            country: 'canada'
        };
        user.password = 'password';
        user.email = "example@example.com";
        user.has = [{
            category: '5a7cede7dc655c2b50e7147f',
            description: 'Test skill'
        }];
        user.save((err, user) => {
            if (err) {
                return done(err);
            }
            user.has.should.have.length(1);
            done();
        });
    });

    it('user with more than one \'Has\' Skill', function (done) {
        let user = new User();
        user.name = {first: "Ism", last: "Kh"};
        user.address = {
            number: '10',
            street: 'sample',
            postalCode: "r0x0x0",
            city: 'winnipeg',
            state: 'manitoba',
            country: 'canada'
        };
        user.password = 'password';
        user.email = "example@example.com";
        user.has = [
            {
                category: '5a7cede7dc655c2b50e7147f',
                description: 'Test skill'
            },
            {
                category: '5a7cede7dc655c2b50e71482',
                description: 'Test skill 2'
            }];
        user.save((err, user) => {
            if (err) {
                return done(err);
            }
            user.has.should.have.length(2);
            done();
        });
    });
});

describe('User with Skills', function () {

    beforeEach(function (done) {
        const setting = new Promise(function (resolve) {
            require('dotenv').config({path: __dirname + '/../.env'});
            process.env.NODE_ENV = 'test';
            let db = require("../db");
            db.getConnection(false);
            resolve('connected')
        });

        function clearDB() {
            User.remove({}, () => {
                Skill.remove(done);
            })
        }

        setting.then(function (result) {
            clearDB();
        });
    });


    after(function (done) {
        mongoose.disconnect();
        return done();
    });

    it('should Have Gardening', function (done) {
        let skill = new Skill({
            skill: "Gardener"
        });
        skill.save((err, skill) => {
            expect(err).to.not.exist;
            let user = new User();
            user.name = {first: "Ism", last: "Kh"};
            user.address = {
                number: '10',
                street: 'sample',
                postalCode: "r0x0x0",
                city: 'winnipeg',
                state: 'manitoba',
                country: 'canada'
            };
            user.password = 'password';
            user.email = "example@example.com";
            user.has = [{
                category: skill._id,
                description: 'Im a Gardener.'
            }];
            user.save((err, person) => {
                expect(person).to.exist;
                expect(err).to.not.exist;
                User.findById(person._id)
                    .select('has')
                    .populate('has')
                    .exec((err, user) => {
                        expect(user).to.exist;
                        expect(user.has[0]).to.exist;
                        done();
                    });
            });
        });
    });
});

