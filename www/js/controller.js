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
        if(now>setTimeInToday){
            //this time is past today, we need to set it for next day.
            alarmDate=new Date(now.getTime()+1000*60*60*24);
            alarmDate.setHours(hour);
            alarmDate.setMinutes(minute);
        }else{
            //this time is not past today, we need to set it for today.
            alarmDate=setTimeInToday;
        }

        console.log("it's working" + alarmDate);

        window.plugin.notification.local.add({
            id:         "test1",  // A unique id of the notifiction
            date:       alarmDate,    // This expects a date object
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
    
    function matchSeconds(element){
        var alarmId = element.getAttribute("sid");
        var currentHour = new Date().getHours();
        var currentMinutes = new Date().getMinutes();
        var currentTime = ""+currentHour+":"+currentMinutes ;

        alarm = myList.getElement(alarmId);
        if ((alarm.status == true) && (alarm.time == currentTime)){
                    console.log("this is executing~~~~~");
                    var my_media = new Media("/android_asset/www/OneSummerDay.mp3",
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
         else 
        {console.log("it sucks")}
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
        playAudio: playAudio,
        matchSeconds: matchSeconds
       // localnote: localnote
    }

    return (clockApp);

}(jQuery));



