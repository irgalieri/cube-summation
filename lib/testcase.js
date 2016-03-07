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

var D3Matrix = require('./d3matrix.js');

class TestCase {
    /**
     * Constructor
     *
     * @constructor
     * @api public
     */
    constructor () {
        this.limit = 0;
        this.matrix = undefined;
        this.operations = [];
    }
    /**
     * SetLimit
     *
     * Set the number of operations.
     *
     * @param {Integer} m Define the number of operations.
     *
     * @return void
     * @api public
     */
    setLimit (m) {
        if ((m < 1) || (m > 1000)) {
            throw new Error("M is a number between 1 and 1000");
        }
        this.limit = m;
    }
    /**
     * CreateMatrix
     *
     * Create a New Matrix
     *
     * @param  {Integer}  n        Defines the N * N * N matrix
     * @param  {Function} callback Callback, recive error and message
     *
     * @return void
     * @api public
     */
    createMatrix (n, callback) {
        try {
            this.matrix = new D3Matrix(n);
        } catch (e) {
            callback(true, e.message);
            return ;
        }
        callback(false, '');
    }
    /**
     * Add Operation
     *
     * @param {object} operation Operation
     *
     * @return void
     * @api public
     */
    addOperation (operation) {
        if ((this.operations.length + 1) > this.limit) {
            throw new Error("Exceeds the number of operations");
        }
        switch (operation.method) {
            case 'UPDATE':
            case 'QUERY':
                this.operations.push(operation);
                break;
            default:
                throw new Error("Invalid operation, Send UPDATE o QUERY");
        }
    }
    /**
     * Run Partial TestCase
     *
     * @param  {Integer}  begin    From
     * @param  {Integer}  to       To
     * @param  {Function} callback [Callback, recive error and message
     *
     * @return void
     */
    runPartial (begin, to, callback) {
        var result = [];
        for (let index = (begin - 1); index < to; index++) {
            try {
                let operation = this.operations[index];
                switch (operation.method) {
                    case 'UPDATE':
                        this.matrix.update(
                            operation.params[0],
                            operation.params[1],
                            operation.params[2],
                            operation.params[3]
                        );
                        result.push('');
                        break;
                    case 'QUERY':
                        result.push(this.matrix.query(
                            operation.params[0],
                            operation.params[1],
                            operation.params[2],
                            operation.params[3],
                            operation.params[4],
                            operation.params[5]
                        ));
                        break;
                }
            } catch (e) {
                result.push(e.message);
            }
        }
        callback(result);
    }
    /**
     * Run All Operations
     *
     * @param  {Function} callback [Callback, recive error and message
     *
     * @return void
     */
    run (callback) {
        this.runPartial(1, this.operations.length, callback);
    }
}

module.exports = TestCase;
