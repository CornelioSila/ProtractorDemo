let homepage = require('../pages/homepage')

describe('Demo Calculator Tests', function(){
// Escenario
it('Test de Suma', function(){
    homepage.get('http://juliemr.github.io/protractor-demo/');
    
    homepage.enterFirstNumber('4');
    homepage.enterSecondtNumber('3');
    homepage.clickGo();
    homepage.verifyResult('7');
browser.sleep(1000);

});

it('Test fallido', function(){
    homepage.get('http://juliemr.github.io/protractor-demo/');
    
    homepage.enterFirstNumber('4');
    homepage.enterSecondtNumber('3');
    homepage.clickGo();
    homepage.tonteria('7');

})


});