var assert = require("assert");

describe('Array', function()
{
    describe('addMethods()', function()
    {
        it('shoud add methods', function()
        {

            var object = {};
            object.addMethods({

                gimmeFive: function()
                { return 5; }

            });

            assert.equal(5, object.gimmeFive());
        });

    });
});