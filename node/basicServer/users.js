var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

var UserModel = mongoose.model('User', User);

module.exports = function (app) {

    app.get('/users', function (req, res) {
        UserModel.find({}, function (err, users) {
            if (err) {
                res.send(400);
            } else {
                res.jsonp(users);
            }
        });
    });

    app.post('/users', function (req, res) {
        var record = new UserModel({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        record.save(function (err) {
            if (err) {
                console.log('error saving record', err);
                res.send(400);
            } else {
                console.log('record saved');
                console.log(record);
                res.send(200);
            }
        });
    });

    app.get('/users/:username', function (req, res) {
        console.log('getting', req.params.username);

        UserModel.findOne({username: req.params.username}, function (err, user) {
            if (err || !user) {
                console.log('error finding user');
                res.send(400);
            } else {
                res.jsonp(user);
            }
        });
    });

    app.put('/users/:username', function (req, res) {
        console.log('updating', req.params.username);

        UserModel.findOne({username: req.params.username}, function (err, user) {
            if (err || !user) {
                console.log('error finding user');
                res.send(400);
            } else {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.save(function (err) {
                    if (err) {
                        console.log('error updating user');
                        res.send(400);
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    app.delete('/users/:username', function (req, res) {
        console.log('deleting', req.params.username);

        UserModel.findOne({username: req.params.username}, function (err, user) {
            if (err || !user) {
                console.log('error finding user');
                res.send(400);
            } else {
                user.remove(function (err) {
                    if (err) {
                        console.log('error deleting user');
                        res.send(400);
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });
};