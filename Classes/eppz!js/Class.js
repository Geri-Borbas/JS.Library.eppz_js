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


/**
 * Object helpers.
 */
include('Object.js');
include('KeyPaths.js');


/**
 * Class object.
 */
function Class() {}
Class.prototype.construct = function() {};
Class.prototype.className = 'Class';
Class.className = 'Class';


/**
 * Creates a class with the given implementations.
 *
 * Adds a class method called 'extend'.
 * Adds an instance property called 'super'.
 * You can define class name by set the `className` property as an instance property.
 *
 * Constructing steps:
 * 1. Look up defined properties, create array enumerators.
 * 2. Look up defined properties, set default values.
 * 3. Create property bindings (override accessors).
 * 4. Calls `constructor` implementation.
 * 5. Sync every binding after constructor has finished.
 *
 * @param instanceMethods An object with all the instance methods and properties.
 * @param classMethods An object with all the class methods and properties.
 * @param propertyBindings A property map that binds left properties to right properties with a given format.
 */
Class.extend = function(instanceMethods, classMethods, propertyBindings)
{


    /**
     * Create 'super' proxy object.
     * Wraps methods into a function that calls appropriate implementation always with the caller as 'this'.
     */

        var _super = new Object;
            _super.className = this.className;

            // Instance methods.
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

            // Class methods.
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
            ClassTools.copyPropertiesOfObjectTo(instanceMethods, this);

            // Sythesize enumerators.
            ClassTools.synthesizeEnumeratorsForObject(this);

            // Synthesize property bindings.
            if (propertyBindings != null)
            { ClassTools.synthesizeAccessorsWithPropertyBindingsMapForObject(this, instanceMethods, propertyBindings); }

            // Add getter for 'super'.
            Object.defineProperty(this, 'super', { get : function()
            {
                var super_ = arguments.callee.caller._super; // Get '_super' reference bound to the calling function.
                super_.callingInstance = this; // Bind current instance as caller.
                return super_;
            }});

            // Call user-defined constructor.
            this.construct.apply(this, arguments);

            // Invoke setters for bindings after `construct`.
            for (var eachBoundPropertyName in propertyBindings)
            { this[eachBoundPropertyName] = this[eachBoundPropertyName]; }
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
            ClassTools.copyMethodsOfObjectTo(instanceMethods, Class.prototype, _super);

        /**
         * Class
         */

            // Inherit current class methods.
            ClassTools.copyMethodsOfObjectTo(this, Class, _super);

            // Equip implemented class methods (overwirite inherited).
            ClassTools.copyMethodsOfObjectTo(classMethods, Class, _super, '__super');

            // Add getter for 'super'.
            Object.defineProperty(Class, 'super', { get : function()
            {
                var super_ = arguments.callee.caller.__super; // Get '_super' reference bound to the calling function.
                super_.callingInstance = this; // Bind current instance as caller.
                return super_;
            }});


    return Class;
}


var ClassTools =
{

    /**
     * Copies methods of one object to another.
     * Also sticks an object to the methods (!) that carries the super implementation for the given method.
     *
     * @param from Copy methods from.
     * @param to Copy methods to.
     * @param _super Object that carries the super implementation for each method.
     * @param superPropertyName Name of the super property (defaults to `_super`).
     */
    copyMethodsOfObjectTo: function(from, to, _super, superPropertyName)
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
    },

    /**
     * Copies properties (non-functions) of one object to another.
     *
     * @param from Copy properties from.
     * @param to  Copy properties to.
     */
    copyPropertiesOfObjectTo: function(from, to)
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
    },


    /**
     * Checks if the object is an Array.
     *
     * @param object Object to inspect.
     * @returns {boolean}
     */
    isArray: function(object)
    { return object.constructor === Array; },


    /**
     * Synthesizes array enumerators for the given object.
     *
     * Object have an array property called `items`.
     * This call creates a method called `enumerateItems(callback);`
     * where callback signature is like `function(eachItem, eachIndex)`.
     *
     * @param object Target object.
     */
    synthesizeEnumeratorsForObject: function(object)
    {
        for (var eachPropertyName in object)
        {
            var eachProperty = object[eachPropertyName];
            if (eachProperty == null) continue;

            if (this.isArray(eachProperty))
            {
                var methodName = 'enumerate'+eachPropertyName.capitalize();
                object[methodName] = function(callback)
                {
                    var arrayPropertyName = arguments.callee._arrayPropertyName;
                    var callingInstance = arguments.callee._object;
                    var array = callingInstance[arrayPropertyName];

                    for (var index = 0; index < array.length; index++)
                    {
                        var eachItem = array[index];
                        callback.apply(callingInstance, [eachItem, index]);
                    }
                };
                object[methodName]._object = object;
                object[methodName]._arrayPropertyName = eachPropertyName;
            }
        }
    },


    /**
     * Synthesizes accessors (getters and setter) for the given object along the passed property map.
     *
     * Property maps should include what properties to bind to what other property.
     *
     * @param object Target object.
     * @param propertyMap Property map to bind properties along.
     */
    synthesizeAccessorsWithPropertyBindingsMapForObject: function(object, instanceMethods, propertyMap)
    {
        for (var eachPropertyName in instanceMethods)
        {
            var eachProperty = instanceMethods[eachPropertyName];
            if (eachProperty == null) continue;
            if (eachProperty instanceof Function) continue;

            // Look up if property is mapped.
            var mapped = (propertyMap[eachPropertyName] != null);
            if (mapped == false) continue;

            // Instance variable name.
            var eachInstanceVariableName = '_'+eachPropertyName;
            var eachBoundPropertyName = propertyMap[eachPropertyName][0];
            var eachBoundPropertyFormat = propertyMap[eachPropertyName][1];

            // Getter.
            var getter = function()
            {
                var instanceVariableName = arguments.callee._instanceVariableName;
                return this[instanceVariableName];
            };
            getter._instanceVariableName = eachInstanceVariableName;

            // Setter.
            var setter = function(value)
            {
                var instanceVariableName = arguments.callee._instanceVariableName;
                var boundPropertyName = arguments.callee._boundPropertyName;
                var boundPropertyFormat = arguments.callee._boundPropertyFormat;

                // Set property.
                this[instanceVariableName] = value;

                // Set bound property.
                var boundValue = boundPropertyFormat.replace('%', value);
                this.setValueForKeyPath(boundValue, boundPropertyName);
            };
            setter._instanceVariableName = eachInstanceVariableName;
            setter._boundPropertyName = eachBoundPropertyName;
            setter._boundPropertyFormat = eachBoundPropertyFormat;

            // Set current value gently.
            object[eachInstanceVariableName] = object[eachPropertyName];

            // Compose.
            Object.defineProperty(object, eachPropertyName, { get : getter, set : setter });
        }
    },


}





