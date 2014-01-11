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


log('______________________________');
log('eppz!js Class superclass calls');
log('______________________________');


(function()
{
    var First = Class.extend
    ({
        construct: function()
        {
            this.super = function()
            {
                var super_ = arguments.callee.caller._super; // Get '_super' reference bound to the calling function.
                super_.callingInstance = this; // Bind current instance as caller.
                return super_;
            };
        },

        stuff: function()
        {
            log('Firsty stuff (invoked by '+this.className+').');
        },

    });

    var Second = First.extend
    ({
        stuff: function()
        {
            this.super().stuff();
            log('Secondy stuff (invoked by '+this.className+').');
        },
    });


    var Third = Second.extend
    ({
        stuff: function()
        {
            this.super().stuff();
            log('Thirdy stuff (invoked by '+this.className+').');
        },
    });


    var Fourth = Third.extend
    ({
        stuff: function()
        {
            this.super().stuff();
            log('Fourthy stuff (invoked by '+this.className+').');
        },
    });


    var first = new First();
    var second = new Second();
    var third = new Third();
    var fourth = new Fourth();

    first.stuff();
    second.stuff();
    third.stuff();
    fourth.stuff();

})();