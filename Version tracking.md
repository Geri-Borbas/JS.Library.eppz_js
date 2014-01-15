#### Doing

+ Refactor className property
    + Create class property for instances
    + Create name property for classes
    + Same for `super` proxy object

+ Class goodies
    + Automatic getter setter generation
    + Automatic enumerators for collections (!)

+ Tests
    + Mocha / Karma, Travis CI


#### 0.1.6

+ Changed 'include' syntax
    + 'import "whatever.js"' changed to 'include("whatever.js");'
    + also implemented a function that injects script to fallback, IDE consistency
+ Removed version number from distribution build file name


#### 0.1.5

+ Arranged eppz!js features


#### 0.1.4

+ Setup grunt build targets
+ Added grunt-include


#### 0.1.3

+ Added grunt


#### 0.1.2

+ File regouping


#### 0.1.1

+ Stable
  + All tests are passing
+ Started to factor helpers into an EPPZ object
  + With some alias defined on Window object
+ Class method super calls are just fine as well


#### 0.1.0

+ Fixed return values from super proxies
+ Class method _superClass pointers are misaligned


#### 0.0.9

+ Added awesome super getter


#### 0.0.8

+ Best approach so far
  + Partly factored back to `extend`
  + Only super calls have to be centralized
  + Now its all wrapped up into a function


#### 0.0.7

+ Another working sketch


#### 0.0.6

+ Super calls are now working
  + Really sketched on client side, needs to be factored back to `extend`


#### 0.0.5

+ Factoring
  + Equipment is done from one implementation object


#### 0.0.4

+ Misspelling gone


#### 0.0.3

+ Some wording (actually not works yet)


#### 0.0.2

+ Hooked in `super` method calls with correct `this` reference within.


#### 0.0.1

+ Class inheritance done


#### License
Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/02949f8d26ad5362c8cbed6962cef669 "githalytics.com")](http://githalytics.com/eppz/eppz-js)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/eppz/eppz-js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
