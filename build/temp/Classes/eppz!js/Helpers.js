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