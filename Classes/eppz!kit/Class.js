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


function Class() {}
Class.prototype.construct = function() {};
Class.prototype.className = 'Class';
Class.className = 'Class';


/**
 *
 * Creates a class with the given implementations.
 *
 * Adds a class method called 'extend'.
 * Adds an instance property called 'super'.
 *
 * @param instanceMethods An object with all the instance methods and properties.
 * @param classMethods An object with all the class methods and properties.
 *
 * With some dirty magic class will have the name of the variable you assign it to.
 * Identical class implementations will have identical class names.
 *
 */

Class.extend = function(instanceMethods, classMethods)
{
    /**
     * Create 'super' proxy object.
     * Wraps methods into a function that calls appropriate implementation always with the caller as 'this'.
     */

        var _super = new Object;
            _super.className = this.className;

            // Instance methods
            for (var eachMethodName in this.prototype)
            {
                var eachMethod = this.prototype[eachMethodName];
                if (eachMethod instanceof Function == false) continue;

                // Create proxy function with the same name.
                _super[eachMethodName] = function()
                {
                    var methodName = arguments.callee.methodName;
                    var superclassInstance = arguments.callee.superclassInstance;
                    var callingInstance = this.callingInstance;

                    // Call superclass implementation with calling instance as this.
                    return superclassInstance[methodName].apply(callingInstance, arguments);
                }
                _super[eachMethodName].methodName = eachMethodName;
                _super[eachMethodName].superclassInstance = this.prototype;
            }

            // Class methods
            for (var eachMethodName in this)
            {
                var eachMethod = this[eachMethodName];
                if (eachMethod instanceof Function == false) continue;

                // Create proxy function with the same name.
                _super[eachMethodName] = function()
                {
                    var methodName = arguments.callee.methodName;
                    var superclassInstance = arguments.callee.superclassInstance;
                    var callingInstance = this.callingInstance;

                    // Call superclass implementation with calling instance as this.
                    return superclassInstance[methodName].apply(callingInstance, arguments);
                }
                _super[eachMethodName].methodName = eachMethodName;
                _super[eachMethodName].superclassInstance = this;
            }


    /**
     * Create the new class (also in a resolutely hacky way).
     * Constructor name may set for the constructor function at declaration time, so eval() comes handy below.
     */

        var constructorFunction = function()
        {
            // Call construct only if 'new' was called outside this function.
            if(arguments[0] == "skip") return;

            // Equip constants.
            copyPropertiesOfObjectTo(instanceMethods, this);

            // Add getter for 'super'.
            Object.defineProperty(this, 'super', { get : function()
            {
                var super_ = arguments.callee.caller._super; // Get '_super' reference bound to the calling function.
                super_.callingInstance = this; // Bind current instance as caller.
                return super_;
            }});

            this.construct.apply(this, arguments);
        };

        // Determine class name.
        var newClassName = null;
        if (instanceMethods.className != null && newClassName == null) newClassName = instanceMethods.className;
        if (classMethods != null && classMethods.className != null && newClassName == null) newClassName = classMethods.className;
        if (newClassName == null) newClassName = 'Class';

            // Using static class name (blazing fast).
            if (newClassName == 'Class')
            {
                var Class = constructorFunction;
            }

            // Using user defined class name (slower by 100%).
            // See http://jsperf.com/eppz-class-creation
            else
            {
                eval('var '+newClassName+' = '+constructorFunction.toString());
                eval('var Class = '+newClassName+';');
            }


    /**
     * Equip methods.
     */

        /**
         * Class names.
         */

            Class.prototype.superclassName = this.className;
            Class.superclassName = this.className;

            Class.prototype.className = newClassName;
            Class.className = newClassName;

        /**
         * Instance
         */

            // Inherit current instance methods.
            Class.prototype = new this("skip");

            // Equip implemented instance methods (overwrite inherited).
            copyMethodsOfObjectTo(instanceMethods, Class.prototype, _super);

        /**
         * Class
         */

            // Inherit current class methods.
            copyMethodsOfObjectTo(this, Class, _super);

            // Equip implemented class methods (overwirite inherited).
            copyMethodsOfObjectTo(classMethods, Class, _super, '__super');

            // Add getter for 'super'.
            Object.defineProperty(Class, 'super', { get : function()
            {
                var super_ = arguments.callee.caller.__super; // Get '_super' reference bound to the calling function.
                super_.callingInstance = this; // Bind current instance as caller.
                return super_;
            }});


    return Class;
}


/**
 * Helpers
 */

function copyMethodsOfObjectTo(from, to, _super, superPropertyName)
{
    // Checks.
    if (from == null) return;
    if (to == null) return;

    // Defaults.
    if (superPropertyName == null) superPropertyName = '_super';

    for (var eachMethodName in from)
    {
        var eachMethod = from[eachMethodName];
        if (eachMethod instanceof Function == false) continue;

        to[eachMethodName] = eachMethod;
        to[eachMethodName][superPropertyName] = _super;
    }
}

function copyPropertiesOfObjectTo(from, to)
{
    // Checks.
    if (from == null) return;
    if (to == null) return;

    for (var eachPropertyName in from)
    {
        var eachProperty = from[eachPropertyName];
        if (eachProperty instanceof Function) continue;

        to[eachPropertyName] = eachProperty;
    }
}


/**
 * Not untilized yet.
 * Can be used in looking up class name in variable it is gonna be assigned to.
 */

function objectToString(object)
{
    // Checks.
    if (object == null) return;

    var string = '';

    // Object
    if (typeof(object) == "object" && (object.join == undefined))
    {
        string += '{';
            for (eachPropertyName in object)
            { string += eachPropertyName+': '+objectToString(object[eachPropertyName])+', '; };
        string += '}';
    }

    // Array
    else if (typeof(object) == "object" && !(object.join == undefined))
    {
        string += '[';
            for(eachPropertyName in object)
            { string += objectToString(object[eachPropertyName])+", "; }
        string += ']';
    }

    // Function
    else if (typeof(object) == "function")
    {
        string += object.toString();
    }

    // Anything else
    else
    {
        string += JSON.stringify(object);
    }

    return string;
}

function stripAlmostEverything(string)
{ return string.replace(/[^a-zA-Z0-9_$=]/g,''); }