/**
 *
 * Created by Borbás Geri on 2/18/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


describe('String.contains', function()
{
    it('should work fine.', function()
    {
        ('Apple'.contains('A')).should.be._true;
        ('Apple'.contains('Ap')).should.be._true;
        ('Apple'.contains('App')).should.be._true;

        ('Apple'.contains('a')).should.be._false;
        ('Apple'.contains('ap')).should.be._false;
        ('Apple'.contains('app')).should.be._false;
    });
});

describe('String.capitalize', function()
{
    it('should work fine.', function()
    {
        'apple'.capitalize().should.equal('Apple');
        'Apple'.capitalize().should.equal('Apple');
    });
});