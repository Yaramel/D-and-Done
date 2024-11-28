// StreamElements v1.1.6
const completeOrb = document.getElementById("complete-orb");

const textsDiv = document.getElementById("texts");
const goalCounter = document.getElementById("goal-counter");
const goalTitleDiv = document.getElementById("goal-title-div");
const goalTitle = document.getElementById("goal-title");

const glassDiv = document.getElementById("glass-container");
const glass = document.getElementById("glass");
const glowMask = document.getElementById("glow-mask");
const glassBackground = document.getElementById("cls-liquid");

const liquidDiv = document.getElementById("liquid-container");
const wave = document.getElementById("wave");
const waveBack = document.getElementById("wave-back");
const liquidMask = document.getElementById("liquid-mask");

const liquid = document.getElementById("liquid");

const onEventVideo = document.getElementById("on-event-video");
const reachVideo = document.getElementById("reach-video");

const videoDivReach = document.getElementById("video-div-reach");
const videoDivEvent = document.getElementById("video-div-event");

let state = 0;

let fieldData;
let reached;
let listener;
let count = 0;

let detail;

window.addEventListener('onWidgetLoad', function (obj) {

    reached = false;

    let data = obj.detail.session.data;
    detail = obj.detail;
    fieldData = obj.detail.fieldData;

    data[fieldData.eventType]["amount"] = 0;

    state = fieldData.goalTotal;

    if (fieldData.defaultDesignOn) {
        defaultDesign();
    }

    if (fieldData.titleOn == "off") {
        goalCounter.style.top = "calc(44% + (96 - 36)*0.07%)";
    }

    selectShape();
    drawWaves();
    updateGoalTitle(fieldData.titleText);
    progress(data, fieldData, detail);

    if (fieldData.eventOn == "on") {
        onEventVideo.pause();
    }
});

window.addEventListener('onEventReceived', function (obj) {

    listener = obj.detail.listener;
    let eventType = fieldData.eventType;
    detail = obj.detail.event;
    data = obj.detail;

    if (detail.bulkGifted != true) {
        if (listener == eventType) {
            progress2(data, fieldData, detail);
        }

        if (listener == eventType) {
            if (fieldData.eventOn == "on") {
                if (onEventVideo.style.opacity != 1) {
                    eventAnimation();
                }
            }
        }
    }
});
/*
window.addEventListener('onSessionUpdate', function (obj) {
  let data = obj.detail.session;

detail = obj.detail.event;
  let eventType = fieldData.eventType;

  if (listener == eventType) {
    progress(data, fieldData, detail);
  }
});
*/
let progress = (data, fieldData, detail) => {

    let eventType = fieldData.eventType;

    console.log("OI " + detail.bulkGifted);

    if (data[fieldData.eventType]["amount"] == null || fieldData.countOne == "on") {

        let goalPer = 100 * (count + fieldData.initialValue) / state;

        if (detail.bulkGifted != true) {
            count += 1;
        }

        if (fieldData.pastCount == "off") {
            if (goalPer >= 100) {
                goalPer = 100;
            }
        }
        if (detail.bulkGifted != true) {
            updateCounter(goalPer * fieldData.goalTotal / 100);
        }
        if (goalPer >= 100) {
            goalPer = 100;
        }

        if (detail.bulkGifted != true) {
            updateMask(goalPer, 1500);
        }


        if (fieldData.reachOn == "on" && goalPer == 100) {
            reachAnimation();
        }
    }
    else if (listener != "subscriber-gifted-latest") {
        if (detail.bulkGifted != true) {
            count += data[eventType]["amount"];
        }

        let goalPer = 100 * (count + fieldData.initialValue) / state;

        if (fieldData.pastCount == "off") {
            if (goalPer >= 100) {
                goalPer = 100;
            }
        }
        if (detail.bulkGifted != true) {
            updateCounter(goalPer * fieldData.goalTotal / 100);
        }
        if (goalPer >= 100) {
            goalPer = 100;
        }
        if (detail.bulkGifted != true) {
            updateMask(goalPer, 1500);
        }

        if (fieldData.reachOn == "on" && goalPer == 100) {
            reachAnimation();
        }
    }


};

let progress2 = (data, fieldData, detail) => {

    let eventType = fieldData.eventType;

    console.log("OI " + detail.bulkGifted);

    if (data["event"]["amount"] == null || fieldData.countOne == "on") {

        let goalPer = 100 * (count + fieldData.initialValue) / state;

        if (detail.bulkGifted != true) {
            count += 1;
        }

        if (fieldData.pastCount == "off") {
            if (goalPer >= 100) {
                goalPer = 100;
            }
        }

        updateCounter(goalPer * fieldData.goalTotal / 100);

        if (goalPer >= 100) {
            goalPer = 100;
        }


        updateMask(goalPer, 1500);



        if (fieldData.reachOn == "on" && goalPer == 100) {
            reachAnimation();
        }
    }
    else if (listener != "subscriber-gifted-latest") {
        if (detail.bulkGifted != true) {
            count += data["event"]["amount"];
        }

        let goalPer = 100 * (count + fieldData.initialValue) / state;

        if (fieldData.pastCount == "off") {
            if (goalPer >= 100) {
                goalPer = 100;
            }
        }

        updateCounter(goalPer * fieldData.goalTotal / 100);

        if (goalPer >= 100) {
            goalPer = 100;
        }
        updateMask(goalPer, 1500);


        if (fieldData.reachOn == "on" && goalPer == 100) {
            reachAnimation();
        }
    }


};


//==========================================================================================FUNCTIONS=================================================================================================================================
//==========================================================================================FUNCTIONS=================================================================================================================================
//==========================================================================================FUNCTIONS=================================================================================================================================



function eventAnimation() {

    onEventVideo.style.opacity = 1;

    videoDivEvent.style.filter = "hue-rotate(" + (fieldData.animationHue) + "deg) saturate(" + fieldData.animationSaturation + ") brightness(" + fieldData.animationBrightness + ")";

    if (fieldData.eventVideo == "particles") {
        onEventVideo.setAttribute('src', fieldData.eventVidOrb);
        onEventVideo.pause();
    }
    else if (fieldData.eventVideo == "stars") {
        onEventVideo.setAttribute('src', fieldData.eventVidStar);
        onEventVideo.pause();

    }
    else if (fieldData.eventVideo == "hearts") {
        onEventVideo.setAttribute('src', fieldData.eventVidHeart);
        onEventVideo.pause();
    }
    else if (fieldData.eventVideo == "moons") {
        onEventVideo.setAttribute('src', fieldData.eventVidMoon);
        onEventVideo.pause();
    }
    else if (fieldData.eventVideo == "bits") {
        onEventVideo.setAttribute('src', fieldData.eventVidBit);
        onEventVideo.pause();
    }
    else if (fieldData.eventVideo == "dollars") {
        onEventVideo.setAttribute('src', fieldData.eventVidDollar);
        onEventVideo.pause();
    }

    onEventVideo.currentTime = 0;
    onEventVideo.play();

    setTimeout(function () { onEventVideo.style.opacity = 0.99; }, 2500);

}

function reachAnimation() {

    if (!reached) {

        if (fieldData.reachTitleOn == "on") {
            goalTitle.textContent = fieldData.reachTitleText;
        }

        videoDivReach.style.filter = "hue-rotate(" + (fieldData.animationHue) + "deg) saturate(" + fieldData.animationSaturation + ") brightness(" + fieldData.animationBrightness + ")";

        if (fieldData.eventVideo == "particles") {
            reachVideo.setAttribute('src', fieldData.reachVidOrb);
            reachVideo.pause();
            reachVideo.currentTime = 0;
            reachVideo.play();
        }
        else if (fieldData.eventVideo == "stars") {
            reachVideo.setAttribute('src', fieldData.reachVidStar);
            reachVideo.pause();
            reachVideo.currentTime = 0;
            reachVideo.play();
        }
        else if (fieldData.eventVideo == "hearts") {
            reachVideo.setAttribute('src', fieldData.reachVidHeart);
            reachVideo.pause();
            reachVideo.currentTime = 0;
            reachVideo.play();
        }
        else if (fieldData.eventVideo == "moons") {
            reachVideo.setAttribute('src', fieldData.reachVidMoon);
            reachVideo.pause();
            reachVideo.currentTime = 0;
            reachVideo.play();
        }
        else if (fieldData.eventVideo == "bits") {
            reachVideo.setAttribute('src', fieldData.reachVidBit);
            reachVideo.pause();
            reachVideo.currentTime = 0;
            reachVideo.play();
        }
        else if (fieldData.eventVideo == "dollars") {
            reachVideo.setAttribute('src', fieldData.reachVidDollar);
            reachVideo.pause();
            reachVideo.currentTime = 0;
            reachVideo.play();
        }
        reached = true;
    }

}

function updateCounter(goalPer) {
    if (fieldData.showCents) {
        if (fieldData.eventType == "tip-latest") {
            goalCounter.textContent = "$" + goalPer.toFixed(2) + " / $" + fieldData.goalTotal.toFixed(2);
        }
        else {
            goalCounter.textContent = goalPer + " / " + fieldData.goalTotal;
        }
    }
    else {
        if (fieldData.eventType == "tip-latest") {
            goalCounter.textContent = "$" + goalPer.toFixed(0) + " / $" + fieldData.goalTotal.toFixed(0);
        }
        else {
            goalCounter.textContent = goalPer.toFixed(0) + " / " + fieldData.goalTotal;
        }
    }
}

function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function updateMask(delta, duration) {

    var trueDelta = delta;

    if (fieldData.glassShape == "orb") {
        var dif = 0;
        var displace = 505 - dif;
        var ratio = 5.17;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }
    else if (fieldData.glassShape == "star") {
        var dif = 135;
        var displace = 500 + dif;
        var ratio = 5.15;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }
    else if (fieldData.glassShape == "heart") {
        var dif = 135;
        var displace = 472 + dif;
        var ratio = 4.5;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }

    else if (fieldData.glassShape == "moon") {
        var dif = 135.36;
        var displace = 505.4 + dif;
        var ratio = 5.14;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }

    else if (fieldData.glassShape == "cheer") {
        var dif = 136.17;
        var displace = 500 + dif;
        var ratio = 4.99;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }

    else if (fieldData.glassShape == "donation") {
        var dif = 140.17;
        var displace = 495 + dif;
        var ratio = 5.2;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }
  
      else if (fieldData.glassShape == "duck") {
        var dif = 140.17;
        var displace = 495 + dif;
        var ratio = 5.2;
        var newLY = trueDelta * ratio - displace + dif;
        var newMY = trueDelta * ratio - displace;

        videoDivReach.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";
        videoDivEvent.style.transform = "translate(-50%, -80%) scale(0.8, 0.8)";

    }

    var liquidElement = document.getElementById('liquid');

    if (fieldData.glassShape == "donation" || fieldData.glassShape == "moon") {
        var maskElement = document.getElementById('group-mask');
    }
    else {
        var maskElement = document.getElementById('cls-liquid-mask');
    }

    var viewBoxValue = liquidElement.getAttribute('viewBox');
    var viewBoxArray = viewBoxValue.split(' ');

    var startLY = parseFloat(viewBoxArray[1]);
    var startMY = parseFloat(maskElement.getAttribute('transform').split(" ")[1].replace(")", ""));
    var startMX = parseFloat(maskElement.getAttribute('transform').split("(")[1].split(" ")[0]);

    var deltaLY = newLY - startLY;
    var deltaMY = newMY - startMY;

    var startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;
        var progressRatio = progress / duration;

        if (progressRatio < 1) {
            var easedProgress = easeInOut(progressRatio);

            var newLYPos = startLY + deltaLY * easedProgress;
            var newMYPos = startMY + deltaMY * easedProgress;

            viewBoxArray[1] = newLYPos.toString();
            liquidElement.setAttribute('viewBox', viewBoxArray.join(' '));

            var newTransform = "translate(" + (startMX) + " " + newMYPos + ")";
            maskElement.setAttribute('transform', newTransform);

            requestAnimationFrame(animate);
        } else {
            //liquidElement.setAttribute('viewBox', viewBoxArray.join(' '));
            //maskElement.setAttribute('transform', "translate(" + startMX + " " + newMYPos + ")");
        }
    }
    requestAnimationFrame(animate);
}

function updateGoalTitle(newTitle) {

    if (fieldData.floatOn == "on") {
        completeOrb.style.animation = "float 4s";
        completeOrb.style.animationTimingFunction = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";
        completeOrb.style.animationIterationCount = "infinite";
    }

    goalTitle.textContent = newTitle;

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var fontSizeRescale = windowHeight / 1400;

    goalTitle.style.fontSize = fieldData.titleSize * fontSizeRescale + "px";
    goalTitle.style.fontFamily = fieldData.titleFont + ", sans-serif";
    goalTitle.style.color = fieldData.titleColor;

    goalCounter.style.fontSize = fieldData.counterSize * fontSizeRescale + "px";
    goalCounter.style.fontFamily = fieldData.titleFont + ", sans-serif";
    goalCounter.style.color = fieldData.titleColor;

    if (fieldData.titleOn == "off" && fieldData.counterOn == "off") {
        return;
    }

    if (fieldData.titleOn == "on") {
        goalTitle.style.opacity = "1";
    }
    else {
        goalTitle.textContent = "";
        goalCounter.style.transform = "translate(-50%, " + (17 - 96 / 70 + fieldData.counterSize / 20) + "%)";

    }

    if (fieldData.counterOn == "on") {
        goalCounter.style.opacity = "1";
    }

    if (fieldData.titleGlowOn == "on") {
        textsDiv.style.filter = "drop-shadow(0 0 5px " + fieldData.titleGlow + ")";
    }

    if (fieldData.titlePos == "top") {

        glassDiv.style.left = "50%";
        glassDiv.style.transform = "translate(-50%, -40%)";

        liquidDiv.style.left = "50%";
        liquidDiv.style.transform = "translate(-50%, -40%)";

        textsDiv.style.top = "calc(50% - 12%)";
        textsDiv.style.textAlign = 'center';

        if (fieldData.counterOn == "on") {

            textsDiv.style.transform = "translate(-50%, -92%)";
        }
        else {

            textsDiv.style.transform = "translate(-50%, -83%)";
        }
        if (fieldData.titleOn == "off") {
            goalCounter.style.top = "calc(44% + 60)*0.07%)";
        }

    }

    if (fieldData.titlePos == "bottom") {

        textsDiv.style.top = "calc(31% + 18%)";
        textsDiv.style.transform = "translate(-50%, -50%)";

        textsDiv.style.textAlign = 'center';

        completeOrb.style.left = "50%";
        completeOrb.style.transform = "translate(-50%, -50%)";

        if (fieldData.titleOn == "off") {
            goalCounter.style.top = "calc(44% + 60)*0.07%)";
            goalCounter.style.transform = "translate(-50%, 5%)";
        }

    }

    if (fieldData.titlePos == "right") {

        textsDiv.style.textAlign = "left";
        textsDiv.style.left = "25%";

        textsDiv.style.top = "50%";

        goalTitle.style.width = "100%";
        goalCounter.style.width = "100%";

        goalTitle.style.left = "66.5%";
        goalCounter.style.left = "66.5%";

        completeOrb.style.left = "50%";
        completeOrb.style.transform = "translate( -100%, -50% )";

        if (fieldData.counterOn == "on") {
            textsDiv.style.transform = "translate( 12%, -78.5% )";
        }
        else {
            textsDiv.style.transform = "translate( 12%, -75% )";
        }

        if (fieldData.titleOn == "off") {
            goalCounter.style.top = "calc(104%)*0.07%)";
            goalCounter.style.transform = "translate(-50%, 13%)";
        }

    }

    if (fieldData.titlePos == "left") {

        textsDiv.style.textAlign = "right";
        textsDiv.style.left = "-3%";

        textsDiv.style.top = "50%";

        goalTitle.style.width = "100%";
        goalCounter.style.width = "100%";

        completeOrb.style.left = "50%";
        completeOrb.style.transform = "translate(12%, -50%)";

        if (fieldData.counterOn == "on") {
            textsDiv.style.transform = "translate(-48%, -78.5%)";
        }
        else {
            textsDiv.style.transform = "translate(-48%, -75%)";
        }

        if (fieldData.titleOn == "off") {
            goalCounter.style.top = "calc(44% + 60)*0.07%)";
            goalCounter.style.transform = "translate(-50%, 13%)";
        }

    }
}

function drawWaves() {

    var waveLength = 950;
    var actualWaveLength = 1000;
    var waveAmplitude = 25;
    var wavePhase = 3.0 / 2;
    var heightOff = 15;
    var waveDuration = 3;

    let yPos = -480;



    var svgCode = '<svg id="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 150 ' + actualWaveLength + ' 100">';
    svgCode += '<defs>';
    svgCode += '<linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="50%">';
    svgCode += '<stop offset="0%" style="stop-color:' + fieldData.waveFill + '" />';
    svgCode += '<stop offset="100%" style="stop-color:' + fieldData.waveFill2 + '" /></linearGradient>';
    svgCode += '</defs>';
    svgCode += '<path fill="url(#waveGradient)" fill-opacity="1" >';
    svgCode += '<animateTransform attributeName="transform" attributeType="XML" type="translate" ';
    svgCode += 'from="0 ' + (-1) * (yPos - heightOff) + '" to="' + waveLength + '  ' + (-1) * (yPos - heightOff) + '" dur="' + waveDuration + 's" repeatCount="indefinite" />';
    svgCode += '<animate attributeName="d" repeatCount="indefinite" dur="' + waveDuration + 's" values="';

    var path = 'M0,100 ';
    for (var i = 0; i < waveLength; i++) {
        var y = waveAmplitude * Math.sin(wavePhase + 2 * Math.PI * i / waveLength);
        path += 'L' + i + ',' + (-750 + y) + ' ';
    }
    path += 'L' + waveLength + ',800 L0,800 Z";';
    svgCode += path;
    svgCode += '"/>';
    svgCode += '</path>';

    svgCode += '<path fill="url(#waveGradient)" fill-opacity="1" >';
    svgCode += '<animateTransform attributeName="transform" attributeType="XML" type="translate" ';
    svgCode += 'from="-' + waveLength + '  ' + (-1) * (yPos - heightOff) + '" to="2  ' + (-1) * (yPos - heightOff) + '" dur="' + waveDuration + 's" repeatCount="indefinite" />';
    svgCode += '<animate attributeName="d" repeatCount="indefinite" dur="' + waveDuration + 's" values="';

    var path2 = 'M0,100 ';
    for (var j = 0; j <= waveLength + 3; j++) {
        var y2 = waveAmplitude * Math.sin(wavePhase + 2 * Math.PI * (j - waveLength) / waveLength);
        path2 += 'L' + j + ',' + (-750 + y2) + ' ';
    }
    path2 += 'L' + waveLength + ',800 L0,800 Z";';
    svgCode += path2;
    svgCode += '"/>';
    svgCode += '</path></svg>';

    wave.innerHTML = svgCode;

    var svgCode2 = '<svg id="wave-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 150 ' + actualWaveLength + ' 100" >';
    svgCode2 += '<path fill="' + fieldData.waveBack + '" fill-opacity="1" >';
    svgCode2 += '<animateTransform attributeName="transform" attributeType="XML" type="translate" ';
    svgCode2 += 'from="' + waveLength + '  ' + (-1) * (yPos) + '" to="0  ' + (-1) * (yPos) + '" dur="' + waveDuration + 's" repeatCount="indefinite" />';
    svgCode2 += '<animate attributeName="d" repeatCount="indefinite" dur="' + waveDuration + 's" values="';

    var path3 = 'M0,100 ';
    for (var i = 0; i < waveLength; i++) {
        var y = waveAmplitude * Math.cos(2 * Math.PI * i / waveLength);
        path3 += 'L' + i + ',' + (-750 + y) + ' ';
    }
    path3 += 'L' + waveLength + ',800 L0,800 Z";';
    svgCode2 += path3;
    svgCode2 += '"/>';
    svgCode2 += '</path>';

    svgCode2 += '<path fill="' + fieldData.waveBack + '" fill-opacity="1" >';
    svgCode2 += '<animateTransform attributeName="transform" attributeType="XML" type="translate" ';
    svgCode2 += 'from="0  ' + (-1) * (yPos) + '" to="-' + waveLength + '  ' + (-1) * (yPos) + '" dur="' + waveDuration + 's" repeatCount="indefinite" />';
    svgCode2 += '<animate attributeName="d" repeatCount="indefinite" dur="' + waveDuration + 's" values="';

    var path4 = 'M0,100 ';
    for (var j = 0; j <= waveLength + 3; j++) {
        var y2 = waveAmplitude * Math.cos(2 * Math.PI * (j - waveLength) / waveLength);
        path4 += 'L' + j + ',' + (-750 + y2) + ' ';
    }
    path4 += 'L' + waveLength + ',800 L0,800 Z";';
    svgCode2 += path4;
    svgCode2 += '"/>';
    svgCode2 += '</path></svg>';

    waveBack.innerHTML = svgCode2;

    let transparentGlow;
    if ((fieldData.waveGlow.match(/,/g) || []).length == 3) {
        var waveGlowArray = fieldData.waveGlow.split(",");
        var glowOpacity = parseFloat(waveGlowArray[3]);
        waveGlowArray[3] = "";
        transparentGlow = (waveGlowArray.join(',').concat((0.6 * glowOpacity + "").substring(0, 3) + ")"));
    }
    else {
        transparentGlow = fieldData.waveGlow.replace(")", ",0.6)");
    }

    liquid.style.filter = "drop-shadow(0 0 20px " + transparentGlow + ") drop-shadow(0 0 50px " + fieldData.waveGlow + ")";
    glassBackground.setAttribute("fill", fieldData.backgroundColor);

}

function defaultDesign() {

    fieldData.titleGlowOn = "on";

    if (fieldData.glassShape == "orb") {
        fieldData.waveFill = "rgb(233,62,58)";
        fieldData.waveFill2 = "rgb(144,35,29)";
        fieldData.waveBack = "rgb(117,22,22)";
        fieldData.titleColor = "rgb(244,244,244)";

        fieldData.waveGlow = "rgb(238,36,36)";
        fieldData.titleGlow = "rgb(238,36,36)";

        fieldData.animationHue = "0";
        fieldData.animationSaturation = "0.9";
        fieldData.animationBrightness = "1";
    }

    else if (fieldData.glassShape == "star") {
        fieldData.waveFill = "rgb(249,237,50)";
        fieldData.waveFill2 = "rgb(244,124,32)";
        fieldData.waveBack = "rgb(135,98,39)";
        fieldData.titleColor = "rgb(244,244,244)";

        fieldData.waveGlow = "rgb(249,202,64)";
        fieldData.titleGlow = "rgb(249,202,64)";


        fieldData.animationHue = "45";
        fieldData.animationSaturation = "1";
        fieldData.animationBrightness = "1.4";


    }

    else if (fieldData.glassShape == "heart") {
        fieldData.waveFill = "rgb(241,104,136)";
        fieldData.waveFill2 = "rgb(130,46,106)";
        fieldData.waveBack = "rgb(114,40,70)";
        fieldData.titleColor = "rgb(244,244,244)";

        fieldData.waveGlow = "rgb(240,94,151)";
        fieldData.titleGlow = "rgb(240,94,151)";

        fieldData.animationHue = "330";
        fieldData.animationSaturation = "1";
        fieldData.animationBrightness = "1";
    }

    else if (fieldData.glassShape == "moon") {
        fieldData.waveFill = "rgb(215,239,243)";
        fieldData.waveFill2 = "rgb(90,88,116)";
        fieldData.waveBack = "rgb(98,97,127)";
        fieldData.titleColor = "rgb(244,244,244)";

        fieldData.waveGlow = "rgb(181,205,225)";
        fieldData.titleGlow = "rgb(181,205,225)";

        fieldData.animationHue = "190";
        fieldData.animationSaturation = "0.2";
        fieldData.animationBrightness = "1.3";

    }

    else if (fieldData.glassShape == "cheer") {
        fieldData.waveFill = "rgb(145,104,172)";
        fieldData.waveFill2 = "rgb(72,69,156)";
        fieldData.waveBack = "rgb(46,42,108)";
        fieldData.titleColor = "rgb(244,244,244)";

        fieldData.waveGlow = "rgb(110,96,170)";
        fieldData.titleGlow = "rgb(110,96,170)";

        fieldData.animationHue = "265";
        fieldData.animationSaturation = "1";
        fieldData.animationBrightness = "1.2";

    }

    else if (fieldData.glassShape == "donation") {
        fieldData.waveFill = "rgb(141,203,136)";
        fieldData.waveFill2 = "rgb(24,121,61)";
        fieldData.waveBack = "rgb(20,66,35)";
        fieldData.titleColor = "rgb(244,244,244)";

        fieldData.waveGlow = "rgb(110,190,68)";
        fieldData.titleGlow = "rgb(110,190,68)";


        fieldData.animationHue = "135";
        fieldData.animationSaturation = "1.7";
        fieldData.animationBrightness = "0.9";

    }

    fieldData.titleFont = "Quicksand";
    fieldData.backgroundColor = "rgb(188,215,222,0)";

}

function selectShape() {

    let shape;
    let liquidShape;

    if (fieldData.glassShape == "orb") {

        shape = `<defs>
    <style>
      .cls-glass {
        opacity: 0.1;
        fill: url(#radial-gradient);
      }

      .cls-line, .cls-glow {
        fill: none;
        stroke: #f2f2f3;
        stroke-miterlimit: 10;
        stroke-width: 7px;
      }

      .cls-reflex {
        fill: #f2f2f3;
      }

    </style>

    <radialGradient id="radial-gradient" cx="273.57" cy="82.67" r="574.55" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>

	<mask id="glow-mask">
		<circle id="glow-mask" cx="265" cy="265" r="260" fill="#ffffff" transform="translate(0 0)"/>
	</mask>

	<filter id="blurFilter">
      <!-- Apply Gaussian blur -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
	  <!-- <feDropShadow dx="-2" dy="-2" stdDeviation="3" flood-color="green" /> -->
    </filter>

  	</defs>
  <circle class="cls-glass" cx="265" cy="265" r="260"/>
  <circle class="cls-line" cx="265" cy="265" r="260"/>
  <path class="cls-reflex" d="M180.33,400c-10.62-91,50.54-184.19,137.52-212.56a8.17,8.17,0,0,1,5.89,15.22A240.46,240.46,0,0,0,180.33,400Z" transform="translate(-136.5 -136.5)"/>
  <path class="cls-reflex" d="M617.72,429.39c-2.13,100.3-89.42,189.73-189.41,196.06a7.54,7.54,0,0,1-1.86-15c94.5-16,169.7-87.62,191.27-181.11Z" transform="translate(-135 -135)"/>
  <circle class="cls-glow" cx="265" cy="265" r="260" filter="url(#blurFilter)" mask="url(#glow-mask)"/>`;


        liquidShape = `<circle id="cls-liquid-mask" cx="265" cy="265" r="240" fill="#ffffff" transform="translate(0 0)"/>`;

    }
    else if (fieldData.glassShape == "star") {

        shape = `<svg id="Star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 534.6 512.36">
  <defs>

    <style>
      .cls-glass {
        opacity: 0.1;
        fill: url(#radial-gradient);
      }

      .cls-line, .cls-glow {
        fill: none;
        stroke: #f2f2f3;
        stroke-miterlimit: 10;
        stroke-width: 6.8px;
      }

      .cls-reflex {
        fill: #fff;
      }

    </style>

    <radialGradient id="radial-gradient" cx="404.25" cy="168.99" r="625.8" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>

	<mask id="glow-mask">
		<path id="glow-mask" d="M432.81,167.62,486,275.42a36.6,36.6,0,0,0,27.55,20l119,17.28c30,4.37,42,41.25,20.28,62.42l-86.09,83.91a36.57,36.57,0,0,0-10.52,32.38l20.32,118.49c5.13,29.89-26.25,52.68-53.09,38.57L417,592.55a36.63,36.63,0,0,0-34.06,0l-106.4,55.94c-26.84,14.11-58.22-8.68-53.09-38.57L243.8,491.43a36.57,36.57,0,0,0-10.52-32.38l-86.09-83.91c-21.71-21.17-9.73-58.05,20.28-62.42l119-17.28a36.6,36.6,0,0,0,27.55-20l53.2-107.8C380.61,140.43,419.39,140.43,432.81,167.62Z" fill="#ffffff" transform="translate(0 0)"/>
	</mask>

	<filter id="blurFilter">
      <!-- Apply Gaussian blur -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
	  <!-- <feDropShadow dx="-2" dy="-2" stdDeviation="3" flood-color="green" /> -->
    </filter>	

  </defs>
  <path class="cls-glass" d="M432.81,167.62,486,275.42a36.6,36.6,0,0,0,27.55,20l119,17.28c30,4.37,42,41.25,20.28,62.42l-86.09,83.91a36.57,36.57,0,0,0-10.52,32.38l20.32,118.49c5.13,29.89-26.25,52.68-53.09,38.57L417,592.55a36.63,36.63,0,0,0-34.06,0l-106.4,55.94c-26.84,14.11-58.22-8.68-53.09-38.57L243.8,491.43a36.57,36.57,0,0,0-10.52-32.38l-86.09-83.91c-21.71-21.17-9.73-58.05,20.28-62.42l119-17.28a36.6,36.6,0,0,0,27.55-20l53.2-107.8C380.61,140.43,419.39,140.43,432.81,167.62Z" transform="translate(-132.7 -143.82)"/>
  <path class="cls-line" d="M432.81,167.62,486,275.42a36.6,36.6,0,0,0,27.55,20l119,17.28c30,4.37,42,41.25,20.28,62.42l-86.09,83.91a36.57,36.57,0,0,0-10.52,32.38l20.32,118.49c5.13,29.89-26.25,52.68-53.09,38.57L417,592.55a36.63,36.63,0,0,0-34.06,0l-106.4,55.94c-26.84,14.11-58.22-8.68-53.09-38.57L243.8,491.43a36.57,36.57,0,0,0-10.52-32.38l-86.09-83.91c-21.71-21.17-9.73-58.05,20.28-62.42l119-17.28a36.6,36.6,0,0,0,27.55-20l53.2-107.8C380.61,140.43,419.39,140.43,432.81,167.62Z" transform="translate(-132.7 -143.82)"/>
  <path class="cls-reflex" d="M194.49,328.47a1.61,1.61,0,0,0-.3,3.15c16.43,4.89,53.83,15.61,67.57,16.34,27.45,1.44,101.16-40.49,115.08-74.62,9.9-24.29,13.91-70.39,13.43-87.74a1.46,1.46,0,0,0-2.83-.47c-5.42,14.77-19.81,61.32-45.75,91.51-16,18.61-31.14,29.26-50.48,37C265.87,323.88,219.4,326,194.49,328.47Z" transform="translate(-132.7 -143.82)"/>
  <path class="cls-reflex" d="M563,351.64s20.28,20.65,12.52,38.5q19.66-10.23,39.05-21c6.91-3.87,13.81-7.76,20.64-11.76,4.26-2.49,9-5.75,10.23-10.78,1.74-6.91-2.22-13.66-9.74-13.07-5.64.45-10.82,3.15-16.22,4.62-6,1.61-11.87,3.33-17.84,4.86-12.59,3.23-25.3,6-38,8.54Z" transform="translate(-132.7 -143.82)"/>
  <path class="cls-glow" d="M432.81,167.62,486,275.42a36.6,36.6,0,0,0,27.55,20l119,17.28c30,4.37,42,41.25,20.28,62.42l-86.09,83.91a36.57,36.57,0,0,0-10.52,32.38l20.32,118.49c5.13,29.89-26.25,52.68-53.09,38.57L417,592.55a36.63,36.63,0,0,0-34.06,0l-106.4,55.94c-26.84,14.11-58.22-8.68-53.09-38.57L243.8,491.43a36.57,36.57,0,0,0-10.52-32.38l-86.09-83.91c-21.71-21.17-9.73-58.05,20.28-62.42l119-17.28a36.6,36.6,0,0,0,27.55-20l53.2-107.8C380.61,140.43,419.39,140.43,432.81,167.62Z" transform="translate(-132.7 -143.82)" filter="url(#blurFilter)" mask="url(#glow-mask)"/>

</svg>
`

        liquidShape = `<path id="cls-liquid-mask" d="M540.46,633.32a17.07,17.07,0,0,1-8-2.05l-106.4-55.94a56,56,0,0,0-52.16,0l-106.4,55.94a17.07,17.07,0,0,1-8,2.05A17.59,17.59,0,0,1,246.3,627a16.46,16.46,0,0,1-3.65-13.82L263,494.72a56,56,0,0,0-16.12-49.6l-86.08-83.91a17.14,17.14,0,0,1,9.5-29.23l119-17.29A56,56,0,0,0,331.43,284l53.2-107.8a17.14,17.14,0,0,1,30.74,0L468.57,284a56,56,0,0,0,42.2,30.66l119,17.29a17.14,17.14,0,0,1,9.5,29.23l-86.08,83.91A56,56,0,0,0,537,494.72L557.35,613.2A16.47,16.47,0,0,1,553.7,627,17.59,17.59,0,0,1,540.46,633.32Z" transform="translate(-135 -135)" fill="#ffffff" />`

    }

    else if (fieldData.glassShape == "heart") {

        shape = `<svg id="Heart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 532.88 458.53">
  <defs>
    <style>
      .cls-glass {
        opacity: 0.1;
        fill: url(#radial-gradient);
      }

      .cls-line, .cls-glow {
        fill: none;
        stroke: #f2f2f3;
        stroke-miterlimit: 10;
        stroke-width: 6.19px;
      }

      .cls-reflex {
        fill: #f2f2f3;
      }

    </style>

    <radialGradient id="radial-gradient" cx="405.45" cy="109.69" r="462.49" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>

	<mask id="glow-mask">
		<path id="glow-mask" d="M663.35,328.63c-1.59,46.54-23.35,88.86-55.46,126.67-56.53,66.56-125.56,118.39-197.4,166.89-6.7,4.53-12.62,5.72-19.83.79C311,568.66,233.49,511.81,175.51,433.18c-29.71-40.29-45.81-85.48-36-136.22,10.74-55.36,43.19-94.27,96.24-113.36,55.35-19.92,106.49-9.13,150,30.17,12.11,10.92,17.2,9.66,28.65-.38,47.63-41.75,101.91-50.68,160.28-25.71C628.7,210.77,663.55,265.88,663.35,328.63Z" fill="#ffffff" transform="translate(0 0)"/>
	</mask>

	<filter id="blurFilter">
      <!-- Apply Gaussian blur -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
	  <!-- <feDropShadow dx="-2" dy="-2" stdDeviation="3" flood-color="green" /> -->
    </filter>	

  </defs>
  <path class="cls-glass" d="M663.35,328.63c-1.59,46.54-23.35,88.86-55.46,126.67-56.53,66.56-125.56,118.39-197.4,166.89-6.7,4.53-12.62,5.72-19.83.79C311,568.66,233.49,511.81,175.51,433.18c-29.71-40.29-45.81-85.48-36-136.22,10.74-55.36,43.19-94.27,96.24-113.36,55.35-19.92,106.49-9.13,150,30.17,12.11,10.92,17.2,9.66,28.65-.38,47.63-41.75,101.91-50.68,160.28-25.71C628.7,210.77,663.55,265.88,663.35,328.63Z" transform="translate(-133.56 -170)"/>
  <path class="cls-line" d="M663.35,328.63c-1.59,46.54-23.35,88.86-55.46,126.67-56.53,66.56-125.56,118.39-197.4,166.89-6.7,4.53-12.62,5.72-19.83.79C311,568.66,233.49,511.81,175.51,433.18c-29.71-40.29-45.81-85.48-36-136.22,10.74-55.36,43.19-94.27,96.24-113.36,55.35-19.92,106.49-9.13,150,30.17,12.11,10.92,17.2,9.66,28.65-.38,47.63-41.75,101.91-50.68,160.28-25.71C628.7,210.77,663.55,265.88,663.35,328.63Z" transform="translate(-133.56 -170)"/>
  <path class="cls-reflex" d="M579.1,447.64c-23.74,38.58-55.72,72-91.62,99.47-10.44,7.17-21.54-7-12.05-15.42,17.2-14,34.85-27.24,52.11-41.16,15.18-12,36.57-30.16,51.56-42.89Z" transform="translate(-133.56 -170)"/>
  <path class="cls-reflex" d="M176.47,366.11c-12.57-36.83-5.65-80.28,15.67-112.7,13.47-20.21,33.52-35.75,55.78-45.17,19.69-8.48,41.47-13.08,63-11.21a8.31,8.31,0,0,1-.84,16.59c-18.79-.32-37.62,3.73-55.37,10.94-26.51,10.62-49.43,29.73-62.54,55.36-13.63,26.28-19.59,56.62-15.72,86.19Z" transform="translate(-133.56 -170)"/>
  <path class="cls-glow" d="M663.35,328.63c-1.59,46.54-23.35,88.86-55.46,126.67-56.53,66.56-125.56,118.39-197.4,166.89-6.7,4.53-12.62,5.72-19.83.79C311,568.66,233.49,511.81,175.51,433.18c-29.71-40.29-45.81-85.48-36-136.22,10.74-55.36,43.19-94.27,96.24-113.36,55.35-19.92,106.49-9.13,150,30.17,12.11,10.92,17.2,9.66,28.65-.38,47.63-41.75,101.91-50.68,160.28-25.71C628.7,210.77,663.55,265.88,663.35,328.63Z" transform="translate(-133.56 -170)" filter="url(#blurFilter)" mask="url(#glow-mask)"/>

</svg>
`
        liquidShape = `<path id="cls-liquid-mask" d="M400,607.94c-75.11-51.26-153.13-107.81-210.24-185.25-30.14-40.87-40.88-80.9-32.84-122.37,9.63-49.6,38.19-83.28,84.88-100.09,16.08-5.78,31.91-8.72,47-8.72,30.5,0,59.15,11.9,85.16,35.38,6.7,6.05,15,12.24,25.92,12.24,11.1,0,19.36-6.42,26.23-12.45,26.62-23.33,55.4-35.17,85.56-35.17,18,0,36.83,4.18,56.11,12.43,47.41,20.28,78,69.08,77.88,124.36-1.38,38.25-18.63,77.13-51.26,115.55-57.59,67.81-130.29,120.8-193.81,163.69C400.37,607.7,400.17,607.83,400,607.94Z" transform="translate(-135 -135)" fill="#ffffff"/>`
    }

    else if (fieldData.glassShape == "moon") {

        shape = `<svg id="Moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 533.01 529.28">
  <defs>
    <style>
      .cls-glass-group {
        opacity: 0.1;
      }

      .cls-glass {
        fill: url(#radial-gradient);
      }

      .cls-line-group, .cls-glow {
        fill: none;
        stroke-miterlimit: 10;
        stroke-width: 6.33px;
      }

      .cls-line, .cls-glow {
        stroke: #f4f4f5;
      }

      .cls-reflex {
        fill: #fff;
      }

      .cls-glass2 {
        fill: url(#radial-gradient-2);
      }

      .cls-line2 {
        stroke: #fff;
      }

		
    </style>
    <radialGradient id="radial-gradient" cx="400" cy="400" r="262.41" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>
    <radialGradient id="radial-gradient-2" cx="485.31" cy="181.91" r="156.36" xlink:href="#radial-gradient"/>
	
	<mask id="glow-mask">
		  <path id="glow-mask" fill="#ffffff" d="M662.87,470.4c-33.32,110.49-135.82,191-257.13,191.08-148.24.14-269.08-120.58-269.08-268.82,0-117,74.78-216.59,179.16-253.5a10.63,10.63,0,0,1,13.1,14.69,231.19,231.19,0,0,0,318.72,304.2A10.61,10.61,0,0,1,662.87,470.4Z" transform="translate(0 0)"/>
	</mask>
	
	<mask id="glow-mask2">
		  <path id="glow-mask2" fill="#ffffff" d="M488.44,217.63,500,255.19a48.66,48.66,0,0,0,32.25,32.25L569.78,299a6.74,6.74,0,0,1,0,12.88l-37.56,11.52A48.69,48.69,0,0,0,500,355.63l-11.53,37.56a6.73,6.73,0,0,1-12.87,0L464,355.63a48.69,48.69,0,0,0-32.25-32.26l-37.56-11.52a6.74,6.74,0,0,1,0-12.88l37.56-11.53A48.66,48.66,0,0,0,464,255.19l11.53-37.56A6.73,6.73,0,0,1,488.44,217.63Z" transform="translate(0 0)"/>
	</mask>

		<filter id="blurFilter">
      <!-- Apply Gaussian blur -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
	  <!-- <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="green" /> -->
    </filter>	
  </defs>
  <g>
    <g class="cls-glass-group">
		<path class="cls-glass" d="M662.87,470.4c-33.32,110.49-135.82,191-257.13,191.08-148.24.14-269.08-120.58-269.08-268.82,0-117,74.78-216.59,179.16-253.5a10.63,10.63,0,0,1,13.1,14.69,231.19,231.19,0,0,0,318.72,304.2A10.61,10.61,0,0,1,662.87,470.4Z" transform="translate(-133.5 -135.36)"/>
		<path class="cls-glass2" d="M488.44,217.63,500,255.19a48.66,48.66,0,0,0,32.25,32.25L569.78,299a6.74,6.74,0,0,1,0,12.88l-37.56,11.52A48.69,48.69,0,0,0,500,355.63l-11.53,37.56a6.73,6.73,0,0,1-12.87,0L464,355.63a48.69,48.69,0,0,0-32.25-32.26l-37.56-11.52a6.74,6.74,0,0,1,0-12.88l37.56-11.53A48.66,48.66,0,0,0,464,255.19l11.53-37.56A6.73,6.73,0,0,1,488.44,217.63Z" transform="translate(-133.5 -135.36)"/>
	</g>
	<g class="cls-line-group">
		<path class="cls-line" d="M662.87,470.4c-33.32,110.49-135.82,191-257.13,191.08-148.24.14-269.08-120.58-269.08-268.82,0-117,74.78-216.59,179.16-253.5a10.63,10.63,0,0,1,13.1,14.69,231.19,231.19,0,0,0,318.72,304.2A10.61,10.61,0,0,1,662.87,470.4Z" transform="translate(-133.5 -135.36)"/>
    	<path class="cls-line2" d="M488.44,217.63,500,255.19a48.66,48.66,0,0,0,32.25,32.25L569.78,299a6.74,6.74,0,0,1,0,12.88l-37.56,11.52A48.69,48.69,0,0,0,500,355.63l-11.53,37.56a6.73,6.73,0,0,1-12.87,0L464,355.63a48.69,48.69,0,0,0-32.25-32.26l-37.56-11.52a6.74,6.74,0,0,1,0-12.88l37.56-11.53A48.66,48.66,0,0,0,464,255.19l11.53-37.56A6.73,6.73,0,0,1,488.44,217.63Z" transform="translate(-133.5 -135.36)"/>
	</g>
	
	<g class="cls-reflex-group">
		<path class="cls-reflex" d="M391.11,474c41.18,29.95,92.21,43.49,142.71,39.21a6,6,0,0,1,1.69,11.88c-52.28,10.38-110.77-9.54-144.4-51.09Z" transform="translate(-133.5 -135.36)"/>
		<path class="cls-reflex" d="M193.53,484.11c-9.24-17.82-15.53-37.17-20-56.72A249.72,249.72,0,0,1,169,349.46a243.75,243.75,0,0,1,17.4-67.8A232.31,232.31,0,0,1,223,221.8a7.29,7.29,0,0,1,11.26,9.25,264.36,264.36,0,0,0-34.69,56.35c-28,61.4-28.41,133.4-6.06,196.71Z" transform="translate(-133.5 -135.36)"/>
    	<path class="cls-reflex" d="M427.55,298.74a.43.43,0,0,0,0,.84c4.46.77,14.6,2.41,18.23,2.17,7.24-.47,25.27-13.77,27.85-23.15,1.84-6.68,1.46-18.89.79-23.43a.39.39,0,0,0-.76,0c-1,4-3.28,16.69-9.14,25.42a32.72,32.72,0,0,1-12.09,11.29C446.13,295.31,434,297.31,427.55,298.74Z" transform="translate(-133.5 -135.36)"/>
    	<path class="cls-reflex" d="M537.79,301.06s2.63,5.07.13,8c2.87-.53,5.74-1.09,8.59-1.7,1.53-.33,3.06-.67,4.58-1a3.83,3.83,0,0,0,2.56-1.44,1.91,1.91,0,0,0-1.09-3,18.49,18.49,0,0,0-3.33-.07c-1.21,0-2.43-.06-3.65-.12-2.56-.12-5.12-.33-7.68-.59Z" transform="translate(-133.5 -135.36)"/>
	</g>

	<g class="cls-glow-group">
		<path class="cls-glow" d="M662.87,470.4c-33.32,110.49-135.82,191-257.13,191.08-148.24.14-269.08-120.58-269.08-268.82,0-117,74.78-216.59,179.16-253.5a10.63,10.63,0,0,1,13.1,14.69,231.19,231.19,0,0,0,318.72,304.2A10.61,10.61,0,0,1,662.87,470.4Z" transform="translate(-133.5 -135.36)" filter="url(#blurFilter)" mask="url(#glow-mask)"/>
    	<path class="cls-glow" d="M488.44,217.63,500,255.19a48.66,48.66,0,0,0,32.25,32.25L569.78,299a6.74,6.74,0,0,1,0,12.88l-37.56,11.52A48.69,48.69,0,0,0,500,355.63l-11.53,37.56a6.73,6.73,0,0,1-12.87,0L464,355.63a48.69,48.69,0,0,0-32.25-32.26l-37.56-11.52a6.74,6.74,0,0,1,0-12.88l37.56-11.53A48.66,48.66,0,0,0,464,255.19l11.53-37.56A6.73,6.73,0,0,1,488.44,217.63Z" transform="translate(-133.5 -135.36)" filter="url(#blurFilter)" mask="url(#glow-mask2)"/>
	</g>
</g>

</svg>
`;

        liquidShape = `<g id="group-mask" transform="translate(-135 -135)"> <path id="cls-liquid-mask" d="M405.46,643.4A250.8,250.8,0,0,1,305.18,162.77a247.12,247.12,0,0,0-17.72,90.28c-1.19,136.81,109.08,249.59,245.82,251.4,1.13,0,2.25,0,3.38,0A250,250,0,0,0,639.74,482.2a253.26,253.26,0,0,1-83.33,110.7,248.53,248.53,0,0,1-150.69,50.5Z" fill="#ffffff"/>`;
        liquidShape += `<path id="cls-liquid-mask2" d="M477,351.65a62.18,62.18,0,0,0-41.23-41.24l-11.92-3.65a1.41,1.41,0,0,1,0-2.7l11.92-3.66A62.15,62.15,0,0,0,477,259.17l3.66-11.92a1.41,1.41,0,0,1,2.69,0L487,259.17a62.16,62.16,0,0,0,41.24,41.23l11.91,3.66a1.41,1.41,0,0,1,0,2.7l-11.91,3.65A62.17,62.17,0,0,0,487,351.65l-3.66,11.91a1.41,1.41,0,0,1-2.69,0Z" fill="#ffffff"/></g>`;

    }

    else if (fieldData.glassShape == "cheer") {

        shape = `<svg id="Bit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 442.05 527.66">
  <defs>
    <style>

      .cls-glass {
        opacity: 0.1;
        fill: url(#radial-gradient);
      }

      .cls-line, .cls-glow {
        fill: none;
        stroke: #f2f2f3;
        stroke-miterlimit: 10;
        stroke-width: 6.08px;
      }

      .cls-reflex {
        fill: #f2f2f3;
      }

    </style>
    <radialGradient id="radial-gradient" cx="401.91" cy="157.59" r="503.71" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>

	<mask id="glow-mask">
		  <path id="glow-mask" d="M604.44,519.25l-185,135.17a33,33,0,0,1-39,0L195.56,519.25a33,33,0,0,1-9.12-43.18l185-320.34c12.72-22,44.5-22,57.22,0L613.56,476.07A33,33,0,0,1,604.44,519.25Z" fill="#ffffff" transform="translate(0 0)"/>
	</mask>

	<filter id="blurFilter">
      <!-- Apply Gaussian blur -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
	  <!-- <feDropShadow dx="-2" dy="-2" stdDeviation="3" flood-color="green" /> -->
    </filter>	

  </defs>
  <path class="cls-glass" d="M604.44,519.25l-185,135.17a33,33,0,0,1-39,0L195.56,519.25a33,33,0,0,1-9.12-43.18l185-320.34c12.72-22,44.5-22,57.22,0L613.56,476.07A33,33,0,0,1,604.44,519.25Z" transform="translate(-178.97 -136.17)"/>
  <path class="cls-line" d="M604.44,519.25l-185,135.17a33,33,0,0,1-39,0L195.56,519.25a33,33,0,0,1-9.12-43.18l185-320.34c12.72-22,44.5-22,57.22,0L613.56,476.07A33,33,0,0,1,604.44,519.25Z" transform="translate(-178.97 -136.17)"/>
  <path class="cls-reflex" d="M283.07,565.21c-18-13-35.58-26.57-53.08-40.23-4.53-3.77-12.08-8.85-15.56-13.59a37.27,37.27,0,0,1-4.12-40.09c1.33-2.51,3.79-6.14,5.34-8.51,8.14-12.4,16.38-24.73,24.86-36.91-6.31,13.43-12.86,26.74-19.54,40-1.14,2.26-3.17,6.21-4.11,8.45-3.68,9.36-2.14,20.72,4.17,28.4a28.72,28.72,0,0,0,6.89,6.3c21.41,14.48,42.82,29.28,63.64,44.58,7.35,5.87-.57,16.86-8.49,11.62Z" transform="translate(-178.97 -136.17)"/>
  <path class="cls-reflex" d="M421.06,175.16c26.2,42.49,50.74,87.65,73.71,132,7.68,15,15.22,30,22.32,45.3-9.69-13.8-19-27.85-28.06-42-17.62-27.34-36.33-57.83-52.75-85.91-8.48-14.5-16.8-29.09-24.71-43.92-3.12-6.23,5.59-11.33,9.49-5.47Z" transform="translate(-178.97 -136.17)"/>
  <path class="cls-glow" d="M604.44,519.25l-185,135.17a33,33,0,0,1-39,0L195.56,519.25a33,33,0,0,1-9.12-43.18l185-320.34c12.72-22,44.5-22,57.22,0L613.56,476.07A33,33,0,0,1,604.44,519.25Z" transform="translate(-178.97 -136.17)" filter="url(#blurFilter)" mask="url(#glow-mask)"/>

</svg>`

        liquidShape = `  <path id="cls-liquid-mask" d="M209.3,471.24,371.39,190.49c12.72-22,44.5-22,57.22,0L590.7,471.24a33,33,0,0,1-9.12,43.19L419.49,632.89a33,33,0,0,1-39,0L218.42,514.43A33,33,0,0,1,209.3,471.24Z" fill="#ffffff" transform="translate(-135 -135)"/>`
    }

    else if (fieldData.glassShape == "donation") {

        shape = `<svg id="Money" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 519.15 518.95">
  <defs>
    <style>

      .cls-glass-group {
        opacity: 0.1;
      }

      .cls-glass {
        fill: url(#radial-gradient);
      }

      .cls-line-group, .cls-sign, .cls-glow {
        fill: none;
        stroke: #f2f2f3;
      }

      .cls-line2 {
        stroke-miterlimit: 10;
      }

      .cls-line2, .cls-line, .cls-glow {
        stroke-width: 7px;
      }

      .cls-line, .cls-sign, .cls-glow {
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .cls-reflex {
        fill: #f2f2f3;
      }

      .cls-sign {
        stroke-width: 5px;
      }

    </style>
    <radialGradient id="radial-gradient" cx="392.79" cy="58.08" r="426.99" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>

	<mask id="glow-mask">
		  <path id="glow-mask" d="M656.06,513.9v-.55a132.65,132.65,0,0,0-2-25.28A276,276,0,0,0,636.39,430c-8.45-20-19-39.08-30.43-57.52-18.44-29.66-40-57-63.17-83-.81-.91-1.68-1.75-2.53-2.63a.86.86,0,0,0-.13-.14,5.48,5.48,0,0,1-.4-.44c-.25-.26-.49-.52-.71-.79-2.16-2.61-4.48-2.78-7.5-1.3l-.48.24a16.33,16.33,0,0,0-1.55.66,290.55,290.55,0,0,1-49.83,18.54,289.2,289.2,0,0,1-41.2,7.85A340.66,340.66,0,0,1,400,313.79a340.87,340.87,0,0,1-38.47-2.36,289.06,289.06,0,0,1-41.19-7.85A291,291,0,0,1,270.51,285c-.53-.25-1.05-.48-1.54-.66l-.49-.24c-3-1.48-5.33-1.31-7.5,1.3-.22.27-.46.53-.71.79a5.48,5.48,0,0,1-.4.44l-.13.14c-.85.88-1.72,1.72-2.53,2.63-23.22,26-44.73,53.34-63.16,83-11.46,18.44-22,37.51-30.44,57.52A276.58,276.58,0,0,0,146,488.07a132.14,132.14,0,0,0-2,24.76c0,.36,0,.71,0,1.07,0,3.79,0,7.59.14,11.38q.22,4.85.9,9.54c5.37,38.09,31.5,69.23,65.13,87.16,29.23,15.58,60.91,23,93.34,27.86,17.25,2.57,35,4.74,52.35,5.81,5.35.33,10.71.33,16.07.32h56.27c5.35,0,10.71,0,16.06-.32,17.38-1.07,35.1-3.24,52.36-5.81C529,645,560.66,637.56,589.89,622c33.63-17.93,59.77-49.07,65.14-87.16q.66-4.7.89-9.54C656.1,521.49,656.08,517.69,656.06,513.9Z" fill="#ffffff" transform="translate(0 0)"/>
	</mask>
	
	<mask id="glow-mask2">
		  <path id="glow-mask2" d="M573,191.89a351.72,351.72,0,0,0-65.49-29.17C472.65,151.27,436.57,144.66,400,144c-36.57.64-72.66,7.25-107.5,18.7A351.81,351.81,0,0,0,227,191.89c-5.76,3.31-5.75,3.47-2,9,7.49,11.08,15.5,21.87,22.53,33.22.76,1.22,1.51,2.46,2.24,3.7a59.84,59.84,0,0,0,7,9.72c.54.62,1.11,1.22,1.7,1.81a12.9,12.9,0,0,0,2.29,1.66q9.1,5.19,18.43,9.66l1.18.59a266.61,266.61,0,0,0,75.52,23.3q2.68.41,5.37.77l.27,0c1.85.24,3.72.47,5.59.68,1,.12,2.06.23,3.09.33,2.21.22,4.42.42,6.65.59,1.81.14,3.63.24,5.44.34,1.12.07,2.25.14,3.36.19,2.4.12,4.79.2,7.17.26l1.2,0,3.9.06H402l3.9-.06,1.2,0c2.38-.06,4.77-.14,7.17-.26,1.12,0,2.24-.12,3.36-.19,1.81-.1,3.63-.2,5.44-.34,2.23-.17,4.44-.37,6.65-.59,1.14-.11,2.29-.24,3.43-.37,1.75-.19,3.5-.41,5.25-.64l.28,0q2.68-.36,5.37-.77l2.51-.4a272.61,272.61,0,0,0,74.19-23.49q9.32-4.49,18.42-9.66a12.9,12.9,0,0,0,2.29-1.66c.59-.59,1.16-1.19,1.7-1.81a59.84,59.84,0,0,0,7-9.72c.72-1.21,1.45-2.42,2.19-3.62,7.05-11.38,15.07-22.19,22.58-33.3C578.74,195.36,578.75,195.2,573,191.89Zm-88.67-3c-26,4.31-51.79,9.51-76.93,17.26-2.46.76-4.93,1.46-7.39,2.1-35.55,9.31-71,6.76-106.5-1.58-6.47-1.52-12.87-3.39-19.28-5.17-1.52-.42-3.28-.57-4.69-2.8q17.31-7.49,34.7-13.08c0-.06,0-.11,0-.17a303.12,303.12,0,0,1,191.5,0,1.1,1.1,0,0,1,0,.18c.06.39.12.79.17,1.19C492.06,187.49,488.2,188.23,484.32,188.87Z" fill="#ffffff" transform="translate(0 0)"/>
	</mask>

	<filter id="blurFilter">
      <!-- Apply Gaussian blur -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
	  <!-- <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="green" /> -->
    </filter>	

  </defs>
  <g class="cls-glass-group">
    <path class="cls-glass" d="M656.06,513.9v-.55a132.65,132.65,0,0,0-2-25.28A276,276,0,0,0,636.39,430c-8.45-20-19-39.08-30.43-57.52-18.44-29.66-40-57-63.17-83-.81-.91-1.68-1.75-2.53-2.63a.86.86,0,0,0-.13-.14,5.48,5.48,0,0,1-.4-.44c-.25-.26-.49-.52-.71-.79-2.16-2.61-4.48-2.78-7.5-1.3l-.48.24a16.33,16.33,0,0,0-1.55.66,290.55,290.55,0,0,1-49.83,18.54,289.2,289.2,0,0,1-41.2,7.85A340.66,340.66,0,0,1,400,313.79a340.87,340.87,0,0,1-38.47-2.36,289.06,289.06,0,0,1-41.19-7.85A291,291,0,0,1,270.51,285c-.53-.25-1.05-.48-1.54-.66l-.49-.24c-3-1.48-5.33-1.31-7.5,1.3-.22.27-.46.53-.71.79a5.48,5.48,0,0,1-.4.44l-.13.14c-.85.88-1.72,1.72-2.53,2.63-23.22,26-44.73,53.34-63.16,83-11.46,18.44-22,37.51-30.44,57.52A276.58,276.58,0,0,0,146,488.07a132.14,132.14,0,0,0-2,24.76c0,.36,0,.71,0,1.07,0,3.79,0,7.59.14,11.38q.22,4.85.9,9.54c5.37,38.09,31.5,69.23,65.13,87.16,29.23,15.58,60.91,23,93.34,27.86,17.25,2.57,35,4.74,52.35,5.81,5.35.33,10.71.33,16.07.32h56.27c5.35,0,10.71,0,16.06-.32,17.38-1.07,35.1-3.24,52.36-5.81C529,645,560.66,637.56,589.89,622c33.63-17.93,59.77-49.07,65.14-87.16q.66-4.7.89-9.54C656.1,521.49,656.08,517.69,656.06,513.9Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-glass" d="M573,191.89a351.72,351.72,0,0,0-65.49-29.17C472.65,151.27,436.57,144.66,400,144c-36.57.64-72.66,7.25-107.5,18.7A351.81,351.81,0,0,0,227,191.89c-5.76,3.31-5.75,3.47-2,9,7.49,11.08,15.5,21.87,22.53,33.22.76,1.22,1.51,2.46,2.24,3.7a59.84,59.84,0,0,0,7,9.72c.54.62,1.11,1.22,1.7,1.81a12.9,12.9,0,0,0,2.29,1.66q9.1,5.19,18.43,9.66l1.18.59a266.61,266.61,0,0,0,75.52,23.3q2.68.41,5.37.77l.27,0c1.85.24,3.72.47,5.59.68,1,.12,2.06.23,3.09.33,2.21.22,4.42.42,6.65.59,1.81.14,3.63.24,5.44.34,1.12.07,2.25.14,3.36.19,2.4.12,4.79.2,7.17.26l1.2,0,3.9.06H402l3.9-.06,1.2,0c2.38-.06,4.77-.14,7.17-.26,1.12,0,2.24-.12,3.36-.19,1.81-.1,3.63-.2,5.44-.34,2.23-.17,4.44-.37,6.65-.59,1.14-.11,2.29-.24,3.43-.37,1.75-.19,3.5-.41,5.25-.64l.28,0q2.68-.36,5.37-.77l2.51-.4a272.61,272.61,0,0,0,74.19-23.49q9.32-4.49,18.42-9.66a12.9,12.9,0,0,0,2.29-1.66c.59-.59,1.16-1.19,1.7-1.81a59.84,59.84,0,0,0,7-9.72c.72-1.21,1.45-2.42,2.19-3.62,7.05-11.38,15.07-22.19,22.58-33.3C578.74,195.36,578.75,195.2,573,191.89Zm-88.67-3c-26,4.31-51.79,9.51-76.93,17.26-2.46.76-4.93,1.46-7.39,2.1-35.55,9.31-71,6.76-106.5-1.58-6.47-1.52-12.87-3.39-19.28-5.17-1.52-.42-3.28-.57-4.69-2.8q17.31-7.49,34.7-13.08c0-.06,0-.11,0-.17a303.12,303.12,0,0,1,191.5,0,1.1,1.1,0,0,1,0,.18c.06.39.12.79.17,1.19C492.06,187.49,488.2,188.23,484.32,188.87Z" transform="translate(-140.43 -140.52)"/>
  </g>
  <g class="cls-line-group">
    <path class="cls-line2" d="M656.06,513.9v-.55a132.65,132.65,0,0,0-2-25.28A276,276,0,0,0,636.39,430c-8.45-20-19-39.08-30.43-57.52-18.44-29.66-40-57-63.17-83-.81-.91-1.68-1.75-2.53-2.63a.86.86,0,0,0-.13-.14,5.48,5.48,0,0,1-.4-.44c-.25-.26-.49-.52-.71-.79-2.16-2.61-4.48-2.78-7.5-1.3l-.48.24a16.33,16.33,0,0,0-1.55.66,290.55,290.55,0,0,1-49.83,18.54,289.2,289.2,0,0,1-41.2,7.85A340.66,340.66,0,0,1,400,313.79a340.87,340.87,0,0,1-38.47-2.36,289.06,289.06,0,0,1-41.19-7.85A291,291,0,0,1,270.51,285c-.53-.25-1.05-.48-1.54-.66l-.49-.24c-3-1.48-5.33-1.31-7.5,1.3-.22.27-.46.53-.71.79a5.48,5.48,0,0,1-.4.44l-.13.14c-.85.88-1.72,1.72-2.53,2.63-23.22,26-44.73,53.34-63.16,83-11.46,18.44-22,37.51-30.44,57.52A276.58,276.58,0,0,0,146,488.07a132.14,132.14,0,0,0-2,24.76c0,.36,0,.71,0,1.07,0,3.79,0,7.59.14,11.38q.22,4.85.9,9.54c5.37,38.09,31.5,69.23,65.13,87.16,29.23,15.58,60.91,23,93.34,27.86,17.25,2.57,35,4.74,52.35,5.81,5.35.33,10.71.33,16.07.32h56.27c5.35,0,10.71,0,16.06-.32,17.38-1.07,35.1-3.24,52.36-5.81C529,645,560.66,637.56,589.89,622c33.63-17.93,59.77-49.07,65.14-87.16q.66-4.7.89-9.54C656.1,521.49,656.08,517.69,656.06,513.9Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-line" d="M573,191.89a351.72,351.72,0,0,0-65.49-29.17C472.65,151.27,436.57,144.66,400,144c-36.57.64-72.66,7.25-107.5,18.7A351.81,351.81,0,0,0,227,191.89c-5.76,3.31-5.75,3.47-2,9,7.49,11.08,15.5,21.87,22.53,33.22.76,1.22,1.51,2.46,2.24,3.7a59.84,59.84,0,0,0,7,9.72c.54.62,1.11,1.22,1.7,1.81a12.9,12.9,0,0,0,2.29,1.66q9.1,5.19,18.43,9.66l1.18.59a266.61,266.61,0,0,0,75.52,23.3q2.68.41,5.37.77l.27,0c1.85.24,3.72.47,5.59.68,1,.12,2.06.23,3.09.33,2.21.22,4.42.42,6.65.59,1.81.14,3.63.24,5.44.34,1.12.07,2.25.14,3.36.19,2.4.12,4.79.2,7.17.26l1.2,0,3.9.06H402l3.9-.06,1.2,0c2.38-.06,4.77-.14,7.17-.26,1.12,0,2.24-.12,3.36-.19,1.81-.1,3.63-.2,5.44-.34,2.23-.17,4.44-.37,6.65-.59,1.14-.11,2.29-.24,3.43-.37,1.75-.19,3.5-.41,5.25-.64l.28,0q2.68-.36,5.37-.77l2.51-.4a272.61,272.61,0,0,0,74.19-23.49q9.32-4.49,18.42-9.66a12.9,12.9,0,0,0,2.29-1.66c.59-.59,1.16-1.19,1.7-1.81a59.84,59.84,0,0,0,7-9.72c.72-1.21,1.45-2.42,2.19-3.62,7.05-11.38,15.07-22.19,22.58-33.3C578.74,195.36,578.75,195.2,573,191.89Zm-88.67-3c-26,4.31-51.79,9.51-76.93,17.26-2.46.76-4.93,1.46-7.39,2.1-35.55,9.31-71,6.76-106.5-1.58-6.47-1.52-12.87-3.39-19.28-5.17-1.52-.42-3.28-.57-4.69-2.8q17.31-7.49,34.7-13.08c0-.06,0-.11,0-.17a303.12,303.12,0,0,1,191.5,0,1.1,1.1,0,0,1,0,.18c.06.39.12.79.17,1.19C492.06,187.49,488.2,188.23,484.32,188.87Z" transform="translate(-140.43 -140.52)"/>
  </g>
  <g>
    <path class="cls-reflex" d="M635.72,532.11c-2.26,23.68-15.13,45.33-32.7,61-11.83,10.58-26,18.32-40.42,24.71-13.56,5.93-27.94,9.46-42.49,11.8a209.32,209.32,0,0,1-26.2,2.43,2.06,2.06,0,0,1-.61-4.05c11.15-3.17,22.25-5.81,33.32-9,18.08-5.28,36.37-10.5,53.24-19,21.68-11,40.4-29,49.89-51.7a105.22,105.22,0,0,0,3.69-10.82c.46-1.86.86-3.75,1.3-5.63a.5.5,0,0,1,1,.17Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-reflex" d="M165.18,491.5c3.64-28.53,13.13-56.09,25.83-81.82,12.31-26,27.94-50.52,48.05-71.18a2.52,2.52,0,0,1,4,3.05c-5.28,8.81-11.47,18.31-16.94,27-13,21-27.17,41.28-37.94,63.52a294.57,294.57,0,0,0-16.21,39.1q-3.28,10.11-5.77,20.48a.5.5,0,0,1-1-.17Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-reflex" d="M484.7,254.49c-24.82,10.94-52,18.34-79.29,17.28a113.51,113.51,0,0,1-18.82-2.25,2,2,0,0,1,.2-3.95c2.07-.29,4.13-.47,6.18-.66l6.15-.52c4.31-.37,14.18-1.21,18.34-1.53,14.25-.87,28.55-2.05,42.65-4.33,8.12-1.3,16.19-3,24.26-5a.5.5,0,0,1,.33.94Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-reflex" d="M304.17,173.2a281.65,281.65,0,0,1,47-13.37c16-3.33,32.54-4.82,48.82-3.1a1.19,1.19,0,0,1,0,2.37c-15.82,1.64-32.4,2.74-48.18,4.67a351.92,351.92,0,0,0-47.49,9.9.25.25,0,0,1-.16-.47Z" transform="translate(-140.43 -140.52)"/>
  </g>
  <path class="cls-sign" d="M456.37,503.58q0,20.66-11.91,33.11a57.25,57.25,0,0,1-28.88,16.42v16.95q0,9.27-1.72,13a9.34,9.34,0,0,1-5,5,30.28,30.28,0,0,1-17.75,0,7.94,7.94,0,0,1-4.63-4.77q-1.86-4.5-1.86-13.5V553.37a60.21,60.21,0,0,1-19.6-7.94q-8.73-5.56-12.18-9.8l-3.44-4.51q-5.56-7.14-5.57-12.45t9-14q5.29-5,11.26-5t16.55,10.6q8.2,10.06,18.54,10.06,19.6,0,19.6-16.15,0-5.83-7.41-9a112.26,112.26,0,0,0-18-5.69,150.29,150.29,0,0,1-21.19-6.76,40.61,40.61,0,0,1-18-14.57q-7.41-10.32-7.41-26.22a44.88,44.88,0,0,1,10.06-28.6q10.07-12.72,27.81-16.43V382q0-9,1.59-13,2.65-6.36,14-6.35,7.15,0,10.73,3a10.93,10.93,0,0,1,4.11,6.49,72.15,72.15,0,0,1,.52,10.07V397.1a60.71,60.71,0,0,1,13.51,4.5,52.19,52.19,0,0,1,8.48,4.77l2.38,2.12,1.06.79q6.62,6.11,6.62,10.07t-6.22,13.24q-6.23,9.27-13.64,9.27a13.46,13.46,0,0,1-8.08-2.38q-3.31-2.39-5.16-4a37.21,37.21,0,0,0-3.45-2.64,20.6,20.6,0,0,0-11.39-2.92,18.77,18.77,0,0,0-11.39,3.31,10.73,10.73,0,0,0-4.5,9.14q0,5.83,5.43,9.4a32.76,32.76,0,0,0,13.38,4.77,134.35,134.35,0,0,1,17.48,4A121.28,121.28,0,0,1,437.57,467q7.95,3.71,13.38,13.11T456.37,503.58Z" transform="translate(-140.43 -140.52)"/>
  <g>
    <path class="cls-reflex" d="M406.73,378.27c1.6,3.38,1.58,7,1,10.65q-.37,5.32-1,10.64a.14.14,0,0,1-.17.13.15.15,0,0,1-.13-.13q-.66-5.31-1.05-10.64c-.52-3.61-.54-7.27,1.05-10.65a.16.16,0,0,1,.3,0Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-reflex" d="M375,473.62c-7.82-2.65-14.37-9-17.88-16.53a38.34,38.34,0,0,1-2.49-8.08c-1-5.55-1.67-11.33-.07-16.86a27.34,27.34,0,0,1,9-14.07.25.25,0,0,1,.38.29,60.07,60.07,0,0,0-5.64,22.33c-1.36,13.18,4.73,26.4,16.85,32.48.26.11.09.55-.18.44Z" transform="translate(-140.43 -140.52)"/>
    <path class="cls-reflex" d="M433.28,475.89c10.14,3.85,15.39,15.11,16,25.41.42,5.29.55,10.8-1.4,15.88a23.57,23.57,0,0,1-10,12.31.24.24,0,0,1-.34-.1.25.25,0,0,1,0-.25,66.18,66.18,0,0,0,3.46-6.65,59.63,59.63,0,0,0,3.73-13.76c2.18-11.69-.42-26.11-11.61-32.4-.26-.11-.08-.55.19-.44Z" transform="translate(-140.43 -140.52)"/>
  </g>
  <g class="cls-glow-group">
    <path class="cls-glow" d="M656.06,513.9v-.55a132.65,132.65,0,0,0-2-25.28A276,276,0,0,0,636.39,430c-8.45-20-19-39.08-30.43-57.52-18.44-29.66-40-57-63.17-83-.81-.91-1.68-1.75-2.53-2.63a.86.86,0,0,0-.13-.14,5.48,5.48,0,0,1-.4-.44c-.25-.26-.49-.52-.71-.79-2.16-2.61-4.48-2.78-7.5-1.3l-.48.24a16.33,16.33,0,0,0-1.55.66,290.55,290.55,0,0,1-49.83,18.54,289.2,289.2,0,0,1-41.2,7.85A340.66,340.66,0,0,1,400,313.79a340.87,340.87,0,0,1-38.47-2.36,289.06,289.06,0,0,1-41.19-7.85A291,291,0,0,1,270.51,285c-.53-.25-1.05-.48-1.54-.66l-.49-.24c-3-1.48-5.33-1.31-7.5,1.3-.22.27-.46.53-.71.79a5.48,5.48,0,0,1-.4.44l-.13.14c-.85.88-1.72,1.72-2.53,2.63-23.22,26-44.73,53.34-63.16,83-11.46,18.44-22,37.51-30.44,57.52A276.58,276.58,0,0,0,146,488.07a132.14,132.14,0,0,0-2,24.76c0,.36,0,.71,0,1.07,0,3.79,0,7.59.14,11.38q.22,4.85.9,9.54c5.37,38.09,31.5,69.23,65.13,87.16,29.23,15.58,60.91,23,93.34,27.86,17.25,2.57,35,4.74,52.35,5.81,5.35.33,10.71.33,16.07.32h56.27c5.35,0,10.71,0,16.06-.32,17.38-1.07,35.1-3.24,52.36-5.81C529,645,560.66,637.56,589.89,622c33.63-17.93,59.77-49.07,65.14-87.16q.66-4.7.89-9.54C656.1,521.49,656.08,517.69,656.06,513.9Z" transform="translate(-140.43 -140.52)" filter="url(#blurFilter)" mask="url(#glow-mask)"/>
    <path class="cls-glow" d="M573,191.89a351.72,351.72,0,0,0-65.49-29.17C472.65,151.27,436.57,144.66,400,144c-36.57.64-72.66,7.25-107.5,18.7A351.81,351.81,0,0,0,227,191.89c-5.76,3.31-5.75,3.47-2,9,7.49,11.08,15.5,21.87,22.53,33.22.76,1.22,1.51,2.46,2.24,3.7a59.84,59.84,0,0,0,7,9.72c.54.62,1.11,1.22,1.7,1.81a12.9,12.9,0,0,0,2.29,1.66q9.1,5.19,18.43,9.66l1.18.59a266.61,266.61,0,0,0,75.52,23.3q2.68.41,5.37.77l.27,0c1.85.24,3.72.47,5.59.68,1,.12,2.06.23,3.09.33,2.21.22,4.42.42,6.65.59,1.81.14,3.63.24,5.44.34,1.12.07,2.25.14,3.36.19,2.4.12,4.79.2,7.17.26l1.2,0,3.9.06H402l3.9-.06,1.2,0c2.38-.06,4.77-.14,7.17-.26,1.12,0,2.24-.12,3.36-.19,1.81-.1,3.63-.2,5.44-.34,2.23-.17,4.44-.37,6.65-.59,1.14-.11,2.29-.24,3.43-.37,1.75-.19,3.5-.41,5.25-.64l.28,0q2.68-.36,5.37-.77l2.51-.4a272.61,272.61,0,0,0,74.19-23.49q9.32-4.49,18.42-9.66a12.9,12.9,0,0,0,2.29-1.66c.59-.59,1.16-1.19,1.7-1.81a59.84,59.84,0,0,0,7-9.72c.72-1.21,1.45-2.42,2.19-3.62,7.05-11.38,15.07-22.19,22.58-33.3C578.74,195.36,578.75,195.2,573,191.89Zm-88.67-3c-26,4.31-51.79,9.51-76.93,17.26-2.46.76-4.93,1.46-7.39,2.1-35.55,9.31-71,6.76-106.5-1.58-6.47-1.52-12.87-3.39-19.28-5.17-1.52-.42-3.28-.57-4.69-2.8q17.31-7.49,34.7-13.08c0-.06,0-.11,0-.17a303.12,303.12,0,0,1,191.5,0,1.1,1.1,0,0,1,0,.18c.06.39.12.79.17,1.19C492.06,187.49,488.2,188.23,484.32,188.87Z" transform="translate(-140.43 -140.52)" filter="url(#blurFilter)" mask="url(#glow-mask2)" />
  </g>

</svg>
`;

        liquidShape = `  <g id="group-mask" transform="translate(-135 -135)"><path id="cls-liquid-mask" d="M635.94,524.33c-.12,2.58-.36,5.17-.72,7.71-4.11,29.18-24.58,56.21-54.74,72.29-23,12.26-49.79,20.19-86.87,25.73-19.35,2.88-35.91,4.72-50.64,5.63-3.84.23-7.76.28-12.48.28h-61c-4.72,0-8.64-.05-12.48-.28-14.74-.91-31.3-2.75-50.63-5.63-37.09-5.54-63.89-13.47-86.88-25.73-30.16-16.08-50.62-43.11-54.74-72.3q-.54-3.81-.72-7.68c-.16-3.28-.14-6.71-.12-10.34v-1.42a111.6,111.6,0,0,1,1.72-21A254.41,254.41,0,0,1,182,437.74c7.15-17,16.64-34.86,29-54.74,15.52-25,34.48-50.08,57.9-76.64a313.11,313.11,0,0,0,46.19,16.53,311.24,311.24,0,0,0,44.08,8.4,360.26,360.26,0,0,0,40.72,2.5h.16a360.37,360.37,0,0,0,40.71-2.5,310.6,310.6,0,0,0,44-8.39,311.6,311.6,0,0,0,46.23-16.54C554.48,332.92,573.45,358,589,383c12.36,19.89,21.84,37.8,29,54.74a254,254,0,0,1,16.36,53.85,112.32,112.32,0,0,1,1.73,21.48V514C636.08,517.63,636.1,521.05,635.94,524.33Z" fill="#ffffff"/>`;
        liquidShape += `  <path id="cls-liquid-mask2" d="M557.51,192.86a334.78,334.78,0,0,0-59.63-24.37A358.66,358.66,0,0,0,400,152.87a358.61,358.61,0,0,0-97.88,15.62,334.87,334.87,0,0,0-59.64,24.37c-5.25,2.76-5.24,2.89-1.82,7.54,6.82,9.25,14.11,18.27,20.51,27.75.69,1,1.38,2,2,3.09a50.32,50.32,0,0,0,6.39,8.12c.49.52,1,1,1.55,1.51a11.51,11.51,0,0,0,2.09,1.39q8.28,4.34,16.78,8.07l1.07.49a259,259,0,0,0,68.76,19.46c1.63.23,3.26.45,4.89.65l.25,0c1.68.2,3.39.39,5.09.57l2.81.28c2,.18,4,.35,6.06.49,1.65.12,3.3.2,5,.28,1,.06,2,.12,3.06.16,2.19.1,4.36.17,6.53.22l1.09,0c1.19,0,2.37,0,3.55,0s2.48,0,3.72,0,2.36,0,3.55,0l1.09,0c2.17,0,4.34-.12,6.53-.22,1,0,2-.1,3.06-.16,1.65-.08,3.3-.16,5-.28,2-.14,4-.31,6.06-.49l3.12-.31c1.59-.16,3.19-.35,4.78-.54l.26,0c1.63-.2,3.26-.42,4.89-.65q1.14-.15,2.28-.33A264.38,264.38,0,0,0,510,250.33q8.49-3.75,16.77-8.07a11.51,11.51,0,0,0,2.09-1.39c.54-.49,1.06-1,1.55-1.51a50.32,50.32,0,0,0,6.39-8.12c.65-1,1.32-2,2-3,6.42-9.51,13.72-18.54,20.56-27.82C562.75,195.75,562.76,195.62,557.51,192.86Zm-51.24-.13q-6.37,1.22-12.73,2.54c-12,2.5-24,5.28-35.83,8.49-8.66,2.34-17.26,4.9-25.77,7.75s-16.65,6.21-25.11,8.92c-42,13.52-83.21,8.21-124.32-6.31-7.48-2.64-14.86-5.84-22.26-8.9-1.37-.56-3.35-1.26-4.39-2.34-3.05-3.16,8.73-8.06,10.61-9.08,6.16-3.33,12.49-6.35,18.92-9.11a379.54,379.54,0,0,1,39-14,258.24,258.24,0,0,1,73.28-11.32c3.68,0,7.34.05,11,.14a258.67,258.67,0,0,1,69,11.42Q489,174.45,500,178.85q5.61,2.24,11.13,4.72,2.79,1.25,5.57,2.56c1.24.58,4.37,1.93,3,3.75-1.17,1.5-6.23,1.51-8,1.83S508.05,192.38,506.27,192.73Z" fill="#ffffff"/></g>`;

    }

    else if (fieldData.glassShape == "duck") {

        shape = `<svg id="duck" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 528.2 506.79">
  <defs>
    <style>
      
        .cls-glass {
        opacity: 0.1;
        fill: url(#radial-gradient);
      }

      cls-reflex {
        fill: #f2f2f3;
      }

        .cls-line, .cls-glow {
        fill: none;
        stroke: #f2f2f3;
        stroke-miterlimit: 10;
        stroke-width: 6.19px;
      }

    </style>


    <mask id="glow-mask">
		<path id="glow-mask" d="M607.2,360.73c-23.44,7.75-43.21,5.75-56.53-.43L550,362c-6.22,9-12.47,16.85-17.75,23.08A20.34,20.34,0,0,0,534,413.19c71,65.72,42.48,176.29-41.62,214.93-130.57,60-322-14.78-348.3-162.59-20.77-117,51.38-45.74,83.4-44s92.76-27.25,162-16c2.27.37,4.54.71,6.79,1C342,388.7,303,339.87,303,282.45c0-72.53,62.16-131.35,138.84-131.35s138.86,58.82,138.86,131.35l-1.56,4a9.48,9.48,0,0,1,10.48.51c9.64,7.07,35.56,11.64,57.76,11a11.71,11.71,0,0,1,12,10.38C660.85,321.86,655.13,344.88,607.2,360.73Z" fill="#ffffff" transform="translate(0 0)"/>
	</mask>


    <radialGradient id="radial-gradient" cx="440.5" cy="77.98" r="543.87" gradientUnits="userSpaceOnUse">
      <stop offset="0.02" stop-color="#e1e7e6"/>
      <stop offset="0.78" stop-color="#bcd7de"/>
    </radialGradient>

  </defs>

     <g id="line_group">
    <ellipse id="eye" class="cls-reflex" cx="364.41" cy="121.12" rx="26.67" ry="32.81"/>
    <path id="line" class="cls-line" d="M589.66,287c9.63,7.08,35.55,11.64,57.75,11a11.71,11.71,0,0,1,12,10.38c1.44,13.45-4.28,36.47-52.21,52.32-46.55,15.38-78.63-7.69-74.48-25.42,2.4-10.3,22.13-16.74,32.51-27.78,4.95-5.28,7.77-11.6,10.06-16.71A9.56,9.56,0,0,1,589.66,287Z" transform="translate(-135.9 -146.61)"/>
    <path id="line-2" data-name="line" class="cls-line" d="M550,362c-6.22,9-12.47,16.85-17.75,23.08A20.34,20.34,0,0,0,534,413.19c71,65.72,42.47,176.29-41.62,214.93-130.57,60-322-14.78-348.29-162.59-20.78-117,51.38-45.74,83.39-44s92.76-27.25,162-16c2.27.38,4.54.71,6.79,1C342,388.69,303,339.87,303,282.45c0-72.53,62.16-131.34,138.85-131.34s138.86,58.81,138.86,131.34" transform="translate(-135.9 -146.61)"/>
    <g id="line-3" data-name="line">
      <path class="cls-line" d="M481.8,543c.31,14.73-12.41,27.73-23.06,36.44-11.64,9-25.37,14.91-39.42,18.75-16.94,4.71-34.85,4.75-52.09,2.92-27.45-3.41-59.54-11.87-80-31.52-8.94-8.65-15.16-22.78-10-35.15,2.57-6.4,8.31-11.79,15.27-13a4,4,0,0,1,1.51,7.85c-9.17,2.07-12.16,13.54-8.8,21.81,10.32,26,57.47,37.89,83.07,40.49,16.19,1.62,32.73,1.62,48.35-2.79,15.46-4.56,30.61-11,42.83-21.66C468,560,473.2,550.23,481.8,543Z" transform="translate(-135.9 -146.61)"/>
    </g>
    <g id="line-4" data-name="line">
      <path class="cls-line" d="M347.92,539.94a10.2,10.2,0,0,0-2.29-.32c-2.28-.2-4.73-.27-7-.5-22-1.91-45.31-8-61-24.67-12.94-13.19-21-42.84-4.52-56.17,6.29-4.95,14.9-5.69,22.31-3.63.65.15,2.68.73,3.38.9,2.79.76,10.57,2.82,13.48,3.59,17.66,4.56,36,9.09,54,10,12.2.67,24.37-.86,36.61-2s25.37-1.55,37.46,1.84a108.74,108.74,0,0,0-18.51.44c-21.69,2.58-43.27,9.43-65.38,6.65-15.63-1.76-31-5.49-46.17-9.38L292.38,462c-5-1.16-10.42-.62-14.41,2.51-6.37,5.08-6.84,14.27-5.53,21.87,2.2,14.54,11.81,26.63,24.13,34.37,14.07,9.09,30.65,13.84,46.87,17.79a23.5,23.5,0,0,1,4.48,1.38Z" transform="translate(-135.9 -146.61)"/>
    </g>
  </g>
  <g id="reflex">
    <g id="reflex-2" data-name="reflex">
      <path class="cls-reflex" d="M402.14,192.65c-15.37,14.75-32.14,28.79-45,45.5a103.49,103.49,0,0,0-22,55.63,9.43,9.43,0,0,1-18.55,1.82,83.6,83.6,0,0,1-.23-39.23c7.49-31.77,30-58.52,57.69-74.54A99.8,99.8,0,0,1,390.89,174c11.43-3.75,19.83,10.43,11.25,18.66Z" transform="translate(-135.9 -146.61)"/>
    </g>
    <g id="reflex-3" data-name="reflex">
      <path class="cls-reflex" d="M186.74,529.74c-16.25-14.48-28.14-42.23-31.58-63.56a64.41,64.41,0,0,1-.75-10.66,5.44,5.44,0,0,1,10.46-2c4.15,8.57,12.59,25.77,16.83,34.3,5.74,11.73,11.6,23.71,14.25,36.66a5.65,5.65,0,0,1-9.21,5.3Z" transform="translate(-135.9 -146.61)"/>
    </g>
    <g id="reflex-4" data-name="reflex">
      <path class="cls-reflex" d="M519.71,550.69c4.51-19,11.45-38.07,11.79-57.67.36-11.83-1.76-22.78-5.82-34.28a8.77,8.77,0,0,1,14.72-8.82,67.37,67.37,0,0,1,15,26.56,88,88,0,0,1,2.59,38c-2.4,17.17-9.28,34.06-21.13,46.86C531,567.87,520,563.72,519.82,555l-.11-4.33Z" transform="translate(-135.9 -146.61)"/>
    </g>
    <circle id="reflex-5" data-name="reflex" class="cls-reflex" cx="196.34" cy="173.03" r="10.58"/>
    <circle id="reflex-6" data-name="reflex" class="cls-reflex" cx="66.97" cy="397.03" r="7.79"/>
  </g>
  <path id="glass" class="cls-glass" d="M607.2,360.73c-23.44,7.75-43.21,5.75-56.53-.43L550,362c-6.22,9-12.47,16.85-17.75,23.08A20.34,20.34,0,0,0,534,413.19c71,65.72,42.48,176.29-41.62,214.93-130.57,60-322-14.78-348.3-162.59-20.77-117,51.38-45.74,83.4-44s92.76-27.25,162-16c2.27.37,4.54.71,6.79,1C342,388.7,303,339.87,303,282.45c0-72.53,62.16-131.35,138.84-131.35s138.86,58.82,138.86,131.35l-1.56,4a9.48,9.48,0,0,1,10.48.51c9.64,7.07,35.56,11.64,57.76,11a11.71,11.71,0,0,1,12,10.38C660.85,321.86,655.13,344.88,607.2,360.73Z" transform="translate(-135.9 -146.61)"/>

</svg>

`;

        liquidShape = `<path id="liquid_mask" class="cls-1" d="M393,635.41c-53.22,0-108.38-17.09-151.32-46.88-22.22-15.42-40.7-33.7-54.93-54.32a179.57,179.57,0,0,1-29.41-71c-7.06-39.73-1.39-48.93-.18-50.37.29-.34.72-.87,3-.87,7.46,0,19.89,5.8,30.85,10.91,12.75,5.94,24.78,11.54,35.7,12.13,1.16.07,2.38.1,3.62.1,12.82,0,28.07-3.41,45.73-7.35,23.74-5.31,50.66-11.32,80.19-11.32,10.11,0,20.16,1,30.25,1.52,5.66.26,31,3.8,25.57-8.22-7.41-16.31-24.85-20-38.84-28.58-22.87-14.07-41-35.57-50.15-60.91a111.57,111.57,0,0,1-6.61-37.77c0-65,56.23-117.86,125.35-117.86a132.55,132.55,0,0,1,38.66,5.73,128.37,128.37,0,0,1,33.93,16.09A123.21,123.21,0,0,1,541.52,211a115.74,115.74,0,0,1,18.22,31.27,110.49,110.49,0,0,1,5.47,19c.65,3.33,1.14,6.69,1.48,10.06.25,2.51.85,5.16.55,7.69s-1.59,5.23-2,7.92a12,12,0,0,0,3.7,10.84,12.59,12.59,0,0,0,14.95,1.56c13.66,8.42,39.24,12.2,59.49,12.2.91,0,1.82,0,2.73,0,.28,14.18-14.93,27.05-43.15,36.37a80.88,80.88,0,0,1-25.33,4.37,51,51,0,0,1-21.29-4.23L543.29,342,538,355.63c-4.89,7-10.28,13.94-16,20.75a33.77,33.77,0,0,0,2.89,46.71c14.44,13.37,24.72,29.1,30.54,46.75a110.66,110.66,0,0,1,4,51.85,123.8,123.8,0,0,1-23.52,54.76,129,129,0,0,1-49.07,39.41C459,628.65,426.55,635.4,393,635.41Z" transform="translate(-135 -135)" fill="#ffffff"/>`
  
    }

    glass.innerHTML = shape;
    liquidMask.innerHTML = liquidShape;

}

