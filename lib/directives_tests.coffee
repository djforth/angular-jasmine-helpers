_ = require 'lodash'
require 'angular'
require 'angular-mocks'

exports.createDirectiveHTML = (dom, scope)->
  element = null

  angular.mock.inject ($compile)->
    element  = angular.element(dom)

    body = angular.element(document.body)
    body.append(element)

    el = $compile(element)(scope)
    scope.$digest()

  element


exports.createNestedDirectiveHTML = (dom, scope, spy, node="div")->
  element = elem  = null

  angular.mock.inject ($compile)->
    elem  = angular.element(dom)

    body = angular.element(document.body)
    body.append(elem)


    elem.data spy.title, spy.mock
    el = $compile(elem)(scope)
    scope.$digest()

    element = angular.element(_.first(elem.find(node)))

  return element



exports.checkElement = (txt, el, element)->
  elem = angular.element(element.find(el))
  expect(elem.text()).toEqual(txt)

exports.checkImg = (el, element, src, alt)->
  img = angular.element(element.find("img"))
  expect(img.attr('src')).toEqual(src)
  expect(img.attr('alt')).toEqual(alt)

exports.checkCss = (element, el, css)->
  elem = angular.element(element.find(el))
  expect(elem.hasClass(css)).toBeTruthy()

exports.checkClassTxt = (id, txt)->
  elem = angular.element(document.querySelector(id))
  expect(elem.text()).toEqual(txt)

exports.checkClassCss = (id, css)->
  elem = angular.element(document.querySelector(id))
  expect(elem.hasClass(css)).toBeTruthy()

exports.checkNoClassCss = (id, css)->
  elem = angular.element(document.querySelector(id))
  expect(elem.hasClass(css)).toBeFalsy()

exports.checkNumElements = (id, n)->
  elems = document.querySelectorAll(id)
  expect(elems.length).toEqual(n)
  return elems