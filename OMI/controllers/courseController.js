// file: courseController.js

var Course = require("../models/course");
var Helper = require("../models/helper");
var async = require("async");
const { body,validationResult } = require("express-validator");
const util = require("util");
const debuglog = util.debuglog("app");
const helpers = require("../helpers");
const logger = require("../logger");

// Liste von Kursen anzeigen
exports.course_list = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_list ***`);
    Course.find({}, "title")
     .exec((err, list_courses) => {
        if(err) { return next(err);}
        response.render("course_list", {title: "Alle Kurse", course_list: list_courses});
     });
};

// Details zu einem Kurs anzeigen
exports.course_detail = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_detail ***`);
    async.parallel({
        course: (callback) => {
            Course.findById(request.params.id)
            .exec(callback)
        },
        helper_list: (callback) => {
            Helper.find({"course": request.params.id}, "title url")
            .exec(callback)
        },

    }, (err, results) => {
        if (err) { return next(err);}
        if (results.course == null){
            var err = new Error("Kurs nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        // Über course wird auch die CourseId übergeben
        var userId=0;
        if (response.locals.currentUser != undefined)
        { userId = response.locals.currentUser.id; }
        response.render("course_detail", {title: "Details zu einem Kurs", course: results.course, userId: userId, helper_list: results.helper_list});
    });
};

// Formular für das Anlegen eines Kurs anzeigen
exports.course_create_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_create_get ***`);
    response.send("Noch nicht implementiert: Kurs anlegen GET");
};

// Kurs anlegen POST 
exports.course_create_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_create_post ***`);
    response.send("Noch nicht implementiert: Kurs anlegen POST");
};

// Formular für das Löschen eines Kurses anzeigen
exports.course_delete_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_delete_get ***`);
    response.send("Noch nicht implementiert: Kurs löschen GET");
};

// Kurs delete POST
exports.course_delete_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_delete_post ***`);
    response.send("Noch nicht implementiert: Kurs löschen POST");
};

// Formular für das Aktualisieren eines Kurses anzeigen
exports.course_update_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_update_get ***`);
    response.send("Noch nicht implementiert: Kurs aktualisieren GET");
};

// Kurs aktualisieren POST
exports.course_update_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Course Controller - calling course_update_post ***`);
    response.send("Noch nicht implementiert: Kurs aktualisieren POST");
};
