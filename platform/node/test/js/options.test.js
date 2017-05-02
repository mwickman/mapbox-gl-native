'use strict';

var mockfs = require('./../mockfs');
var mbgl = require('../../index');
var test = require('tape');

var options = {
    request: function(req, callback) {
        callback(null, { data: mockfs.dataForRequest(req) });
    },
    ratio: 1,
};

test('Center', function(t) {
    t.test('sanity', function(t) {
        var map = new mbgl.Map(options);

        t.plan(1);

        map.load(mockfs.style_vector);
        map.render({ center: [10, 10] }, function() { t.pass(); });
    });

    t.test('invalid arguments', function(t) {
        var map = new mbgl.Map(options);

        map.load(mockfs.style_vector);

        t.throws(function() { map.setCenter(); });
        t.throws(function() { map.setCenter(0); });
        t.throws(function() { map.setCenter("abc"); });
        t.throws(function() { map.setCenter({}); });
        t.throws(function() { map.setCenter([0, 0, 0]); });
        t.throws(function() { map.setCenter(["abc", "def"]); });
        t.throws(function() { map.setCenter(["123", "123"]); });
        t.throws(function() { map.setCenter([123, "123"]); });
        t.throws(function() { map.setCenter(["123", 123]); });
        t.throws(function() { map.setCenter([-1000, -1000]); });
        t.throws(function() { map.setCenter([1000, 1000]); });

        t.end();
    });
})

test('Zoom', function(t) {
    t.test('sanity', function(t) {
        var map1 = new mbgl.Map(options);
        var map2 = new mbgl.Map(options);
        var map3 = new mbgl.Map(options);

        map1.load(mockfs.style_vector);
        map2.load(mockfs.style_vector);
        map3.load(mockfs.style_vector);

        t.plan(3);

        // Should clamp and not throw
        map1.render({ zoom: 10 }, function() { t.pass(); });
        map2.render({ zoom: -10 }, function() { t.pass(); });
        map3.render({ zoom: 100 }, function() { t.pass(); });
    });

    t.test('invalid options', function(t) {
        var map1 = new mbgl.Map(options); map1.load(mockfs.style_vector);
        var map2 = new mbgl.Map(options); map2.load(mockfs.style_vector);
        var map3 = new mbgl.Map(options); map3.load(mockfs.style_vector);

        // Should never render, it will throw
        var callback = function(err, pixels) { t.fail(); };

        t.throws(function() { map1.render({ zoom: "abc" }, callback); });
        t.throws(function() { map2.render({ zoom: {} }, callback); });
        t.throws(function() { map3.render({ zoom: [0, 0, 0] }, callback); });

        t.end();
    });
})

test('Bearing', function(t) {
    t.test('sanity', function(t) {
        var map1 = new mbgl.Map(options);
        var map2 = new mbgl.Map(options);
        var map3 = new mbgl.Map(options);

        map1.load(mockfs.style_vector);
        map2.load(mockfs.style_vector);
        map3.load(mockfs.style_vector);

        t.plan(3);

        // Should wrap and not throw
        map1.render({ bearing: 90 }, function() { t.pass(); });
        map2.render({ bearing: -1000 }, function() { t.pass(); });
        map3.render({ bearing: 1000 }, function() { t.pass(); });
    });

    t.test('invalid options', function(t) {
        var map1 = new mbgl.Map(options); map1.load(mockfs.style_vector);
        var map2 = new mbgl.Map(options); map2.load(mockfs.style_vector);
        var map3 = new mbgl.Map(options); map3.load(mockfs.style_vector);

        // Should never render, it will throw
        var callback = function(err, pixels) { t.fail(); };

        t.throws(function() { map1.render({ bearing: "abc" }, callback); });
        t.throws(function() { map2.render({ bearing: {} }, callback); });
        t.throws(function() { map3.render({ bearing: [0, 0, 0] }, callback); });

        t.end();
    });
})

test('Pitch', function(t) {
    t.test('sanity', function(t) {
        var map1 = new mbgl.Map(options);
        var map2 = new mbgl.Map(options);
        var map3 = new mbgl.Map(options);

        map1.load(mockfs.style_vector);
        map2.load(mockfs.style_vector);
        map3.load(mockfs.style_vector);

        t.plan(3);

        // Should clamp and not throw
        map1.render({ pitch: 10 }, function() { t.pass(); });
        map2.render({ pitch: -1000 }, function() { t.pass(); });
        map3.render({ pitch: 1000 }, function() { t.pass(); });
    });

    t.test('invalid options', function(t) {
        var map1 = new mbgl.Map(options); map1.load(mockfs.style_vector);
        var map2 = new mbgl.Map(options); map2.load(mockfs.style_vector);
        var map3 = new mbgl.Map(options); map3.load(mockfs.style_vector);

        // Should never render, it will throw
        var callback = function(err, pixels) { t.fail(); };

        t.throws(function() { map1.render({ pitch: "abc" }, callback); });
        t.throws(function() { map2.render({ pitch: {} }, callback); });
        t.throws(function() { map3.render({ pitch: [0, 0, 0] }, callback); });

        t.end();
    });
})
