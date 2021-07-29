// An example configuration file.

// JASMINE SCREENSHOT REPORTER (1)
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});



exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
//  specs: ['C:/Users/User 1/Desktop/Projects/ProtractorDemo/tests/example_spec.js'],
  specs: ['../tests/calculator.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },


// JASMINE SCREENSHOT REPORTER (2)
    // Setup the report before any tests start
    beforeLaunch: function() {
      return new Promise(function(resolve){
        reporter.beforeLaunch(resolve);
      });
    },
  
    // Assign the test reporter to each running instance
      onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({    // HTML REPORTER 2
            consolidateAll: true,                                               // HTML REPORTER 2
            savePath: './',                                                     // HTML REPORTER 2
            filePrefix: 'xmlresults'                                            // HTML REPORTER 2
        }));                                                                    // HTML REPORTER 2
        // MÁS HTML REPORTER 2 (CONFIGURACIÓN PARA OBTENER SCREENSHOT DE LOS FALLOS)
        var fs = require('fs-extra');
 
        fs.emptyDir('screenshots/', function (err) {
                console.log(err);
            });
         
            jasmine.getEnv().addReporter({
                specDone: function(result) {
                    if (result.status == 'failed') {
                        browser.getCapabilities().then(function (caps) {
                            var browserName = caps.get('browserName');
         
                            browser.takeScreenshot().then(function (png) {
                                var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                                stream.write(new Buffer(png, 'base64'));
                                stream.end();
                            });
                        });
                    }
                }
            });
            
        jasmine.getEnv().addReporter(reporter);                                 // JASMINE SCREENSHOT REPORTER
        var AllureReporter = require('jasmine-allure-reporter');                // ALLURE REPORTER (HTML)
        jasmine.getEnv().addReporter(new AllureReporter({                       // ALLURE REPORTER (HTML)
          resultsDir: 'allure-results'                                          // ALLURE REPORTER (HTML)
        }));                                                                    // ALLURE REPORTER (HTML)
    },

    //HTMLReport called once tests are finished
onComplete: function() {
  var browserName, browserVersion;
  var capsPromise = browser.getCapabilities();

  capsPromise.then(function (caps) {
     browserName = caps.get('browserName');
     browserVersion = caps.get('version');
     platform = caps.get('platform');

     var HTMLReport = require('protractor-html-reporter-2');

     testConfig = {
         reportTitle: 'Protractor Test Execution Report',
         outputPath: './',
         outputFilename: 'ProtractorTestReport',
         screenshotPath: './screenshots',
         testBrowser: browserName,
         browserVersion: browserVersion,
         modifiedSuiteName: false,
         screenshotsOnlyOnFailure: true,
         testPlatform: platform
     };
     new HTMLReport().from('xmlresults.xml', testConfig);
 });
},


    // Close the report after all tests finish
    afterLaunch: function(exitCode) {
      return new Promise(function(resolve){
        reporter.afterLaunch(resolve.bind(this, exitCode));
      });
    }

};
