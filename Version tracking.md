#### 0.2.55

    + Test suites for Class features
        + `Class.classMethods.js` don't pass (yet commented out)


#### 0.2.5

    + Added mocha client side tests
        + Test suites for some basic feature
            + String.js
            + Object.js


#### 0.2.2

+ Gentle fixes


#### 0.2.1

+ `Class.js` features now dependent on `Object.js` and `KeyPaths.js`
    + Library climbed up to 4,523 Bytes


#### 0.2.0

+ Awesome `Class` tools
    + Automatic enumerators for colelctions (see `Testbed/Tests/Enumerators.js` for usage)
    + Property bindings (see `Testbed/Tests/Bindings.js` for usage)
    +

#### 0.1.7

+ Renamed `temp` to `derived`
+ Added object method equipper `addMethods`


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
