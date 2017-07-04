/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .update() method or Query class', function() {

    it('Execute an .update() Query', function(done) {

        var query = new Query('user');

        query
            .update('id', {
                name: 'test'
            })
            .exec(done);
    });

    it('Execute an .update() Query with empty parameter', function(done) {

        var query = new Query('user');

        query
            .update()
            .exec(done);
    });

    it('Execute an .update() Query with callback', function(done) {

        var query = new Query('user');

        query
            .update({
                id: 1
            }, {
                name: 'test'
            }, done);
    });

    it('Execute an .update() Query and limit the result', function(done) {

        var query = new Query('user');

        query
            .update({
                id: 1
            }, {
                name: 'test'
            })
            .limit(10)
            .exec(done);
    });

    it('Execute an .update() Query and add criteria', function() {

        var query = new Query('user');

        query
            .update({
                id: 1
            }, {
                name: 'test'
            });

        should(function() {
            query.where();
        }).throw();
    });

    it('Execute an .update() Query and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.update({
            'name': 'test'
        },{
            'name': 'renamed'
        });
    
        // Export
        var json = query.toJSON();

        // Reimport
        var updateQuery = Query.fromJSON(json);

        // Check values
        should(updateQuery.$__action).be.exactly(Query.Actions.Update);
        should(updateQuery.$__modelName).be.exactly('user');

        updateQuery.exec(done);
    });

    it('Execute an .update() Query with a limit and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.update({
            'name': 'test'
        },{
            'name': 'renamed'
        }).limit(10);
    
        // Export
        var json = query.toJSON();

        // Reimport
        var updateQuery = Query.fromJSON(json);

        // Check values
        should(updateQuery.$__action).be.exactly(Query.Actions.Update);
        should(updateQuery.$__modelName).be.exactly('user');

        updateQuery.exec(done);
    });
});
