var flag_description = false;
var flag_contact = false;
var flag_message = false;
var flag_ringtone = false;
var flag_time = false;
var flag_edit = false;
var flag_save = false;
var flag_error = true;
var error_counter = 1;

function onDeviceReady(){
    console.log("Device is ready");
}

function speak(){
    var time;
    var contact;
    var message;
    var ringtone;
    var description;
    var am_pm;
    console.log("speak now!");
    var flag_error = true;
    var maxMatches = 1;
    var promptString = "Speak now"; // optional
    var language = "en-US";                     // optional
    window.plugins.speechrecognizer.startRecognize(function(result){
        alert(result);
        // flags to control the flow of the interaction
        // do NOT change the order of these functions
        if(flag_description)    {
            description = document.getElementById('newAlarmDescription');
            description.value = result;
            navigator.tts.speak("The alarm description says " + description);
            flag_description = false;
            flag_error = false;
        }
        if(flag_time)   {
            var minutes;
            var hours;
            var o_clock = "";
            if(result[0].length == 6)   {
                hours = "0" + result[0].substring(0, 1);
                minutes = "00";
                if(result[0].substring(result[0].length - 4, result[0].length == "a.m"))    {
                    am_pm = "a.m.";
                } else {
                    am_pm = "p.m.";
                }
                o_clock = "o'clock";
            } else if(result[0].length == 7)    {
                hours = result[0].substring(0, 2);
                minutes = "00";
                o_clock = "o'clock";
            } else {
                if(result[0].substring(0, 2) == "10" || result[0].substring(0, 2) == "11" || result[0].substring(0, 2) == "12")  {
                    am_pm = result[0].substring(6, result[0].length);
                    minutes = result[0].substring(3,5);
                } else {
                    am_pm = result[0].substring(5, result[0].length);
                    minutes = result[0].substring(2,4);
                }
                var flag_am_pm = true; // am is true; pm is false
                if(flag_am_pm)   {
                    if(result[0].charAt(0) != "1")  {
                        hours = "0" + result[0].charAt(0);
                    } else if(result[0].substring(0, 2) == "12")    {
                        hours = "00";
                    } else if(result[0].charAt(0) == "1" && !(result[0].substring(0, 2) == "10" || result[0].substring(0, 2) == "11"))  {
                        hours = "01";
                    } else if(result[0].substring(0, 2) == "10" || result[0].substring(0, 2) == "11")    {
                        hours = result[0].substring(0, 2);
                    } else {
                        if(result[0].charAt(0) != "1")  {
                            hours = "0" + result[0].charAt(0);
                        } else if(result[0].substring(0, 2) == "12")    {
                            hours = "00";
                        } else if(result[0].charAt(0) == "1" && !(result[0].substring(0, 2) == "10" || result[0].substring(0, 2) == "11"))  {
                            hours = "01";
                        } else if(result[0].substring(0, 2) == "10" || result[0].substring(0, 2) == "11")    {
                            hours = result[0].substring(0, 2);
                        }
                    }
                    if(result[0].substring(result[0].length - 4, result[0].length) == "a.m.")  {
                        am_pm = "AM";
                    } else {
                        am_pm = "PM";
                        hours = parseInt(hours) + 12;
                        hours.toString();
                        console.log(hours);
                    }
                }
                time = hours + ":" + minutes;
                console.log(time);
                $("#newAlarmTime").val(time);
                if(o_clock != "")   {
                    navigator.tts.speak("You set your alarm for " + hours + "o'clock" + am_pm);
                } else {
                    navigator.tts.speak("You set your alarm for " + time + am_pm);
                }
                flag_time = false;
                flag_error = false;
            }
        }
            if(flag_contact)  {
                navigator.tts.speak("You have chosen to send a message to " + result);
                contact = document.getElementById('numberTxt');
                contact.value = result;
                flag_contact = false;
                flag_error = false;
            }
            if(flag_message)    {
                navigator.tts.speak("Added this message " + result);
                message = document.getElementById('messageTxt');
                message.value = result;
                flag_message = false;
                flag_error = false;
            }
            if(flag_ringtone)   {
                navigator.tts.speak("Ringtone changed to " + result);
                flag_edit = true;
                ringtone = document.getElementById('newAlarmRingtone');
                ringtone.value = result;
                flag_ringtone = false;
                flag_error = false;
            }
            if(flag_save)   {
                 navigator.tts.speak("Is there anything else you want to change?");
                 flag_save = false;
                 clockApp.addalarm();
            }
            if(result == "add alarm" || result == "set alarm")   {
                clockApp.showView('addAlarmPage');
                navigator.tts.speak("What time do you want to set the alarm for?");
            } else if(result == "change time" || result == "set time") {
                flag_time = true;
                speak();
                flag_error = false;
            } else if(result == "change description" || result == "set description" || result == "add description")    {
                flag_description = true;
                speak();
                flag_error = false;
            } else if(result == "add reminder message" || result == "edit reminder message" || result == "set reminder message" || result == "add message")    {
                flag_message = true;
                speak();
                flag_error = false;
            } else if(result == "add contact" || result == "edit contact" || result == "set contact" || result == "change contact")  {
                flag_contact = true;
                speak();
                flag_error = false;
            } else if(result == "help" || result == "help me" || result == "please help" || result == "help me please")  {
                clockApp.showView('about');
                navigator.tts.speak("You can check out some speech commands by clicking the Speech Commands button");
            } else if(result == "change ringtone" || result == "set ringtone")  {
                flag_ringtone = true;
                speak();
                flag_error = false;
            } else if(result == "save alarm")   {
                flag_save = true;
                var tmp = document.getElementById('addAlarm').click();   
            } else if(flag_error)  {
                if(error_counter == 1)  {
                    navigator.tts.speak("Sorry. I didn't get that. Can you repeat?");
                } else if(error_counter == 2)   {
                    navigator.tts.speak("I still cannot understand. Please repeat one more time.");
                } else if(error_counter == 3) {
                    navigator.tts.speak("I was unable to understand your voice command. Try using the buttons on the screen.");
                }
                error_counter++;  
                flag_error = false;
            }
        }, function(errorMessage){
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
    }

// Show the list of the supported languages
function getSupportedLanguages() {
    window.plugins.speechrecognizer.getSupportedLanguages(function(languages){
    // display the json array
    alert(languages);
}, function(error){
    alert("Could not retrieve the supported languages : " + error);
});
}
document.addEventListener("deviceready", onDeviceReady, true);