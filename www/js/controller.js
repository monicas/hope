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

    function onDeviceReady(){
      console.log("Device is ready");
    }

    function recognizeSpeech() {
      var maxMatches = 1;
      var promptString = "Speak now"; // optional
      var language = "en-US";         // optional
      window.plugins.speechrecognizer.startRecognize(function(result){
        alert(result);
        if(result == "add alarm") {
          clockApp.showView('editAlarm');
        }
      }, function(errorMessage){
        console.log("Error message: " + errorMessage);
      }, maxMatches, promptString, language);
    }

    function getSupportedLanguages() {
      window.plugins.speechrecognizer.getSupportedLanguages(function(languages){
      // display the json array
      alert(languages);
    },function(error){
      alert("Could not retrieve the supported languages : " + error);
    });
    }

    function speak(){
      console.log("speak now!");
      var maxMatches = 1;
      var promptString = "Speak now"; // optional
      var language = "en-US";                     // optional
      window.plugins.speechrecognizer.startRecognize(function(result){
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
      myList.addElement({
        time: "",
        status: true,
        description: ""
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
      showView: showView
    }

    return (clockApp);
  }(jQuery));



