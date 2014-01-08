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


/**
 * Creates a class with the given implementations.
 * Add a class method called 'extend'.
 * Add an superclass reference called 'super'.
 */
Class.extend = function(instanceMethods, classMethods)
{
    /**
     * Create 'super' for the new class.
     */

        // Intermediate object to dispatch 'super' calls to superclass.
        var _super = new Object();
            _super.superClass = this.prototype;
            _super.subclassInstance = null; // Will be populated on construction time.

            // Equip with superclass methods.
            for (var eachSuperMethodName in this.prototype)
            {
                var eachSuperMethod = this.prototype[eachSuperMethodName];
                if (eachSuperMethod instanceof Function == false) continue;

                // Call superclass implementation with subclass instance injected as 'this'.
                _super[eachSuperMethodName] = function()
                { return this.superClass[eachSuperMethodName].apply(this.subclassInstance, arguments); };
            }


    /**
     * Create the new class.
     */

        var instance = function()
        {
            // Hook in 'super'.
            this.super = _super;
            this.super.subclassInstance = this;
            this.className = this.name;

            // Call construct only if 'new' was called outside this function.
            if(arguments[0] == "skip") return;

            this.construct.apply(this, arguments);
        };


    /**
     * Inherit current instance methods.
     */

        instance.prototype = new this("skip");


    /**
     * Equip implemented instance methods.
     */

        for (var eachMethodName in instanceMethods)
        {
            var eachMethod = instanceMethods[eachMethodName];
            if (eachMethod instanceof Function == false) continue;

                instance.prototype[eachMethodName] = eachMethod;
        }


    /**
     * Inherit current class methods.
     */

        // Inherit class methods.
        for(var eachFunctionName in this)
        {
            var eachFunction = this[eachFunctionName];
            if (typeof eachFunction !== 'function') continue;
            instance[eachFunctionName] = eachFunction;
        }


    /**
     * Inherit implemented class methods.
     */

        for (var eachMethodName in classMethods)
        {
            var eachMethod = classMethods[eachMethodName];
            if (eachMethod instanceof Function == false) continue;

                instance[eachMethodName] = eachMethod;
        }


    /**
     * Add class goodies.
     */

        // Inheritance.
        instance.extend = this.extend;


    return instance;
}

