/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .find() method or Query class', function() {

    it('Instanciate a Query and execute multiple .find()', function() {

        var query = new Query('user');

        // First should be ok but the same instance of query
        should(query.find()).be.exactly(query);

        should(function() {
            query.find();
        }).throw();
    });
    
    it('Execute a .find() Query', function(done) {

        var query = new Query('user');

        query
            .find()
            .exec(done);
    });

    it('Execute a .find() Query with callback', function(done) {

        var query = new Query('user');

        query
            .find({}, done);
    });

    it('Execute a .find() Query and limit the result', function(done) {

        var query = new Query('user');

        query
            .find()
            .limit()
            .exec(done);
    });

    it('Execute a .find() Query and add an offset for the result', function(done) {

        var query = new Query('user');

        query
            .find()
            .offset()
            .exec(done);
    });

    it('Execute a .find() Query and add criteria', function(done) {

        var query = new Query('user');

        query
            .find()
            .where({
                name: 'test'
            })
            .exec(done);
    });

    it('Execute a .find() Query and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.find();
    
        // Export
        var json = query.toJSON();

        // Reimport
        var findQuery = Query.fromJSON(json);

        // Check values
        should(findQuery.$__action).be.exactly(Query.Actions.Find);
        should(findQuery.$__modelName).be.exactly('user');

        findQuery.exec(done);
    });

    it('Execute a .find() Query with a limit and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.find({
            'name': 'test'
        }).limit(10);
    
        // Export
        var json = query.toJSON();

        // Reimport
        var findQuery = Query.fromJSON(json);

        // Check values
        should(findQuery.$__action).be.exactly(Query.Actions.Find);
        should(findQuery.$__modelName).be.exactly('user');

        findQuery.exec(done);
    });
});
