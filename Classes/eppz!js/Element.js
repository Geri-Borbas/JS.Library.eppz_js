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