var todayYear = document.getElementById("todayYear");
var todayMonth = document.getElementById("todayMonth");
var today = document.getElementById("daysofMonth");
var displayActivities = document.getElementById("displayActivities")
var todayDate  = document.getElementById("date");

var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var thirtydayMonth= ['Apr', 'Jun', 'Sep', 'Nov'];
var thirtyonedayMonth = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec']

var date = new Date();
var y = date.getFullYear();
var day = date.getDate();
var m = shortMonth (date.getMonth());

for (var key in sessionStorage) {
      console.log(key + ':' + sessionStorage[key]);
    }
if (sessionStorage.length>0) {
    for (var key in sessionStorage) {
          console.log(key + ':' + sessionStorage[key]);
        }
    document.getElementById("todayYear").value = sessionStorage.getItem("y");
    document.getElementById("todayMonth").value = sessionStorage.getItem("m");
    document.getElementById("daysofMonth").value = sessionStorage.getItem("d");
    // sessionStorage.removeItem("y")
    // sessionStorage.removeItem("m")
    // sessionStorage.removeItem("d")
} else {
    document.getElementById("todayYear").value = y;
    document.getElementById("todayMonth").value = m;
    document.getElementById("daysofMonth").value = day;
} 

function shortMonth (m) {
return shortMonths[m]
}


function savingDate(){
    if (typeof(Storage) !== "undefined") {
    // Store
        sessionStorage.setItem("y", document.getElementById("todayYear").value);
        sessionStorage.setItem("m", document.getElementById("todayMonth").value);
        sessionStorage.setItem("d", document.getElementById("daysofMonth").value);
    }
}

function getDate() {
    //getting the date today and displaying it
    todayDate.innerHTML = m + " " + day + ", " + y;
    //validating number of days according to month
    if (thirtydayMonth.includes(m)) {
        today.options[30].disabled = true;
        today.options[29].disabled = false;
        today.options[28].disabled = false;
    } else if (thirtyonedayMonth.includes(m)) {
        today.options[30].disabled = false;
        today.options[29].disabled = false;
        today.options[28].disabled = false;
    } else if (m=='Feb') {
        if (leapYear(y)){
            today.options[30].disabled = true;
            today.options[29].disabled = true;
        } else {
            today.options[30].disabled = true;``
            today.options[29].disabled = true;
            today.options[28].disabled = true;
        }
    }
}

function shortMonth (m) {
    return shortMonths[m]
}

function leapYear(y) {
  return ((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0);
}

todayMonth.addEventListener("change", function(){
    var selMonth = todayMonth.options[todayMonth.selectedIndex];
    if (thirtydayMonth.includes(this.value)) {
        today.options[30].disabled = true;
        today.options[29].disabled = false;
        today.options[28].disabled = false;
    } else if (thirtyonedayMonth.includes(this.value)) {
        today.options[30].disabled = false;
        today.options[29].disabled = false;
        today.options[28].disabled = false;
    } else if (this.value=='Feb') {
        if (leapYear(y)){
            today.options[30].disabled = true;
            today.options[29].disabled = true;
            today.options[28].disabled = true;
        } else {
            today.options[30].disabled = true;
            today.options[29].disabled = true;
            today.options[28].disabled = false;
        }
    }
})    