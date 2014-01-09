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


function Test_2 ()
{
    var A = Class.extend
    ({
        type: 'A',

        iCanDo: function()
        {
            log(this);
            return this.type+' can do this.';
        },

    });

    var B = A.extend
    ({
        type: 'B',

        iCanDo: function()
        {
            log(this);
            return this.super.iCanDo()+' '+this.type+' can do this.';
        },

        bCanDo: function()
        { log('B feature.'); }

    });

    var C = B.extend
    ({
        type: 'C',

        iCanDo: function()
        {
            log(this);
            this.super.bCanDo();
            return this.super.iCanDo()+' '+this.type+' can do this.';
        },
    });

    var a = new A();
    log(a.iCanDo());

    var b = new B();
    log(b.iCanDo());
    log(b.bCanDo());

    var c = new C();
    log(c.iCanDo());
}

log('---');
Test_2();