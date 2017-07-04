'use strict';

// Define the query class
class Query {
    // Define allowed Actions
    static get Actions() {
        return {
            Find:    'FIND',
            FindOne: 'FIND_ONE',
            Create:  'CREATE',
            Update:  'UPDATE',
            Destroy: 'DESTROY'
        };
    }

    static get ActionsList() {
        return [
            Query.Actions.Find,
            Query.Actions.FindOne,
            Query.Actions.Create,
            Query.Actions.Update,
            Query.Actions.Destroy
        ];
    }

    // Define allowed Actions
    static get Sort() {
        return {
            Ascending:  1,
            Descending: -1
        };
    }

    // The constructor of the query
    constructor(modelName, options = {}) {
        // Save properties
        this.$__modelName   = modelName || null;
        this.$__options     = options;
        this.$__action      = null;
        this.$__criteria    = null;
        this.$__values      = null;
        this.$__offset      = null;
        this.$__limit       = null;
        this.$__sort        = [];
        this.$__identifiers = options.identifiers || ['id'];
        this.$__adapter     = options.adapter     || Query.$__adapter;
        this.$__authorize   = options.authorize   || Query.$__authorize;
        this.$__transformer = options.transformer || Query.$__transformer;
    }

    get criteria() {
        return this.$__criteria;
    }

    get values() {
        return this.$__values;
    }

    // Validate the action
    $__PreventMultipleActions() {
        // Check Query information
        if(-1 !== Query.ActionsList.indexOf(this.$__action))
        {
            throw new Error('The Query already have an action \'' + this.$__action + '\'.');
        }
    }

    // Handle the find action
    find(criteria = {}, callback = undefined) {

        // Validate query
        this.$__PreventMultipleActions();

        // Register information
        this.$__action   = Query.Actions.Find;
        this.$__criteria = criteria;

        if('function' === typeof callback)
        {
            this.exec(callback);
        }

        return this;
    }

    // Handle the findOne action
    findOne(criteria = {}, callback = undefined) {

        // Validate query
        this.$__PreventMultipleActions();
        
        // Find by id if string or number
        if(
            'number' === typeof criteria ||
            'string' === typeof criteria
        ) {
            // Generate th right criteria
            criteria = {
                [this.$__identifier]: criteria
            };
        }

        // Register information
        this.$__action   = Query.Actions.FindOne;
        this.$__criteria = criteria;

        if('function' === typeof callback)
        {
            this.exec(callback);
        }

        return this;
    }

    // Handle the create action
    create(values = {}, callback = undefined) {

        // Validate query
        this.$__PreventMultipleActions();

        // Register information
        this.$__action = Query.Actions.Create;
        this.$__values = values;

        if('function' === typeof callback)
        {
            this.exec(callback);
        }

        return this;
    }

    // Handle the update action
    update(criteria = {}, values = {}, callback = undefined) {

        // Validate query
        this.$__PreventMultipleActions() ;

        // Register information
        this.$__action   = Query.Actions.Update;
        this.$__criteria = criteria;
        this.$__values   = values;

        if('function' === typeof callback)
        {
            this.exec(callback);
        }

        return this;
    }

    // Handle the destroy action
    destroy(criteria = {}, callback = undefined) {

        // Validate query
        this.$__PreventMultipleActions();

        // Register information
        this.$__action   = Query.Actions.Destroy;
        this.$__criteria = criteria;

        if('function' === typeof callback)
        {
            this.exec(callback);
        }

        return this;
    }

    where(criteria = {}) {
        // Check allowed information
        if(
            Query.Actions.Find    === this.$__action ||
            Query.Actions.FindOne === this.$__action ||
            Query.Actions.Destroy === this.$__action
        ) {
            this.$__criteria = criteria;

            return this;
        }

        throw new Error('The Query.where() doesn\'t support \'' + this.$__action + '\'.');
    }

    offset(offset = 0) {
        // Check allowed information
        if(
            Query.Actions.Find    === this.$__action ||
            Query.Actions.FindOne === this.$__action ||
            Query.Actions.Update  === this.$__action ||
            Query.Actions.Destroy === this.$__action
        ) {
            this.$__offset = offset;

            return this;
        }

        throw new Error('The Query.offset() doesn\'t support \'' + this.$__action + '\'.');
    }

    limit(limit = 1) {
        // Check allowed information
        if(
            Query.Actions.Find    === this.$__action ||
            Query.Actions.Update  === this.$__action ||
            Query.Actions.Destroy === this.$__action
        ) {
            this.$__limit = limit;

            return this;
        }

        throw new Error('The Query.limit() doesn\'t support \'' + this.$__action + '\'.');
    }

    sort(key, direction) {
        // Check allowed information
        if(
            Query.Actions.Find    === this.$__action ||
            Query.Actions.FindOne === this.$__action ||
            Query.Actions.Update  === this.$__action ||
            Query.Actions.Destroy === this.$__action
        ) {
            if ('ASC' === direction)
            {
                direction = 1;
            }
            else if ('DESC' === direction)
            {
                direction = -1;
            }

            if(
                'string' === typeof key &&
                (
                     1 === direction ||
                    -1 === direction
                )
            ) {
                this.$__sort.push([key, direction]);
            }

            return this;
        }

        throw new Error('The Query.sort() doesn\'t support \'' + this.$__action + '\'.');
    }

    // Execute the query
    exec(callback) {
        // Query information
        if(-1 === Query.ActionsList.indexOf(this.$__action))
        {
            throw new Error('The Query must have an action.');
        }

        var authorized = true;

        // If strictly blocked
        if(false === this.$__authorize)
        {
            authorized = false;
        }
        // If the handler is a function
        else if('function' === typeof this.$__authorize)
        {
            authorized = this.$__authorize.call(this);
        }

        // If not authorized, throw an exception
        if(true !== authorized)
        {
            throw new Error('You are not allowed to perform this Query.');
        }

        // If no the transformer, stop the process
        if('function' !== typeof this.$__transformer)
        {
            throw new Error('You must have a transformer to perform this Query.');
        }

        var self = this,
            done = function(error, data) {
                // No need to continue id
                if('function' !== typeof callback)
                {
                    return;
                }

                // By default, it's an empty array for convinience
                var values = data || [];

                // Adapt data to correct values if no error and adapter
                if(!error && 'function' === typeof self.$__adapter)
                {
                    // For array, map result
                    if(true === Array.isArray(values))
                    {
                        values = values.map(self.$__adapter);
                    }
                    else
                    {
                        values = self.$__adapter(values);
                    }
                }

                // If the is a find one action, select the first
                if(Query.Actions.FindOne === self.$__action && true === Array.isArray(values))
                {
                    values = values[0];
                }

                callback(error, values);
            };

        this.$__transformer.call(this, done);
    }

    // Change the authorization handler of the query
    authorize(authorize) {
        this.$__authorize = authorize;

        return this;
    }

    // Change the adapter of the query
    adapter(adapter) {
        this.$__adapter = adapter;

        return this;
    }

    // Change the transformer of the query
    transformer(transformer) {
        // Check if this is function
        if('function' === typeof transformer)
        {
            this.$__transformer = transformer;
        }

        return this;
    }

    toObject() {
        var obj = {};

        if(null !== this.$__modelName)
        {
            obj.model = this.$__modelName;
        }

        if(null !== this.$__action)
        {
            obj.action = this.$__action;
        }

        if(
            null !== this.$__criteria &&
               0 !== Object.keys(this.$__criteria).length
        ) {
            obj.criteria = this.$__criteria;
        }

        if(null !== this.$__values)
        {
            obj.values = this.$__values;
        }

        if(0 < this.$__sort.length)
        {
            obj.sort = this.$__sort;
        }

        if(null !== this.$__limit)
        {
            obj.limit = this.$__limit;
        }

        if(null !== this.$__offset)
        {
            obj.offset = this.$__offset;
        }

        return obj;
    }

    toJSON() {
        return JSON.stringify(
            this.toObject()
        );
    }

    static fromObject(obj = {}) {

        // Retrieve the model name
        var query = new Query(obj.model);

        switch(obj.action) {
            case Query.Actions.FindOne:
                query.findOne(obj.criteria);
                break;

            case Query.Actions.Find:
                query.find(obj.criteria);
                break;
            
            case Query.Actions.Create:
                query.create(obj.values);
                break;

            case Query.Actions.Update:
                query.update(obj.criteria, obj.values);
                break;

            case Query.Actions.Destroy:
                query.destroy(obj.criteria);
                break;
        }

        switch(obj.action) {
            // Allowed for offset
            case Query.Actions.Find:
            case Query.Actions.Update:
            case Query.Actions.Destroy:
                
                // Check for sorting
                if(obj.sort)
                {
                    query.sort(obj.sort);
                }
                
                // Check for an offset
                if(obj.offset)
                {
                    query.offset(obj.offset);
                }

                // Check for a limit
                if(obj.limit)
                {
                    query.limit(obj.limit);
                }

                break;

            // Add FindOne for the offset only
            case Query.Actions.FindOne:

                // Check for sorting
                if(obj.sort)
                {
                    query.sort(obj.sort);
                }
                
                // Check for an offset
                if(obj.offset)
                {
                    query.offset(obj.offset);
                }

                break;
        }

        return query;
    }

    static fromJSON(json) {
        // Try parse the JSON, or return null
        try
        {
            var obj = JSON.parse(json);

            return Query.fromObject(obj);
        }
        catch(error)
        {
            return null;
        }
    }

    static addMethod(instanceName, instanceFunction) {
        // Check the type to be sure it's a function
        if(
            'function'  === typeof instanceFunction &&
            'undefined' === typeof Query.prototype[instanceName]
        ) {
            Query.prototype[instanceName] = instanceFunction;
        }
    }

    static methods(methods) {
        // Check for instances functions
        for(let instanceName in methods) {

            // Store the function
            Query.addMethod(instanceName, methods[instanceName]);
        }
    }

    static addStatic(staticName, staticFunction) {
        // Check the type to be sure it's a function
        if(
            'function'  === typeof staticFunction &&
            'undefined' === typeof Query[staticName]
        ) {
            Query[staticName] = staticFunction;
        }
    }

    static statics(statics) {
        // Check for static functions
        for(let staticName in statics) {

            // Store the function
            Query.addStatic(staticName, statics[staticName]);
        }
    }

    // Change the default authorization handler
    static authorize(authorize) {
        Query.$__authorize = authorize;

        return true;
    }

    // Change the default adapter
    static adapter(adapter) {
        Query.$__adapter = adapter;

        return true;
    }

    // Change the default transformer
    static transformer(transformer) {
        // Check if this is function
        if('function' === typeof transformer)
        {
            Query.$__transformer = transformer;

            // Register statics methods
            Model.statics(transformer.statics);

            // Register instance methods
            Model.methods(transformer.methods);
            
            return true;
        }

        return false;
    }

    // Create a query for the given model name
    static create(modelName, options) {

        // return the query
        return new Query(modelName, options);
    }

    // Create a query builder for the given model name
    static builder(modelName, options) {

        // If there is no option, only bind the modelName
        if(!options)
        {
            // Return the builder
            return Query.create.bind(null, modelName);
        }

        return Query.create.bind(null, modelName, options);
    }
}

// Set authorized for all by default
Query.authorize(true);

// Set default transformer
Query.transformer(function(callback) {
    if('function' === typeof callback)
    {
        callback();
    }
});

// Export the Query class
module.exports = Query;