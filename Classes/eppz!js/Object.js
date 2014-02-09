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