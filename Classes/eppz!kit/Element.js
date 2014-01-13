/**
 *
 * Created by Borbás Geri on 1/13/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var classDelimiter = " ";

Element.prototype.hasClass = function(classname)
{
    if (this == null) return;

    //Search.
    return (this.className.split(' ').indexOf(classname) === -1) ? false : true;
}

Element.prototype.addClass = function(className)
{
    if (this == null) return;
    if (className == null || className == '') return;

    //Explode.
    var classes = this.className.split(classDelimiter);

    //Process.
    classes.push(className);

    //Implode.
    this.className = classes.join(classDelimiter);
}

Element.prototype.removeClass = function(className)
{ this.replaceClass(className, ''); }

Element.prototype.replaceClass = function(currentClassName, newClassName)
{
    if (this == null) return;
    if (currentClassName == null || currentClassName == '') return;

    //Explode.
    var classes = this.className.split(classDelimiter);

    //Process.
    var classIndex = classes.indexOf(currentClassName);
    if (classIndex == -1) return;
    if (newClassName == null || newClassName == '') classes.splice(classIndex, 1);
    else classes.splice(classIndex, 1, newClassName);
    //Implode.
    this.className = classes.join(classDelimiter);
}

Element.prototype.replaceClass = function(currentClassName, newClassName)
{
    if (this == null) return;
    if (currentClassName == null || currentClassName == '') return;

    //Explode.
    var classes = this.className.split(classDelimiter);

    //Process.
    var classIndex = classes.indexOf(currentClassName);
    if (classIndex == -1) return;
    if (newClassName == null || newClassName == '') classes.splice(classIndex, 1);
    else classes.splice(classIndex, 1, newClassName);

    //Implode.
    this.className = classes.join(classDelimiter);
}

Element.prototype.getClassContainig = function(token)
{
    if (this == null) return;
    if (token == null || token == '') return;

    //Explode.
    var classes = this.className.split(classDelimiter);

    //Look for token.
    for(eachIndex in classes)
    {
        eachClass = classes[eachIndex];
        if (eachClass.search(token) != -1)
        {
            return eachClass;
            break;
        }
    }

    return null;
}

Element.prototype.replaceClassContainig = function(token, newClassName)
{
    if (this == null) return;
    if (token == null || token == '') return;

    var foundAndReplaced = false; //Result.

    //Explode.
    var classes = this.className.split(classDelimiter);

    //Look for token.
    for(eachIndex in classes)
    {
        eachClass = classes[eachIndex];
        if (eachClass.search(token) != -1)
        {
            //Process.
            if (newClassName == null || newClassName == '') classes.splice(eachIndex, 1);
            else classes.splice(eachIndex, 1, newClassName);
            foundAndReplaced = true;
        }
    }

    //Implode.
    this.className = classes.join(classDelimiter);

    return foundAndReplaced;
}

Element.prototype.hide = function()
{ this.style.visibility = 'hidden'; }

Element.prototype.show = function()
{ this.style.visibility = 'visible'; }

Element.prototype.preventScroll = function()
{ this.addEventListener('touchmove', function(event) { event.preventDefault(); }, false); }
