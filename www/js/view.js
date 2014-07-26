
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

    function dotime(){ 
      dg0 = new Image();dg0.src = "dg0.gif";
      dg1 = new Image();dg1.src = "dg1.gif";
      dg2 = new Image();dg2.src = "dg2.gif";
      dg3 = new Image();dg3.src = "dg3.gif";
      dg4 = new Image();dg4.src = "dg4.gif";
      dg5 = new Image();dg5.src = "dg5.gif";
      dg6 = new Image();dg6.src = "dg6.gif";
      dg7 = new Image();dg7.src = "dg7.gif";
      dg8 = new Image();dg8.src = "dg8.gif";
      dg9 = new Image();dg9.src = "dg9.gif";
      dgam= new Image();dgam.src= "dgam.gif";
      dgpm= new Image();dgpm.src= "dgpm.gif";
      dgc = new Image();dgc.src = "dgc.gif";
      theTime=setTimeout('dotime()',1000);
      d = new Date();
      hr= d.getHours()+100;
      mn= d.getMinutes()+100;
      se= d.getSeconds()+100;
      if(hr==100){hr=112;am_pm='am';}
      else if(hr<112){am_pm='am';}
      else if(hr==112){am_pm='pm';}
      else if(hr>112){am_pm='pm';hr=(hr-12);}
      tot=''+hr+mn+se;
      document.hr1.src = 'dg'+tot.substring(1,2)+'.gif';
      document.hr2.src = 'dg'+tot.substring(2,3)+'.gif';
      document.mn1.src = 'dg'+tot.substring(4,5)+'.gif';
      document.mn2.src = 'dg'+tot.substring(5,6)+'.gif';
      document.se1.src = 'dg'+tot.substring(7,8)+'.gif';
      document.se2.src = 'dg'+tot.substring(8,9)+'.gif';
      document.ampm.src= 'dg'+am_pm+'.gif';
    }




    function filteralarms(alarms){
      var n;
      var alarm;
      var newalarms=[];
      var showon = $("#showon").prop("checked");
      // var cutoff = $("#cutOffText").val() || 0;
      // var wasPurchased;
      for(n=0; n<alarms.length; n++){
        alarm = alarms[n];
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
      "</td><td>"+ "<input type='checkbox' "+checkValue+" id='changestatus"+alarm.id+"' sid='"+alarm.id+"' onchange='clockApp.editstatus(this)'>"+
      "</td><td>"+"<input type='text' value='"+alarm.description+"' sid='"+alarm.id+"' onchange='clockApp.editDes(this)'>"+
      "</td><td>"+"<input type='button'  sid='"+alarm.id+"' onclick='clockApp.handleDeletealarm(this)'>"+
      "</td></tr>";
      return row;
    }

    clockView={
      refreshView: refreshView
    };

    return(clockView);
  }(jQuery));
