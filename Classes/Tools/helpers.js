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

//Debug helper.
debugging = true;
function log(message)
{ if (debugging) console.log(message); }

/**
 * An alias for a simple for loop.
 *
 * @param until Loop this times
 * @param callback With signature function(index)
 */
function loopUntil(until, callback)
{
    for (var i = 0; i < until; i++)
    { callback(i); }
}

function arrayHasValue(array, value)
{ return array.indexOf(value) != -1; }

/**
 * Removes every occurance of a single value from an array.
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
 * @param Any amount of arrays to be united.
 * @returns {array} The union array.
 */
function uniteArrays()
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

Element.prototype.hide = function()
{ this.style.visibility = 'hidden'; }

Element.prototype.show = function()
{ this.style.visibility = 'visible'; }

Element.prototype.preventScroll = function()
{ this.addEventListener('touchmove', function(event) { event.preventDefault(); }, false); }