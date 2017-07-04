/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .transformer() method or Query class', function() {

    it('Change Transformer of Query from .transformer(), with transformer', function() {

        var transformer = function(cb) {
            if(typeof cb === 'function') {
                cb();
            }
        };

        Query.transformer(transformer);

        should(Query.$__transformer).be.exactly(transformer);
    });

    it('Try to change Transformer of Query from .transformer(), with null', function() {

        var transformer = function(cb) {
            if(typeof cb === 'function') {
                cb();
            }
        };

        Query.transformer(transformer);
        Query.transformer(null);

        should(Query.$__transformer).be.exactly(transformer);
    });

    it('Instanciate a Query and change Transformer from .transformer(), with transformer', function() {

        var query       = new Query('user'),
            transformer = function(cb) {
                if(typeof cb === 'function') {
                    cb();
                }
            };

        query.transformer(transformer);

        should(query.$__transformer).be.exactly(transformer);
    });

    it('Instanciate a Query and try to change Transformer from .transformer(), with null', function() {

        var query       = new Query('user'),
            transformer = function(cb) {
                if(typeof cb === 'function') {
                    cb();
                }
            };

        query.transformer(transformer);
        query.transformer(null);

        should(query.$__transformer).be.exactly(transformer);
    });

    it('Instanciate a Query and force the transformer to null, should not be allowed', function() {

        var query = new Query('user');

        query.$__transformer = null;

        should(function() {

            query.find().exec();
        }).throw();
    });
});