/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       app.receivedEvent('deviceready');
     /*   $("#btnDefaultSMS").click(function(){
            alert("click in index.js");
            var number = $("#numberTxt").val();
            var message = $("#messageTxt").val();
            var intent = ""; //leave empty for sending sms using default intent
            var success = function () { alert('Message sent successfully'); };
            var error = function (e) { alert('Message Failed:' + e); };
            sms.send(number, message, intent, success, error);
        });*/
//ondeviceready local notification
   /*     document.addEventListener('deviceready', function () {
        // window.plugin.notification.local is now available
        console.log("it's working");
        var now = new Date().getTime();
        var then = new Date(now+5*1000); // 5 sec from now
        window.plugin.notification.local.add({
            id:         "test1",  // A unique id of the notifiction
            date:       then,    // This expects a date object
            message:    "test",  // The message that is displayed
            title:      "success",  // The title of the message
            repeat:     "secondly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
            badge:      1,  // Displays number badge to notification
            //sound:      String,  // A sound to be played
           // json:       (a:9),  // Data to be passed through the notification
            autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    false, // Prevent clearing of notification (Android only)
            });

        
         }, false);*/
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
