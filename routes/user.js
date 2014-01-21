/**
 * Created with JetBrains WebStorm.
 * User: jakabpilaszanovich
 * Date: 11/01/2014
 * Time: 21:01
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var path = require('path');
var User = require('../models/User.js');

exports.list = function(req, res) {
    User.find({}, function(err, docs) {
        res.render('users/users.html', {
            users : docs
        });
    });
};

exports.load = function(req, res, next, name) {
    User.find({
        name : name
    }, function(err, docs) {
        req.user = docs[0];
        next();
    });
};

exports.view = function(req, res) {
    res.render("users/show.html", {
        user : req.user
    });
};



