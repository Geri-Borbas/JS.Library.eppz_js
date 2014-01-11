/**
 *
 * Created by Borbás Geri on 1/8/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


log('||||| Superclass |||||');
(function()
{
    var First = Class.extend
    ({
        work: function()
        {
            var e = 1;
            log('---');
            log(this.className + ' : '+this.superclassName);
            log(window[this.className]);
            log(this);
        },

        stuff: function()
        {
            log('Firsty stuff (invoked by '+this.className+').');
        },

    });

    var Second = First.extend
    ({
        work: function()
        {
            var e = 2;
            log('---');
            log(this.className + ' : '+this.superclassName);
            log(window[this.className]);

            this.superclassInstance().stuff.apply(this);
        },

        superclassInstance: function()
        {
            return window[this.superclassName];
        },

        stuff: function()
        {
            var _super = arguments.callee._super;
            var _self = arguments.callee._self;

            _super.stuff.apply(_self, arguments);
            log('Secondy stuff (invoked by '+_self.className+').');
        },
    });


    var Third = Second.extend
    ({
        work: function()
        {
            var e = 3;
            log('---');
            log(this.className + ' : '+this.superclassName);
            log(window[this.className]);
            log(window[this.superclassName]);

            this.stuff();
        },

        stuff: function()
        {
            this.superclassInstance().stuff._super = this.superclassInstance().superclassInstance();
            this.superclassInstance().stuff._self = this;
            this.superclassInstance().stuff();

            log('Thirdy stuff (invoked by '+this.className+').');
        }
    });

    /**
     *
     * Create super object.
     * Copy superclass functions, simply wrap them, but append caller as self.
     * Straight function will have appended this as self.
     *
     */

    var first = new First();
    var second = new Second();
    var third = new Third();

    log(first.work());
    log(second.work());
    log(third.work());

})();