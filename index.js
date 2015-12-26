'use strict';

var remote = require('remote');
var fileUtil = remote.require('./lib/fileUtil');
var matched = location.search.match(/baseDir=([^&]*)/);
var baseDir = matched && decodeURIComponent(matched[1]);

var ngModule = angular.module('readUs', []);

ngModule.controller('MainController', function ($scope) {
  var main = this;

  // README.mdの取得
  main.getFile = function(file) {
    main.fileText = fileUtil.getAsText(file.filepath);
  };

  fileUtil.fetchReadmeList(baseDir, function (err, fileList) {
    if(err) console.error(err);
    $scope.$apply(function () {
      main.fileList = fileList;
    });
  });
});

ngModule.directive('mdPreview', function () {
  return function ($scope, $elem, $attrs) {
    $scope.$watch($attrs.mdPreview, function(source) {
      $elem.html(marked(source));
    });
  };
});