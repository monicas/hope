/**
  The ClockList class has all the methods for downloading the model
  from the server, updating the model (and sending the updates to the server)
  and refreshing the model by pulling down the server info.

  
**/

function ClockList() {
	this.user = "Your";
    this.cutoff = 0;
    this.alarms = [];

};



// we use the locally cached model to lookup elements...
ClockList.prototype.getElement = function(id){
    var alarm;
    var i;
    for(i=0; i<this.alarms.length; i++){
        alarm = this.alarms[i];
        if(alarm.id == id){
            return(alarm);
        }
    }
};

var serverURL = "http://leiner.cs-i.brandeis.edu:3000";
ClockList.prototype.loadModel = function() {
    var myList = this;
    
    // send request to the server for the alarms in the list
    $.ajax({
        type: "GET",
        url: serverURL + "/model/clock",
    }).done(function(alarms) {
        myList.alarms = alarms;
        alarms.map(function(x){x.id=x["_id"];});
        clockView.refreshView(myList);
    });
};

ClockList.prototype.addElement = function(newalarm){
    console.log("sending "+JSON.stringify(newalarm));
    var myList = this;
    $.ajax({
        type: "POST",
        url: serverURL + "/model/clock",
        data: JSON.stringify(newalarm),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(alarms) {
        myList.loadModel();
    });
}

ClockList.prototype.updateElement = function(id,newalarm){
    var myList = this;
    $.ajax({
        type: "PUT",
        url: serverURL + "/model/clock/"+id,
        data: JSON.stringify(newalarm),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(alarms) {
        myList.loadModel();
    });
}

ClockList.prototype.deleteElement = function(id){
    var myList = this;
    $.ajax({
        type: "DELETE",
        url: serverURL + "/model/clock/"+id,
    }).done(function(alarms) {
        myList.loadModel();
    });
}


$.ajax({
  url: "/api/getWeather",
  data: {
    zipcode: 97201
  },
  success: function( data ) {
    $( "#weather-temp" ).html( "<strong>" + data + "</strong> degrees" );
  }
});

