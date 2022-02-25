"use strict";

function createClock(r) {
    const divClock = document.getElementById('divClock'),
        clockRadius = r,
        clockCenterX = 250,
        clockCenterY = 250,
        clockNumberRadius = clockRadius * 0.15,
        radius = clockRadius * 0.8,
        clock = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

    clock.setAttribute('fill', '#dbc81db7');
    clock.setAttribute('r', clockRadius);
    clock.setAttribute('cx', clockCenterX);
    clock.setAttribute('cy', clockCenterY);
    divClock.append(clock);

    let count = 0;
    function posNumber() {
        for (let i = 30; i <= 360; i = i + 30) {
            let clockNumber = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
                clockNumberText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
                angle = i / 180 * Math.PI,
                clockNumberCenterX = clockCenterX + radius * Math.sin(angle),
                clockNumberCenterY = clockCenterY - radius * Math.cos(angle),
                cx = Math.round(clockNumberCenterX),
                cy = Math.round(clockNumberCenterY);

            clockNumber.setAttribute('cx', cx);
            clockNumber.setAttribute('cy', cy);
            clockNumber.setAttribute('fill', 'rgb(31, 172, 31)');
            clockNumber.setAttribute('r', clockNumberRadius);
            divClock.append(clockNumber);

            clockNumberText.setAttribute('x', cx);
            clockNumberText.setAttribute('y', cy + clockRadius * 0.08 / 2);
            clockNumberText.setAttribute('text-anchor', "middle");
            clockNumberText.style.fill = "black";
            clockNumberText.setAttribute("font-size", clockRadius * 0.08 * 2);
            clockNumberText.textContent = ++count;
            divClock.append(clockNumberText);
        }
    }
    function createArrows(viewArrow, height, width, color) {
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        arrow.setAttribute('id', viewArrow);
        arrow.setAttribute('x', clockCenterX - width / 2);
        arrow.setAttribute('y', clockCenterY - height + height * 0.1);
        arrow.setAttribute('rx', 20);
        arrow.setAttribute('ry', 20);
        arrow.setAttribute('height', height);
        arrow.setAttribute('width', width);
        arrow.setAttribute('fill', color);
        divClock.append(arrow);
    }
    posNumber();

    const paramsArrows = [
        {
            arrow: "second",
            length: clockRadius * 0.8,
            width: clockRadius * 2 * 0.005,
            color: "red"
        },
        {
            arrow: "minute",
            length: clockRadius * 0.6,
            width: clockRadius * 2 * 0.015,
            color: "black"
        },
        {
            arrow: "hour",
            length: clockRadius * 0.4,
            width: clockRadius * 2 * 0.025,
            color: "black"
        }

    ];

    paramsArrows.forEach(item => {
        createArrows(
            item.arrow,
            item.length,
            item.width,
            item.color
        );
    });

    setTimeout(updateTime, 0);
    function updateTime() {
        let currTime = new Date(),
            second = currTime.getSeconds(),
            minute = currTime.getMinutes(),
            hour = currTime.getHours(),
            positionHourArrow = hour * 30 + (minute * 60 + second) * (1 / 120);

        const secondArrow = document.getElementById('second'),
            minuteArrow = document.getElementById('minute'),
            hourArrow = document.getElementById('hour');

        secondArrow.setAttribute('transform', 'rotate(' + second * 6 + ' ' + clockCenterX + ' ' + clockCenterY + ' )');
        minuteArrow.setAttribute('transform', 'rotate(' + minute * 6 + ' ' + clockCenterX + ' ' + clockCenterY + ' )');
        hourArrow.setAttribute('transform', 'rotate(' + positionHourArrow + ' ' + clockCenterX + ' ' + clockCenterY + ' )');
        
        setTimeout(updateTime, 1000);
    }
}

createClock(250);