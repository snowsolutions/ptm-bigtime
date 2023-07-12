$(document).ready(function () {
    var runningTimer = true;
    var setupRunning = false;
    var timeInterval = setInterval(updateTime, 500);
    var safeHourInterval = null;
    var isInSafeHour = false;
    var startSafeHour = 2;
    var endSafeHour = 8;
    let testModal = $('.test-modal')

    //Init
    init();

    function init() {
        initSafeHour();
    }

    function updateTime() {
        let minute = document.getElementById("time-minute");
        let current = new Date();
        let min = current.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        minute.innerHTML = min;
    }

    function initSafeHour() {
        let safeHStart = $("#safe-hour-start .text-value");
        let safeHEnd = $("#safe-hour-end .text-value");
        safeHStart.text(startSafeHour);
        safeHEnd.text(endSafeHour);
        safeHourInterval = setInterval(updateSafeHour, 500);
    }

    function updateSafeHour() {
        let safeHour = $("#safe-status");
        let current = new Date();
        let curentHour = current.getHours();
        if (curentHour < 10) {
            curentHour = "0" + curentHour;
        }
        safeHour.text(curentHour);

        if (startSafeHour <= curentHour && curentHour <= endSafeHour) {
            console.log("in safe hour");
            isInSafeHour = true;
        } else {
            console.log("NOT in safe hour");
            isInSafeHour = false;
        }
        if (!isInSafeHour) {
            safeHour.removeClass("safe");
        } else {
            safeHour.addClass("safe");
        }
    }

    function hitCore() {
        let counter = $(".core-time span");
        let count = parseInt(counter.text());
        counter.text(count + 1);
    }

    function toggleTimer(e = null) {
        if (runningTimer) {
            clearInterval(timeInterval);
            timeInterval = null;
            runningTimer = false;
            if (e) {
                e.text("OFF");
            }
        } else {
            runningTimer = true;
            timeInterval = setInterval(updateTime, 500);
            if (e) {
                e.text("ON");
            }
        }
    }

    function setupTimer(e = null) {
        let toggleTimerE = $(".toggle-timer");
        toggleTimerE.toggleClass("off");
        let toggleText = toggleTimerE.find(".function-state");
        e.text("OFF");
        runningTimer = false;
        clearInterval(timeInterval);
        let start = 10;
        let minute = $("#time-minute");
        minute.text(start);
        let setupIntv = setInterval(function () {
            minute.text(start);
            if (start == 60) {
                clearInterval(setupIntv);
                toggleTimer(toggleText);
                toggleTimerE.toggleClass("off");
            }
            start++;
        }, 3000);
    }

    $(".hit-core").click(function () {
        hitCore();
    });

    $(".toggle-timer").click(function () {
        let _this = $(this);
        let e = _this.find(".function-state");
        toggleTimer(e);
    });
    $(".setup-timer").click(function () {
        let _this = $(this);
        let e = $(".toggle-timer .function-state");
        setupTimer(e);
    });
    $(".toggle").click(function () {
        let _this = $(this);
        _this.toggleClass("off");
    });

    $(".set-safe-hour").click(function () {
        startSafeHour = $("#safe-hour-start input").val();
        endSafeHour = $("#safe-hour-end input").val();
        let safeHStart = $("#safe-hour-start .text-value");
        let safeHEnd = $("#safe-hour-end .text-value");
        safeHStart.text(startSafeHour);
        safeHEnd.text(endSafeHour);
        clearInterval(safeHourInterval);
        initSafeHour();
    });
    $(".test-macro").click(function () {
        let _this = $(this);
        _this.toggleClass('green')
        testModal.toggleClass('hide')
    });
    $('.test-modal .check-list-item').click(function () {
        $(this).toggleClass('checked')
    })
});