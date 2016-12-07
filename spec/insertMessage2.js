
describe('Post message', function () {
     it("Should return false when title is not given", function() {
       expect(checkTitle('')).toBe(false); 
    });
    it("Should return true when title is given", function() {
       expect(checkTitle('title')).toBe(true); 
    });
     it("Should return false when message is not given", function() {
        expect(checkMessage('')).toBe(false); 
    });
     it("Should return false when message is only whitespace", function() {
        expect(checkMessage('  ')).toBe(false); 
    }); 
    it("Should return true when message is given", function() {
        expect(checkMessage('message')).toBe(true); 
    });
});