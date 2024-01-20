$(document).ready(function(){
    $("#currentDay").text(dayjs());
    setInterval(() => {
        $("#currentDay").text(dayjs());
    }, 1000);

    var timeBlocks = $(".container");
    for (var i = 9; i < 18; i++) {
        let hourDiv = $("<div>", {id: "hour-" + i, class: "row time-block align-items-center justify-content-evenly"});
        
        if (i < dayjs().hour()) {hourDiv.addClass("past");}
        else if (i === dayjs().hour()) {hourDiv.addClass("present");}
        else {hourDiv.addClass("future");}

        $('<div>', {
            text: i + ':00',
            class: 'hour col-1'
          }).appendTo(hourDiv);
        $('<div>', {
            class: 'content col-8'
          }).appendTo(hourDiv);
        $('<button>', {
            text: 'Save', 
            class: 'saveBtn col-1'
          }).appendTo(hourDiv);
        hourDiv.appendTo(timeBlocks);
        }
});    
