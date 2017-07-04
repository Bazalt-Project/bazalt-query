/* global describe, it, after */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .authorize() method or Query class', function() {

    after(function() {
        Query.authorize(true);
    });

    it('Change Authorization Handler of Query from .authorize(), with authorize', function() {

        var authorize = function() {
            return true;
        };

        Query.authorize(authorize);

        should(Query.$__authorize).be.exactly(authorize);
    });

    it('Change Authorization Handler of Query from .authorize(), with null', function() {

        var authorize = function() {
            return true;
        };

        Query.authorize(authorize);
        Query.authorize(null);

        should(Query.$__authorize).be.exactly(null);
    });

    it('Instanciate a Query and change Authorization Handler from .authorize(), with authorize', function() {

        var query     = new Query('user'),
            authorize = function() {
                return true;
            };

        query.authorize(authorize);

        should(query.$__authorize).be.exactly(authorize);
    });

    it('Instanciate a Query and change Authorization Handler from .authorize(), with null', function() {

        var query     = new Query('user'),
            authorize = function() {
                return true;
            };

        query.authorize(authorize);
        query.authorize(null);

        should(query.$__authorize).be.exactly(null);
    });

    it('Instanciate a Query and change Authorization Handler from .authorize(), with function false to block the query', function() {

        var query     = new Query('user'),
            authorize = function() {
                return false;
            };

        query.authorize(authorize);

        should(function() {
            query
                .find()
                .exec();
        }).throw();
    });

    it('Instanciate a Query and change Authorization Handler from .authorize(), with false to block the query', function() {

        var query = new Query('user');

        query.authorize(false);

        should(function() {
            query
                .find()
                .exec();
        }).throw();
    });
});