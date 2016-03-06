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
    , TestCase = require('../lib/testcase.js');

describe('TestCase', function() {
    context('when create TestCase', function () {
        var testCase = new TestCase();
        it(
            "if setLimit equal to -999 throw error with message 'M is a number between 1 and 1000'.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(-999);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('M is a number between 1 and 1000', message);
            }
        );
        it(
            "if setLimit equal to 0 throw error with message 'M is a number between 1 and 1000'.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(0);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('M is a number between 1 and 1000', message);
            }
        );
        it(
            "if setLimit equal to 1001 throw error with message 'M is a number between 1 and 1000'.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(1001);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('M is a number between 1 and 1000', message);
            }
        );
        it(
            "if setLimit equal to 9999 throw error with message 'M is a number between 1 and 1000'.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(9999);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('M is a number between 1 and 1000', message);
            }
        );
        it(
            "if setLimit equal to 1 the propertie limit should be eual to 1.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(1);
                    message = testCase.limit;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(1, message);
            }
        );
        it(
            "if setLimit equal to 100 the propertie limit should be eual to 100.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(100);
                    message = testCase.limit;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
        it(
            "if setLimit equal to 1000 the propertie limit should be eual to 1000.",
            function () {
                var message = '';
                try{
                    testCase.setLimit(1000);
                    message = testCase.limit;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(1000, message);
            }
        );
        it(
            "if createMatrix with N equal to 1000 callback error should be true and message 'N is a number between 1 and 100'.",
            function (done) {
                testCase.createMatrix(
                    1000,
                    function (error, message) {
                        assert.equal(true, error);
                        assert.equal('N is a number between 1 and 100', message);
                        done();
                    }
                )
            }
        );
        it(
            "if createMatrix with N equal to 100 callback error should be false and message ''.",
            function (done) {
                testCase.createMatrix(
                    100,
                    function (error, message) {
                        assert.equal(false, error);
                        assert.equal('', message);
                        done();
                    }
                )
            }
        );
        it(
            "if createMatrix with N equal to 10 callback error should be false and message ''.",
            function (done) {
                testCase.createMatrix(
                    10,
                    function (error, message) {
                        assert.equal(false, error);
                        assert.equal('', message);
                        done();
                    }
                )
            }
        );
    });
    context('when create TestCase and setLimit to 1', function () {
        var testCase = new TestCase();
        testCase.setLimit(1);
        it(
            "if you add one operation with method <> of UPDATE or QUERY throw error with message 'Invalid operation, Send UPDATE o QUERY'.",
            function () {
                var message = '';
                try{
                    testCase.addOperation({method:"NOVALID", params:[1,1,1,1]});
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Invalid operation, Send UPDATE o QUERY', message);
            }
        );
        it(
            "if you add one operation the operations length should be 1.",
            function () {
                var message = '';
                try{
                    testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                    message = testCase.operations.length;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(1, message);
            }
        );
        it(
            "if you add 2 operations throw error with message 'Exceeds the number of operations'.",
            function () {
                var message = '';
                try{
                    testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Exceeds the number of operations', message);
            }
        );
    });
    context('when create TestCase and setLimit to 2', function () {
        var testCase = new TestCase();
        testCase.setLimit(2);
        it(
            "if you add one operation the operations length should be 1.",
            function () {
                var message = '';
                try{
                    testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                    message = testCase.operations.length;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(1, message);
            }
        );
        it(
            "if you add one operation the operations length should be 1.",
            function () {
                var message = '';
                try{
                    testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                    message = testCase.operations.length;
                } catch (e) {
                    message = e.message;
                }
                assert.equal(2, message);
            }
        );
        it(
            "if you add 2 operations throw error with message 'Exceeds the number of operations'.",
            function () {
                var message = '';
                try{
                    testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Exceeds the number of operations', message);
            }
        );
    });
    context(
        'when create TestCase and setLimit to 5 with a matrix 4',
        function () {
            context(
                ' with operations UPDATE 2 2 2 4 | QUERY 1 1 1 3 3 3 | UPDATE 1 1 1 23 | QUERY 2 2 2 4 4 4 | QUERY 1 1 1 3 3 3',
                function () {
                    it(
                        "if run return 4 | 4 | 27.",
                        function (done) {
                            var testCase = new TestCase();
                            testCase.setLimit(5);
                            testCase.createMatrix(
                                4,
                                function (error, message) {
                                    if (!error) {
                                        testCase.addOperation({method:"UPDATE", params:[2,2,2,4]});
                                        testCase.addOperation({method:"QUERY", params:[1,1,1,3,3,3]});
                                        testCase.addOperation({method:"UPDATE", params:[1,1,1,23]});
                                        testCase.addOperation({method:"QUERY", params:[2,2,2,4,4,4]});
                                        testCase.addOperation({method:"QUERY", params:[1,1,1,3,3,3]});
                                        testCase.run(function (result) {
                                            var expected = ['', 4, '', 4, 27];
                                            for (let i in expected) {
                                                assert.equal(expected[i], result[i]);
                                            }
                                            done();
                                        });
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
    context(
        'when create TestCase and setLimit to 4 with a matrix 2',
        function () {
            context(
                ' with operations UPDATE 2 2 2 1 | QUERY 1 1 1 1 1 1 | QUERY 1 1 1 2 2 2 | QUERY 2 2 2 2 2 2',
                function () {
                    it(
                        "if run return 0 | 1 | 1.",
                        function (done) {
                            var testCase = new TestCase();
                            testCase.setLimit(4);
                            testCase.createMatrix(
                                2,
                                function (error, message) {
                                    if (!error) {
                                        testCase.addOperation({method:"UPDATE", params:[2,2,2,1]});
                                        testCase.addOperation({method:"QUERY", params:[1,1,1,1,1,1]});
                                        testCase.addOperation({method:"QUERY", params:[1,1,1,2,2,2]});
                                        testCase.addOperation({method:"QUERY", params:[2,2,2,2,2,2]});
                                        testCase.run(function (result) {
                                            var expected = ['', 0, 1, 1];
                                            for (let i in expected) {
                                                assert.equal(expected[i], result[i]);
                                            }
                                            done();
                                        });
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
    context(
        'when create TestCase and setLimit to 1000 with a matrix 1',
        function () {
            context(
                ' with operations UPDATE 1 1 1 1 | QUERY 1 1 1 1 1 1',
                function () {
                    it(
                        "if run return 0 | 1 | 1.",
                        function (done) {
                            var testCase = new TestCase();
                            testCase.setLimit(1000);
                            testCase.createMatrix(
                                2,
                                function (error, message) {
                                    if (!error) {
                                        testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                                        for (var i = 0; i < 999; i++) {
                                            testCase.addOperation({method:"QUERY", params:[1,1,1,1,1,1]});
                                        }
                                        testCase.run(function (result) {
                                            var expected = [
                                                ''
                                            ];
                                            for (var i = 1; i < 1000; i++) {
                                                assert.equal(1, result[i]);
                                            }
                                            done();
                                        });
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
    context(
        'when create TestCase and setLimit to 10 with a matrix 1',
        function () {
            context(
                ' with operations UPDATE 1 1 1 1 | QUERY 1 1 1 2 1 1',
                function () {
                    it(
                        "if run return X2 is a number between 1 and 1.",
                        function (done) {
                            var testCase = new TestCase();
                            testCase.setLimit(2);
                            testCase.createMatrix(
                                1,
                                function (error, message) {
                                    if (!error) {
                                        testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                                        testCase.addOperation({method:"QUERY", params:[1,1,1,2,1,1]});
                                        testCase.run(function (result) {
                                            var expected = [
                                                '',
                                                'X2 is a number between 1 and 1'
                                            ];
                                            for (var i = 0; i < 2; i++) {
                                                assert.equal(expected[i], result[i]);
                                            }
                                            done();
                                        });
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
    context(
        'when create TestCase and setLimit to 2 with a matrix 2',
        function () {
            context(
                ' with operations UPDATE 1 1 1 1 | QUERY 1 1 1 1 1 1',
                function () {
                    it(
                        "if runPartial from 2 to 2 return 0.",
                        function (done) {
                            var testCase = new TestCase();
                            testCase.setLimit(2);
                            testCase.createMatrix(
                                2,
                                function (error, message) {
                                    if (!error) {
                                        testCase.addOperation({method:"UPDATE", params:[1,1,1,1]});
                                        testCase.addOperation({method:"QUERY", params:[2,2,2,2,2,2]});
                                        testCase.runPartial(2, 2, function (result) {
                                            var expected = [
                                                0
                                            ];
                                            for (var i = 0; i < 1; i++) {
                                                assert.equal(expected[i], result[i]);
                                            }
                                            done();
                                        });
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});
