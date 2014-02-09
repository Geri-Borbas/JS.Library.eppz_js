/**
 *
 * Created by Borbás Geri on 7/6/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


/**
 * Basic helper features.
 */
/**
 *
 * Created by Borbás Geri on 1/14/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var EPPZ =
{
    /**
     * Properties.
     */

    debugging: true,
    classNameSplitter: /[ ]+/,
    classNameJoiner: ' ',

    log: function(message)
    { if (this.debugging) console.log(message); },


    /**
     * A simple for loop wrapped up.
     *
     * @param until Loop this times
     * @param callback With signature function(index)
     */
    loopUntil: function(until, callback)
    {
        for (var i = 0; i < until; i++)
        { callback(i); }
    },

};


/**
 * Aliases
 */

function log(message)
{ EPPZ.log(message); }


/**
 * Only for IDE consistency.
 * Grunt 'include' will replace the statements with the referenced source code.
 */
function include(javaScriptFilePath)
{
    var script = document.createElement('script');
    script.src = javaScriptFilePath;

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}

/**
 * Object helpers.
 */
/**
 *
 * Created by Borbás Geri on 2/9/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


/**
 * Adds method definitions trough `defineProperty` to an object (or a prototype).
 * Extensions (actually any kind of properties) will be added as non-enumeratable properties.
 *
 * @param properties A simple object holding method (or property) definitions.
 */
Object.defineProperty(Object.prototype, "addProperties", { value: function(properties)
{
    for (var eachPropertyName in properties)
    {
        var eachProperty = properties[eachPropertyName];
        if (eachProperty == null) continue;

        // Set trough `defineProperty`.
        Object.defineProperty(this, eachPropertyName, { value: eachProperty});
    }
}});

Object.defineProperty(Object.prototype, "addMethods", { value: function(methods)
{ this.addProperties(methods); }});
/**
 *
 * Created by Borbás Geri on 2/9/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


Object.prototype.addMethods
({

    /**
     * Get the value for the given key.
     *
     * @param key Property name to get.
     * @returns {*}
     */
    getValueForKey: function(key)
    { return this[key]; },

    /**
     * Sets the value for the given key.
     *
     * @param key Property name to set.
     * @param value Value to be set.
     */
    setValueForKey: function(value, key)
    { this[key] = value; },

    /**
     * Get the value for the given keyPath (using `.` notation).
     *
     * @param keyPath The keyPath to return the value from.
     * @returns {*}
     */
    getValueForKeyPath: function(keyPath)
    {
        if (keyPath == null) return;
        if (keyPath.contains('.') == false) { return this.getValueForKey(keyPath); }

        var chain = keyPath.split('.');
        var firstKey = chain.shift();
        var shiftedKeyPath = chain.join('.');

        return this[firstKey].getValueForKeyPath(shiftedKeyPath);
    },

    /**
     * Set a value for a given keyPath (using `.` notation).
     *
     * @param value Value to be set.
     * @param keyPath The keyPath where the value should be set.
     */
    setValueForKeyPath: function(value, keyPath)
    {
        if (keyPath == null) return;
        if (keyPath.contains('.') == false) { this.setValueForKey(value, keyPath); return; }

        var chain = keyPath.split('.');
        var firstKey = chain.shift();
        var shiftedKeyPath = chain.join('.');

        this[firstKey].setValueForKeyPath(value, shiftedKeyPath);
    },

});

/**
 * String helpers.
 */
/**
 *
 * Created by Borbás Geri on 2/9/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


String.prototype.addMethods
({

    contains: function(needle)
    { return this.indexOf(needle) != -1; },

    capitalize: function()
    { return this.charAt(0).toUpperCase() + this.slice(1); },

});

/**
 * Array helpers.
 */
/**
 *
 * Created by Borbás Geri on 1/13/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


Array.prototype.addMethods
({


    /**
     * Checks if the current array contains the given value.
     *
     * @param value Value to check (needle).
     * @returns {boolean}
     */
    hasValue: function(value)
    { return this.indexOf(value) != -1; },


    /**
     * Return with the copy of the current array.
     *
     * @returns {array}
     */
    clone: function()
    { return this.slice(0); },


    /**
     * Removes every occurrence of a single value.
     *
     * @param value Value to be removed.
     */
    removeValue: function(value)
    {
        for (var index = 0; index < this.length; index++)
        {
            if (this[index] === value)
            {
                this.splice(index, 1);
                index--;
            }
        }
    },

    /**
     * Enumerate elements within.
     *
     * @param callback A callback function with the signature `function(eachValue, eachKey)`.
     */
    enumerate: function(callback)
    {
        for (eachKey in this)
        {
            eachValue = this[eachKey];
            callback(eachValue, eachKey);
        }
    },


});


/**
 * Checks if the object is an Array.
 *
 * @returns {boolean}
 */
if (typeof Array.isArray === 'undefined')
{
    Array.isArray = function(object)
    { return Object.toString.call(object) === '[object Array]'; }
};


/**
 * Returns with the union of the given arrays.
 *
 * @param array,... Any amount of arrays to be united.
 * @returns {array} The union array.
 */
function uniteArrays(array)
{
    var union = [];
    for (var argumentIndex = 0; argumentIndex < arguments.length; argumentIndex++)
    {
        eachArgument = arguments[argumentIndex];
        if (typeof eachArgument !== 'array')
        {
            eachArray = eachArgument;
            for (var index = 0; index < eachArray.length; index++)
            {
                eachValue = eachArray[index];
                if (arrayHasValue(union, eachValue) == false)
                    union.push(eachValue);
            }
        }
    }

    return union;
}


/**
 * Returns with the subtraction of the given arrays.
 *
 * @param one Array to subtract from.
 * @param other Array containing elements to subtract.
 * @returns {array} The subtraction of the arrays.
 */
function subtractArrays(one, other)
{
    var subtraction = [];
    for (var index = 0; index < one.length; index++)
    {
        eachValue = one[index];
        if (arrayHasValue(other, eachValue) == false)
            subtraction.push(eachValue);
    }
    return subtraction;
}

/**
 * Element helpers.
 */
/**
 *
 * Created by Borbás Geri on 1/13/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


/**
 * Basic methods to create, retrieve elements.
 * Extend both `Window` and `Element` prototypes.
 *
 */
var elementManagementMethods =
{

    /**
     * Alias.
     *
     * @param tagName Element type to be created.
     * @returns {HTMLElement}
     */
    elementOfType: function(tagName)
    { return document.createElement(tagName); },


    /**
     * Alias.
     *
     * @param id The id of the element to be select.
     * @returns {HTMLElement}
     */
    elementForId: function(id)
    { return document.getElementById(id); },


}

Window.prototype.addMethods(elementManagementMethods);
Element.prototype.addMethods(elementManagementMethods);


/**
 * CSS class name management for `Element` protoype.
 */
Element.prototype.addMethods
({


    /**
     * Checks if an element has the given className.
     *
     * @param className
     * @returns {boolean}
     */
    hasClass: function(className)
    {
        // Checks.
        if (this == null) return;

        // Search.
        return (this.className.split(EPPZ.classNameSplitter).indexOf(className) === -1) ? false : true;
    },


    /**
     * Add a className if not exist yet.
     *
     * @param className CSS class name to be added.
     */
    addClass: function(className)
    {
        if (this == null) return;
        if (className == null || className == '') return;
        if (this.hasClass(className)) return;

        // Explode.
        var classes = this.className.split(EPPZ.classNameSplitter);

        // Process.
        classes.push(className);

        // Implode.
        this.className = classes.join(EPPZ.classNameJoiner);
    },


    /**
     * Remove the given class from the element.
     *
     * @param className CSS class name to be removed.
     */
    removeClass: function(className)
    { this.replaceClass(className, '');},


    /**
     * Replace the given class of the element with the given new class name.
     * Simply remove if the new class name already contained.
     *
     * @param currentClassName CSS class name to be replaced.
     * @param newClassName CSS class name to be replaced.
     */
    replaceClass: function(currentClassName, newClassName)
    {
        if (this == null) return;
        if (currentClassName == null || currentClassName == '') return;

        // Explode.
        var classes = this.className.split(EPPZ.classNameSplitter);

        // Process.

        var currentClassIndex = classes.indexOf(currentClassName);
        var newClassContained = classes.hasValue(newClassName);

        // Return if no occurrence to be replaced.
        if (currentClassIndex == -1) return;

        // Only remove if new class name has existed already.
        if (newClassName == null || newClassName == '' || newClassContained)
        { classes.splice(currentClassIndex, 1); }

        // Or replace.
        else
        { classes.splice(currentClassIndex, 1, newClassName); }

        // Implode.
        this.className = classes.join(EPPZ.classNameJoiner);
    },


    /**
     * Search for class name(s) containing the given haystack.
     *
     * @param haystack Haysctack to look up in CSS Class names.
     * @returns {array|string} Returns string if exactly one ocurrance found.
     */
    getClassesContainig: function(haystack)
    {
        if (this == null) return;
        if (haystack == null || haystack == '') return;

        // Explode.
        var classes = this.className.split(EPPZ.classNameSplitter);
        var classesContaining = [];

        // Look for haystack.
        for (eachIndex in classes)
        {
            var eachClass = classes[eachIndex];
            var found = (eachClass.search(haystack) != -1);
            if (found)
            {
                // Collect if found.
                classesContaining.push(eachClass);
            }
        }

        if (classesContaining.length == 1) return classesContaining[0];
        if (classesContaining.length == 0) return null;
        return classesContaining;
    },


    /**
     * Remove class name(s) containing the given haystack.
     *
     * @param className CSS class name(s) to be removed.
     */
    removeClassesContainig: function(className)
    { this.replaceClassesContainig(className, ''); },


    /**
     * Remove class name(s) containing the given haystack, and replace with the given new class name.
     *
     * @param haystack Haysctack to look up in CSS Class names.
     * @returns {array|string} Returns string if exactly one ocurrance found.
     */
    replaceClassesContainig: function(haystack, newClassName)
    {
        if (this == null) return;
        if (haystack == null || haystack == '') return;

        var foundOccurrence = false; // Result.

        // Explode.
        var classes = this.className.split(EPPZ.classNameSplitter);
        var classesRemaining = [];
        var newClassContained = classes.hasValue(newClassName);

        // Look for haystack.
        for(eachIndex in classes)
        {
            var eachClass = classes[eachIndex];
            var found = (eachClass.search(haystack) != -1);

            // Haystack found.
            if (found)
            {
                // Only remove if new class name has existed already.
                if (newClassName != null && newClassName != '' && newClassContained == false)
                {
                    classesRemaining.push(newClassName);
                    newClassContained = true;
                }
                foundOccurrence = true;

                // Don't save this to the output array.
            }

            // No haystack found.
            else
            {
                // Save this to the output array, has no haystack.
                classesRemaining.push(eachClass);
            }

        }

        // Implode.
        this.className = classesRemaining.join(EPPZ.classNameJoiner);

        return foundOccurrence;
    },


    /**
     * Nothing serious.
     */

    hide: function()
    { this.style.visibility = 'hidden'; },

    show: function()
    { this.style.visibility = 'visible'; },

    preventScroll: function()
    { this.addEventListener('touchmove', function(event) { event.preventDefault(); }, false); },


});


















/**
 * Objective-JavaScript.
 */
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
 *
 * @constructor
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
 *
 * @param instanceMethods An object with all the instance methods and properties.
 * @param classMethods An object with all the class methods and properties.
 * @param propertyBindings A property map that binds left properties to right properties with a given format.
 *
 * You can define class name by set the `className` property as an instance property.
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

            // Sythesize enumerators.
            ClassTools.synthesizeEnumeratorsForObject(this);

            // Synthesize property bindings.
            if (propertyBindings != null)
            { ClassTools.synthesizeAccessorsWithPropertyBindingsMapForObject(this, instanceMethods, propertyBindings); }

            // Equip constants.
            // ClassTools.copyPropertiesOfObjectTo(instanceMethods, this);

            // Add getter for 'super'.
            Object.defineProperty(this, 'super', { get : function()
            {
                var super_ = arguments.callee.caller._super; // Get '_super' reference bound to the calling function.
                super_.callingInstance = this; // Bind current instance as caller.
                return super_;
            }});

            // Call user-defined constructor.
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

        log(Class);


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
        log(object);
        log(instanceMethods);

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

            log('Map '+eachPropertyName);

            // Getter.
            var getter = function()
            {
                var instanceVariableName = arguments.callee._instanceVariableName;
                return this[instanceVariableName];
            };
            getter._instanceVariableName = eachInstanceVariableName;
            Object.defineProperty(object, eachPropertyName, { get : getter });

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
            Object.defineProperty(object, eachPropertyName, { set : setter });
        }
    },


}





