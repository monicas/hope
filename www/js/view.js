
/**
 The clockView is responsible for updating all of the HTML
 It is called by the clockApp only and the only thing it calls is jQuery
**/


var clockView = (function($){
    
    function refreshView(myData){
        refreshTable(myData.alarms);
        updateTitle(myData.user);
  
        
        
    }
    // updates the title with the user's name
    function updateTitle(user){
        var newTitle = user + " Smart Clock";
        $("#title").html(newTitle);
    }

    function companyLogo(){
        var logo = document.getElementByID("logo.jpeg");
        $("#title").html(logo);
    }

    
    function sortalarms(alarms){
        var sortedalarms = alarms.slice();  // make a copy of alarms
        sortedalarms.sort(function(a,b){ return(a.time > b.time)});
        return sortedalarms;
    }
    
    function filteralarms(alarms){
        var n;
        var alarm;
        var newalarms=[];
        var showon = $("#showon").prop("checked");
        console.log(showon);
        // var cutoff = $("#cutOffText").val() || 0;
        // var wasPurchased;

        for(n=0; n<alarms.length; n++){
            alarm = alarms[n]
            //wasPurchased = alarm.purchased || false;
            if (showon){
                if(alarm.status){
                    newalarms.push(alarm);
                }
                
            }else{
                newalarms.push(alarm);
            }
        }
        return newalarms;
    }
    
    
    // redraw the table using the current model
    function refreshTable(myalarms){    
                var rows = "";
                var len = myalarms.length;
                var filteredalarms = filteralarms(myalarms);
                var sortedalarms = sortalarms(filteredalarms);
                console.log("filteredalarms = "+ JSON.stringify(filteredalarms));
                console.log("sortedalarms = "+JSON.stringify(sortedalarms));
                
                for(var n=0; n<sortedalarms.length; n++){ 
                    var alarm = sortedalarms[n];
                    rows = rows + alarmToRow(alarm,n);
                }
                console.log(len);

                var alarmTableBody = $("#alarmTableBody").html(rows);

    }

    // convert an alarm into an HTML tr element
    function alarmToRow(alarm){
        var checkValue = alarm.status ? "checked" : "unchecked";
        var row = 
        "<tr><td>"+"<input type='time' value='"+alarm.time+"' sid='"+alarm.id+"' onchange='clockApp.editTime(this)'>"+
        "</td><td>"+"<input type='text' value='"+alarm.description+"' sid='"+alarm.id+"' onchange='clockApp.editDes(this)'>"+
        "</td><td>"+"<input type='button'  sid='"+alarm.id+"' onclick='clockApp.handleDeletealarm(this)'>"+
        "</td><td>"+"<input type='checkbox' "+checkValue+" id='changestatus"+alarm.id+"' sid='"+alarm.id+"' onchange='clockApp.editstatus(this)'>"+
        "</td></tr>";
        return row;
    }
    



    

    

    
    clockView={
        refreshView: refreshView
    };
    
    return(clockView);
    
}(jQuery));
