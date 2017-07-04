/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .create() method or Query class', function() {

    it('Execute a .create() Query', function(done) {

        var query = new Query('user');

        query
            .create({
                name: 'test'
            })
            .exec(done);
    });

    it('Execute a .create() Query with empty parameter', function(done) {

        var query = new Query('user');

        query
            .create()
            .exec(done);
    });

    it('Execute a .create() Query with callback', function(done) {

        var query = new Query('user');

        query
            .create({
                name: 'test'
            }, done);
    });

    it('Execute a .create() Query and limit the result', function() {

        var query = new Query('user');

        query
            .create('id', {
                name: 'test'
            });

        should(function() {
            query.limit(1);
        }).throw();
    });

    it('Execute a .create() Query and add criteria', function() {

        var query = new Query('user');

        query
            .create('id', {
                name: 'test'
            });

        should(function() {
            query.where({
                name: 'test'
            });
        }).throw();
    });

    it('Execute a .create() Query and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.create({
            'name': 'test'
        });
    
        // Export
        var json = query.toJSON();

        // Reimport
        var createQuery = Query.fromJSON(json);

        // Check values
        should(createQuery.$__action).be.exactly(Query.Actions.Create);
        should(createQuery.$__modelName).be.exactly('user');

        createQuery.exec(done);
    });
});
