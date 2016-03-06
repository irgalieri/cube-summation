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
 * @category   Library
 * @package    lib
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */

"use strict";

var TestCase = require('./testcase.js');

class Controller {
    /**
     * Constructor
     *
     * @constructor
     * @api public
     */
    constructor () {
        this.t = 0;
        this.testcases = [];
    }
    /**
     * setTestCasesLimit
     *
     * @param  {Integer} t The number of test-cases
     *
     * @return void
     * @api public
     */
    setTestCasesLimit (t) {
        if ((t < 1) || (t > 50)) {
            throw new Error("T is a number between 1 and 50");
        }
        this.t = t;
    }
    /**
     * LoadTestCase
     *
     * @param  {Integer}  n        Defines the N * N * N matrix
     * @param  {Integer}  m        Define the number of operations.
     * @param  {Function} callback Callback
     *
     * @return void
     * @api public
     */
    loadTestCase (n, m, callback) {
        try {
            var tc = new TestCase();
            var self = this;
            tc.setLimit(m);
            tc.createMatrix(n, function (error, message) {
                if (!error) {
                    self.testcases.push(tc);
                    callback('Please Add Operations');
                } else {
                    callback(message);
                }
            });
        } catch (e) {
            callback(e.message);
        }
    }
    /**
     * getLastTestCase
     *
     * Return the Last testCase Loaded.
     *
     * @return TestCase
     */
    getLastTestCase () {
        return this.testcases[(this.testcases.length - 1)];
    }
    /**
     * AddOperationToLastTestCase
     *
     * Add the new operation to the last TestCase loaded.
     *
     * @param {object} operation Operation
     *
     * @return void
     * @api public
     */
    addOperationToLastTestCase (operation) {
        try {
            this.getLastTestCase().addOperation(operation);
        } catch (e) {
            throw e;
        }
    }
    /**
     * RunLastOperation
     *
     * Run the last operation loaded of the last TestCase loaded.
     *
     * @param  {Function} callback Callback
     *
     * @return void
     * @api public
     */
    runLastOperation (callback) {
        let sizeOperations = this.getLastTestCase().operations.length;
        this.getLastTestCase().runPartial (
            sizeOperations,
            sizeOperations,
            callback
        );
    }
    /**
     * Bulk
     *
     * Run prepare TestCase and run all operation.
     *
     * @param  {object}   request  Request
     * @param  {Function} callback Callback, recive result
     *
     * @return void
     * @apic public
     */
    bulk (request, callback) {
        var result = [];
        var self =  this;
        var iteratorOperations = {
            next: function (operations) {
                if (operations.length == 0) {
                    return '';
                }
                var iter2 = this;
                var operation = operations.pop();
                self.addOperationToLastTestCase(operation);
                self.runLastOperation( function (message) {
                    result = result.concat(message);
                    iter2.next(operations);
                });
            }
        };
        var iteratorTestCase = {
            next: function (testcases) {
                if (testcases.length == 0) {
                    return '';
                }
                var iter = this;
                var testcase = testcases.pop();
                let n = testcase.matrixSize;
                let m = testcase.operations.length;
                self.loadTestCase(n, m, function (message) {
                    if (message === 'Please Add Operations') {
                        iteratorOperations.next(
                            testcase.operations.reverse()
                        );
                        iter.next(testcases);
                    } else {
                        result = result.concat(message);
                        iter.next(testcases);
                    }
                });
            }
        };
        try {
            if (Array.isArray(request.testCases)) {
                self.setTestCasesLimit(request.testCases.length);
            } else {
                self.setTestCasesLimit(0);
            }
            iteratorTestCase.next(request.testCases.reverse());
            callback(result);
        } catch (error) {
            callback([error.message]);
        }
    }
}

module.exports = Controller;
