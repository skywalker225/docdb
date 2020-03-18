var Itndept = require('../models/internaldept');

exports.itn_list = (req, res, next) => {
    
    // res.send('NOT IMPLEMENTED: Internal Department Detail');
    Itndept.find({}, 'title itn')
        .populate('name')
        .exec(function (err, list_itns) {
            if (err) { return next(err); }
            res.render('int_list', { title: 'NN Documents Recorder', user: req.user, titlex: 'Itn List', itn_list: list_itns });
        });
}

exports.itn_detial = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Internal Department Detail');
}

exports.itn_create_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Internal Department Create GET');
}

exports.itn_create_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Internal Department Create POST');
}