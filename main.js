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
 * @category   Application
 * @package    main
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */
"use strict";

console.info("Cube Summation WebSocket Server");
console.info("Copyright (C) 2016  Ignacio R. Galieri");

var app = require('express')();
app.use('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send("FRONTEND HERE");
});
var Controller = require('./lib/controller.js');
var controller = new Controller();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log((new Date()) + ' Connection accepted.');
    socket.emit('begin', 'Please inform your type of operation.');
    socket.on('bulk', function(data){
        let controller = new Controller();
        controller.bulk(
            JSON.parse(data),
            function (result) {
                socket.emit('bulk-reponse', JSON.stringify(result));
            }
        );
    });
    socket.on('create-case', function(data){
        try {
            controller.setTestCasesLimit(data);
            socket.emit('create-case-reponse', 'OK');
        } catch(e) {
            socket.emit('create-case-reponse', JSON.stringify(e.message));
        }
    });
    socket.on('prepare-test', function(data){
        try {
            data = JSON.parse(data)
            controller.loadTestCase(data.matrixSize, data.numberOperations, function (response) {
                socket.emit('prepare-test-reponse', response);
            });
        } catch(e) {
            socket.emit('prepare-test-reponse', JSON.stringify(e.message));
        }
    });
    socket.on('run-operation', function(data){
        try {
            data = JSON.parse(data);
            controller.addOperationToLastTestCase(data);
            controller.runLastOperation(function (response) {
                let lastTestCase = controller.getLastTestCase();
                if (lastTestCase.limit === lastTestCase.operations.length) {
                    socket.emit('exceed', 'Exceeds the number of operations');
                }
                socket.emit('run-operation-reponse', JSON.stringify(response));
            });
        } catch(e) {
            socket.emit('run-operation-reponse', JSON.stringify(e.message));
        }
    });
});
server.listen(8080);
