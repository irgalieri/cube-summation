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
}

module.exports = Controller;
