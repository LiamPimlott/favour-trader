var assert = require('assert');
var User = require('../models/user');
var chai = require('chai');
const expect = chai.expect;
const should = chai.should();

describe("User Validations Tests", function () {
    it('should throw error messages', function (done) {
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
    })
});
