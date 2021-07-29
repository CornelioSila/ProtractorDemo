let homepage = function (){

let firstNumber_input = element(by.model('first'));
let secondNumber_input = element(by.model('second'));
let goButton= element(by.css('[ng-click="doAddition()"]'));

this.get = function(url){
    browser.get(url);
}

this.enterFirstNumber = function (firstNo) {
    firstNumber_input.sendKeys(firstNo);
}

this.enterSecondtNumber = function (secondNo) {
    secondNumber_input.sendKeys(secondNo);
}

this.clickGo = function(){
    goButton.click();
}

this.verifyResult = function(result){
let output = element(by.cssContainingText('.ng-binding','7'));
expect (output.getText()).toEqual(result);
}

// function add(numero1, numero2) {
//    console.log (numero1+numero2)
//      return (numero1+numero2)
//}
//add(2,3)
// let result=add(2,4);
// console.log(result);
}

module.exports = new homepage();