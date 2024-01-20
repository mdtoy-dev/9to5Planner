function createTimeBlock(id, timeClass, text) {
    var timeBlock = $("<div>", { id: id, class: "row time-block align-items-center justify-content-evenly " + timeClass });

    $('<div>', {
        text: text,
        class: 'hour col-2',
    }).appendTo(timeBlock);

    $('<div>', {
        class: 'content col-8',
    }).appendTo(timeBlock);

    $('<button>', {
        text: 'Save',
        class: 'saveBtn col-2',
    }).appendTo(timeBlock);

    return timeBlock;
}

$(document).ready(function () {
    $("#currentDay").text(dayjs());

    setInterval(() => {
        $("#currentDay").text(dayjs());
        }, 1000);
    

    var timeBlocks = $(".container");

    // Get existing values from localStorage and create time blocks
    for (var i = 9; i < 18; i++) {
        var id = "hour-" + i;
        var timeClass = i < dayjs().hour() ? "past" : i === dayjs().hour() ? "present" : "future";

        var timeBlock = createTimeBlock(id, timeClass, i + ':00');
        timeBlock.appendTo(timeBlocks);

        var value = localStorage.getItem(id);

        if (value) {
            var textarea = $("<textarea>", {
                class: "form-control form-control-sm",
                rows: 3,
                val: value,
                id: id,
            });
            textarea.appendTo(timeBlock.find(".content"));
        }
    }

    // create textarea
    $(".row").on("click", function () {
        var content = $(this).find(".content");
        var textarea = content.find("textarea");

        if (!textarea.length) {
            var id = $(this).attr("id");
            textarea = $("<textarea>", {
                class: "form-control form-control-sm",
                rows: 3,
                id: id,
            });
            textarea.appendTo(content);
        }

        // save button
        $(this).find(".saveBtn").on("click", function () {
            var value = textarea.val();
            if (value.trim() !== "") {
                localStorage.setItem(textarea.attr("id"), value);
            } else {
                alert("Invalid input. Please enter a valid value.");
            }
        });
    });
});
