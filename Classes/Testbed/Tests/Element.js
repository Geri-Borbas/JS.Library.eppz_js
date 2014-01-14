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
