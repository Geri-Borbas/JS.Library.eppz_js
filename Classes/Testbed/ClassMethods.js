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
log('eppz!js Class // class methods');
log('______________________________');


(function ()
{

    log('...');
    return;

    var BaseClass = Class.extend
    (
        /**
         * Constants
         */

        /**
         * Instance methods (this refers to an instance)
         */

        {
            // Properties can be declared this way as well.
            value: 1,

            logValue: function()
            { log(this.value); },
        },

        /**
         * Class methods (this refers to the class)
         */

        {
            instanceWithValue: function(value)
            {
                var instance = new this();
                instance.value = value;
                return instance;
            },
        }
    );

    var Centurio = BaseClass.extend
    (
        { value: 2, },

        {
            instanceWithValue: function(value)
            {
                var instance = new this();
                instance.value = value * 10;
                return instance;
            }
        }
    );


    var Milleneo = Centurio.extend
    ({
        _instanceWithValue: function(value)
        {
            var instance = this.super().instanceWithValue(value);
            instance.value *= 10;
            return instance;
        }
    });

    var baseClassInstance = BaseClass.instanceWithValue(10);
    baseClassInstance.logValue();

    var centurio = Centurio.instanceWithValue(10);
    centurio.logValue();

    var milleneo = Milleneo.instanceWithValue(10);
    milleneo.logValue();

})();

