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

function Test ()
{

    var BaseClass = Class.extend
    (
        // Instance methods
        {
            construct: function()
            {
                this.super.construct();
                this._type = "BaseClass type";
                log(this._type+' constructed ');
            },

            getType: function()
            { return this._type; },

            logType: function()
            {
                log('BaseClass.logType implementation ('+this._type+')');
            },
        },

        // Class methods
        {
            instanceWithValue: function(value)
            {
                var instance = new this();
                instance.value = value;
                return instance;
            }
        }
    );

    var baseClassInstance = new BaseClass();
    baseClassInstance.logType();


    var instanceCreatedUsingClassMethod = BaseClass.instanceWithValue(10);
    log(instanceCreatedUsingClassMethod.value);

    var SubClass = BaseClass.extend
    (
        // Instance methods
        {
            construct: function()
            {
                this._type = "SubClass type";
                log(this._type+' constructed');
                log(this.super.subclassInstance);
            },

            logType: function()
            {
                this.super.logType();
            },

            onlySubclassCanDo: function()
            {
                log('Only subclass can do this.');
            },
        }
    );

    var subClassInstance = new SubClass();
    subClassInstance.logType(); // It uses BaseClass implementation, but uses this instance as this value!
    subClassInstance.onlySubclassCanDo(); // It uses BaseClass implementation, but uses this instance as this value!

    if (false)
    {
        log(SubClass.instanceWithValue);
        var instanceCreatedUsingInheritedClassMethod = SubClass.instanceWithValue(20);
        log(instanceCreatedUsingInheritedClassMethod.value);
        log(instanceCreatedUsingClassMethod.onlySubclassCanDo());
    }

}

Test();