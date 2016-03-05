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
    , D3Matrix = require('../lib/d3matrix.js');

describe('D3Matrix', function() {
    context('when create D3Matrix with N is number not between  1 and 100', function () {
        it("if N is -999 should throw error with message 'N is a number between 1 and 100'.", function () {
            var message = '';
            try{
                let obj = new D3Matrix(-999);
            } catch (e) {
                message = e.message;
            }
            assert.equal('N is a number between 1 and 100', message);
        });
        it("if N is 0 should throw error with message 'N is a number between 1 and 100'.", function () {
            var message = '';
            try{
                let obj = new D3Matrix(0);
            } catch (e) {
                message = e.message;
            }
            assert.equal('N is a number between 1 and 100', message);
        });
        it("if N is 999 should throw error with message 'N is a number between 1 and 100'.", function () {
            var message = '';
            try{
                let obj = new D3Matrix(999);
            } catch (e) {
                message = e.message;
            }
            assert.equal('N is a number between 1 and 100', message);
        });
        it("if N is 101 should throw error with message 'N is a number between 1 and 100'.", function () {
            var message = '';
            try{
                let obj = new D3Matrix(101);
            } catch (e) {
                message = e.message;
            }
            assert.equal('N is a number between 1 and 100', message);
        });
    });
    context('when create D3Matrix with N is number between 1 and 100', function () {
        it("if N is 1 the length of values should be 1", function () {
            var message = '';
            var obj = {};
            try{
                obj = new D3Matrix(1);
                message = obj.values.length;
            } catch (e) {
                message = e.message;
            }
            assert.equal(1, message);
        });
        it("if N is 2 the length of values should be 8", function () {
            var message = '';
            var obj = {};
            try{
                obj = new D3Matrix(2);
                message = obj.values.length;
            } catch (e) {
                message = e.message;
            }
            assert.equal(8, message);
        });
        it("if N is 4 the length of values should be 64", function () {
            var message = '';
            var obj = {};
            try{
                obj = new D3Matrix(4);
                message = obj.values.length;
            } catch (e) {
                message = e.message;
            }
            assert.equal(64, message);
        });
        it("if N is 100 the length of values should be 100^3", function () {
            var message = '';
            var obj = {};
            try{
                obj = new D3Matrix(100);
                message = obj.values.length;
            } catch (e) {
                message = e.message;
            }
            assert.equal(Math.pow(100, 3), message);
        });
    });
    context('when create D3Matrix with N is equal 4, and update with', function () {
        var obj = new D3Matrix(4);
        it(
            "W is -11^9 should throw error with message 'W is a number between -10^9 and 10^9'.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 1, Math.pow(-11, 9));
                } catch (e) {
                    message = e.message;
                }
                assert.equal('W is a number between -10^9 and 10^9', message);
            }
        );
        it(
            "W is 11^9 should throw error with message 'W is a number between -10^9 and 10^9'.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 1, Math.pow(11, 9));
                } catch (e) {
                    message = e.message;
                }
                assert.equal('W is a number between -10^9 and 10^9', message);
            }
        );
        it(
            "X is 0 should throw error with message 'X is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.update(0, 1, 1, 100);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X is a number between 1 and 4', message);
            }
        );
        it(
            "X is 5 should throw error with message 'X is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.update(5, 1, 1, 100);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X is a number between 1 and 4', message);
            }
        );
        it(
            "Y is 0 should throw error with message 'Y is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.update(1, 0, 1, 100);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y is a number between 1 and 4', message);
            }
        );
        it(
            "Y is 5 should throw error with message 'Y is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.update(1, 5, 1, 100);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y is a number between 1 and 4', message);
            }
        );
        it(
            "Z is 0 should throw error with message 'Z is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 0, 100);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z is a number between 1 and 4', message);
            }
        );
        it(
            "Z is 5 should throw error with message 'Z is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 5, 100);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z is a number between 1 and 4', message);
            }
        );
    });
    context('when create D3Matrix with N is equal 2', function () {
        var obj = new D3Matrix(2);
        it(
            "if run UPDATE 1 1 1 100, the index 0 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 1, 100);
                    message = obj.values[0];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
        it(
            "if run UPDATE 1 1 2 100, the index 1 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 2, 100);
                    message = obj.values[1];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
        it(
            "if run UPDATE 1 2 1 100, the index 2 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(1, 2, 1, 100);
                    message = obj.values[2];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
        it(
            "if run UPDATE 2 2 1 100, the index 6 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(2, 2, 1, 100);
                    message = obj.values[6];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
        it(
            "if run UPDATE 2 2 2 100, the index 7 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(2, 2, 2, 100);
                    message = obj.values[7];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
    });
    context('when create D3Matrix with N is equal 1', function () {
        var obj = new D3Matrix(1);
        it(
            "if run UPDATE 1 1 1 100, the index 0 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(1, 1, 1, 100);
                    message = obj.values[0];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
    });
    context('when create D3Matrix with N is equal 4', function () {
        var obj = new D3Matrix(4);
        it(
            "if run UPDATE 4 4 4 100, the index 63 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(4, 4, 4, 100);
                    message = obj.values[63];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
        it(
            "if run UPDATE 4 4 1 100, the index 60 of values should be equal to 100.",
            function () {
                var message = '';
                try{
                    obj.update(4, 4, 1, 100);
                    message = obj.values[60];
                } catch (e) {
                    message = e.message;
                }
                assert.equal(100, message);
            }
        );
    });
    context('when create D3Matrix with N is equal 4 and query with', function () {
        var obj = new D3Matrix(4);
        it(
            "(1,1,1,0,0,0) should throw error with message 'X2 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,1,0,0,0);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X2 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,1,1,1,0,0) should throw error with message 'Y2 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,1,1,0,0);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y2 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,1,1,1,1,0) should throw error with message 'Z2 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,1,1,1,0);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z2 is a number between 1 and 4', message);
            }
        );
        it(
            "(0,1,1,1,1,1) should throw error with message 'X1 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(0,1,1,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X1 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,0,1,1,1,1) should throw error with message 'Y1 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,0,1,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y1 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,1,0,1,1,1) should throw error with message 'Z1 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,0,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z1 is a number between 1 and 4', message);
            }
        );


        it(
            "(1,1,1,5,5,5) should throw error with message 'X2 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,1,5,5,5);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X2 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,1,1,1,5,5) should throw error with message 'Y2 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,1,1,5,5);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y2 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,1,1,1,1,5) should throw error with message 'Z2 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,1,1,1,5);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z2 is a number between 1 and 4', message);
            }
        );
        it(
            "(5,1,1,1,1,1) should throw error with message 'X1 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(5,1,1,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X1 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,5,1,1,1,1) should throw error with message 'Y1 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,5,1,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y1 is a number between 1 and 4', message);
            }
        );
        it(
            "(1,1,5,1,1,1) should throw error with message 'Z1 is a number between 1 and 4'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,5,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z1 is a number between 1 and 4', message);
            }
        );
        it(
            "(2,2,2,1,1,1) should throw error with message 'X1 must be less or equal than X2'.",
            function () {
                var message = '';
                try{
                    obj.query(2,2,2,1,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('X1 must be less or equal than X2', message);
            }
        );
        it(
            "(1,2,2,2,1,1) should throw error with message 'Y1 must be less or equal than Y2'.",
            function () {
                var message = '';
                try{
                    obj.query(1,2,2,2,1,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Y1 must be less or equal than Y2', message);
            }
        );
        it(
            "(1,1,2,2,2,1) should throw error with message 'Z1 must be less or equal than Z2'.",
            function () {
                var message = '';
                try{
                    obj.query(1,1,2,2,2,1);
                } catch (e) {
                    message = e.message;
                }
                assert.equal('Z1 must be less or equal than Z2', message);
            }
        );
    });
    context('when create D3Matrix with N is equal 2 and UPDATE all elements to 1', function () {
        var obj = new D3Matrix(2);
        obj.update(1, 1, 1, 1);
        obj.update(1, 1, 2, 1);
        obj.update(1, 2, 1, 1);
        obj.update(1, 2, 2, 1);
        obj.update(2, 1, 1, 1);
        obj.update(2, 1, 2, 1);
        obj.update(2, 2, 1, 1);
        obj.update(2, 2, 2, 1);
        it(
            "if run QUERY 1 1 1 2 2 2 should be returned 8",
            function () {
                var message = '';
                try{
                    message = obj.query(1,1,1,2,2,2);
                } catch (e) {
                    message = e.message;
                }
                assert.equal(8, message);
            }
        );
        it(
            "if run QUERY 1 2 2 2 2 2 should be returned 5",
            function () {
                var message = '';
                try{
                    message = obj.query(1,2,2,2,2,2);
                } catch (e) {
                    message = e.message;
                }
                assert.equal(5, message);
            }
        );
        it(
            "if run QUERY 2 2 2 2 2 2 should be returned 1",
            function () {
                var message = '';
                try{
                    message = obj.query(2,2,2,2,2,2);
                } catch (e) {
                    message = e.message;
                }
                assert.equal(1, message);
            }
        );
    });
    context('when create D3Matrix with N is equal 4', function () {
        context('and run UPDATE 2 2 2 4', function () {
            var obj = new D3Matrix(4);
            obj.update(2,2,2,4);
            it(
                "and run QUERY 1 1 1 3 3 3 should be returned 4",
                function () {
                    var message = '';
                    try{
                        message = obj.query(1,1,1,3,3,3);
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal(4, message);
                }
            );
        });
        context('and run UPDATE 2 2 2 4 and UPDATE 1 1 1 23', function () {
            var obj = new D3Matrix(4);
            obj.update(2,2,2,4);
            obj.update(1,1,1,23);
            it(
                "and run QUERY 2 2 2 4 4 4 should be returned 4",
                function () {
                    var message = '';
                    try{
                        message = obj.query(2,2,2,4,4,4);
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal(4, message);
                }
            );
            it(
                "and run QUERY 1 1 1 3 3 3 should be returned 27",
                function () {
                    var message = '';
                    try{
                        message = obj.query(1,1,1,3,3,3);
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal(27, message);
                }
            );
        });
    });
    context('when create D3Matrix with N is equal 2', function () {
        context('and run UPDATE 2 2 2 1', function () {
            var obj = new D3Matrix(2);
            obj.update(2,2,2,1);
            it(
                "and run QUERY 1 1 1 1 1 1 should be returned 0",
                function () {
                    var message = '';
                    try{
                        message = obj.query(1,1,1,1,1,1);
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal(0, message);
                }
            );
            it(
                "and run QUERY 1 1 1 2 2 2 should be returned 1",
                function () {
                    var message = '';
                    try{
                        message = obj.query(1,1,1,2,2,2);
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal(1, message);
                }
            );
            it(
                "and run QUERY 2 2 2 2 2 2 should be returned 1",
                function () {
                    var message = '';
                    try{
                        message = obj.query(2,2,2,2,2,2);
                    } catch (e) {
                        message = e.message;
                    }
                    assert.equal(1, message);
                }
            );
        });
    });
});
