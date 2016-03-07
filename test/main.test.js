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

var assert = require('assert');
var io = require('socket.io-client');
var should = require('should');

var socketURL = 'ws://localhost:8080';
var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe('WebSocket', function() {
    context('when connect', function () {
        it('the connection should be established.', function(done){
              var client1 = io.connect(socketURL, options);
              client1.on('connect', function(){
                  client1.disconnect();
                  done();
              });
        });
    });
    context('when connect and the connection is established', function () {
        it('the server ask for the operation.', function(done){
              var client1 = io.connect(socketURL, options);
              client1.on('connect', function() {
                  client1.on(
                      'begin',
                      function (msg) {
                          msg.should.equal(
                              'Please inform your type of operation.'
                          );
                          client1.disconnect();
                          done();
                      }
                  );
              });
        });
    });
    context('when connect and the connection is established and the server ask for operation', function () {
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
        };
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
        ];
        it(
            'if the operation is "bulk" with '+ JSON.stringify(request) +' the response should equal to '+ JSON.stringify(expected) +'.',
            function(done){
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('bulk', JSON.stringify(request));
                        client1.on('bulk-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual(expected);
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation is 'bulk' with {} the response should equal to ['T is a number between 1 and 50'].",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('bulk', JSON.stringify('{}'));
                        client1.on('bulk-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual(['T is a number between 1 and 50']);
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation is 'create-case' with 1001 the response should equal to 'T is a number between 1 and 50'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('create-case', '1001');
                        client1.on('create-case-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual('T is a number between 1 and 50');
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation is 'create-case' with 2 the response should equal to 'OK'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('create-case', '2');
                        client1.on('create-case-reponse', function(response){
                            response.should.deepEqual('OK');
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation is 'prepare-test' with {matrixSize:101,numberOperations:5} the response should equal to 'N is a number between 1 and 100'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('create-case', '2');
                        client1.on('create-case-reponse', function(response){
                            response.should.deepEqual('OK');
                            client1.emit('prepare-test', JSON.stringify({matrixSize:101,numberOperations:5}));
                            client1.on('prepare-test-reponse', function(response){
                                response.should.deepEqual('N is a number between 1 and 100');
                                client1.disconnect();
                                done();
                            });
                        });
                    });
                });
            }
        );
        it(
            "if the operation is 'prepare-test' with {matrixSize:4,numberOperations:5} the response should equal to 'N is a number between 1 and 100'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('create-case', '2');
                        client1.on('create-case-reponse', function(response){
                            response.should.deepEqual('OK');
                            client1.emit('prepare-test', JSON.stringify({matrixSize:4,numberOperations:5}));
                            client1.on('prepare-test-reponse', function(response){
                                response.should.deepEqual('Please Add Operations');
                                client1.disconnect();
                                done();
                            });
                        });
                    });
                });
            }
        );
        it(
            "if the operation is 'prepare-test' with {matrixSize:4,numberOperations:5} the response should equal to 'Please Add Operations'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('create-case', '2');
                        client1.on('create-case-reponse', function(response){
                            response.should.deepEqual('OK');
                            client1.emit('prepare-test', JSON.stringify({matrixSize:4,numberOperations:5}));
                            client1.on('prepare-test-reponse', function(response){
                                response.should.deepEqual('Please Add Operations');
                                client1.disconnect();
                                done();
                            });
                        });
                    });
                });
            }
        );
        it(
            "if the operation #1 is 'run-operation with {method:'UPDATE', params:[5,2,2,4]} the response should equal to 'X is a number between 1 and 4'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('run-operation', JSON.stringify({method:'UPDATE', params:[5,2,2,4]}));
                        client1.on('run-operation-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual(['X is a number between 1 and 4']);
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation #2 is 'run-operation with {method:'UPDATE', params:[2,2,2,4]} the response should equal to ''.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('run-operation', JSON.stringify({method:'UPDATE', params:[2,2,2,4]}));
                        client1.on('run-operation-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual(['']);
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation #3 is 'run-operation with {method:'QUERY', params:[1, 1, 1, 3, 3, 3]} the response should equal to '4'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('run-operation', JSON.stringify({method:'QUERY', params:[1, 1, 1, 3, 3, 3]}));
                        client1.on('run-operation-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual([4]);
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation #4 is 'run-operation with {method:'QUERY', params:[1, 1, 1, 3, 3, 3]} the response should equal to '4'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('run-operation', JSON.stringify({method:'QUERY', params:[1, 1, 1, 3, 3, 3]}));
                        client1.on('run-operation-reponse', function(response){
                            response = JSON.parse(response);
                            response.should.deepEqual([4]);
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
        it(
            "if the operation #5 is 'run-operation with {method:'QUERY', params:[1, 1, 1, 3, 3, 3]} the response should equal to '4'.",
            function (done) {
                var client1 = io.connect(socketURL, options);
                client1.on('connect', function() {
                    client1.on('begin', function (msg) {
                        msg.should.equal(
                            'Please inform your type of operation.'
                        );
                        client1.emit('run-operation', JSON.stringify({method:'QUERY', params:[1, 1, 1, 3, 3, 3]}));
                        client1.on('exceed', function(response){
                            response.should.deepEqual('Exceeds the number of operations');
                            client1.disconnect();
                            done();
                        });
                    });
                });
            }
        );
    });
});
