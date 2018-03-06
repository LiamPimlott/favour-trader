process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
let User = require("../models/user");

let chai = require("chai");
let chaiHttp = require('chai-http');

url = "http://localhost:3002";

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
    {//user[8] is one for the direct database insertions.\
        name: {
            first: "Jaguar",
            last: "Forest"
        },
        address: {
            postalCode: "123456",
            street: "Fake St",
            number: 7890,
            city: "ABCD",
            state: "EF",
            country: "Free Country USE"
        },
        about: "I'm the not testiest user there is :c",
        email: "best@best.ca",
        password: "crassword",
        has: []
    },
    {//user[9] is one for the direct database insertions.
        name: {
            first: "Shark",
            last: "Hamil"
        },
        address: {
            postalCode: "x0x0xA",
            street: "Last Jedi Road",
            number: 8,
            city: "Ultra ultra ultra",
            state: "Decay",
            country: "Alderode"
        },
        about: "I'm the testiest teacher there is!",
        email: "jebi@theforke.rom",
        password: "blastword",
        has: []
    },
    {//user[0] is for the http requests.
        email: "west@guest.ca",
        password: "wowwowwow",
        firstName: "Stan",
        lastName: "Man",
        postalCode: "r3p1z2"
    },
];



describe("User API Tests", () => {
    beforeEach((done) => {
        const setting = new Promise((resolve) => {
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

        setting.then((result) => {
            clearDB();
        });
    });

    afterEach((done) => {
        mongoose.disconnect();
        done();
    });

    
    describe("/ALL", () => {
        it("it should return nothing when db is empty.", (done) => {
            chai.request(url)
                .get('/api/users/all')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.length.should.be.equal(0);
                    done();
                })
        });

        it("it should return one user.", (done) => {
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

    describe("/REGISTER", () => {
        it("it should register a user", (done) => {
            chai.request(url)
                .post('/api/users/register')
                .send(users[0])
                .end((err, res) => {
                    res.body.should.have.property("success").eql(true);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it("it should not register a duplicate user", (done) => {
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

        it("it should not make a user without an email", (done) => {
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

        it("it should not make a user without a password", (done) => {
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

        it("it should not make a user without a name", (done) => {
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

        it("it should not make a user without a valid first name", (done) => {
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

        it("it should not make a user without a valid last name", (done) => {
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

    // describe("/MATCH", () =>  {

    // });

    // describe("/AUTH", () =>  {

    // });

    describe("/PROFILE", () => {
        var profileToken;

        beforeEach((done) => {
            chai.request(url)
                .post('/api/users/register')
                .send(users[0])
                .end((err, res) => {
                    profileToken = res.body.token;
                    done();
                });
        });

        it("should return the current user's profile.", (done) => {
            chai.request(url)
                .get("/api/users/profile")
                .set('Authorization', profileToken)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res.body);
                    res.body.user.name.first.should.eql("Mark");
                    res.body.user.name.last.should.eql("Ripptoe");
                    done();
                });
        });

        it("should return nothing without a token.", (done) => {
            chai.request(url)
                .get("/api/users/profile")
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });

        it("should return nothing with an invalid token.", (done) => {
            chai.request(url)
                .get("/api/users/profile")
                .set('Authorization', "Bearer outlawtryingtodrawwithapenandapaddrawingjimwestwithapenandapad")
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });
    });


    describe("/ID/PROFILE", () => {
        var ids = [];
        var dummyId = "0a9ad73e15db46c552c24d45";
        var idProfiletoken;

        beforeEach((done) => {//user[1,8,9]
            var addUsers = new Promise((resolve) => {
                var newUsers = [users[1], users[8], users[9]];
                User.insertMany(newUsers, () => {
                    User.find({}, { _id: true }, (err, res) => {
                        for (var i = 0; i < res.length; i++) {
                            ids.push(res[i]._id);
                        }
                        resolve();
                    })
                });
            });

            addUsers.then((result) => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[10])
                    .end((err, res) => {
                        idProfiletoken = res.body.token;
                        done();
                    });
            });
        });

        afterEach(() => {
            ids = [];
        })

        it("Should return accurate profile information 1/2", (done) => {
            chai.request(url)
                .get("/api/users/" + ids[0] + "/profile")
                .set("Authorization", idProfiletoken)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("User profile retrieved.");
                    res.body.should.have.property("user");
                    res.body.user.should.have.property("has");
                    res.body.user.should.have.property("wants");
                    res.body.user.should.have.property("name");
                    res.body.user.should.have.property("address");
                    res.body.user.should.have.property("about");

                    res.body.user.name.first.should.eql("Mark");
                    res.body.user.name.last.should.eql("Ripptoe");
                    done();
                })
        });

        it("Should return accurate profile information 2/2", (done) => {
            chai.request(url)
                .get("/api/users/" + ids[1] + "/profile")
                .set("Authorization", idProfiletoken)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("User profile retrieved.");
                    res.body.should.have.property("user");
                    res.body.user.should.have.property("has");
                    res.body.user.should.have.property("wants");
                    res.body.user.should.have.property("name");
                    res.body.user.should.have.property("address");
                    res.body.user.should.have.property("about");

                    res.body.user.name.first.should.eql("Jaguar");
                    res.body.user.name.last.should.eql("Forest");
                    done();
                })
        });

        it("Should return an error saying the profile wasn't found", (done) => {
            chai.request(url)
                .get("/api/users/" + dummyId + "/profile")
                .set("Authorization", idProfiletoken)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("User does not exist.");
                    done();
                });
        });

        it("Should return an error saying the request wasn't authorized", (done) => {
            chai.request(url)
                .get("/api/users/" + ids[0] + "/profile")
                .end((err, res) => {
                    should.exist(err);
                    err.status.should.eql(401);//check
                    done();
                });
        });
    });

    // describe("/HAS", () =>  {

    // });

    // describe("/WANTS", () =>  {

    // });


    describe("/LOGIN", () => {
        beforeEach((done) => {
            newUser = new User(users[1]);
            newUser.save((err, newUser) => {
                done();
            });
        });

        it("should log in for a valid email and password", (done) => {
            chai.request(url)
                .post('/api/users/login')
                .send({
                    email: "test@test.ca",
                    password: "assword"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Login successful.");
                    res.body.should.have.property("token");
                    done();
                });
        });

        it("should fail log in for a invalid email", (done) => {
            chai.request(url)
                .post('/api/users/login')
                .send({
                    email: "nestest@test.ca",
                    password: "assword"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("User not found.");
                    done();
                })
        });

        it("should fail log in for a invalid password", (done) => {
            chai.request(url)
                .post('/api/users/login')
                .send({
                    email: "test@test.ca",
                    password: "password"
                })
                .end((err, res) => {
                    console.log("end called");
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Incorrect password.");
                    done();
                });
        });
    });


    /*
        describe("/UPDATE", () =>  {
            //before each update, shove a user to update in the database.
            var updateToken = null;
    
            beforeEach((done) => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[0])
                    .end((err, res) => {
                        console.log("err:"+JSON.stringify(err)+"\nres:"+JSON.stringify(res));
                        updateToken = res.body.token;
                        done();
                    });
            });
            
            it("should create 'wants' in a user.", (done) => {
                done();
            });
        });
    */

    describe("/DELETE", () => {
        var deleteToken;

        //currently causing a timeout. Why?
            beforeEach((done) => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[0])
                    .end((err, res) => {
                        deleteToken = res.body.token;
                        done();
                    });
            });

        it("Should perform a delete with proper authorization",(done) => {
            chai.request(url)
            .delete("/api/users/delete")
            .set("Authorization",deleteToken)
            .end((err,res)=>{
                should.not.exist(err);
                User.find({},(err,res)=>{
                    res.should.have.length(0)
                    done();
                })
            });
        });

        it("Shouldn't perform a delete without authorization.", (done) => {
            chai.request(url)
            .delete("/api/users/delete")
            .end((err,res) => {
                should.exist(err);
                err.status.should.eql(401);
                done();
            });
        });
    });
});
