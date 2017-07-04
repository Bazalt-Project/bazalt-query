/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .destroy() method or Query class', function() {

    it('Execute a .destroy() Query', function(done) {

        var query = new Query('user');

        query
            .destroy({
                name: 'test'
            })
            .exec(done);
    });

    it('Execute a .destroy() Query with empty parameter', function(done) {

        var query = new Query('user');

        query
            .destroy()
            .exec(done);
    });

    it('Execute a .destroy() Query with callback', function(done) {

        var query = new Query('user');

        query
            .destroy({
                name: 'test'
            }, done);
    });

    it('Execute a .destroy() Query and limit the result', function(done) {

        var query = new Query('user');

        query
            .destroy({
                name: 'test'
            })
            .limit(10)
            .exec(done);
    });

    it('Execute a .destroy() Query and add criteria', function(done) {

        var query = new Query('user');

        query
            .destroy()
            .where({
                name: 'test'
            })
            .exec(done);
    });

    it('Execute a .destroy() Query and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.destroy({});
    
        // Export
        var json = query.toJSON();

        // Reimport
        var destroyQuery = Query.fromJSON(json);

        // Check values
        should(destroyQuery.$__action).be.exactly(Query.Actions.Destroy);
        should(destroyQuery.$__modelName).be.exactly('user');

        destroyQuery.exec(done);
    });

    it('Execute a .destroy() Query with a limit and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.destroy({
            'name': 'test'
        }).limit(10);
    
        // Export
        var json = query.toJSON();

        // Reimport
        var destroyQuery = Query.fromJSON(json);

        // Check values
        should(destroyQuery.$__action).be.exactly(Query.Actions.Destroy);
        should(destroyQuery.$__modelName).be.exactly('user');

        destroyQuery.exec(done);
    });
});
