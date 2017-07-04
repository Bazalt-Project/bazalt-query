/* global describe, it */
'use strict';

var should = require('should');
var Query  = require('../');

describe('Test .findOne() method or Query class', function() {

    it('Execute a .findOne() Query', function(done) {

        var query = new Query('user');

        query
            .findOne()
            .exec(done);
    });

    it('Execute a .findOne() Query with callback', function(done) {

        var query = new Query('user');

        query
            .findOne({ name: 'test' }, done);
    });

    it('Execute a .findOne() Query with an offset', function(done) {

        var query = new Query('user');

        query
            .findOne()
            .offset()
            .exec(done);
    });

    it('Execute a .findOne() Query and export it in JSON (Generated using Object)', function(done) {

        // Create the query
        var query = new Query('user');

        query.findOne({
            'name': 'test'
        });
    
        // Export
        var json = query.toJSON();

        // Reimport
        var findOneQuery = Query.fromJSON(json);

        // Check values
        should(findOneQuery.$__action).be.exactly(Query.Actions.FindOne);
        should(findOneQuery.$__modelName).be.exactly('user');

        findOneQuery.exec(done);
    });
});
