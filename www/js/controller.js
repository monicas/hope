/**
 demo.js
 This provides the model and controller for the clock list app!
 It is written entirely in JavaScript with no use of AngularJS
 but it does just jQuery to handle the ajax calls in a browser independent manner...
 and it uses jQuery to access and modify the HTML file index.html
 
 VERSION 1.0.1 -- here is where we start adding some functionality
 **/

var clockApp = (function($) {


    // first create the model
    var myList = new ClockList();



    var showView = function(selected) {
      window.location.hash = '#' + selected;
      $('.view').hide().filter('#' + selected + '-view').show();
    };

    

function speak(){
        console.log("speak now!");
        var maxMatches = 1;
        var promptString = "Speak now"; // optional
        var language = "en-US";                     // optional
        var prev = "";
        window.plugins.speechrecognizer.startRecognize(function(result){
            alert(result);
            if(result == "add alarm")   {
                prev = result;
                clockApp.showView('editAlarm');
                navigator.tts.speak("What time would you like to set the alarm for?");
                document.freudman.freudmanAlarmTime.click();
                console.log("success!");
            } else if(parseInt(result) == 215)   {
                prev = result;
                var stupid = document.getElementById('newAlarmTime');
                stupid.value = "2:15:00";
                console.log("success!!");
                navigator.tts.speak("Ok. Describe your alarm?");
            } else if(result == "test")    {
                prev = result;
                var stupid = document.getElementById('newAlarmDescription');
                stupid.value = "yo wake up!";
                navigator.tts.speak("Sounds good. Do you want to add a contact?");
                console.log("success!!!");
            } else if(result == "edit phone number")   {
                prev = result;
                var stupid = document.getElementById('numberTxt');
                stupid.value = "123123123";
                navigator.tts.speak("Please edit your message");
                console.log("success!!!!");
            } else if(result == "edit message")    {
                prev = result;
                var stupid = document.getElementById('messageTxt');
                stupid.value = "wake me up!";
                navigator.tts.speak("Sounds good");
                console.log("success!!!!!");
            } else if(result == "shut up")  {
                navigator.tts.speak("Sorry for bothering you.");
            }
        }, function(errorMessage){
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
    }


  
    function handleDeletealarm(element) {
        console.log("deleting alarm");
        console.log(" with id " + element.getAttribute("sid"));
        myList.deleteElement(element.getAttribute("sid"));

    }


    function addalarm() {

    var newTime = document.getElementById('newAlarmTime').value;
    var newDescription = document.getElementById('newAlarmDescription').value;
    var newRingTone = document.getElementById('newAlarmRingtone').value;
    var status=document.getElementById('status').value;
    // if(status=="off"){
    //     status=false;
    // }else{
    //     status=true;
    // }
    var number = document.getElementById('numberTxt').value;
    var message = document.getElementById('messageTxt').value;
    var snoozeList = [newTime,newDescription];

    //print all the information of the new alarm into console here when we add a new alarm. so we can check!
    console.log("newTime: "+newTime);
    console.log("newDescription: "+newDescription);
    console.log("newRingTone: "+newRingTone);
    console.log("status: "+status);
    console.log("number: "+number);
    console.log("message: "+message);
    
    //declare an object called tempElement, for user input   
    var now = new Date(); 
    var tempElement = {
        time: newTime,
        status: true,
        description: newDescription,
        ringtone: newRingTone,
        snooze: [snoozeList]
    }
        var tempId = myList.addElement(tempElement);

//declare another object
    var updatedElement = {
        time: newTime,
        status: true,
        description: newDescription,
        ringtone: newRingTone,
        snooze: [snoozeList],
        localnoti: {
            id:         tempId,  // A unique id of the notifiction
            date:       new Date(now.getTime()+5*1000),    // This expects a date object
            message:    "test",  // The message that is displayed
            title:      "success",  // The title of the message
            repeat:     "minutely",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
            badge:      1,  // Displays number badge to notification
          //  sound:      'android.resource://'+"'edu.brandeis.monica'"+'/raw/march',  // A sound to be played
           // json:       (a:9),  // Data to be passed through the notification
            autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    false, // Prevent clearing of notification (Android only)
        }

    }
        myList.updateElement(tempId,updatedElement); // update/overwrite the Element with the same Id
        // can we get the id for this alarm in database here???? If we can, we can add the local notification
        //with the same id. And later we can match these two much easier if we want to make any further change.

    var res = newTime.split(":");
        var hour=res[0];
        var minute=res[1];
       // var now=new Date();
        var alarmDate;//final alarmDate with the right format;
        var setTimeInToday=new Date();
        setTimeInToday.setHours(hour);
        setTimeInToday.setMinutes(minute);
        setTimeInToday.setSeconds(0);
        if(now>setTimeInToday){
            //this time is past today, we need to set it for next day.
            alarmDate=new Date(now.getTime()+1000*60*60*24);
            alarmDate.setHours(hour);
            alarmDate.setMinutes(minute);
            alarmDate.setSeconds(0);
        }else{
            //this time is not past today, we need to set it for today.
            alarmDate=setTimeInToday;
        }

        console.log("it's working" + alarmDate);
        

        //jack just sent me!!! add another snnoze!
        window.plugin.notification.local.add(updatedElement.localnoti); //the parameters are grabbed from localnoti field in side updatedElement

        var cancel =false; //whether id1 is cancelled or not.
        var cancel2 = false; //whether id 2 is cancelled or not.
         window.plugin.notification.local.ontrigger = function (id,state,json) {

            console.log("it is triggered!");
         /*   var newMedia = new Media('/android_asset/www/march');
            if (cancel==false){newMedia.play()} else {newMedia.stop()};
            console.log("it is triggered1231!");*/
            if(cancel==true){
                console.log("it should cancel id1 it, right?");
                window.plugin.notification.local.cancel("1");
               // newMedia.stop();
                return;
            }else{
                if (window.confirm("Alarm : "+newDescription+" at "+alarmDate)) { //when you press ok(=cancel this alarm), you need to solve a math problem
                //randomly generate two integers between 20 to 40.
                    console.log("something");
                    var oneNumber=Math.floor(Math.random() * (40 - 20) + 20);
                    var theOtherNumber=Math.floor(Math.random() * (40 - 20) + 20);
                    var answer = prompt("What's "+oneNumber+" + "+theOtherNumber+"?");
                    if (answer == (oneNumber+theOtherNumber)) {
                        alert("it's correct! Welcome to your new day!");
                        cancel=true;
                        return;
                    }else{
                        alert("Wrong Answer!");
                        return;
                    }
                
                }else{
                    //when you press cancel (here,  cancel = I want to snooze)
                    console.log("not cancel the whole alarm yet! we will cancel id1 and create id 2");
                    current = new Date();
                    window.plugin.notification.local.cancel('1');
                    cancel=true;
                    //first it will send a message to a friend.
                    var intent = ""; //leave empty for sending sms using default intent
                    var success = function () { alert('Message sent successfully'); };
                    var error = function (e) { alert('Message Failed:' + e); };
                    sms.send(number, message, intent, success, error);
                 //   newMedia.stop();
                    defaultSnooze = new Date(current.getTime()+10*1000);
                    console.log(defaultSnooze);
                    window.plugin.notification.local.add({
                    id:         "2",  // A unique id of the notifiction
                    date:       defaultSnooze,    // This expects a date object
                    message:    "test",  // The message that is displayed
                    title:      "success",  // The title of the message
                    repeat:     "secondly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
                    badge:      1,  // Displays number badge to notification
                    //sound:      String,  // A sound to be played
                   // json:       (a:9),  // Data to be passed through the notification
                    autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
                    ongoing:    false, // Prevent clearing of notification (Android only)
                    });
                    cancel = true; // need to add this to stop the infinite loop
                    
                    //new snooze should be here, even though I do agree it is becoming really messy
                    window.plugin.notification.local.ontrigger = function (id,state,json){
                        
                        if(cancel2==true){
                        console.log("it should cancel2 it, right?");
                        window.plugin.notification.local.cancel("2");
                       // newMedia.stop();
                        return;
                    }else{
                        if (window.confirm("Alarm : "+newDescription+" at "+new Date(alarmDate+10*1000))) { 
                        //randomly generate two integers between 20 to 40.
                            console.log("something2");
                            var oneNumber=Math.floor(Math.random() * (40 - 20) + 20);
                            var theOtherNumber=Math.floor(Math.random() * (40 - 20) + 20);
                            var answer = prompt("What's "+oneNumber+" + "+theOtherNumber+"?");
                            if (answer == (oneNumber+theOtherNumber)) {
                                alert("it's correct! Welcome to your new day!");
                                cancel2=true;
                                
                            }else{
                                alert("Wrong Answer!");
                                
                            }
                        
                        }else{//send sms again
                            var intent = ""; //leave empty for sending sms using default intent
                            var success = function () { alert('Message sent successfully'); };
                            var error = function (e) { alert('Message Failed:' + e); };
                            sms.send(number, message, intent, success, error);
                        }
                    } 

                    }
                    
                }
            }
            console.log("cancel = "+cancel);
            

            

        };

        document.getElementById("SnoozeButton").onclick=function(){
            current = new Date();
            window.plugin.notification.local.cancel('1');
            defaultSnooze = new Date(current.getTime()+10*1000);
            console.log(defaultSnooze);
        /*    window.plugin.notification.local.add({
            id:         "2",  // A unique id of the notifiction
            date:       defaultSnooze,    // This expects a date object
            message:    "test",  // The message that is displayed
            title:      "success",  // The title of the message
            repeat:     "secondly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
            badge:      1,  // Displays number badge to notification
            //sound:      String,  // A sound to be played
           // json:       (a:9),  // Data to be passed through the notification
            autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    false, // Prevent clearing of notification (Android only)
            }); */
        }

    }




    function editTime(element){
        var alarmId = element.getAttribute("sid");
        var alarmVal = element.value;
        var alarm;
        console.log("alarm "+alarmId+" has value "+alarmVal);
        alarm = myList.getElement(alarmId);
        alarm.time = alarmVal;
        myList.updateElement(alarm.id,alarm);
        refreshView();
        
    }
    
    function editstatus(element){
        var alarmId = element.getAttribute("sid");
        var statusCheckbox = document.getElementById('changestatus'+alarmId);
        var alarm;
      
        alarm = myList.getElement(alarmId);
        if(!alarm.status){
            console.log("it was unchecked");
            alarm.status = true;
        } else {
            console.log("it was checked");
            alarm.status = false;
        }
        console.log("alarm "+alarmId+" changing its status to "+alarm.status);
        myList.updateElement(alarm.id,alarm);
        refreshView();
    }
    
        
    function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
        }
    );
    my_media.play();
}

    function editDes(element){
        var alarmId = element.getAttribute("sid");
        var alarmVal = element.value;
        var alarm;
        console.log("alarm "+alarmId+" has value "+alarmVal);
        alarm = myList.getElement(alarmId);
        alarm.description = alarmVal;
        myList.updateElement(alarm.id,alarm);
        refreshView();
        
    }

 

    function editalarm(element) {
        console.log("editing alarm "+element.getAttribute("sid"));
    }

    function refreshView(){
        clockView.refreshView(myList);
    }

    function reloadModel(){
        myList.loadModel();
        refreshView();
    }
    
    function initEventListeners(){
        $(window).on('hashchange', function(event){
          var view = (window.location.hash || '').replace(/^#/, '');
          if ($('#' + view + '-view').length) {
            showView(view);
          }
        });
    }

    function start() {
        myList.loadModel();
        console.log("myList = " + JSON.stringify(myList));
        alert("Hi, I am a social, interactive alarm clock. Just make an alarm and I will try to make sure you're awake! Customize me and send a text to your friends on snoozes.");
        clockView.refreshView(myList);
        showView("clockList");


    }

    function startup() {
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);
  log("initialized.");
}

    // here is were we decide what is visible to the outside!
    clockApp = {
        start: start,
        addalarm: addalarm,
        handleDeletealarm: handleDeletealarm,
        refreshView: refreshView,
        speak:speak,
        editalarm: editalarm,
        reloadModel: reloadModel,
        editTime:editTime,
        editstatus: editstatus,
        editDes: editDes,
        showView: showView,
        playAudio: playAudio
       // localnote: localnote
    }

    return (clockApp);

}(jQuery));