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


log('______________________________________________');
log('eppz!js Class // superclass call return values');
log('______________________________________________');


(function()
{
    var First = Class.extend
    ({
        className: 'First',
        stuff: function(what)
        {
            return '(11)'+what+'(11)';
        },
    });

    var Second = First.extend
    ({
        className: 'Second',
        stuff: function(what)
        {
            return '(22)'+this.super.stuff(what)+'(22)';
        },
    });

    var Third = Second.extend
    ({
        className: 'Third',
        stuff: function(what)
        {
            return '(33)'+this.super.stuff(what)+'(33)';
        },
    });

    var Fourth = Third.extend
    ({
        className: 'Fourth',
        stuff: function(what)
        {
            return '(44)'+this.super.stuff(what)+'(44)';
        },
    });


    var first = new First();
    var second = new Second();
    var third = new Third();
    var fourth = new Fourth();

    log(first.stuff('it'));
    log(second.stuff('it'));
    log(third.stuff('it'));
    log(fourth.stuff('it'));

    /*

     Outputs as:

     Firsty stuff it (invoked by First). Helpers.js:15

     Firsty stuff it (invoked by Second). Helpers.js:15
     Secondy stuff it (invoked by Second). Helpers.js:15

     Firsty stuff it (invoked by Third). Helpers.js:15
     Secondy stuff it (invoked by Third). Helpers.js:15
     Thirdy stuff it (invoked by Third). Helpers.js:15

     Firsty stuff it (invoked by Fourth). Helpers.js:15
     Secondy stuff it (invoked by Fourth). Helpers.js:15
     Thirdy stuff it (invoked by Fourth). Helpers.js:15
     Fourthy stuff it (invoked by Fourth).

     */

})();

