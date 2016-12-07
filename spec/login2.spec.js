describe('kennel modle', function () {

    it("Should return false when email address is in an invalid form", function() {
       expect(checkEmail('hei@hei')).toBe(false); 
    });
    
    it("Should return true when email address is in a valid form", function() {
       expect(checkEmail('hei@hei.fi')).toBe(true); 
    });
    
    it("Should return false when login password is 0 characters long", function() {
        expect(passwordGiven('')).toBe(false);
    });
    
    it("Should return true when login password is at least 1 characters long", function() {
        expect(passwordGiven('a')).toBe(true);
    });
    
    it("Should return false when sign up password is less than 3 characters long", function() {
        expect(passwordRegister('as')).toBe(false);
    });
    
    it("Should return true when sign up password is more than 2 characters long", function() {
        expect(passwordRegister('asd')).toBe(true);
    });
    
    it("Should return false if first or last name is less than two characters long", function() {
       expect(nameGiven('a', 'b')).toBe(false); 
    });
    
    it("Should return false if first or last name is less than two characters long", function() {
       expect(nameGiven('a', 'bcde')).toBe(false); 
    });
    
    it("Should return true if first or last name are more than two characters long", function() {
       expect(nameGiven('ab', 'bcde')).toBe(true); 
    });

});
