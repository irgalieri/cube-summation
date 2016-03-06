/**
 * Cube Sumation
 * Copyright (C) 2016  Ignacio R. Galieri
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @category   Test
 * @package    TestSuite
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */
"use strict";

var assert = require('assert')
    , Controller = require('../../lib/controller.js');

describe('Controller', function() {
    context('when create Controller', function () {
        var controller = new Controller();
        it(
            "if setTestCasesLimit with T equal -999 should throw error with message equal 'T is a number between 1 and 50'.",
            function () {
                var message = '';
                try{
                    controller.setTestCasesLimit(-999);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('T is a number between 1 and 50', message);
            }
        );
        it(
            "if setTestCasesLimit with T equal 0 should throw error with message equal 'T is a number between 1 and 50'.",
            function () {
                var message = '';
                try{
                    controller.setTestCasesLimit(0);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('T is a number between 1 and 50', message);
            }
        );
        it(
            "if setTestCasesLimit with T equal 999 should throw error with message equal 'T is a number between 1 and 50'.",
            function () {
                var message = '';
                try{
                    controller.setTestCasesLimit(999);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('T is a number between 1 and 50', message);
            }
        );
        it(
            "if setTestCasesLimit with T equal 999 should throw error with message equal 'T is a number between 1 and 50'.",
            function () {
                var message = '';
                try{
                    controller.setTestCasesLimit(51);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('T is a number between 1 and 50', message);
            }
        );
        it(
            "if setTestCasesLimit with T equal 5 should the t propertie is equal to 5.",
            function () {
                var message = '';
                try{
                    controller.setTestCasesLimit(5);
                    message = controller.t;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(5, message);
            }
        );
    });
    context('when create Controller and setTestCasesLimit equal to 5', function () {
        var controller = new Controller();
        controller.setTestCasesLimit(5);
        it(
            "if loadTestCase with m equal 0 and n equal 1, should be call callback with result 'M is a number between 1 and 1000'.",
            function (done) {
                controller.loadTestCase(1, 0, function (result) {
                    assert.equal('M is a number between 1 and 1000', result);
                    done();
                });
            }
        );
        it(
            "if loadTestCase with m equal 1 and n equal 0, should be call callback with result 'M is a number between 1 and 1000'.",
            function (done) {
                controller.loadTestCase(0, 1, function (result) {
                    assert.equal('N is a number between 1 and 100', result);
                    done();
                });
            }
        );
        it(
            "if loadTestCase with m equal 1 and n equal 1, the testcase propertie should be M equal 1 and matrix length equal 1 and call callback with message equal 'Please Add Operations'.",
            function (done) {
                controller.loadTestCase(1, 1, function (result) {
                    assert.equal(1, controller.testcases[0].limit);
                    assert.equal(1, controller.testcases[0].matrix.n);
                    assert.equal('Please Add Operations', result);
                    done();
                });
            }
        );
    });
    context('when create Controller and setTestCasesLimit equal to 5 and loadTestCase (4, 5)', function () {
        var controller = new Controller();
        controller.setTestCasesLimit(5);
        controller.loadTestCase(4, 5, function (result) {
            it(
                "if call addOperationToLastTestCase with invalid operation should throw error with message 'Invalid operation, Send UPDATE o QUERY'.",
                function (done) {
                    var message = '';
                    try{
                        controller.addOperationToLastTestCase({method:"NOVALID", params:[1,1,1,1]});
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal('Invalid operation, Send UPDATE o QUERY', message);
                    done();
                }
            );
            it(
                "If you call method 'addOperationToLastTestCase' with a valid operation, the 'opeartions' property should contain the operation sent.",
                function (done) {
                    var message = '';
                    try{
                        controller.addOperationToLastTestCase({method:"UPDATE", params:[1,1,1,1]});
                        message = controller.testcases[0].operations[0];
                    } catch (e) {
                        message = e.message;
                    }
                    assert.deepEqual({method:"UPDATE", params:[1,1,1,1]}, message);
                    done();
                }
            );
        });
    });
    context('when create Controller and setTestCasesLimit equal to 5 and loadTestCase (4, 5) and operations', function () {
        var controller = new Controller();
        controller.setTestCasesLimit(5);
        controller.loadTestCase(4, 5, function (result) {
            it(
                "if call 'runLastOperation' should ejecute the the last operation of last testcase and recive the result in the callback. For this case [''].",
                function (done) {
                    controller.addOperationToLastTestCase({method:"UPDATE", params:[1,1,1,1]});
                    controller.runLastOperation(function (result) {
                        assert.deepEqual([''], result);
                        done();
                    });
                }
            );
            it(
                "if call 'runLastOperation' should ejecute the the last operation of last testcase and recive the result in the callback. For this case [1].",
                function (done) {
                    controller.addOperationToLastTestCase({method:"QUERY", params:[1,1,1,1,1,1]});
                    controller.runLastOperation(function (result) {
                        assert.deepEqual([1], result);
                        done();
                    });
                }
            );
            it(
                "if call 'runLastOperation' should ejecute the the last operation of last testcase and recive the result in the callback. For this case ['X1 must be less or equal than X2'].",
                function (done) {
                    controller.addOperationToLastTestCase({method:"QUERY", params:[2,2,2,1,1,1]});
                    controller.runLastOperation(function (result) {
                        assert.deepEqual(['X1 must be less or equal than X2'], result);
                        done();
                    });
                }
            );
        });
    });
    context('when create Controller', function () {
        context("run Bulk  2 | 4 5 | UPDATE 2 2 2 4 | QUERY 1 1 1 3 3 3 | UPDATE 1 1 1 23 | QUERY 2 2 2 4 4 4 | QUERY 1 1 1 3 3 3 | 2 4 | UPDATE 2 2 2 1 | QUERY 1 1 1 1 1 1 | QUERY 1 1 1 2 2 2 | QUERY 2 2 2 2 2 2", function () {
            it(
                " should return 4 | 4 | 27 | 0 | 1 | 1.",
                function (done) {
                    var controller = new Controller();
                    var request = {
                        testCases: [
                            {
                                matrixSize: 4,
                                operations: [
                                    {method:"UPDATE", params:[2,2,2,4]},
                                    {method:"QUERY", params:[1,1,1,3,3,3]},
                                    {method:"UPDATE", params:[1,1,1,23]},
                                    {method:"QUERY", params:[2,2,2,4,4,4]},
                                    {method:"QUERY", params:[1,1,1,3,3,3]}
                                ]
                            },
                            {
                                matrixSize: 2,
                                operations: [
                                    {method:"UPDATE", params:[2,2,2,1]},
                                    {method:"QUERY", params:[1,1,1,1,1,1]},
                                    {method:"QUERY", params:[1,1,1,2,2,2]},
                                    {method:"QUERY", params:[2,2,2,2,2,2]}
                                ]
                            }
                        ]
                    }
                    var expected = [
                        '',
                        4,
                        '',
                        4,
                        27,
                        '',
                        0,
                        1,
                        1
                    ]
                    controller.bulk(request, function(result) {
                        assert.deepEqual(expected, result);
                        done();
                    });
                }
            );
        });
        context("run Bulk  [] ", function () {
            it(
                "should return 'T is a number between 1 and 50'.",
                function (done) {
                    var controller = new Controller();
                    var request = {
                    }
                    var expected = [
                        'T is a number between 1 and 50'
                    ]
                    controller.bulk(request, function(result) {
                        assert.deepEqual(expected, result);
                        done();
                    });
                }
            );
        });
        context("run Bulk  0 ", function () {
            it(
                "should return 'T is a number between 1 and 50'.",
                function (done) {
                    var controller = new Controller();
                    var request = {
                        testCase: []
                    }
                    var expected = [
                        'T is a number between 1 and 50'
                    ]
                    controller.bulk(request, function(result) {
                        assert.deepEqual(expected, result);
                        done();
                    });
                }
            );
        });
        context("run Bulk 2 | 101 5 | UPDATE 2 2 2 4 | QUERY 1 1 1 3 3 3 | UPDATE 1 1 1 23 | QUERY 2 2 2 4 4 4 | QUERY 1 1 1 3 3 3 | 2 4 | UPDATE 2 2 2 1 | QUERY 1 1 1 1 1 1 | QUERY 1 1 1 2 2 2 | QUERY 2 2 2 2 2 2 ", function () {
            it(
                "should return 'N is a number between 1 and 100' | '' | 0 | 1 | 1.",
                function (done) {
                    var controller = new Controller();
                    var request = {
                        testCases: [
                            {
                                matrixSize: 101,
                                operations: [
                                    {method:"UPDATE", params:[2,2,2,4]},
                                    {method:"QUERY", params:[1,1,1,3,3,3]},
                                    {method:"UPDATE", params:[1,1,1,23]},
                                    {method:"QUERY", params:[2,2,2,4,4,4]},
                                    {method:"QUERY", params:[1,1,1,3,3,3]}
                                ]
                            },
                            {
                                matrixSize: 2,
                                operations: [
                                    {method:"UPDATE", params:[2,2,2,1]},
                                    {method:"QUERY", params:[1,1,1,1,1,1]},
                                    {method:"QUERY", params:[1,1,1,2,2,2]},
                                    {method:"QUERY", params:[2,2,2,2,2,2]}
                                ]
                            }
                        ]
                    }
                    var expected = [
                        'N is a number between 1 and 100',
                        '',
                        0,
                        1,
                        1
                    ]
                    controller.bulk(request, function(result) {
                        assert.deepEqual(expected, result);
                        done();
                    });
                }
            );
        });
    });
});
