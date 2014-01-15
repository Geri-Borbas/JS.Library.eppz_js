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


/**
 * Checks is the given array contains the given value.
 *
 * @param array Array to check (haystack).
 * @param value Value to check (needle).
 * @returns {boolean}
 */
function arrayHasValue(array, value)
{ return array.indexOf(value) != -1; }


/**
 * Return with the copy of the given array.
 *
 * @param array To be copied.
 * @returns {array}
 */
function cloneArray(array)
{ return array.slice(0); }


/**
 * Removes every occurrence of a single value from an array.
 *
 * @param value Value to be removed.
 * @param array Target array to operate on.
 */
function removeValueFromArray(value, array)
{
    for (var index = 0; index < this.length; index++)
    {
        if (array[index] === value)
        {
            array.splice(index, 1);
            index--;
        }
    }
}


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
 * Alias.
 *
 * @param tagName Element type to be created.
 * @returns {HTMLElement}
 */
Element.elementOfType = function(tagName)
{ return document.createElement(tagName); }


/**
 * Alias.
 *
 * @param id The id of the element to be select.
 * @returns {HTMLElement}
 */
function elementForId(id)
{ return document.getElementById(id); }


/**
 * Checks if an element has the given className.
 *
 * @param className
 * @returns {boolean}
 */
Element.prototype.hasClass = function(className)
{
    // Checks.
    if (this == null) return;

    // Search.
    return (this.className.split(EPPZ.classNameSplitter).indexOf(className) === -1) ? false : true;
}


/**
 * Add a className if not exist yet.
 *
 * @param className CSS class name to be added.
 */
Element.prototype.addClass = function(className)
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
}


/**
 * Remove the given class from the element.
 *
 * @param className CSS class name to be removed.
 */
Element.prototype.removeClass = function(className)
{ this.replaceClass(className, ''); }


/**
 * Replace the given class of the element with the given new class name.
 * Simply remove if the new class name already contained.
 *
 * @param currentClassName CSS class name to be replaced.
 * @param newClassName CSS class name to be replaced.
 */
Element.prototype.replaceClass = function(currentClassName, newClassName)
{
    if (this == null) return;
    if (currentClassName == null || currentClassName == '') return;

    // Explode.
    var classes = this.className.split(EPPZ.classNameSplitter);

    // Process.

        var currentClassIndex = classes.indexOf(currentClassName);
        var newClassContained = arrayHasValue(classes, newClassName);

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
}


/**
 * Search for class name(s) containing the given haystack.
 *
 * @param haystack Haysctack to look up in CSS Class names.
 * @returns {array|string} Returns string if exactly one ocurrance found.
 */
Element.prototype.getClassesContainig = function(haystack)
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
}


/**
 * Remove class name(s) containing the given haystack.
 *
 * @param className CSS class name(s) to be removed.
 */
Element.prototype.removeClassesContainig = function(className)
{ this.replaceClassesContainig(className, ''); }


/**
 * Remove class name(s) containing the given haystack, and replace with the given new class name.
 *
 * @param haystack Haysctack to look up in CSS Class names.
 * @returns {array|string} Returns string if exactly one ocurrance found.
 */
Element.prototype.replaceClassesContainig = function(haystack, newClassName)
{
    if (this == null) return;
    if (haystack == null || haystack == '') return;

    var foundOccurrence = false; // Result.

    // Explode.
    var classes = this.className.split(EPPZ.classNameSplitter);
    var classesRemaining = [];
    var newClassContained = arrayHasValue(classes, newClassName);

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
}


/**
 * Nothing serious.
 */

Element.prototype.hide = function()
{ this.style.visibility = 'hidden'; }

Element.prototype.show = function()
{ this.style.visibility = 'visible'; }

Element.prototype.preventScroll = function()
{ this.addEventListener('touchmove', function(event) { event.preventDefault(); }, false); }