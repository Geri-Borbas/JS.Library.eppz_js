eppz!js
=======

**Objective-JavaScript** for everyday use.

Inheritance (of course)? Missing class methods? Want to make reliable `super` calls? Even in class methods? See class type in inspector? Correct results for `constructor.name`? Property definitions outside constructor? I do.

Like/use objective programming? You'll like this. **A single file called [`eppz!js!class.min.js`](https://github.com/eppz/eppz-js/blob/master/build/eppz!js!class.min.js)** is what you're looking for.


# Usage

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


## `eppz!js`

Beside this `Class` implementation this repository collects some tools for everyday JavaScript development, mainly for personal use. Can take a look at some [`Array`](https://github.com/eppz/eppz-js/blob/master/Classes/eppz!js/Array.js) and [`Element`](https://github.com/eppz/eppz-js/blob/master/Classes/eppz!js/Element.js) tools, though.


#### License
> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/02949f8d26ad5362c8cbed6962cef669 "githalytics.com")](http://githalytics.com/eppz/eppz-js)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/eppz/eppz-js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

