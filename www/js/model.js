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


ClockList.prototype.loadModel = function() {
    var myList = this;
    
    // send request to the server for the alarms in the list
    $.ajax({
        type: "GET",
        url: "/model/clock",
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
        url: "/model/clock",
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
        url: "/model/clock/"+id,
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
        url: "/model/clock/"+id,
    }).done(function(alarms) {
        myList.loadModel();
    });
}

