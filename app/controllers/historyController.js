'use strict'
var mongoose = require('mongoose');

var Historyy = require('../models/History')

function getHistories(res) {
    Historyy.find({})
        .populate("movie")
        .populate("user")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    Historyy.find({})
        .populate("movie")
        .populate("user")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

exports.create = function (req, res, next) {
    let param = {
        movie: req.body.movie,
        user: req.body.user
    };
    let history = new Historyy(param);

    Historyy.findOne({ movie: req.body.movie, user: req.body.user }, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) {
            return res.json({ err: "MOVIE AND USER IS ALREADY EXISTS!" })
        }
        else {
            Historyy.create(history, (err, history) => {
                if (err) return res.status(500).json(err);
                res.json(history);
            });
        }
    })
}

exports.get = function (req, res, next) {
    let historyId = req.params.id;
    Historyy.findById({ _id: historyId })
        .populate("movie")
        .populate("user")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

// can xem lai
exports.update = function (req, res, next) {
    let historyId = req.params.id;

    let param = {
        movie: req.body.movie,
        user: req.body.user
    };

    Historyy.findById({ _id: historyId }, (err, history) => {
        if (err) return res.status(500).json(err);
        if (!history) {
            return res.json({ err: "HISTORY IS NOT FOUND!" })
        }

        Historyy.update({ _id: historyId }, param, (err, data) => {
            if (err) return res.status(500).json(err);
            getHistories(res);
        })
    })
}

exports.remove = function (req, res, next) {
    let historyId = req.params.id;

    Historyy.findByIdAndRemove(historyId, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })
}