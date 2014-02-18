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
    });
});