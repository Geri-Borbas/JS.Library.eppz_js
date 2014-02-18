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


log('________________');
log('eppz!js KeyPaths');
log('________________');


(function()
{

    data =
    {
        'name' : 'data',
        'first':
        {
            'number': 1,
            'text': 'Ya.',
            'meta' : { 'lang' : 'en' }
        },
        'second':
        {
            'number': 10,
            'text': 'Ba.',
            'meta' : { 'lang' : 'en' }
        },
        'third':
        {
            'number': 100,
            'text': 'Da.',
            'meta' : { 'lang' : 'hu' }
        }
    };

    data.setValueForKey('chunk', 'name');
    data.setValueForKeyPath('blob', 'name');

    var thirdLanguage = data.getValueForKeyPath('third.meta.lang');
    data.setValueForKeyPath(thirdLanguage, 'first.meta.lang');
    data.setValueForKeyPath(thirdLanguage, 'second.meta.lang');

    log(data);

})();

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


log('_____________________________________');
log('eppz!js // Element class name helpers');
log('_____________________________________');


var main = elementForId('main');

main.addClass('blue');
log(main.className);
main.addClass('blue');
log(main.className);
main.addClass('blue');
log(main.className);
main.addClass('blue');
log(main.className);

main.replaceClass('blue', 'red');
log(main.className);
main.replaceClass('blue', 'red');
log(main.className);
main.replaceClass('blue', 'red');
log(main.className);

main.replaceClass('red', 'blue');
log(main.className);
main.replaceClass('red', 'red');
log(main.className);
main.replaceClass('red', 'blue');
log(main.className);

main.addClass('blue');
log(main.className);

main.removeClass('blue');
log(main.className);
main.removeClass('red');
log(main.className);
main.removeClass('blue');
log(main.className);
main.removeClass('red');
log(main.className);
main.removeClass('scen');
log(main.className);

main.addClass('Batman');
main.addClass('Superman');
main.addClass('Spiderman');
log(main.className);

log(main.getClassesContainig('tman'));
log(main.getClassesContainig('erman'));
log(main.getClassesContainig('man'));

main.replaceClassesContainig('erman', 'Witman');
log(main.className);
main.removeClassesContainig('tman');
log(main.className);

log(main);


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


log('____________________________');
log('eppz!js Class // inheritance');
log('____________________________');


(function()
{
    var A = Class.extend
    ({
        className: 'A',
        aCanDo: function()
        { log(this.className+' can do here.'); },
    });

    var B = A.extend
    ({
        className: 'B',
        bCanDo: function()
        { log(this.className+' can do there.'); },
    });

    var C = B.extend
    ({
        className: 'C',
        cCanDo: function()
        { log(this.className+' can do anywhere.'); },

    });


    var a = new A();
        a.aCanDo();

    var b = new B();
        b.aCanDo();
        b.bCanDo();

    var c = new C();
        c.aCanDo();
        c.bCanDo();
        c.cCanDo();
})();


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
                var instance = new this();
                instance.value = value;
                instance.value /= 10;
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
                var instance = this.super.instanceWithMillimeters(value);
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
                var instance = this.super.instanceWithMillimeters(value);
                instance.value /= 10;
                return instance;
            }
        }
    );


    var millimeters = 1000;
    log('millimeters: '+millimeters);

    log('-------------');
    var centimeters = Centimeters.instanceWithMillimeters(millimeters);
    centimeters.logValue();

    log('-------------');
    var decimeters = Decimeters.instanceWithMillimeters(millimeters);
    decimeters.logValue();

    log('-------------');
    var meters = Meters.instanceWithMillimeters(millimeters);
    meters.logValue();

})();


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


log('_________________________________');
log('eppz!js Class // superclass calls');
log('_________________________________');


(function()
{
    var First = Class.extend
    ({
        className: 'First',
        stuff: function(what)
        {
            log('Firsty stuff '+what+' (invoked by '+this.className+').');
        },
    });

    var Second = First.extend
    ({
        className: 'Second',
        stuff: function(what)
        {
            this.super.stuff(what);
            log('Secondy stuff '+what+' (invoked by '+this.className+').');
        },
    });

    var Third = Second.extend
    ({
        className: 'Third',
        stuff: function(what)
        {
            this.super.stuff(what);
            log('Thirdy stuff '+what+' (invoked by '+this.className+').');
        },
    });

    var Fourth = Third.extend
    ({
        className: 'Fourth',
        stuff: function(what)
        {
            this.super.stuff(what);
            log('Fourthy stuff '+what+' (invoked by '+this.className+').');
        },
    });

    var first = new First();
    var second = new Second();
    var third = new Third();
    var fourth = new Fourth();

    first.stuff('it');
    second.stuff('it');
    third.stuff('it');
    fourth.stuff('it');

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


log('__________________________________');
log('eppz!js Class // array enumerators');
log('__________________________________');


(function()
{
    var Manager = Class.extend
    ({
        className: 'Manager',

        collection: [],

        logCollection: function()
        {
            // Whoa, this method is automagically created for the array!
            this.enumerateCollection(function(eachCollection, eachIndex)
            {
                log(eachIndex+': '+eachCollection);
            });

        }
    });

    var manager = new Manager();
    manager.collection = [1,2,3,4,5,6,7,8,9];
    manager.logCollection();

})();


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


log('__________________________________');
log('eppz!js Class // property bindings');
log('__________________________________');


(function()
{
    var Controller = Class.extend
    (
        // Instance methods
        {
            className: 'Controller',

            width: 20,
            div: null,

            construct: function()
            {
                this.div = document.createElement('div');
            }
        },

        // Class methods
        {},

        // Bindings.
        {
            'width' : [ 'div.style.width', '%px' ]
        }
    );


    var controller = new Controller();
    log('controller.div.style.width is `'+controller.div.style.width+'`.');

    controller.width = 40;
    log('controller.div.style.width is `'+controller.div.style.width+'`.');

})();

