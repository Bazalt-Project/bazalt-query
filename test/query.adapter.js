/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

var transformer = function(callback) {
    var data = {};

    if(Query.Actions.FindOne === this.$__action)
    {
        data = {
            username: 'Test'
        };
    }
    else
    {
        data = [
            {
                username: 'Test 1'
            },
            {
                username: 'Test 2'
            }
        ];
    }

    if('function' === typeof callback)
    {

        callback(null, data);
    }
};

describe('Test .adapter() method or Query class', function() {

    it('Change Adapter of Query from .adapter(), with adapter', function() {

        var adapter = function(data) {
            return data;
        };

        Query.adapter(adapter);

        should(Query.$__adapter).be.exactly(adapter);
    });

    it('Change Adapter of Query from .adapter(), with null', function() {

        var adapter = function(cb) {
            return data;
        };

        Query.adapter(adapter);
        Query.adapter(null);

        should(Query.$__adapter).be.exactly(null);
    });

    it('Change Adapter of Query from .adapter(), with and check .findOne()', function(done) {

        var query = new Query('User');

        // Stub Transformer for query
        query.transformer(transformer);


        query.adapter(function(data) {

            should(data.username).be.exactly('Test');

            return data;
        });

        query.findOne().exec(done);
    });

    it('Change Adapter of Query from .adapter(), with and check .find()', function(done) {

        var query = new Query('User');

        // Stub Transformer for query
        query.transformer(transformer);


        query.adapter(function(data) {

            should(data.username).be.equalOneOf(['Test 1', 'Test 2']);

            return data;
        });

        query.find().exec(done);
    });
});