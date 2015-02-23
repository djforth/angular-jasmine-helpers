var _;

_ = require('lodash');

require('angular');

require('angular-mocks');

exports.createDirectiveHTML = function(dom, scope) {
  var element;
  element = null;
  angular.mock.inject(function($compile) {
    var body, el;
    element = angular.element(dom);
    body = angular.element(document.body);
    body.append(element);
    el = $compile(element)(scope);
    return scope.$digest();
  });
  return element;
};

exports.createNestedDirectiveHTML = function(dom, scope, spy, node) {
  var elem, element;
  if (node == null) {
    node = "div";
  }
  element = elem = null;
  angular.mock.inject(function($compile) {
    var body, el;
    elem = angular.element(dom);
    body = angular.element(document.body);
    body.append(elem);
    elem.data(spy.title, spy.mock);
    el = $compile(elem)(scope);
    scope.$digest();
    return element = angular.element(_.first(elem.find(node)));
  });
  return element;
};

exports.checkElement = function(txt, el, element) {
  var elem;
  elem = angular.element(element.find(el));
  return expect(elem.text()).toEqual(txt);
};

exports.checkImg = function(el, element, src, alt) {
  var img;
  img = angular.element(element.find("img"));
  expect(img.attr('src')).toEqual(src);
  return expect(img.attr('alt')).toEqual(alt);
};

exports.checkCss = function(element, el, css) {
  var elem;
  elem = angular.element(element.find(el));
  return expect(elem.hasClass(css)).toBeTruthy();
};

exports.checkClassTxt = function(id, txt) {
  var elem;
  elem = angular.element(document.querySelector(id));
  return expect(elem.text()).toEqual(txt);
};

exports.checkClassCss = function(id, css) {
  var elem;
  elem = angular.element(document.querySelector(id));
  return expect(elem.hasClass(css)).toBeTruthy();
};

exports.checkNoClassCss = function(id, css) {
  var elem;
  elem = angular.element(document.querySelector(id));
  return expect(elem.hasClass(css)).toBeFalsy();
};

exports.checkNumElements = function(id, n) {
  var elems;
  elems = document.querySelectorAll(id);
  expect(elems.length).toEqual(n);
  return elems;
};
