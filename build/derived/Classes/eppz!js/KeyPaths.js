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


Object.prototype.addMethods
({

    /**
     * Get the value for the given key.
     *
     * @param key Property name to get.
     * @returns {*}
     */
    getValueForKey: function(key)
    { return this[key]; },

    /**
     * Sets the value for the given key.
     *
     * @param key Property name to set.
     * @param value Value to be set.
     */
    setValueForKey: function(value, key)
    { this[key] = value; },

    /**
     * Get the value for the given keyPath (using `.` notation).
     *
     * @param keyPath The keyPath to return the value from.
     * @returns {*}
     */
    getValueForKeyPath: function(keyPath)
    {
        // Checks.
        if (keyPath == null) return null;
        if (keyPath.contains('.') == false) { return this.getValueForKey(keyPath); }

        // Split.
        var chain = keyPath.split('.');
        var firstKey = chain.shift();
        var shiftedKeyPath = chain.join('.');

        // Checks.
        if (this[firstKey] == null) return null;

        return this[firstKey].getValueForKeyPath(shiftedKeyPath);
    },

    /**
     * Set a value for a given keyPath (using `.` notation).
     *
     * @param value Value to be set.
     * @param keyPath The keyPath where the value should be set.
     */
    setValueForKeyPath: function(value, keyPath)
    {
        // Checks.
        if (keyPath == null) return;
        if (keyPath.contains('.') == false) { this.setValueForKey(value, keyPath); return; }

        // Split.
        var chain = keyPath.split('.');
        var firstKey = chain.shift();
        var shiftedKeyPath = chain.join('.');

        // Checks.
        if (this[firstKey] == null) { return; }

        this[firstKey].setValueForKeyPath(value, shiftedKeyPath);
    },

});