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