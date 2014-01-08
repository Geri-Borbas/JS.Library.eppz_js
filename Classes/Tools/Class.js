/**
 *
 * Created by Borbás Geri on 1/5/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


function Class()
{}

Class.prototype.construct = function()
{
    log('Class.prototype.construct');
};

Class.prototype.getType = function()
{
    return 'Class';
};

/**
 * Equip the instances with the functions given in instanceMethods.
 * Equip the class with the functions given in classMethods.
 * Add a class method called 'extend'.
 * Add an superclass reference called 'super'.
 * var SomeClass = Class.extend({ feature: function() {} });
 */

Class.extend = function(instanceMethods, classMethods)
{

    // Super dispatch object.
    var _super = new Object();
        _super.superClass = this.prototype;
        _super.callingInstance = null;

    // Equip with superclass methods.
    for (var eachSuperFunctionName in this.prototype)
    {
        var eachSuperFunction = this.prototype[eachSuperFunctionName];

        if (eachSuperFunction instanceof Function == false) continue;
        log(eachSuperFunctionName+': '+eachSuperFunction.toString());

        // Set (wrapped) on _super.
        _super[eachSuperFunctionName] = function()
        {
            log('A super function just called! Wow!');
            log(this.callingInstance);

            return this.superClass[eachSuperFunctionName].apply(this.callingInstance, arguments);
        };
    }

    /**
     * Create an object empty object.
     * This will be the constructor function for the object, will be called when it goes like
     * var someObject = new SomeClass();
     */
    var instance = function()
    {
        // Hook in super, callingInstance references.
        this.super = _super;
        this.super.callingInstance = this;

        // Call construct if 'new' was called outside this function.
        if(arguments[0] == "Don't call constructor implementation this time") return;

        this.construct.apply(this, arguments);
    };

    // Inherit instance methods.
    instance.prototype = new this("Don't call constructor implementation this time");

    /**
     * Instance methods.
     */

        // Equip the prototype with the new instance methods.
        for (var eachFunctionName in instanceMethods)
        {
            var eachFunction = instanceMethods[eachFunctionName];
            if (eachFunction instanceof Function == false) continue;

                instance.prototype[eachFunctionName] = eachFunction;
        }

    /**
     * Class methods.
     */

        /*
            // Inherit class methods.
            for(var eachFunctionName in this)
            {
                var eachFunction = classMethods[eachFunctionName];
                if (typeof eachFunction !== 'function') continue;
                instance[eachFunctionName] = eachFunction;
            }
        */

        // Equip the prototype with the implemented functions.
        for (var eachFunctionName in classMethods)
        {
            var eachFunction = classMethods[eachFunctionName];
            if (eachFunction instanceof Function == false) continue;

                instance[eachFunctionName] = eachFunction;
        }

        // Inheritance.
        instance.extend = this.extend;

    return instance;
}

