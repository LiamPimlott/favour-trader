process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
let User = require("../models/user");
let Skill = require("../models/skill");

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

const skills = [
    { skill: "Skeeball" },
    { skill: "3 Point Shot Making" },
    { skill: "Making Out" }
]

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
                    res.body.should.have.property("success").eql(false);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("/MATCH", () => {
        var matchSkillIds = [];
        var dummyUser = users[8];
        var dummyUserId;

        beforeEach((done) => {
            var addUsers = new Promise((resolve) => {
                User.insertMany(dummyUser, (error, docs) => {
                    dummyUserId = docs[0]._id;
                    resolve();
                })
            })

            var addSkills = new Promise((resolve) => {
                Skill.insertMany(skills, (error, docs) => {
                    for (var i = 0; i < docs.length; i++) {
                        matchSkillIds.push(docs[i]._id);
                    }
                    User.update({}, {
                        wants: [
                            {
                                category: {
                                    _id: matchSkillIds[0],
                                },
                                description: "Wow"
                            }
                        ],
                        has: [
                            {
                                category: {
                                    _id: matchSkillIds[1],
                                },
                                description: "Wow"
                            }
                        ]
                    }, (err, raw) => {
                        resolve();
                    });
                });
            });

            addSkills.then((result) => {
                addUsers.then((result) => {
                    chai.request(url)
                        .post("/api/users/register")
                        .send(users[0])
                        .end((err, res) => {
                            matchToken = res.body.token;
                            done();
                        })
                });
            });
        });

        afterEach((done) => {
            matchSkillIds = [];
            dummyUserId = null;
            Skill.remove({}, () => {
                done();
            });
        })

        it("Should return nothing when there are no matches. (curr user has no has/wants)", (done) => {
            chai.request(url)
                .get("/api/users/matches")
                .set("Authorization", matchToken)
                .end((err, res) => {
                    res.body.should.have.property("success");
                    res.body.should.have.property("message");
                    res.body.success.should.eql(false);
                    res.body.should.not.have.property("matches");
                    done();
                });
        });

        it("Should return nothing when there are no matches. (curr user and dummy don't match up)", (done) => {
            User.findOneAndUpdate({ _id: { $ne: dummyUserId } }, {
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[0],
                        },
                        description: "Wow"
                    }
                ],
                has: [
                    {
                        category: {
                            _id: matchSkillIds[1],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, doc, res) => {
                chai.request(url)
                    .get("/api/users/matches")
                    .set("Authorization", matchToken)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.have.property("success");
                        res.body.should.have.property("message");
                        res.body.success.should.eql(false);
                        res.body.should.not.have.property("matches");
                        done();
                    });
            });
        });

        it("Should not return a self match", (done) => {
            User.findOneAndUpdate({ _id: { $ne: dummyUserId } }, {
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[1],
                        },
                        description: "Wow"
                    }
                ],
                has: [
                    {
                        category: {
                            _id: matchSkillIds[1],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, doc, res) => {
                chai.request(url)
                    .get("/api/users/matches")
                    .set("Authorization", matchToken)
                    .end((err, res) => {
                        res.body.should.not.have.property("matches");
                        done();
                    });
            });
        });

        it("Should return a user who has a skill the current user wants", (done) => {
            User.update({ _id: { $ne: dummyUserId } }, {
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[1],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, raw) => {
                    chai.request(url)
                        .get("/api/users/matches")
                        .set("Authorization", matchToken)
                        .query({ hasFilter: true, wantsFilter: false })
                        .end((err, res) => {
                            res.body.should.have.property("matches");
                            expect(res.body.matches).to.have.a.lengthOf(1);
                            done();
                        })
            });
        });

        it("Should return a user who wants a skill the current user has", (done) => {
            User.update({ _id: { $ne: dummyUserId } }, {
                has: [
                    {
                        category: {
                            _id: matchSkillIds[0],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, raw) => {
            chai.request(url)
                .get("/api/users/matches")
                .set("Authorization", matchToken)
                .query({ hasFilter: false, wantsFilter: true })
                .end((err, res) => {
                    expect(res.body).to.have.property("success");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.have.property("matches");
                    expect(res.body.success).to.equal(true);
                    expect(res.body.matches).to.have.a.lengthOf(1);
                    done();
                });
            });
        });

        it("Should return no users when the current user sets the hasFilter to true and only has want matches.", (done) => {
            User.update({ _id: { $ne: dummyUserId } }, {
                has: [
                    {
                        category: {
                            _id: matchSkillIds[0],
                        },
                        description: "Wow"
                    }
                ],
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[2],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, raw) => {
            chai.request(url)
                .get("/api/users/matches")
                .set("Authorization", matchToken)
                .query({ hasFilter: true, wantsFilter: false })
                .end((err, res) => {
                    expect(res.body).to.have.property("success");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.not.have.property("matches");
                    expect(res.body.success).to.equal(false);
                    done();
                });
            });
        });

        it("Should return no users when the current user sets the wantFilter to true and only has 'has' matches.", (done) => {
            User.update({ _id: { $ne: dummyUserId } }, {
                has: [
                    {
                        category: {
                            _id: matchSkillIds[2],
                        },
                        description: "Wow"
                    }
                ],
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[1],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, raw) => {
            chai.request(url)
                .get("/api/users/matches")
                .set("Authorization", matchToken)
                .query({ hasFilter: false, wantsFilter: true })
                .end((err, res) => {
                    expect(res.body).to.have.property("success");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.not.have.property("matches");
                    expect(res.body.success).to.equal(false);
                    done();
                });
            });
        });
        
        it("Shouldn't return any matches when the user is looking for perfect matches but only has 'want' matches", (done) => {
            User.update({ _id: { $ne: dummyUserId } }, {
                has: [
                    {
                        category: {
                            _id: matchSkillIds[0],
                        },
                        description: "Wow"
                    }
                ],
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[2],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, raw) => {
            chai.request(url)
                .get("/api/users/matches")
                .set("Authorization", matchToken)
                .end((err, res) => {
                    expect(res.body).to.have.property("success");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.not.have.property("matches");
                    expect(res.body.success).to.equal(false);
                    done();
                });
            });
        });

        it("Shouldn't return any matches when the user is looking for perfect matches but only has 'has' matches", (done) => {
            User.update({ _id: { $ne: dummyUserId } }, {
                has: [
                    {
                        category: {
                            _id: matchSkillIds[2],
                        },
                        description: "Wow"
                    }
                ],
                wants: [
                    {
                        category: {
                            _id: matchSkillIds[1],
                        },
                        description: "Wow"
                    }
                ]
            }, (err, raw) => {
            chai.request(url)
                .get("/api/users/matches")
                .set("Authorization", matchToken)
                .end((err, res) => {
                    expect(res.body).to.have.property("success");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.not.have.property("matches");
                    expect(res.body.success).to.equal(false);
                    done();
                });
            });
        });

        it("Should return an error without authorization", (done) => {
            chai.request(url)
                .get("/api/users/matches")
                .end((err, res) => {
                    expect(err.status).to.equal(401);
                    done();
                });
        });
    });

    describe("/AUTH", () => {
        var authToken;

        beforeEach((done) => {
            chai.request(url)
                .post('/api/users/register')
                .send(users[0])
                .end((err, res) => {
                    authToken = res.body.token;
                    done();
                });
        });

        it("Should pass for a valid token", (done) => {
            chai.request(url)
                .get("/api/users/auth")
                .set("Authorization", authToken)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.property("text");
                    res.text.should.equal("Token is valid! User name is: Mark Ripptoe");
                    done();
                });
        });

        it("Should fail for an invalid token", (done) => {
            chai.request(url)
                .get("/api/users/auth")
                .set("Authorization", authToken + "cheese")
                .end((err, res) => {
                    should.exist(err);
                    err.status.should.eql(401);
                    done();
                });
        });

        it("Should fail for no token", (done) => {
            chai.request(url)
                .get("/api/users/auth")
                .end((err, res) => {
                    should.exist(err);
                    err.status.should.eql(401);
                    done();
                });
        });
    });

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

    describe("/HAS", () => {
        var skillIds = [];
        var hasToken;

        beforeEach((done) => {
            var addSkills = new Promise((resolve) => {
                Skill.insertMany(skills, (error, docs) => {
                    Skill.find({}, { _id: true }, (err, res) => {
                        for (var i = 0; i < res.length; i++) {
                            skillIds.push(res[i]._id);
                        }
                        resolve();
                    });
                });
            });

            addSkills.then((result) => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[10])
                    .end((err, res) => {
                        hasToken = res.body.token;
                        done();
                    });
            });
        });

        afterEach((done) => {
            Skill.remove({}, () => {
                done();
            });
            skillIds = [];
        });

        it("Should return no skills when the logged in user doesn't have any skills", (done) => {
            chai.request(url)
                .post("/api/users/has")
                .set("Authorization", hasToken)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("message");
                    res.body.should.have.property("success");
                    res.body.should.have.property("user");
                    res.body.user.has.length.should.equal(0);
                    res.body.success.should.equal(true);
                    done();
                });
        });

        it("Should return two skills when the logged in user has two skills", (done) => {
            User.update({}, { has: [skillIds[0], skillIds[1]] }, { multi: true }, (err, res) => {
                chai.request(url)
                    .post("/api/users/has")
                    .set("Authorization", hasToken)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.have.property("message");
                        res.body.should.have.property("success");
                        res.body.should.have.property("user");
                        res.body.user.has.length.should.equal(2)
                        res.body.success.should.equal(true);
                        done();
                    });
            })
        });

        it("Should return an error without proper authorization", (done) => {
            chai.request(url)
                .post("/api/users/has")
                .end((err, res) => {
                    
                    done();
                });
        });
    });

    describe("/WANTS", () => {
        var skillIds = [];
        var wantToken;

        beforeEach((done) => {
            var addSkills = new Promise((resolve) => {
                Skill.insertMany(skills, (error, docs) => {
                    Skill.find({}, { _id: true }, (err, res) => {
                        for (var i = 0; i < res.length; i++) {
                            skillIds.push(res[i]._id);
                        }
                        resolve();
                    });
                });
            });

            addSkills.then((result) => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[10])
                    .end((err, res) => {
                        wantToken = res.body.token;
                        done();
                    });
            });
        });

        afterEach((done) => {
            Skill.remove({}, () => {
                done();
            });
            skillIds = [];
        });

        it("Should return no skills when the logged in user doesn't have any skills", (done) => {
            chai.request(url)
                .post("/api/users/wants")
                .set("Authorization", wantToken)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.have.property("message");
                    res.body.should.have.property("success");
                    res.body.should.have.property("user");
                    res.body.user.should.have.property("wants");
                    res.body.success.should.equal(true);
                    res.body.user.wants.length.should.equal(0);
                    done();
                });
        });

        it("Should return two wants when the logged in user has two wants", (done) => {
            User.update({}, { wants: [skillIds[0], skillIds[1]] }, { multi: true }, (err, res) => {
                chai.request(url)
                    .post("/api/users/wants")
                    .set("Authorization", wantToken)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.have.property("message");
                        res.body.should.have.property("success");
                        res.body.should.have.property("user");
                        res.body.user.should.have.property("wants");
                        res.body.success.should.equal(true);
                        res.body.user.wants.length.should.equal(2);
                        done();
                    });
            })
        });

        it("Should return an error without proper authorization", (done) => {
            chai.request(url)
                .post("/api/users/has")
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });
    });

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
                    should.not.exist(err);
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Incorrect password.");
                    done();
                });
        });
    });

    describe("/UPDATE", () => {
        //before each update, shove a user to update in the database.
        var updateToken;
        var updateSkillIds = [];

        beforeEach((done) => {
            var addSkills = new Promise((resolve) => {
                Skill.insertMany(skills, (error, docs) => {
                    for (var i = 0; i < docs.length; i++) {
                        updateSkillIds.push(docs[i]._id);
                    }
                    resolve();
                });
            });

            addSkills.then((resolve) => {
                chai.request(url)
                    .post('/api/users/register')
                    .send(users[0])
                    .end((err, res) => {
                        updateToken = res.body.token;
                        done();
                    });
            });
        });

        afterEach((done) => {
            Skill.remove({}, (error, docs) => {
                done();
            });
        });

        it("should add some wants.", (done) => {
            chai.request(url)
                .put('/api/users/update')
                .set("Authorization", updateToken)
                .send({
                    wants: [
                        {
                            category: updateSkillIds[0],
                            description: "Wow"
                        },
                        {
                            category: updateSkillIds[1],
                            description: "Wow"
                        },
                        {
                            category: updateSkillIds[2],
                            description: "Wow"
                        }
                    ]
                })
                .end((err, res) => {
                    should.not.exist(err);
                    User.find({}, (err, res) => {
                        res[0].has.should.have.length(0);
                        res[0].wants.should.have.length(3);
                        done();
                    });
                });
        });

        it("should add some has.", (done) => {
            chai.request(url)
                .put('/api/users/update')
                .set("Authorization", updateToken)
                .send({
                    has: [
                        {
                            category: updateSkillIds[0],
                            description: "Wow"
                        },
                        {
                            category: updateSkillIds[1],
                            description: "Wow"
                        },
                        {
                            category: updateSkillIds[2],
                            description: "Wow"
                        }
                    ]
                })
                .end((err, res) => {
                    should.not.exist(err);
                    User.find({}, (err, res) => {
                        res[0].has.should.have.length(3);
                        res[0].wants.should.have.length(0);
                        done();
                    });
                });
        });

        it("should change an about and add some has.", (done) => {
            chai.request(url)
                .put('/api/users/update')
                .set("Authorization", updateToken)
                .send({
                    has: [
                        {
                            category: updateSkillIds[0],
                            description: "Wow"
                        },
                        {
                            category: updateSkillIds[1],
                            description: "Wow"
                        },
                        {
                            category: updateSkillIds[2],
                            description: "Wow"
                        }
                    ], about: "AAAAAAAAAAAAAAAAAAAAA"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    User.find({}, (err, res) => {
                        res[0].has.should.have.length(3);
                        res[0].wants.should.have.length(0);
                        res[0].about.should.equal("AAAAAAAAAAAAAAAAAAAAA");
                        done();
                    });
                });
        });

        it("should not do anything to a user without authorization.", (done) => {
            chai.request(url)
                .put('/api/users/update')
                .send(users[1])
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });
    });

    describe("/DELETE", () => {
        var deleteToken;

        beforeEach((done) => {
            chai.request(url)
                .post('/api/users/register')
                .send(users[0])
                .end((err, res) => {
                    deleteToken = res.body.token;
                    done();
                });
        });

        it("Should perform a delete with proper authorization", (done) => {
            chai.request(url)
                .delete("/api/users/delete")
                .set("Authorization", deleteToken)
                .end((err, res) => {
                    should.not.exist(err);
                    User.find({}, (err, res) => {
                        res.should.have.length(0);
                        done();
                    });
                });
        });

        it("Shouldn't perform a delete without authorization.", (done) => {
            chai.request(url)
                .delete("/api/users/delete")
                .end((err, res) => {
                    should.exist(err);
                    err.status.should.eql(401);
                    done();
                });
        });
    });
});
