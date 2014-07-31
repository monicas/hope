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
                window.plugins.speechrecognizer.startRecognize(function
(result){
                    alert(result);
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
    var snoozeList = [newTime,newDescription];
        myList.addElement({
            time: newTime,
            status: true,
            description: newDescription,
            ringtone: newRingTone,
            snooze: [snoozeList]
        });

    var res = newTime.split(":");
        var hour=res[0];
        var minute=res[1];
        var now=new Date();
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

        window.plugin.notification.local.add({
            id:         "1",  // A unique id of the notifiction
            date:       new Date(now.getTime()+5*1000),    // This expects a date object
            message:    "test",  // The message that is displayed
            title:      newDescription,  // The title of the message
            repeat:     "secondly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
            badge:      1,  // Displays number badge to notification
            //sound:      'android.resource://edu.brandeis.hope/raw/onesummerday',  // A sound to be played
           // json:       (a:9),  // Data to be passed through the notification
            autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    false, // Prevent clearing of notification (Android only)
            });
        
            var cancel =false; //whether the whole alarm is cancelled.(including two snoozes)
         window.plugin.notification.local.ontrigger = function (id,state,json) {

            console.log("it is triggered!");
            if(cancel==true){
                console.log("Cancelling all alarm");
                window.plugin.notification.local.cancelAll();
            }else{//pop up the windows with ok and cancel button
                if (window.confirm("Alarm : "+newDescription+" at "+alarmDate)) { //when the user confirms(clicking ok),math problem!
                //randomly generate two integers between 20 to 40.
                    var oneNumber=Math.floor(Math.random() * (40 - 20) + 20);
                    var theOtherNumber=Math.floor(Math.random() * (40 - 20) + 20);
                    var answer = prompt("What's "+oneNumber+" + "+theOtherNumber+"?");
                    if (answer == (oneNumber+theOtherNumber)) {// if the user answer correctly, cancel all notification we have. 
                        alert("it's correct! Welcome to your new day!");
                        cancel=true;
                    }else{//if not , keep triggered, go through ontrigger function from beginning again.
                        alert("Wrong Answer!");
                    }
                
                }else{ //when user click cancel( user wants to snnoze )
                    
                    current = new Date();
                    //just cancel the first localnotification with id 1
                    window.plugin.notification.local.cancel('1');
                    defaultSnooze = new Date(current.getTime()+10*1000);
                    console.log(defaultSnooze);

                    //set the second local notification with id 2
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
        clockView.refreshView(myList);
        showView("welcome");


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



