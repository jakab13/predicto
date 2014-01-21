/**
 * Created with JetBrains WebStorm.
 * User: jakabpilaszanovich
 * Date: 11/01/2014
 * Time: 21:09
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var path = require('path');
var Prediction = require('../models/Prediction.js');

exports.submit = function(req, res) {
    var b = req.body;
    new Prediction({
        name : b.name,
        prediction : b.prediction,
        deadline: new Date(b.deadline),
        created: Date.now()
    }).save(function(err, prediction) {
            if (err)
                res.json(err);
            res.redirect('/predictions/' + prediction._id);
        });
};

exports.load = function(req, res, next, predictionId) {
    Prediction.find({
        _id : predictionId
    }, function(err, docs) {
        req.prediction = docs[0];
        next();
    });
};

exports.view = function(req, res) {
    res.render("predictions/certificate.html", {
        prediction : req.prediction
    });
};

exports.viewAll =  function(req, res) {
    Prediction.find({}, function(err, docs) {
        res.render('predictions/predictions.html', {
            predictions : docs
        });
    });
};
