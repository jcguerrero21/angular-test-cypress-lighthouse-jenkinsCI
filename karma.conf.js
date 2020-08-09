// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
const fse = require('fs-extra');

const isJenkins = process.env.IS_JENKINS;

const REPORTS_BASE_FOLDER = path.join('test_results','unit');

const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();
process.env.NO_PROXY = 'localhost, 0.0.0.0/4201, 0.0.0.0/9876';
process.env.no_proxy = 'localhost, 0.0.0.0/4201, 0.0.0.0/9876';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-html-detailed-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/test-jenkins'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    browserDisconnectTimeout : 90000, 
    browserNoActivityTimeout : 90000, 
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false
  });

  // if (isJenkins) {
  //   // do the cleanup
  //   try {
  //     fse.removeSync(path.resolve(__dirname, REPORTS_BASE_FOLDER));
  //   } catch (e) {}

  //   config.set({
  //     browsers: ['ChromeHeadless'],
  //     singleRun: true,
  //     reporters: ['junit', 'coverage-istanbul', 'htmlDetailed'],
  //     browserDisconnectTimeout : 90000, 
  //     browserNoActivityTimeout : 90000, 
  //     junitReporter: {
  //       outputDir: REPORTS_BASE_FOLDER,
  //       outputFile: 'results.xml',
  //       useBrowserName: false,
  //       nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
  //       classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
  //       xmlVersion: '1'
  //     },
  //     coverageIstanbulReporter: {
  //       reports: [ 'html', 'lcovonly' ],
  //       fixWebpackSourcePaths: true,
  //       dir: path.join(__dirname, REPORTS_BASE_FOLDER),
  //       'report-config': {
  //         html: {
  //           subdir: 'coverage'
  //         }
  //       },
  //     },
  //     htmlDetailed: {
  //       autoReload: false,
  //       dir: `./${REPORTS_BASE_FOLDER}`,
  //       splitResults: false,
  //       useHostedBootstrap: true
  //     }
  //   });
  // }

};
