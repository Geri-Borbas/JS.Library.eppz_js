eppz!js
=======

**Objective-JavaScript** for everyday use.

Easy inheritance, readable implementations, class methods (!), reliable `super` calls, minimalistic but readable API. Perfect base for a clean / extendable design.

### [Superclass calls](#super)
#### [Automatic enumerators](#enumerators) for `Array` properties
#### [Property bindings](#bindings)
##### [Inheritance](#inheritance)
##### [Class methods](#class_methods)
##### [KeyPaths](#keypaths)

Like/use objective programming? You'll like this. **A single file called [`eppz!js!class.min.js`](https://github.com/eppz/eppz-js/blob/master/build/eppz!js!class.min.js)** is what you're looking for.


<a name="inheritance"></a>
# Inheritance

**Creating classes**, and instances are pretty straightforward.
```JavaScript
// An imaginary View class.
var View = Class.extend
({
    id: '',
    div: null,

    construct: function(id)
    {
        this.id = id;
        this.build();
    },
    
    build: function()
    {
        this.div = document.createElement('div');
        this.div.id = this.id;
    },
});

var widget = new View('widget_1');
console.log(widget.id); // widget_1
```

**Extend classes** as well.
```JavaScript
// An imaginary Widget class, subclass of View.
var Widget = View.extend
({
    construct: function(number)
    {
        this.id = 'widget_'+number;
        this.build();
    },
});

var widget = new Widget(1);
console.log(widget.id); // widget_1
```

Better using **superclass implementation** for maintainability, safety and peace.
```JavaScript
// With super calls.
var Widget = View.extend
({
    construct: function(number)
    {
        this.super.construct('widget_'+number);
    },
});

var widget = new Widget(1);
console.log(widget.id); // widget_1
```

<a name="class_methods"></a>
Or using **class methods** for factories and more.
```JavaScript
// Cool factory methods.
var Widget = View.extend
({
    // No instance methods implemented.
},
{
    widgetWithNumber: function(number)
    {
        return new this('widget_'+number);
    }
});

var widget = Widget.widgetWithNumber(1);
console.log(widget.id); // widget_1
```

<a name="super"></a>
## `super` calls

Many JavaScript class implementation does not **take care of passing the correct `this` reference** (calling instance) for superclass method calls. With eppz!js Class your `super` calls works as you'd expect.
```JavaScript
var Widget = View.extend
({
    color: 'Default',

    getColorDescription: function()
    {
        return 'My color is '+this.color+'.';
    }
});

var BlueWidget = Widget.extend
({
    color: 'Blue',

    getColorDescription: function()
    {
        return 'As you would expect. '+this.super.getColorDescription();
    }
});

var widget = new BlueWidget();
console.log(widget.getColorDescription()); // As you would expect. My color is Blue.
```
There are class implementations out there that would output `Default` as color here. Actually the main reason I made this `Class` implementation was to get over this issue.

This method works over **any amount of cascading super calls**, as super references are bound right to the functions instead of the calling instance. Passing over the calling instance is done by a proxy object that wraps every superclass method into a function that does the job. See the [implementation](https://github.com/eppz/eppz-js/blob/master/Classes/eppz!kit/Class.js) for further details if interested at all.


<a name="enumerators"></a>
## Enumerators

As soon as you define an `Array` property, enumerators will be synthesized for you upon instance construction.
```JavaScript
var Manager = Class.extend
({
    collection: [],
    logCollection: function()
    {
        this.enumerateCollection(function(eachCollection, eachIndex) // Created automagically.
        {
            log(eachIndex+': '+eachCollection);
        });

    }
});

var manager = new Manager();
manager.collection = [1,2,3,4,5,6,7,8,9];
manager.logCollection();
```

<a name="bindings"></a>
## Property bindings

If a property map is present, accessors will be synthesized upon construction to keep properties synced. Great way to bind model changes to UI.
```JavaScript
var Controller = Class.extend
(
    {
        width: 20,
        div: null,

        construct: function()
        {
            this.div = document.createElement('div');
        }
    },
    {},
    {
        'width' : [ 'div.style.width', '%px' ]
    }
);

var controller = new Controller();
log(controller.div.style.width); // 20px

controller.width = 40;
log(controller.div.style.width); // 40px
```


<a name="keypaths"></a>
## KeyPaths

As a side effect, every object is equiped with keypath tools.
```JavaScript
controller.setValueForKeyPath('20px', 'div.style.width');
log(controller.getValueForKeyPath('div.style.width')); // 20px
```


## `eppz!js`

Beside this `Class` implementation this repository collects some tools for everyday JavaScript development, mainly for personal use. Can take a look at some [`Array`](https://github.com/eppz/eppz-js/blob/master/Classes/eppz!js/Array.js) and [`Element`](https://github.com/eppz/eppz-js/blob/master/Classes/eppz!js/Element.js) tools, though.


#### License
> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/02949f8d26ad5362c8cbed6962cef669 "githalytics.com")](http://githalytics.com/eppz/eppz-js)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/eppz/eppz-js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

