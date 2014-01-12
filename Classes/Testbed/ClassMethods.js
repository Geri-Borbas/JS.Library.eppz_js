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
    var Centimeters = Class.extend
    (
        // Instance methods (this refers to an instance)
        {
            // Properties can be declared this way as well.
            className: 'Centimeters',
            value: 0,

            logValue: function()
            { log(this.className+'.value: '+this.value); },
        },

        // Class methods (this refers to the class)
        {
            instanceWithMillimeters: function(value)
            {
                log('-------------');
                log(this.className+' : '+arguments.callee._superClass.className);

                var instance = new this();
                instance.value = value / 10;
                return instance;
            },
        }
    );

    var Decimeters = Centimeters.extend
    (
        // Instance methods
        {
            className: 'Decimeters',
            value: 0,
        },

        // Class methods
        {
            instanceWithMillimeters: function(value)
            {
                log('-------------');
                log(this.className+' : '+arguments.callee._superClass.className);

                var instance = new this();
                instance.value /= 10;
                return instance;
            }
        }
    );

    var Meters = Decimeters.extend
    (
        // Instance methods
        {
            className: 'Meters',
            value: 0,
        },

        // Class methods
        {
            instanceWithMillimeters: function(value)
            {
                log('-------------');
                log(this.className+' : '+arguments.callee._superClass.className);

                var instance = new this();
                instance.value /= 10;
                return instance;
            }
        }
    );


    var millimeters = 1000;
    log('millimeters: '+millimeters);

    var centimeters = Centimeters.instanceWithMillimeters(millimeters);
    centimeters.logValue();

    var decimeters = Decimeters.instanceWithMillimeters(millimeters);
    decimeters.logValue();

    var meters = Meters.instanceWithMillimeters(millimeters);
    meters.logValue();

})();
