// SD.Calendar
// version 1.0.0, build: 1
// © 2018 Sameera Perera
// damith.sameera1@gmail.com
//
// GitHub page:     https://github.com/sameeradamith/sd.calendar
//
// Released under MIT licence
// =============================================================================


(function(window) {

  var dayArray_en = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  var dayArray_si = ["ස", "අ", "බ", "බ්‍ර", "සි", "සෙ", "ඉ"];

  var monthArray_en = ["Jan", "feb", "Mar", "Apr", "May", "Jun", "Jui", "Aug", "Sep", "Oct", "Nov", "dec"];
  var monthArray_si = ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"];

  function sdCalander(sdYear, sdMonth) {

    var dateArray = new Array();

    // Get start date (mon, tue, wed,..., sun) => return 0-6
    var startDate = new Date(sdYear, sdMonth, 1);
    var setStartDate = startDate.getDay();

    //Get month length in days -> return 28-31
    var monthLength = new Date(sdYear, sdMonth + 1, 0);
    var setmonthLength = monthLength.getDate();

    // set previous month dates => 0
    switch (setStartDate) {
      case 2:
        for(var p = 1; p<2; p++) {
          dateArray.push(0);
        }
      break;
      case 3:
        for(var p = 1; p<3; p++) {
          dateArray.push(0);
        }
      break;
      case 4:
        for(var p = 1; p<4; p++) {
          dateArray.push(0);
        }
      break;
      case 5:
        for(var p = 1; p<5; p++) {
          dateArray.push(0);
        }
      break;
      case 6:
        for(var p = 1; p<6; p++) {
          dateArray.push(0);
        }
      break;
      case 0:
        for(var p = 1; p<7; p++) {
          dateArray.push(0);
        }
      break;
    }

    //set month dates
    for(var i = 1; i <= setmonthLength; i++ ){
      dateArray.push(i);
    }

    //set next month dates 0
    var arrayLength = dateArray.length;

    if(arrayLength < 42) {
      for(var t=0; t< (42-arrayLength); t++) {
          dateArray.push(0);
      }
    }

    //Call Templete Function
    sdTemplete(sdYear, sdMonth, dateArray);
  }

  // Main Templete Render Function
  function sdTemplete(sdYear, sdMonth, dateArray) {

    //get today date
    var sdDate = new Date();
    var todayDate = sdDate.getDate();

    var templeteHead = "<div class=\"sd-container\"> <div class=\"sd-title-bar\"> <span class=\"sd-inline-element sd-padding\">"+ sdYear + " " + monthVar[sdMonth] +" <\/span> <span class=\"sd-inline-element sd-padding sd-float-left sd-icon\" onClick=\"prevMonth("+ sdYear +", "+ sdMonth +")\"> < <\/span> <span class=\"sd-inline-element sd-padding sd-float-right sd-icon\" onClick=\"nextMonth("+ sdYear +", "+ sdMonth +")\"> > <\/span> <\/div> <table> <thead>";

    var templeteday = " <tr>";

    for(var s = 0; s < 7; s++) {
      templeteday += "<td>" + dayVar[s] + "</td>";
    }

    templeteday += "<\/tr> <\/thead><tbody>";

    var templeteBody = "<tr>";

    var t = 0;

    for(var y = 0; y < 6; y++) {

      while(t < 42) {
        // Next and Prev Month hightlight
        if(dateArray[t] === 0) {
          templeteBody += "<td class=\"sd-not-month\">" + dateArray[t] +"<\/td>";
        } else if(dateArray[t] === todayDate) {
          templeteBody += "<td class=\"sd-today\">" + dateArray[t] +"<\/td>";
        } else {
          templeteBody += "<td class=\"\">" + dateArray[t] +"<\/td>";
        }

          //Divide table into rows
          if( t === 6 || t === 13 || t === 20 ||  t === 27 || t === 34 || t === 41) {
              templeteBody += "</tr>";
          }
        t++;
      }
    }

    var templeteBody2 = "<\/tbody> <\/table> <\/div>";

    var templeteFull = templeteHead + templeteday + templeteBody + templeteBody2;

    document.getElementById('sdCalendar').innerHTML = templeteFull;


    //Change calander width
    document.getElementsByClassName('sd-container')[0].style.width = sd_width;
    document.getElementsByClassName('sd-container')[0].children[1].style.width = sd_width;
  }

  //Settings
  //language ( default language : Sinhala )
  var sd_lang = document.getElementById('sdCalendar').getAttribute("data-sd-lang") || "si";

  //width ( min-width : 275px)
  var sd_width = document.getElementById('sdCalendar').getAttribute("data-sd-width") > 275 ? document.getElementById('sdCalendar').getAttribute("data-sd-width")+"px" : "275px";

  var monthVar = "monthArray_"+sd_lang;
  var dayVar = "dayArray_"+sd_lang;

  //Get settings assiened language array
  if (sd_lang === "si"){
    monthVar = monthArray_si;
    dayVar = dayArray_si;
  } else {
    monthVar = monthArray_en;
    dayVar = dayArray_en;
  }

  //Get default Year and Month
  var date = new Date();
  var defaultYear = date.getFullYear();
  var defaultMonth = date.getMonth();

  sdCalander(defaultYear, defaultMonth);

  //Get Previous month
  window.prevMonth = function (currentYear, currentMonth) {
    if(currentMonth === 0) {
      sdCalander((currentYear - 1), 11);
    } else {
      sdCalander(currentYear, (currentMonth - 1));
    }
  }

  //Get Next month
  window.nextMonth = function (currentYear, currentMonth) {
    if(currentMonth === 11) {
      sdCalander((currentYear + 1), 0);
    } else {
      sdCalander(currentYear, (currentMonth + 1));
    }
  }

})(window);
