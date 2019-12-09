var captureTime = document.getElementById("txt");
var table = document.getElementById("table");
var formTable = document.getElementById("formTable");
var x = true


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    captureTime.innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

captureTime.addEventListener("click", function(){
    var y = true
    if (x){
        console.log(x)
        var row = document.createElement("tr");
        // row.style.width = auto;
        for (var i=0; i<3; i++) {
            var cell = document.createElement("td");
            cell.style.height = "100px"
            cell.style.width = "25rem"
            // cell.style.position = "relative"
            // cell.style.border = "1px solid black";
            row.appendChild(cell);
            if (cell.cellIndex==0) {
                var div1 = document.createElement("div")
                var input1 = document.createElement("input")
                input1.setAttribute("form", "formTable")
                input1.setAttribute("type", "hidden")
                input1.setAttribute("name", "startTime")
                input1.required = 'true';
                var capture = captureTime.innerHTML
                input1.setAttribute("value", capture)
                formTable.appendChild(input1);
                div1.innerHTML = input1.value
                div1.appendChild(input1)
                cell.appendChild(div1)
            } else if (cell.cellIndex ==1) {
                this.classList.add("hovering")
                cell.addEventListener("click", function(){
                    // this.innerHTML = captureTime.innerHTML+ '<input form="formTable" type="hidden" name="endTime"/>';
                    if (y) {
                    var div3 = document.createElement("div")
                    var input3 = document.createElement("input")
                    input3.setAttribute("form", "formTable")
                    input3.setAttribute("type", "hidden")
                    input3.setAttribute("name", "endTime")
                    input3.required = 'true';
                    var capture3 = captureTime.innerHTML
                    input3.setAttribute("value", capture3)
                    formTable.appendChild(input3);
                    div3.innerHTML = input3.value
                    div3.appendChild(input3)
                    row.cells[1].appendChild(div3)
                    y=false;
                    timeDifference(row, capture, capture3);
                    return
                    }
                })
            } else if (i==2){
                // cell.classList.add("hovering")
                var input = document.createElement("input");
                input.classList.add("hovering")
                input.type = "text";
                input.style.height = "100px"
                input.style.width = "auto"
                input.style.border = "none"
                input.setAttribute("form", "formTable")
                input.setAttribute("type", "text")
                input.setAttribute("name", "task")
                // var delButton = document.createElement("button");
                // delButton.type = "button"
                // delButton.style.float= "right-center";
                // delButton.classList.add("btn")
                // delButton.classList.add("btn-danger")
                // delButton.innerHTML = "Delete";
                row.appendChild(input);
                // row.appendChild(delButton);
            } 
        }
        x = false;
        table.appendChild(row);
    }
    y=true;
})

function timeDifference (row, capture, capture3) {
    var endtimeSeconds = capture3.split(":");
    // console.log("we are here -------" + endtimeSeconds);
    endtimeSeconds = (endtimeSeconds[0] * 3600) + (endtimeSeconds[1] * 60) + parseInt(endtimeSeconds[2]); 
    var starttimeSeconds = capture.split(":")
    starttimeSeconds = (starttimeSeconds[0] * 3600) + (starttimeSeconds[1] * 60) + parseInt(starttimeSeconds[2]);
    var timeDifference = endtimeSeconds - starttimeSeconds;
    var hh = Math.floor(timeDifference/3600);
    var r1 = (timeDifference/3600) - hh;
    var mm = Math.floor(r1 * 60);
    var r2 = (r1* 60) - mm;
    var ss = r2 * 60;
    ss = Math.round(ss); 
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);
    
    var div2 = document.createElement("div")
    var input2 = document.createElement("input")
    input2.setAttribute("form", "formTable")
    input2.setAttribute("type", "hidden")
    input2.setAttribute("name", "timeDifference")
    input2.required = 'true';
    var capture2 = hh + ":" + mm + ":" + ss;
    input2.setAttribute("value", capture2)
    formTable.appendChild(input2);
    div2.innerHTML = input2.value
    div2.appendChild(input2)
    row.cells[2].appendChild(div2)
    x= true;
}
