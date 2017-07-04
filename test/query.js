/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test Query class', function() {

    it('Instanciate a Query from .create()', function() {

        // Create an instance of the query
        var query = new Query.create('user', {});

        query.should.be.an.instanceOf(Query);
    });

    it('Instanciate a Query from .builder(), without options', function() {

        // Create a builder of the query
        var builder = new Query.builder('user'),
            query   = builder();

        query.should.be.an.instanceOf(Query);
    });

    it('Instanciate a Query from .builder(), with options', function() {

        // Create a builder of the query
        var builder = new Query.builder('user', {}),
            query   = builder();

        query.should.be.an.instanceOf(Query);
    });

    it('Instanciate a Query and execute an empty Query with .exec()', function() {

        var query = new Query('user');

        should(function() {
            query.exec();
        }).throw();
    });

    it('Instanciate a Query and execute an empty Query with .exec() and no callback', function() {

        var query = new Query('user');

        query
            .find()
            .exec();
    });

    it('Instanciate a Query without model name and clone it with .toJSON() and .fromJSON()', function() {

        var query = new Query();

        var json = query.toJSON();

        var queryClone = Query.fromJSON(json);

        should(queryClone).be.an.instanceOf(Query);
    });

    it('Instanciate a Query using empty .fromObject()', function() {

        var query = Query.fromObject();

        should(query).be.an.instanceOf(Query);
    });

    it('Instanciate a Query using empty .fromJSON()', function() {

        var query = Query.fromJSON('{}');

        should(query).be.an.instanceOf(Query);
    });

    it('Instanciate a Query using invalid .fromJSON() should be null', function() {

        var query = Query.fromJSON('invalid');

        should(query).be.exactly(null);
    });
});
