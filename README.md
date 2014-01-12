eppz!js
=======

**Objective-JavaScript** for everyday use.

Inheritance (of course)? Missing class methods? Want to make reliable `super` calls? Even in class methods? See class type in inspector? Correct results for `constructor.name`? Property definitions outside constructor? I do. So I created this `Class`.

Like/use objective programming? You'll like this. **A single file called [`Class.js`](https://github.com/eppz/eppz-js/blob/master/Classes/Tools/Class.js)** is what you're looking for.


# Usage


Creating classes, and instances are pretty straightforward.
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


Extend classes as well.
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


Better using superclass implementation for maintainability, safety and peace.
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


Or using class methods for factories and more.
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


## Version tracking

#### Doing

+ Refactor className property
    + Create class property for instances
    + Create name property for classes
    + Same for `super` proxy object

+ Create user friendly test cases
    + Lovely ascii art for SuperclassValues

+ Class goodies
    + Automatic getter setter generation
    + Automatic enumerators for collections (!)

> #### 0.1.1
> 
> + Stable
>   + All tests are passing
> + Started to factor helpers into an EPPZ object
>   + With some alias defined on Window object
> + Class method super calls are just fine as well
> 
> 
> #### 0.1.0
> 
> + Fixed return values from super proxies
> + Class method _superClass pointers are misaligned
> 
> 
> #### 0.0.9
> 
> + Added awesome super getter
> 
> 
> #### 0.0.8
> 
> + Best approach so far
>   + Partly factored back to `extend`
>   + Only super calls have to be centralized
>   + Now its all wrapped up into a function
> 
> 
> #### 0.0.7
> 
> + Another working sketch
> 
> 
> #### 0.0.6
> 
> + Super calls are now working
>   + Really sketched on client side, needs to be factored back to `extend`
> 
> 
> #### 0.0.5
> 
> + Factoring
>   + Equipment is done from one implementation object
> 
> 
> #### 0.0.4
> 
> + Misspelling gone
>  
> 
> #### 0.0.3
> 
> + Some wording (actually not works yet)
>  
> 
> #### 0.0.2
> 
> + Hooked in `super` method calls with correct `this` reference within.
>  
> 
> #### 0.0.1
> 
> + Class inheritance done


#### License
> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/eppz/eppz-js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

