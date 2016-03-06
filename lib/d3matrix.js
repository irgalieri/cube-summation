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

class D3Matrix {
    /**
     * Constructor
     *
     * @constructor
     * @param {Integer} n Defines the N * N * N matrix
     * @api public
     */
    constructor (n) {
        if ((n < 1) || (n > 100)) {
            throw new Error("N is a number between 1 and 100");
        }
        this.values = [];
        this.n = n;
        let limmit = Math.pow(n, 3);
        for (let curr = 0; curr < limmit; curr++) {
            this.values.push(0);
        }
    }
    /**
     * Update
     *
     * Updates the value of block (x,y,z) to W.
     *
     * @param  {Integer} x Coord. X
     * @param  {Integer} y Coord. Y
     * @param  {Integer} z Coord. Z
     * @param  {Integer} w Value W
     *
     * @return void
     * @api public
     */
    update (x, y, z, w) {
        if ((w < Math.pow(-10, 9)) || (w > Math.pow(10, 9))) {
            throw new Error("W is a number between -10^9 and 10^9");
        }
        if (x < 1 || (x > this.n)) {
            throw new Error("X is a number between 1 and "+this.n);
        }
        if (y < 1 || (y > this.n)) {
            throw new Error("Y is a number between 1 and "+this.n);
        }
        if (z < 1 || (z > this.n)) {
            throw new Error("Z is a number between 1 and "+this.n);
        }

        let index = this.indexOf(x, y, z);

        this.values[index] = w;
    }
    /**
     * Update
     *
     * Calculates the sum of the value of blocks whose x coordinate is between
     * x1 and x2 (inclusive), y coordinate between y1 and y2 (inclusive) and z
     * coordinate between z1 and z2 (inclusive)
     *
     * @param  {Integer} x1 Coord. X1
     * @param  {Integer} y1 Coord. Y1
     * @param  {Integer} z1 Coord. Z1
     * @param  {Integer} x2 Coord. X2
     * @param  {Integer} y2 Coord. Y2
     * @param  {Integer} z2 Coord. Z2
     *
     * @return {Integer}
     * @api public
     */
    query (x1, y1, z1, x2, y2, z2) {
        var result = 0;
        if (x1 < 1 || (x1 > this.n)) {
            throw new Error("X1 is a number between 1 and "+this.n);
        }
        if (y1 < 1 || (y1 > this.n)) {
            throw new Error("Y1 is a number between 1 and "+this.n);
        }
        if (z1 < 1 || (z1 > this.n)) {
            throw new Error("Z1 is a number between 1 and "+this.n);
        }
        if (x2 < 1 || (x2 > this.n)) {
            throw new Error("X2 is a number between 1 and "+this.n);
        }
        if (y2 < 1 || (y2 > this.n)) {
            throw new Error("Y2 is a number between 1 and "+this.n);
        }
        if (z2 < 1 || (z2 > this.n)) {
            throw new Error("Z2 is a number between 1 and "+this.n);
        }
        if (!(x1 <= x2)) {
            throw new Error('X1 must be less or equal than X2');
        }
        if (!(y1 <= y2)) {
            throw new Error('Y1 must be less or equal than Y2');
        }
        if (!(z1 <= z2)) {
            throw new Error('Z1 must be less or equal than Z2');
        }

        let indexStart = this.indexOf(x1, y1, z1);
        let indexEnd = this.indexOf(x2, y2, z2);

        for (let i = indexStart;  i <= indexEnd; i++) {
            result = result + this.values[i];
        }
        return result;
    }
    /**
     * indexOf
     *
     * Return the index coordinate x,y,z
     *
     * @param  {Integer} x Coord. X
     * @param  {Integer} y Coord. Y
     * @param  {Integer} z Coord. Z
     *
     * @return {Integer}
     * @api public
     */
    indexOf (x, y, z) {
        let index = (x-1)*Math.pow(this.n, 2);
        index += (y-1) * this.n;
        index += (z-1);

        return index;
    }
}

module.exports = D3Matrix;
