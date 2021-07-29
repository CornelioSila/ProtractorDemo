describe('Demo Calculator Tests', function(){
// Escenario
it('Test de Suma', function(){
    browser.get('http://juliemr.github.io/protractor-demo/');
    
 //   let input = element(by.model('first'));
//input.sendKeys('123');
//expect(input.getAttribute('value')).toBe('Foo123');
element(by.model('first')).sendKeys('2');
element(by.model('second')).sendKeys('3');
//<button ng-click="doAddition()" id="gobutton" class="btn">Go!</button>
//element(by.id('gobutton')).click();
element(by.css('[ng-click="doAddition()"]')).click();
//<h2 class="ng-binding">5</h2>
let result = element(by.cssContainingText('.ng-binding','5'));
expect (result.getText()).toEqual('5');
browser.sleep(4000);

});

it('Test de Resta', function(){

})


});