'use strict'

var secrets = require("json!./../client_secret.json");

var clientsToLoad = [
    {name: 'compute', version: 'v1'},
    {name: 'drive', version: 'v2'},
    {name: 'gmail', version: 'v1'},
    {name: 'calendar', version: 'v3'}];

var scopes = ['profile',
    'https://www.googleapis.com/auth/compute.readonly',
    'https://www.googleapis.com/auth/compute',
    'https://www.googleapis.com/auth/cloud-platform'];

var clientId = secrets.google_api_key;
var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

module.exports = {
    clientsLoaded: function (callback) {

        var ids = 0;

        var check = function () {
            if (ids++ > 1000 || clientsToLoad.length === clientsLoaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    authLoaded: function (callback) {
        var check = function () {
            if (auth2Loaded && sign2Loaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    gapiLoaded: function (callback) {
        var hasgapi = function () {
            if (typeof (gapi) !== "undefined" && gapi.client) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    hasgapi();
                }, 50);
            }
        }

        hasgapi();
    },
    getAuth2: function () {
        return auth2;
    }
};


module.exports.gapiLoaded(function () {

    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: clientId,
            scopes: scopes.join(' ')
        });
        auth2Loaded = true;
    });

    gapi.load('signin2', function () {
        sign2Loaded = true;
    });

    var clientLoaded = function clientLoaded() {
        clientsLoaded++;
    }

    for (var i = 0; i < clientsToLoad.length; i++) {
        var client = clientsToLoad[i];
        gapi.client.load(client.name, client.version, clientLoaded);
    }
});