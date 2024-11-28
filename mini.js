// Streamlabs v1.0.2
//===========Bars
const completeBar = document.getElementById("complete-bar");
const everything = document.getElementById("everything");
const everythiner = document.getElementById("everythinger");

const marginContainer = document.getElementById("margin-container");
const marginHighlightContainer = document.getElementById("highlight-container");
const marginSVG = document.getElementById("margin-svg");
const margin = document.getElementById("margin-path");
const marginHighlightSVG = document.getElementById("margin_highlight");
const marginHighlightSVG2 = document.getElementById("margin_highlight-2");

const progressBar = document.getElementById("progressBar-container");
const iconContainer = document.getElementById("icon-container");
const iconHolderContainer = document.getElementById("icon-holder");
const iconHolder = document.getElementById("icon-holder-path");
const iconPerse = document.getElementById("icon");
const iconHolderSVG = document.getElementById("icon-holder-svg");
const iconHolderHighlight = document.getElementById("icon-holder-highlight");
const iconHolderHighlightSVG = document.getElementById("icon-holder-highlight-svg");
const iconHolderHighlight2 = document.getElementById("holder_highlight-2");
const iconDiv = document.getElementById("icon-div");
const iconIdle = document.getElementById("icon-idle");
const iconSVG = document.getElementById("icon-svg");

const dotContainer = document.getElementById("dot-container");
const dotPerse = document.getElementById("dot");
const dotSVG = document.getElementById("dot_svg");
const dotSVG2 = document.getElementById("dot_svg-2");
const dotDiv = document.getElementById("dot-div");

const fullBarContainer = document.getElementById("fullBar-container");
const fullBarSVG = document.getElementById("fullBar-svg");
const fullBar = document.getElementById("fullBar-path");

const emptyBarContainer = document.getElementById("emptyBar-container");
const emptyBarSVG = document.getElementById("emptyBar-svg");
const emptyBar = document.getElementById("emptyBar-path");

const highGradient = document.getElementById("linear-gradient");
const fullBarGradient = document.getElementById("linear-gradient-full");
const holderGradient = document.getElementById("linear-gradient-holder");

//===========Texts
const textsDiv = document.getElementById("texts-div");
const textsGlower = document.getElementById("texts-glower");

const goalCounter = document.getElementById("goal-counter");
let counterNum;
let counterDeno;
let percentile;

const goalTitleDiv = document.getElementById("goal-title-div");
const goalTitle = document.getElementById("goal-title");

//===========Field Variables

let eventType = "";
let goalTotal;
let initialValue;
let pastGoal;
let countOne;
let widgetRoundness;
let fullHeight;
let emptyHeight;
let progressWidth;
let progressPosH;
let progressPosV;
let marginOn;
let marginHighlightOn;
let borderWidth;
let borderHeight;
let highlightWidth;
let highlightHeight;
let highlightPosH;
let highlightPosV;
let barGlowOn;
let iconType;
let iconChoice;
let customImage;
let iconFollow;
let iconScale;
let iconHolderOn;
let iconHolderScale;
let iconHolderPosH;
let iconHolderPosV;
let iconPosH;
let iconPosV;
let iconHolderHighlightOn;
let iconHolderHighlightWidth;
let iconHolderHighlightHeight;
let iconHolderHighlightPosH;
let iconHolderHighlightPosV;
let iconGlowOn;
let iconHolderGlowOn;
let colorTheme;
let emptyColor;
let fullColor1;
let fullColor2;
let fullColor3;
let fullGlow;
let fullGlowOn;
let dotOn;
let borderColor;
let borderHighColor1;
let borderHighColor2;
let borderHighColor3;
let iconColor;
let holderColor;
let holderHighColor1;
let holderHighColor2;
let holderHighColor3;
let textsColor;
let textGlow;
let iconGlow;
let titleOn;
let textGlowOn;
let titleText;
let reachTitleOn;
let reachTitleText;
let titleAlign;
let titleSize;
let titlePosH;
let titlePosV;
let titleFont;
let counterType;
let counterSize;
let counterAlign;
let counterPosH;
let counterPosV;
let showCents;
let idleOn;
let idleSpeed;
let eventOn;
let reachOn;
let flipBar;


//===========Globals
let customImageElement;
let reached;
let listener;
let count = 0;
let newValue = 0;
let goalPer;
let currentValue = 0;
let icons1;
let icons2;
let oldValueScale;
let followLeftValue = 0;
let followTopValue = 0;
let fullBarCurrentY;
let fullClone;
let fullClone2;

let startWidthUpdate = 0;
console.log("2");
document.addEventListener('goalLoad', function (obj) {

  reached = false;

  data = obj.detail;
  initialValue = data["amount"]["current"];
  goalTotal = data["amount"]["target"];

  fullBarCurrentY = (16 + 2 * fullHeight) / 2;

  if (data.currency != null) {
    eventType = "tip-latest";
  }
  
  //===========

  fieldSetter();

  //===========

  if (initialValue == null) {
    initialValue = 0;
  }

  if (initialValue > goalTotal) {
    goalPer = 100;
  }
  else {
    goalPer = 100 * initialValue / goalTotal;
  }

  newValue = goalPer;
  currentValue = initialValue;
  oldValueScale = initialValue;

  iconChooser(iconSVG);
  iconSetter();
  barSetter();

  if (flipBar == "on") {
    everything.style.transform = "scaleX(-1) translate(-50%, -50%)";
    everything.style.left = "-50%";
  }

  if (iconFollow == "on") {
    iconDiv.style.transform = "translate(0%, 0%)";

  }

  colorApplier(colorTheme);
  updateBarWithAnimation(0, 0, goalPer);
  initializeGoalTitle(titleText);

  if (counterType != "none") {
    setCounter("goal-counter", 0, goalTotal, "counterNum", "counterDeno");

    if (counterType == "fraction") {
      smoothUpdate(counterNum, initialValue);
    }
    else if (counterType == "percent") {
      updatePercentile(initialValue);
    }
  }

  if (idleOn == "on") {

    idleAnimator(iconIdle, "idleScale", 4);

  }

  setRoundness(fullBarSVG, widgetRoundness);
  if (idleOn == "off") {
    staticGradientRescaler(fullBarGradient, oldValueScale);
  }

});

document.addEventListener('goalEvent', function (obj) {

  let data = obj.detail;
  goalTotal = data["amount"]["target"];
  //console.log(data.listener);

  let oldValue = newValue;
  newValue = (100 * data["amount"]["current"] / goalTotal);
  currentValue = data["amount"]["current"];

  console.log(currentValue);
  
  newValue = Math.min(100, newValue);


  updateBarWithAnimation(0, currentValue, newValue);

  //console.log(data);

  if (counterType == "fraction") {

    if (pastGoal == "off") {
      currentValue = Math.min(currentValue, goalTotal);
    }

    smoothUpdate(counterNum, currentValue);
  }
  else if (counterType == "percent") {
    updatePercentile(currentValue);
  }

  if (currentValue >= goalTotal && reachTitleOn == "on") {
    goalTitle.textContent = reachTitleText;
    //goalCounter.style.opacity = "0";
  }

  if (idleOn == "on" && (currentValue < goalTotal)) {
    gradientAnimator(fullBarGradient, idleSpeed, true);
  }
  else {
    staticGradientRescaler(fullBarGradient, oldValueScale);
    oldValueScale = currentValue;
  }

  if (reachOn == "on" && currentValue >= goalTotal && reached == false) {
    reached = true;
    setTimeout(function () {
      reachAnimation();
    }, 1500);

  }

});

//==========================================================================================FUNCTIONS=================================================================================================================================
//==========================================================================================FUNCTIONS=================================================================================================================================
//==========================================================================================FUNCTIONS=================================================================================================================================

function updateBar(element, currentValue, newValue, duration) {

  if (startWidthUpdate == 0) {
    startWidthUpdate = (16 + 2 * fullHeight) + (450 + 13 * progressWidth) * currentValue / goalTotal;
  }

  let startWidth = startWidthUpdate;
  const changeWidth = Math.max(0, (450 + 13 * progressWidth) * newValue / 100 - startWidth);
  const endWidth = (450 + 13 * progressWidth);

  duration = duration || 1000;
  const startTime = performance.now();

  element.setAttribute('height', (16 + 2 * fullHeight));
  element.setAttribute('y', 0);

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeInOut(progress);

    const currentWidth = startWidth + (changeWidth * easedProgress) - (16 + 2 * fullHeight);
    //console.log("aqui " + currentWidth);

    // Update the y attribute based on the change in height

    element.setAttribute('width', (16 + 2 * fullHeight) + Math.min(endWidth, currentWidth));
    startWidthUpdate = (16 + 2 * fullHeight) + Math.min(endWidth, currentWidth);
    //startWidthUpdate = element.getClientRects()[0].width*2 - (16 + 2 * fullHeight)*(1 - Math.min(1,(startWidthUpdate2 + changeWidth) / goalTotal));


    if (elapsedTime < duration) {
      requestAnimationFrame(animate);
    }
  }

  startWidthUpdate = (16 + 2 * fullHeight) + Math.min(endWidth, startWidth + changeWidth);

  requestAnimationFrame(animate);

  let returnArray = [Math.min((startWidth + changeWidth) - (16 + 2 * fullHeight) * (1 - Math.min(1, currentValue / goalTotal)), (16 + 2 * fullHeight) * (1 - Math.min(1, currentValue / goalTotal)) + Math.min(endWidth, startWidth + changeWidth)), (16 + 2 * fullHeight), (Math.min(1, currentValue / goalTotal))];


  //console.log("return " + returnArray[0]);

  startWidthUpdate = element.getClientRects()[0].width * 2 - (16 + 2 * fullHeight) * (1 - Math.min(1, (startWidth + changeWidth) / goalTotal));
  element.setAttribute('width', startWidthUpdate);
  followBar(iconDiv, 1500, returnArray);
}

function followBar(element, duration, fullBarScale, isDot, currentValue) {

  fullBarScale = fullBarScale || [(450 + 13 * progressWidth), (16 + 2 * fullHeight)];
  fullBarScale[0] = Math.min(fullBarScale[0], (450 + 13 * progressWidth));
  isDot = isDot || false;
  currentValue = currentValue || 0;

  let xAdjustforSize = iconHolder.getClientRects()[0].width / 1;

  let dotPos = 0;
  if (flipBar == "on") {
    dotPos = (-1) * ((1 / 2) - Math.min(1, currentValue / goalTotal)) * ((16 + 2 * fullHeight) / 2) - xAdjustforSize*0;
  }
  else {
    dotPos = ((1 / 2) - Math.min(1, currentValue / goalTotal)) * ((16 + 2 * fullHeight) / 2) + xAdjustforSize*0;
  }

  if (followTopValue == 0) {
    followTopValue = fullBar.getClientRects()[0].top;
  }

  if (followLeftValue == 0) {
    if (flipBar == "on") {
    	followLeftValue = dotPos + fullBar.getClientRects()[0].right - parseFloat(everything.getClientRects()[0].width / 2) - 1*0.2*xAdjustforSize;
    }
    else {
    	followLeftValue = dotPos + fullBar.getClientRects()[0].left - parseFloat(everything.getClientRects()[0].width / 2) + 1*0.2*xAdjustforSize;

    }
  }
  let currentPositionX = parseFloat(followLeftValue);

  duration = duration || 1000;
  element.style.top = -progressPosV * 0.1 + "%";

  let initialPositionX;
  if (flipBar == "on") {
    initialPositionX = dotPos + fullBar.getClientRects()[0].right - parseFloat(everything.getClientRects()[0].width / 2) - fullBarScale[0] / 1 - 0*xAdjustforSize/2;
  }
  else {
    initialPositionX = dotPos + fullBar.getClientRects()[0].left - parseFloat(everything.getClientRects()[0].width / 2) + fullBarScale[0] / 1 + 0*xAdjustforSize/2;
  }

  //fullBarScale[2] = 1;
  let newPositionX; 
  if (flipBar == "on") {
    newPositionX = dotPos + fullBar.getClientRects()[0].right - parseFloat(everything.getClientRects()[0].width / 2) - fullBarScale[0] / 1 + 0.5*xAdjustforSize * fullBarScale[2] - 1*0.2*xAdjustforSize * (1-fullBarScale[2]);
  }
  else {
    newPositionX = dotPos + fullBar.getClientRects()[0].left - parseFloat(everything.getClientRects()[0].width / 2) + fullBarScale[0] / 1 - 0.5*xAdjustforSize * fullBarScale[2] + 1*0.2*xAdjustforSize * (1-fullBarScale[2]);
  }
  
  function animate(timestamp) {

    let currentTime = timestamp || performance.now();
    let elapsedTime = currentTime - startTime;

    let progress = Math.min(elapsedTime / duration, 1);
    let easedProgress = easeInOut(progress);

    let deltaX = newPositionX - currentPositionX;

    let smoothPositionX;

    if (flipBar == "on") {
      smoothPositionX = currentPositionX + (deltaX) * easedProgress;
    }
    else {
      smoothPositionX = currentPositionX + (deltaX) * easedProgress;
    }

    if (flipBar == "on") {
      element.style.left = -smoothPositionX + "px";
    }
    else {
      element.style.left = smoothPositionX + "px";
    }

    if (elapsedTime < duration) {
      requestAnimationFrame(animate);
    }
  }

  let startTime = null;

  requestAnimationFrame(function (timestamp) {
    startTime = timestamp || performance.now();
    animate(startTime);
  });

  if (flipBar == "on") {
    followLeftValue = dotPos + fullBar.getClientRects()[0].right - parseFloat(everything.getClientRects()[0].width / 2) - fullBarScale[0] / 1 + 0.5*xAdjustforSize * fullBarScale[2] - 1*0.2*xAdjustforSize * (1-fullBarScale[2]);
  }
  else {
    followLeftValue = dotPos + fullBar.getClientRects()[0].left - parseFloat(everything.getClientRects()[0].width / 2) + fullBarScale[0] / 1 - 0.5*xAdjustforSize * fullBarScale[2] + 1*0.2*xAdjustforSize * (1-fullBarScale[2]);
  }
}


function updateBarWithAnimation(oldValue, currentValue, newValue) {
  if (dotOn == "on") {
    dotDiv.style.opacity = 1;
  }
  if (iconFollow == "on") {



    if (currentValue < goalTotal) {
      updateBar(fullBar, currentValue, newValue, 1500);

    }
  }
  else {
    updateBar(fullBar, currentValue, newValue, 1500);

  }

  if (eventOn == "on") {
    setTimeout(function () {
      pulseAnimation(iconDiv, 1500, 1.2, 1.5);
    }, 1500);
  }
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function updatePercentile(currentValue) {

  if (pastGoal == "off") {
    goalPer = Math.min(100, currentValue * 100 / goalTotal);
  }
  else {
    goalPer = currentValue * 100 / goalTotal;
  }
  //console.log(goalPer);
  smoothUpdate(percentile, goalPer);

}

function smoothUpdate(element, goalValue) {
  let currentValue = parseFloat(element.textContent.split(' / ')[0]) || 0; // Extracting the current value from the text content
  const duration = 1000; // Duration of the transition in milliseconds
  const steps = 15; // Number of steps for the transition
  const increment = (goalValue - currentValue) / steps;

  let step = 0;
  const transitionInterval = setInterval(() => {
    if (step < steps) {
      currentValue += increment;
      if (counterType == "fraction" && showCents == "on") {
        if (eventType == "tip-latest") {
          element.textContent = currentValue.toFixed(2); // Reconstructing the text content with the updated current value
        }
        else {
          element.textContent = currentValue.toFixed(0);
        }
      }
      else {
        element.textContent = currentValue.toFixed(0);
      }
      step++;
    } else if (counterType == "fraction") {
      if (showCents == "on") {
        if (eventType == "tip-latest") {
          element.textContent = currentValue.toFixed(2); // Reconstructing the text content with the updated current value
        }
        else {
          element.textContent = currentValue.toFixed(0);
        }
      }
      else {
        element.textContent = currentValue.toFixed(0);
      }
      clearInterval(transitionInterval);
    }
  }, duration / steps);
}

function setCounter(elementId, numerator, denominator, numeratorId, denominatorId) {
  // Get the original element
  const originalElement = document.getElementById(elementId);

  if (originalElement) {
    // Create a new span element for the numerator
    counterNum = document.createElement('span');
    counterNum.id = numeratorId;
    if (showCents == "on") {
      if (eventType === "tip-latest") {
        counterNum.textContent = numerator.toFixed(2);
      }
      else {
        counterNum.textContent = numerator.toFixed(0);
      }
    }
    else {
      if (eventType === "tip-latest") {
        counterNum.textContent = numerator.toFixed(0);
      }
      else {
        counterNum.textContent = numerator.toFixed(0);
      }

    }

    // Create a new span element for the denominator
    counterDeno = document.createElement('span');
    counterDeno.id = denominatorId;
    if (showCents == "on") {
      if (eventType === "tip-latest") {
        counterDeno.textContent = data.currency + denominator.toFixed(2) + "";
      }
      else {
        counterDeno.textContent = denominator.toFixed(0);
      }
    }
    else {
      if (eventType === "tip-latest") {
        counterDeno.textContent = data.currency + denominator.toFixed(0) + "";
      }
      else {
        counterDeno.textContent = denominator.toFixed(0);
      }
    }

    // Create a new span element to wrap the original content
    const wrapperSpan = document.createElement('span');
    wrapperSpan.textContent = originalElement.textContent;
    originalElement.textContent = '';
    originalElement.appendChild(wrapperSpan);

    if (counterType == "fraction") {
      // Append the numerator and denominator spans inside the wrapper span
      if (eventType == "tip-latest") {
        let counterSign = document.createElement('span');
        counterSign.id = "counterSign";
        counterSign.textContent = '$';
        wrapperSpan.appendChild(counterSign);
      }

      wrapperSpan.appendChild(counterNum);
      wrapperSpan.appendChild(document.createTextNode(' / ')); // Add a slash between numerator and denominator
      wrapperSpan.appendChild(counterDeno);

    }
    else if (counterType == "percent") {

      percentile = document.createElement('span');
      percentile.id = "percentCounter";
      percentile.textContent = (numerator * 100 / denominator).toFixed(0);
      wrapperSpan.appendChild(percentile);

      let counterSign = document.createElement('span');
      counterSign.id = "counterSign";
      counterSign.textContent = '%';
      wrapperSpan.appendChild(counterSign);
    }
  }
}

function initializeGoalTitle(newTitle) {

  goalTitle.textContent = newTitle;

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var fontSizeRescale = windowHeight / 1400;

  goalTitle.style.fontSize = titleSize * fontSizeRescale + "px";
  goalTitle.style.fontFamily = titleFont + ", sans-serif";

  goalTitle.style.top = ((-1) * titlePosV * 0.50 + 50) + "%";
  goalTitle.style.left = (titlePosH * 0.50 + 50) + "%";

  goalTitle.style.textAlign = titleAlign;

  goalCounter.style.fontSize = counterSize * fontSizeRescale + "px";
  goalCounter.style.fontFamily = titleFont + ", sans-serif";


  goalCounter.style.top = (counterPosV * (-0.50) + 50) + "%";
  goalCounter.style.left = (counterPosH * 0.25 + 50) + "%";

  goalCounter.style.textAlign = counterAlign;

  if (titleOn == "off" && counterType == "none") {
    return;
  }

  if (titleOn == "on") {
    goalTitle.style.opacity = "1";
  }
  else {
    goalTitle.textContent = "";
    goalCounter.style.transform = "translate(-50%, " + (17 - 96 / 70 + counterSize / 20) + "%)";

  }

  if (counterType != "none") {
    goalCounter.style.opacity = "1";
  }

}

function setRoundness(svgElement, newRoundness) {

  const rectElement = svgElement.querySelector('rect');
  if (!rectElement) {
    console.error('No <rect> element found inside SVG element with ID ' + svgElementId);
    return;
  }

  let rad = rectElement.getAttribute("height") / 2;

  rectElement.setAttribute('rx', rad * newRoundness / 100);
}

function sizeSetter(element, increaseWidth, increaseHeight) {

  const rectElement = element.querySelector('rect');

  const currentWidth = parseFloat(rectElement.getAttribute("width"));
  const currentHeight = parseFloat(rectElement.getAttribute("height"));

  const newWidth = currentWidth + increaseWidth;
  const newHeight = currentHeight + increaseHeight;

  const viewBoxAttr = element.getAttribute('viewBox');

  if (!viewBoxAttr) {
    console.error('ViewBox attribute not found for SVG element with ID ' + svgElementId);
    return null;
  }

  const viewBoxValues = viewBoxAttr.split(' ');

  const translateX = (parseFloat(viewBoxValues[2]) - newWidth) / 2;
  const translateY = (parseFloat(viewBoxValues[3]) - newHeight) / 2;

  rectElement.setAttribute('width', newWidth);
  rectElement.setAttribute('height', newHeight);

  rectElement.setAttribute('transform', `translate(${translateX}, ${translateY})`);

  //console.log(element + " " + newWidth);

}

function barSetter() {

  //fullBar.setAttribute("y", fullHeight);

  sizeSetter(marginSVG, 13 * borderWidth, 2.5 * borderHeight);
  sizeSetter(marginHighlightSVG, 13 * highlightWidth, 2.5 * highlightHeight);
  sizeSetter(fullBarSVG, 13 * progressWidth, 2 * fullHeight);
  sizeSetter(emptyBarSVG, 13 * progressWidth, 2 * emptyHeight);

  setRoundness(marginSVG, widgetRoundness);
  setRoundness(fullBarSVG, widgetRoundness);
  setRoundness(emptyBarSVG, widgetRoundness);
  setRoundness(marginHighlightSVG, widgetRoundness);

  dotSVG.style.transform += " scale(" + (0.4 + fullHeight / 50) + ")";
  setRoundness(dotSVG, widgetRoundness);

  fullBar.setAttribute("y", fullBarCurrentY);

  progressBar.style.left = -progressPosH * 0.2 + 50 + "%";
  progressBar.style.top = -progressPosV * 0.1 + 50 + "%";

  if (marginOn == "on") {
    marginContainer.style.opacity = 1;
  }
  if (marginHighlightOn == "on") {
    marginHighlightContainer.style.opacity = 1;
    marginHighlightContainer.style.left = (-1) * highlightPosH * 0.2 + 50 + "%";
    marginHighlightContainer.style.top = (-1) * highlightPosV * 0.1 + 50 + "%";
  }

}

function iconSetter() {

  if (iconType == "none") {
    icon.style.opacity = 0;
  }

  iconDiv.style.top = (-1) * iconHolderPosV * 0.5 + 50 + "%";
  iconDiv.style.left = (-1) * iconHolderPosH * 0.5 + 50 + "%";

  if (iconHolderOn == "on") {
    iconHolderContainer.style.opacity = 1;
  }
  if (iconHolderHighlightOn == "on") {
    iconHolderHighlight.style.opacity = 1;
  }

  if (iconType == "custom") {

    customImageElement = document.createElement("img");
    customImageElement.src = customImage;

    customImageElement.style.position = "absolute";
    customImageElement.style.top = "50%";
    customImageElement.style.left = "50%";

    if (flipBar == "on") {
      customImageElement.style.transform = "translate(-50%, -50%) scaleX(-1)";
    }
    else {
      customImageElement.style.transform = "translate(-50%, -50%)";
    }

    customImageElement.style.height = "200%";
    customImageElement.style.width = "auto";

    iconPerse.removeChild(iconSVG);
    iconPerse.appendChild(customImageElement);
  }

  setRoundness(iconHolderSVG, widgetRoundness);

  sizeSetter(iconHolderHighlightSVG, iconHolderHighlightWidth - 120, iconHolderHighlightHeight - 120);
  setRoundness(iconHolderHighlightSVG, widgetRoundness);

  iconIdle.style.top = (-1) * iconPosV * 0.5 + 50 + "%";
  iconIdle.style.left = (-1) * iconPosH * 0.25 + 50 + "%";

  iconChooser(iconSVG);
  if (flipBar == "on") {
    iconSVG.style.transform = "scaleX(-1)";
  }

  icon.style.transform = "translate(-50%, -50% ) scaleX(" + (0.1 + 0.08 * iconScale) + ") scaleY(" + (0.1 + 0.08 * iconScale) + ")";

  iconHolderHighlight.style.top = (-1) * iconHolderHighlightPosV * 0.5 + 50 + "%";
  iconHolderHighlight.style.left = (1) * iconHolderHighlightPosH * 0.5 + 50 + "%";

  iconContainer.style.opacity = 1;
  iconContainer.style.transform = "translate(-50%, -50% ) scaleX(" + (0.01 + 0.02 * iconHolderScale) + ") scaleY(" + (0.01 + 0.02 * iconHolderScale) + ")"; /* Center the div precisely */

}

function iconChooser(element) {
  let shape;
  if (iconChoice == "bit") {
    shape = `<svg id="Bit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158.92 195.71">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Bit-2" data-name="Bit" class="cls-1" d="M485.7,392.74,406.24,530.37l79.46,58.08,79.45-58.08Zm0,22.71,56.77,98.33L485.7,472.29l-56.78,41.49Z" transform="translate(-406.24 -392.74)"/>
        </svg>		
		`
    element.innerHTML = shape;

    //iconSVG.style.transform = "translate(-50%, -49%) scaleX(0.35) scaleY(0.35)";
    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "butterfly1") {
    shape = `<svg id="Butterfly_full" data-name="Butterfly full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267.6 205.58">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Butterfly_full-2" data-name="Butterfly full" class="cls-1" d="M616.53,385.53C598.66,351.71,520.19,406.17,493.3,477c-.05-.5-.09-1-.14-1.49-.18-1.64-.39-3.15-.61-4.53-.07-.45-.14-.9-.22-1.32-.15-.85-.31-1.64-.48-2.36-.08-.36-.16-.7-.25-1a5.15,5.15,0,0,1-.15-1.66,4.82,4.82,0,0,1,.4-1.61,6,6,0,0,0,.73-3.89,4.12,4.12,0,0,0-3.07-3.22l-.16-.06a127.86,127.86,0,0,1,28.31-46.56,1.52,1.52,0,1,0-2.13-2.17,123,123,0,0,0-17.32,24.37,128.49,128.49,0,0,0-10.27,24,8.11,8.11,0,0,0-.86-.14l-.17,0a11.17,11.17,0,0,0-1.17-.06h-.08a11.17,11.17,0,0,0-1.17.06l-.17,0a7.71,7.71,0,0,0-.86.14,130,130,0,0,0-27.59-48.35,1.52,1.52,0,0,0-2.18,2.12,104.94,104.94,0,0,1,9.48,11.13,130.34,130.34,0,0,1,18.88,35.48l-.16.06a4.12,4.12,0,0,0-3.07,3.22,6,6,0,0,0,.73,3.89,4.82,4.82,0,0,1,.4,1.61,5.15,5.15,0,0,1-.15,1.66c-.09.32-.17.66-.25,1-.17.72-.33,1.51-.48,2.36-.08.42-.15.87-.22,1.32-.22,1.38-.43,2.89-.61,4.53-.05.49-.1,1-.15,1.51-26.87-70.88-105.36-125.35-123.23-91.53-16.2,30.68,38.32,99.2,58.25,109.47a59.66,59.66,0,0,0,11.15,4.36l-.5-.14c-8.17,6.08-14.79,13.93-18,23.95-10.08,31.74,6.92,66,27,55.84,18.43-9.27,38.15-36.23,48-63.92.39,1.22.78,2.32,1.15,3.27a5.88,5.88,0,0,1,.28,3.47,50.88,50.88,0,0,0-1.1,11.09q0,.89,0,1.74c.23,8.59,2.18,15.3,4.55,15.3h0c2.37,0,4.32-6.71,4.55-15.3q0-.85,0-1.74a50.88,50.88,0,0,0-1.1-11.09,5.88,5.88,0,0,1,.28-3.47c.37-1,.76-2,1.15-3.26,9.83,27.69,29.55,54.64,48,63.91,20.09,10.11,37.09-24.1,27-55.84-3.18-10-9.8-17.87-18-23.95l-.51.14A59.66,59.66,0,0,0,558.28,495C578.21,484.73,632.73,416.21,616.53,385.53ZM477.38,494.06h0A98.08,98.08,0,0,1,462.84,499,98.7,98.7,0,0,0,477.38,494.06Zm16.64,0A97.76,97.76,0,0,0,508.55,499,98.3,98.3,0,0,1,494,494.07ZM379.39,402.29c10.87-16.89,59.61,3.36,88.55,55.51-18.41-27.58-48.89-46.41-61.76-36.06-11.88,9.55,1.81,44.51,27.23,66.89,10.63,9.36,22.63,10.15,32.7,8.1-12.92,3.41-31.35,5.18-45.93-5.73C402.57,477.82,365.72,423.54,379.39,402.29Zm83.27,96.77-2.33.56Zm-2.35.56c-.82.19-1.65.36-2.5.53C458.66,500,459.49,499.81,460.31,499.62Zm-2.63.56-2.28.41Zm-2.75.49c-.79.13-1.58.25-2.39.36C453.35,500.92,454.14,500.8,454.93,500.67Zm-2.51.37c-.85.11-1.71.21-2.57.3C450.71,501.25,451.57,501.16,452.42,501Zm-3.15.35c-.67.07-1.35.12-2,.17C447.92,501.51,448.6,501.46,449.27,501.39Zm-21.9-1.25-1.23-.28ZM441,564.19c-17.38,10.19-31.16-18.79-24.83-42.28a44.37,44.37,0,0,1,13-21.38,67.29,67.29,0,0,0,11.22,1.19l-.87,0c-7,12.52-3.66,31.73,2.76,37.53,9.11,8.23,25.25-5.72,33.49-21.89,1.35-2.67,2.52-5.2,3.53-7.6.15.64.3,1.25.46,1.84C472.67,533.57,458,554.23,441,564.19Zm5.54-62.58c-.84.05-1.68.09-2.53.11C444.84,501.7,445.68,501.66,446.52,501.61Zm-2.7.11c-.84,0-1.68,0-2.53,0C442.14,501.74,443,501.74,443.82,501.72Zm111.43,20.19c6.33,23.49-7.45,52.47-24.83,42.28-17-10-31.7-30.61-38.79-52.59.15-.6.31-1.21.45-1.84,1,2.39,2.18,4.92,3.54,7.58,8.24,16.17,24.38,30.12,33.49,21.89,6.42-5.8,9.8-25,2.76-37.53l-.88,0a67.29,67.29,0,0,0,11.22-1.19A44.38,44.38,0,0,1,555.25,521.91Zm-46.52-22.85c.76.19,1.54.38,2.34.56C510.27,499.44,509.49,499.25,508.73,499.06Zm2.35.56c.82.19,1.65.36,2.5.53C512.73,500,511.9,499.81,511.08,499.62Zm2.63.56,2.28.41Zm2.75.49c.79.13,1.58.25,2.39.36C518,500.92,517.25,500.8,516.46,500.67ZM519,501c.85.12,1.71.21,2.57.3C520.68,501.25,519.82,501.15,519,501Zm3.15.35c.67.07,1.35.12,2,.17C523.47,501.51,522.79,501.46,522.12,501.39Zm2.75.22c.84.05,1.68.09,2.53.11C526.55,501.7,525.71,501.66,524.87,501.61Zm2.7.11c.84,0,1.68,0,2.53,0C529.25,501.74,528.41,501.74,527.57,501.72ZM544,500.14l1.23-.28Zm7.19-9.14c-14.58,10.91-33,9.14-45.93,5.73,10.07,2,22.07,1.26,32.7-8.1,25.42-22.38,39.12-57.34,27.23-66.89-12.87-10.35-43.35,8.48-61.76,36.06,28.94-52.15,77.68-72.4,88.55-55.51C605.67,423.54,568.82,477.82,551.21,491Z" transform="translate(-351.89 -375.24)"/>
        </svg>	
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "butterfly2") {
    shape = `<svg id="Butterfly_line" data-name="Butterfly line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 277.61 215.58">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Butterfly_line-2" data-name="Butterfly line">
            <path id="Butterfly_line_u_r" data-name="Butterfly line u r" class="cls-1" d="M458,492.23c-9.15,1.88-20.08,1.17-29.75-7.34-23.09-20.33-35.52-52.07-24.73-60.74,11.68-9.4,39.36,7.7,56.08,32.72-26.28-47.33-70.54-65.72-80.4-50.39-12.41,19.3,21.05,68.59,37,80.56C429.46,497,446.24,495.34,458,492.23Z" transform="translate(-346.89 -370.24)"/>
            <path id="Butterfly_line_d_r" data-name="Butterfly line d r" class="cls-1" d="M441.61,539c-5-4.56-8.11-17.9-5.18-29.06a51,51,0,0,1-11.32-3.25,41.64,41.64,0,0,0-8.24,15.92c-6,22.23,7.05,49.66,23.5,40,13.77-8.08,26-23.57,33.4-40.93,0-.12.05-.24.08-.36-.22-.55-.52-1.36-.87-2.41C465.08,534,450.11,546.73,441.61,539Z" transform="translate(-346.89 -370.24)"/>
            <path id="Butterfly_line_u_l" data-name="Butterfly line u l" class="cls-1" d="M511.82,456.87c16.72-25,44.4-42.12,56.08-32.72,10.79,8.67-1.64,40.41-24.73,60.74-9.67,8.51-20.6,9.22-29.75,7.34,11.73,3.11,28.51,4.73,41.76-5.19,16-12,49.45-61.26,37-80.56C582.36,391.15,538.1,409.54,511.82,456.87Z" transform="translate(-346.89 -370.24)"/>
            <path id="Butterfly_line_d_l" data-name="Butterfly line d l" class="cls-1" d="M535,510c2.93,11.16-.14,24.5-5.18,29.06-8.5,7.68-23.47-5-31.36-20.07-.36,1-.66,1.86-.87,2.4l.09.39c7.43,17.35,19.62,32.83,33.38,40.9,16.45,9.65,29.49-17.78,23.5-40a41.64,41.64,0,0,0-8.24-15.92A50.84,50.84,0,0,1,535,510Z" transform="translate(-346.89 -370.24)"/>
            <path id="Butterfly_line_base" data-name="Butterfly line base" class="cls-1" d="M621,383.2c-4.48-8.48-12.29-13-22.59-13-16.52,0-39.17,12.12-60.59,32.42a202.37,202.37,0,0,0-45.91,64.73v-.05c-.08-.36-.16-.7-.25-1a5.15,5.15,0,0,1-.15-1.66,4.82,4.82,0,0,1,.4-1.61,6,6,0,0,0,.73-3.89,4.12,4.12,0,0,0-3.07-3.22l-.16-.06a127.86,127.86,0,0,1,28.31-46.56,1.52,1.52,0,1,0-2.13-2.17,123,123,0,0,0-17.32,24.37,128.49,128.49,0,0,0-10.27,24,8.11,8.11,0,0,0-.86-.14l-.17,0a11.17,11.17,0,0,0-1.17-.06h-.08a11.17,11.17,0,0,0-1.17.06l-.17,0a7.71,7.71,0,0,0-.86.14,130,130,0,0,0-27.59-48.35,1.52,1.52,0,0,0-2.18,2.12,104.94,104.94,0,0,1,9.48,11.13,130.34,130.34,0,0,1,18.88,35.48l-.16.06a4.12,4.12,0,0,0-3.07,3.22,6,6,0,0,0,.73,3.89,4.82,4.82,0,0,1,.4,1.61,5.15,5.15,0,0,1-.15,1.66c-.09.32-.17.66-.25,1l0,.07a202.44,202.44,0,0,0-45.91-64.75c-21.42-20.3-44.07-32.42-60.59-32.42h0c-10.29,0-18.1,4.48-22.58,13-4.62,8.74-4.73,20.28-.32,34.3,6.41,20.41,20.45,40.32,28.24,50.36,11.85,15.27,24.29,27.37,32.46,31.58,1,.54,2.11,1.05,3.19,1.53a50.06,50.06,0,0,0-13,20.69c-6,18.8-3.49,40.32,6.18,53.54,5,6.85,11.56,10.62,18.43,10.62a20.85,20.85,0,0,0,9.41-2.34c11.68-5.88,24-18.17,34.58-34.61A158.21,158.21,0,0,0,481.39,527c-.18,1.84-.28,3.82-.28,5.9q0,.89,0,1.74c.23,8.59,2.18,15.3,4.55,15.3h0c2.37,0,4.32-6.71,4.55-15.3q0-.85,0-1.74c0-2.07-.1-4-.28-5.87a157.82,157.82,0,0,0,11.76,21.82c10.62,16.44,22.9,28.73,34.58,34.61a20.88,20.88,0,0,0,9.41,2.34c6.87,0,13.42-3.78,18.43-10.62,9.67-13.22,12.15-34.74,6.18-53.54a50.06,50.06,0,0,0-13-20.69c1.08-.48,2.15-1,3.19-1.53,8.18-4.21,20.61-16.31,32.46-31.58,7.79-10,21.83-29.95,28.24-50.36C625.68,403.48,625.57,391.94,621,383.2ZM432.79,579a15.88,15.88,0,0,1-7.16,1.81c-16.67,0-28.7-29.78-19.85-57.65,3.19-10,9.82-17.87,18-24A58.75,58.75,0,0,1,413.11,495c-19.93-10.27-74.45-78.79-58.25-109.47,3.74-7.08,10.14-10.29,18.17-10.29,30.31,0,83.82,45.79,105.06,101.84-.11,1.2-.22,2.43-.31,3.74s-.17,2.55-.23,3.89c-.12,2.67-.19,5.52-.19,8.5a73.9,73.9,0,0,0,3.41,21.86C471,542.77,451.23,569.73,432.79,579Zm125.49-84a58.75,58.75,0,0,1-10.65,4.21c8.16,6.09,14.79,13.94,18,24,8.85,27.87-3.18,57.65-19.85,57.65A15.88,15.88,0,0,1,538.6,579c-18.43-9.28-38.15-36.23-48-63.93A74.19,74.19,0,0,0,494,493.21c0-3-.07-5.83-.19-8.5-.06-1.34-.14-2.64-.23-3.89s-.2-2.56-.32-3.76c21.25-56,74.76-101.82,105.06-101.82,8,0,14.43,3.21,18.17,10.29C632.73,416.21,578.21,484.73,558.28,495Z" transform="translate(-346.89 -370.24)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "cat") {
    shape = `<svg id="Cat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.69 178.04">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Cat_full" data-name="Cat full" class="cls-1" d="M566.82,442.26c-4.07-12.28-9.47-24.19-15-35.92-2.9-6.15-3.76-5.93-9.34-2.19C530,412.52,520.76,423.78,513.8,437c-1.34,2.53-2.57,3.45-5.71,2.9a124.54,124.54,0,0,0-44.28-.06c-3.41.61-4.83-.3-6.44-3.27C449.46,422,439,409.62,423.26,400.78l-1.75,2.62a62.48,62.48,0,0,0-4,6.22c-15.15,31-24.35,63.51-20.95,98.34,3.09,31.77,19.57,54.08,50.21,64.71,21.72,7.54,44,7.51,66.41,3.35,34.31-6.36,58.4-32.91,61.68-67.48C577,485.78,573.91,463.71,566.82,442.26ZM457.64,509.07c-.86,5.66-5,10-9.8,10.27-4.49.23-8.39-3.05-10.08-8.61a16.14,16.14,0,0,1-.75-4.36c-.16-7.61,4.64-13.76,10.6-13.69s10.25,5.88,10.21,13.83C457.78,507.1,457.78,508.1,457.64,509.07Zm37,10.9c-.78,4.58-5.36,9.76-8.55,10s-8.23-5-9.4-10Zm7.15,19.11c-3.93,3.67-8.95,2.87-16.42-2.11-4.39,3.46-8.79,5.82-14.24,3.35-3.3-1.5-5-4-4.92-7.25,3.23,1.92,6.37,5.24,9.58,5.3s6.64-3,9.87-4.73c2.61,1.42,6,4.59,9.44,4.73,3.06.12,6.26-3.14,10-5.27C504.16,535,503.47,537.53,501.82,539.08Zm21.92-19.72c-5.92,0-10.74-6.31-10.43-13.82a18.05,18.05,0,0,1,.71-4.38c1.58-5.22,5.33-8.45,9.68-8.47,4.55,0,8.42,3.43,9.85,8.89a26.4,26.4,0,0,1,.55,3.47C534.13,513.38,529.51,519.35,523.74,519.36Z" transform="translate(-395.85 -400.78)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "cat_Line") {
    shape = `<svg id="Cat_line" data-name="Cat line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.72 178.08">
          <defs>
            <style>
              .cls-1 {
                fill: #fadeeb;
              }
            </style>
          </defs>
          <g id="Cat_line-2" data-name="Cat line">
            <path id="Mouth_line" data-name="Mouth line" class="cls-1" d="M485.41,537.73c-4.4,3.45-8.8,5.82-14.26,3.34-3.29-1.49-4.95-4-4.92-7.24,3.24,1.92,6.38,5.23,9.59,5.29s6.64-3,9.87-4.72c2.61,1.41,6,4.58,9.44,4.72,3.06.13,6.26-3.14,10-5.27-1,1.87-1.69,4.44-3.34,6C497.89,543.5,492.86,542.71,485.41,537.73Z" transform="translate(-395.84 -401.51)"/>
            <path id="Nose_line" data-name="Nose line" class="cls-1" d="M476.72,520.72h17.95c-.79,4.58-5.36,9.77-8.56,10C483.07,531.05,477.88,525.72,476.72,520.72Z" transform="translate(-395.84 -401.51)"/>
            <path id="Eye_l_line" data-name="Eye l line" class="cls-1" d="M534.11,505.81c0,8.32-4.59,14.29-10.36,14.31s-10.74-6.31-10.44-13.83a17.89,17.89,0,0,1,.71-4.37c1.58-5.24,5.33-8.46,9.69-8.49,4.54,0,8.41,3.43,9.85,8.9A27.77,27.77,0,0,1,534.11,505.81Z" transform="translate(-395.84 -401.51)"/>
            <path id="Eye_r_line" data-name="Eye r line" class="cls-1" d="M457.82,507.26c0,.6,0,1.6-.19,2.57-.85,5.65-5,10-9.79,10.26-4.5.23-8.4-3-10.1-8.61a16.58,16.58,0,0,1-.73-4.35c-.17-7.62,4.63-13.77,10.59-13.7S457.85,499.31,457.82,507.26Z" transform="translate(-395.84 -401.51)"/>
            <path id="Cat_line-3" data-name="Cat line" class="cls-1" d="M423.25,401.51c15.77,8.84,26.2,21.17,34.12,35.76,1.61,3,3,3.88,6.43,3.26a125.06,125.06,0,0,1,44.29.06c3.15.56,4.37-.36,5.71-2.89,7-13.18,16.23-24.44,28.69-32.82,5.57-3.74,6.43-4,9.33,2.19,5.54,11.73,10.94,23.64,15,35.94,7.1,21.45,10.21,43.52,8,66.28-3.28,34.57-27.38,61.13-61.7,67.5-22.44,4.16-44.68,4.19-66.42-3.36-30.64-10.64-47.12-32.94-50.22-64.72-3.4-34.83,5.8-67.31,21-98.35a58.63,58.63,0,0,1,4-6.22C422,403.31,422.59,402.5,423.25,401.51Zm122.36,13.05c-12.37,10.26-21.13,21.24-26.18,34.86-1.32,3.58-2.73,3.87-6.16,2.85-17.47-5.18-35.16-5.14-52.75-.74-7.87,2-6.28,2.92-9.63-4.86a80.09,80.09,0,0,0-24.36-31.39,16.15,16.15,0,0,0-1.66,2.29c-13.59,29.34-22.08,59.84-18.27,92.45,3,25.67,16.51,44.07,41.27,53.25,21.56,8,43.67,8.42,65.74,3.1,31.22-7.52,48.46-27.87,51.56-59.76,2.24-22.95-2.23-45-9.54-66.58C552.8,431.68,549.19,423.6,545.61,414.56Z" transform="translate(-395.84 -401.51)"/>
          </g>
        </svg>	
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "chat") {
    shape = `<svg id="Chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.18 182.54">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Chat_full" data-name="Chat full" class="cls-1" d="M486.29,406a126.06,126.06,0,0,1,45.9,8.36c12.69,4.93,24.14,11.88,33.74,21.61a67,67,0,0,1,16.93,27.81c2.41,7.92,2.79,16,2.15,24.21a65.68,65.68,0,0,1-6.61,24c-6.34,12.9-16,22.75-28.07,30.37-12.21,7.71-25.6,12.27-39.75,14.7a118.4,118.4,0,0,1-20.08,1.78c-5.86,0-11.72.36-17.55-.4a2.55,2.55,0,0,0-2.21.77c-7.41,7-15.83,12.66-24.52,17.92a101.6,101.6,0,0,1-19.09,9.25c-3,1-6.06,2.13-9.34,2.13-5,0-7.72-4.6-5.24-8.94,1.95-3.4,3.95-6.78,5.7-10.3,3.17-6.36,6-12.83,6.74-20a2.45,2.45,0,0,0-1.45-2.8,68.35,68.35,0,0,1-27.8-27.85,77.35,77.35,0,0,1-9.51-42.1,56.31,56.31,0,0,1,7.62-24.94c7.66-13.46,18.87-23.25,32.24-30.73,14.82-8.29,30.84-12.67,47.68-14.3A121.58,121.58,0,0,1,486.29,406Z" transform="translate(-386.1 -405.94)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "chat_Stroke") {
    shape = `<svg id="Chat_line" data-name="Chat line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.53 183.11">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #fce2ee;
                stroke-miterlimit: 10;
                stroke-width: 14px;
              }
            </style>
          </defs>
          <path id="Chat_line-2" data-name="Chat line" class="cls-1" d="M486.24,412.66a117,117,0,0,1,42.53,7.75,87.69,87.69,0,0,1,31.26,20,62.15,62.15,0,0,1,15.68,25.76,59.8,59.8,0,0,1,2,22.43,60.91,60.91,0,0,1-6.12,22.26c-5.87,12-14.83,21.08-26,28.14s-23.71,11.36-36.82,13.62a109.37,109.37,0,0,1-18.6,1.65c-5.43,0-10.86.33-16.27-.38a2.37,2.37,0,0,0-2,.72c-6.87,6.49-14.66,11.72-22.71,16.6a94.05,94.05,0,0,1-17.69,8.57c-2.8,1-5.62,2-8.66,2-4.62,0-7.14-4.26-4.84-8.28,1.8-3.15,3.65-6.28,5.27-9.54,2.94-5.89,5.58-11.88,6.25-18.55a2.26,2.26,0,0,0-1.34-2.59A63.32,63.32,0,0,1,402.36,517a71.68,71.68,0,0,1-8.81-39,52.31,52.31,0,0,1,7.05-23.1c7.1-12.47,17.49-21.54,29.87-28.46,13.74-7.69,28.58-11.74,44.17-13.25A112.43,112.43,0,0,1,486.24,412.66Z" transform="translate(-386.43 -405.66)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "crown") {
    shape = `<svg id="Crown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211.53 182.25">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Crown_base_full" data-name="Crown base full" class="cls-1" d="M485.81,579.05q-22.9,0-45.82,0c-4.89,0-9.8-.43-14.67-.12-4,.26-9.08-5-9.3-8.8a11,11,0,0,1,6.43-10.45,9.28,9.28,0,0,1,3.24-.39c16.1-.31,32.19-.28,48.29-.27q30.78,0,61.57.07c3.72,0,7.44.14,11.16.2a6.49,6.49,0,0,1,4,1.41c2.89,2.28,4.71,5.12,4.61,8.92-.09,3.47-3.44,7.9-6.7,9a6.13,6.13,0,0,1-1.86.24c-13.15.31-26.31.31-39.46.32H485.81Z" transform="translate(-379.93 -396.9)"/>
          <path id="Crown_full" data-name="Crown full" class="cls-1" d="M591.46,447.67v6.11c-2.05,6.05-6.29,9.35-12.63,10a1.58,1.58,0,0,0-1.53,1.33c-.76,2.76-1.58,5.5-2.39,8.24q-7.35,25.13-14.73,50.27c-2,6.68-3.81,13.4-6.23,19.95-.75,2-1.65,2.62-3.78,2.62H440c-6.31,0-12.61,0-18.92,0a3.54,3.54,0,0,1-3.46-2.27,17.1,17.1,0,0,1-.85-2.19c-3.35-10-6.13-20.15-9.12-30.25-4.6-15.5-9.09-31-13.61-46.55a1.41,1.41,0,0,0-1.56-1.22,11.93,11.93,0,0,1-6.81-2.24,14.35,14.35,0,0,1-5.71-7.67v-6.11a15.13,15.13,0,0,1,1-3c3.36-6.19,9.55-9.19,16.33-6.88,4.65,1.58,7.94,4.94,8.72,10,.67,4.34.07,8.47-3.24,11.77-.55.55-.56,1,.17,1.36.55.3,1.06.67,1.6,1q11,6.74,22.05,13.46c5.49,3.34,11,6.69,16.61,9.76a2.11,2.11,0,0,0,3.06-.67,7.46,7.46,0,0,0,.55-.9Q463.62,454,479.8,424c.78-1.45.78-1.46-.7-2.32A13.28,13.28,0,0,1,475,402.17a14.78,14.78,0,0,1,7.86-5.27h4.71l1.47.37a13.09,13.09,0,0,1,9.7,10.37c.93,6.41-1.46,10.89-6.74,14.18-.85.53-1.06,1-.58,1.86,1.66,3,3.23,6.09,4.9,9.1q11.91,21.54,23.86,43.05c1.5,2.7,3,5.38,4.61,8.05,1,1.77,2,2,3.76,1.1.87-.46,1.73-.92,2.58-1.42,12.39-7.19,24.54-14.79,36.78-22.25,1.43-.87,1.46-.92.37-2.17a12.56,12.56,0,0,1-2.13-13.78,13.08,13.08,0,0,1,21.21-4.78A13.49,13.49,0,0,1,591.46,447.67Z" transform="translate(-379.93 -396.9)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "crown_Line") {
    shape = `<svg id="Crown_line" data-name="Crown line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180.3 173.68">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <rect id="Crown_base_line" data-name="Crown base line" class="cls-1" x="23.68" y="160.59" width="132.94" height="13.09" rx="6.54"/>
          <path id="Crown_line-2" data-name="Crown line" class="cls-1" d="M547.16,548.5H424.22L395.55,424.82l47.13,38.37-2.43,3.66a15.15,15.15,0,1,0,18.3-5.71l-2.29-.92-5-20.09,34.51-41,3.81,4.65,30.6,36.33-5,20.09-2.29.93a15.17,15.17,0,1,0,18.3,5.7l-2.43-3.66,47.14-38.38Zm-115.24-9.69H539.46L560,450.19,541.33,465.4a24.84,24.84,0,1,1-34.44-12.16l2.67-10.66-23.87-28.33-23.86,28.33,2.67,10.66a24.85,24.85,0,1,1-34.44,12.16l-18.69-15.21Z" transform="translate(-395.55 -399.15)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "diamond") {
    shape = `<svg id="Diamond" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195.85 183.93">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Diamon_full" data-name="Diamon full">
            <polygon id="Diamond_full-2" data-name="Diamond full" class="cls-1" points="76.84 163.41 0 57.64 38.33 57.64 76.84 163.41"/>
            <polygon id="Diamond_full-3" data-name="Diamond full" class="cls-1" points="119.01 163.41 195.85 57.64 157.52 57.64 119.01 163.41"/>
            <polygon id="Diamond_full-4" data-name="Diamond full" class="cls-1" points="97.92 183.93 52.24 57.64 143.61 57.64 97.92 183.93"/>
            <polygon id="Diamond_full-5" data-name="Diamond full" class="cls-1" points="97.92 3.06 58.24 43.75 137.61 43.75 97.92 3.06"/>
            <polygon id="Diamond_full-6" data-name="Diamond full" class="cls-1" points="82.3 0 30.66 0 0.03 43.76 41.7 43.76 82.3 0"/>
            <polygon id="Diamond_full-7" data-name="Diamond full" class="cls-1" points="113.55 0 165.18 0 195.81 43.76 154.15 43.76 113.55 0"/>
          </g>
      	</svg>	
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "diamond_Line") {
    shape = `<svg id="Diamond_line" data-name="Diamond line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.96 183.1">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Diamond_line-2" data-name="Diamond line">
            <g id="Diamond_line-3" data-name="Diamond line">
              <path class="cls-1" d="M420.77,472.58l16.94,46.51-33.79-46.51h16.85m5.6-8H388.22l76.49,105.29L426.37,464.58Z" transform="translate(-388.22 -407.2)"/>
            </g>
            <g id="Diamond_line-4" data-name="Diamond line">
              <path class="cls-1" d="M567.47,472.58l-33.79,46.51,16.94-46.51h16.85m15.7-8H545L506.68,569.87l76.49-105.29Z" transform="translate(-388.22 -407.2)"/>
            </g>
            <g id="Diamond_line-5" data-name="Diamond line">
              <path class="cls-1" d="M519.77,472.58l-34.07,94.2-34.08-94.2h68.15m11.4-8H440.22L485.7,590.29l45.47-125.71Z" transform="translate(-388.22 -407.2)"/>
            </g>
            <g id="Diamond_line-6" data-name="Diamond line">
              <path class="cls-1" d="M485.7,421.7l20.52,21.05H465.17L485.7,421.7m0-11.46-39.51,40.51h79l-39.5-40.51Z" transform="translate(-388.22 -407.2)"/>
            </g>
            <g id="Diamond_line-7" data-name="Diamond line">
              <path class="cls-1" d="M451.81,415.2l-25.57,27.56H403.62l19.29-27.56h28.9m18.33-8h-51.4l-30.49,43.56h41.48l40.41-43.56Z" transform="translate(-388.22 -407.2)"/>
            </g>
            <g id="Diamond_line-8" data-name="Diamond line">
              <path class="cls-1" d="M548.48,415.2l19.3,27.56H545.15L519.58,415.2h28.9m4.17-8h-51.4l40.41,43.56h41.48L552.65,407.2Z" transform="translate(-388.22 -407.2)"/>
            </g>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "dollar") {
    shape = `<svg id="Dollar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.05 228.47">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Dollar_full" data-name="Dollar full" class="cls-1" d="M484.3,605.18a11.72,11.72,0,0,1-7.84-3.1q-3.58-3.11-3.59-9.3a25.91,25.91,0,0,1,.86-6.13c.56-2.31,1.09-5.17,1.57-8.57q-23.82-1.71-39-12.52-17.61-12.51-17.62-36.09,0-9.12,3.77-15.19a26.34,26.34,0,0,1,8.81-9.06c3.36-2,6.22-3,8.57-3,1.94,0,3.28.65,4,1.95a54.11,54.11,0,0,0,14.83,19.56q9.58,8,19.44,9.12.36-13.61.36-28.19L472,502.85q-8.38-2.31-17.31-5.53a74.28,74.28,0,0,1-16.71-8.5,41.69,41.69,0,0,1-12.7-13.74q-4.94-8.44-4.93-21.33,0-13.85,7.6-24a55.83,55.83,0,0,1,19.81-16.34A87.48,87.48,0,0,1,474.45,405c-.48-3.4-.93-6.2-1.33-8.38a30.83,30.83,0,0,1-1-7.17q0-6.57,3.29-9.66a10.47,10.47,0,0,1,7.41-3.1,12.17,12.17,0,0,1,8.26,3.34q3.76,3.34,3.77,9.66a19.27,19.27,0,0,1-.61,4.74,75.51,75.51,0,0,0-1.33,9.6,78.64,78.64,0,0,1,28.62,6.56,50.6,50.6,0,0,1,21,17q8,11.17,8.2,28.07,0,10.46-3.52,16.59a21.3,21.3,0,0,1-9.12,8.87,26.48,26.48,0,0,1-11.78,2.73A35.85,35.85,0,0,1,506.6,478q-9.18-5.89-9.18-13.31a11.07,11.07,0,0,1,2.68-6.92,37.6,37.6,0,0,0,3.1-4,6.85,6.85,0,0,0,1.27-3.76,7.53,7.53,0,0,0-3.89-6.69,21.92,21.92,0,0,0-9.36-3q-.48,19.08-.48,40.46,7.41,3.16,15.74,6.14t16.52,6.5a71.58,71.58,0,0,1,14.89,8.57,39.1,39.1,0,0,1,10.76,12.4q4.07,7.35,4.07,18a33.79,33.79,0,0,1-8.39,22.67,59.77,59.77,0,0,1-21.87,15.68,94.12,94.12,0,0,1-29.17,7.35,100.06,100.06,0,0,0,1.46,10.33,24,24,0,0,1,.61,5q0,6-3.41,8.87A11.43,11.43,0,0,1,484.3,605.18ZM478.1,473q-.24-16.05-1-30.51a15.73,15.73,0,0,0-6.08,4.62,11.89,11.89,0,0,0-2.43,7.66Q468.62,464.33,478.1,473Zm13.25,59.18q12.39-2.19,12.39-8.39,0-6.79-12.88-14Q491,521.33,491.35,532.14Z" transform="translate(-418.67 -376.71)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "dollar_Line") {
    shape = `<svg id="Dollar_line" data-name="Dollar line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.28 228.72">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Bar_line" data-name="Bar line">
            <path class="cls-1" d="M494.05,589.65a97.48,97.48,0,0,1-1.46-10.35c-1-12.8-1.91-33.26-1.95-45.29v-.73c-.05-1.37-.09-2.75-.13-4.14q-.25-8.88-.35-18.26c0-7.75-.13-18.54-.13-29.1q0-21.42.49-40.54c0-5.73,1.33-29.12,1.7-36.28a75.53,75.53,0,0,1,1.34-9.62,19.29,19.29,0,0,0,.61-4.75q0-6.33-3.77-9.67a8,8,0,0,0-12.8,0q-3.78,3.34-3.77,9.67a19.76,19.76,0,0,0,.6,4.75,75.12,75.12,0,0,1,1.35,9.62c.36,7.16,1.7,30.55,1.7,36.28q.5,19.11.49,40.54c0,10.56-.13,21.35-.13,29.1q-.09,9.38-.36,18.26c0,1.64-.07,3.26-.11,4.87h0c0,12-1,32.49-1.94,45.29A103.11,103.11,0,0,1,474,589.65a23.47,23.47,0,0,0-.61,5c0,4,1.14,6.94,3.41,8.88a10.46,10.46,0,0,0,14.5,0c2.27-1.94,3.41-4.91,3.41-8.88A23.47,23.47,0,0,0,494.05,589.65Z" transform="translate(-418.55 -377.72)"/>
          </g>
          <g id="S_line" data-name="S line">
            <path class="cls-1" d="M488.36,416.21a74.07,74.07,0,0,1,24.92,4.21c1.42.51,2.84,1.09,4.22,1.7a40.49,40.49,0,0,1,17,13.68c4.12,5.8,6.2,13.12,6.35,22.35,0,6.39-1.2,9.79-2.19,11.53a11.53,11.53,0,0,1-4.82,4.85,16.48,16.48,0,0,1-7.38,1.71,25.81,25.81,0,0,1-14.34-4.31c-2.73-1.75-4.45-3.55-4.55-4.74a3.7,3.7,0,0,1,.39-.64,45.45,45.45,0,0,0,3.74-4.88,16.87,16.87,0,0,0,2.93-9.31A17.54,17.54,0,0,0,506,437.11a32.12,32.12,0,0,0-13.6-4.51,30.61,30.61,0,0,0-3.37-.18c-8.33,0-19.49,3.24-25.65,10.49a21.31,21.31,0,0,0-4.82,14.2,31.74,31.74,0,0,0,6.43,18.71,42.29,42.29,0,0,0,7.28,7.67,64.14,64.14,0,0,0,14.57,8.95c5.1,2.17,10.59,4.31,16.32,6.36,5.36,1.92,10.73,4,16,6.29a61.85,61.85,0,0,1,12.82,7.36,29.07,29.07,0,0,1,8,9.26c1.87,3.37,2.81,7.81,2.81,13.19a23.81,23.81,0,0,1-6,16.14,50.09,50.09,0,0,1-18.3,13,84.48,84.48,0,0,1-26.11,6.57c-2.89.26-5.85.4-8.79.4a92.37,92.37,0,0,1-23.16-2.87A55.48,55.48,0,0,1,442,559.92c-9.14-6.5-13.4-15.38-13.4-27.94,0-4.15.76-7.49,2.26-9.91a16.49,16.49,0,0,1,5.38-5.69c.3-.18.59-.34.85-.48a64.54,64.54,0,0,0,15,18.1,49.58,49.58,0,0,0,26.42,11.33,63.58,63.58,0,0,0,6.81.38,50.47,50.47,0,0,0,7.23-.5c6.85-1,12.35-3.52,16.35-7.47a16,16,0,0,0,4.91-11.48c0-6.08-3.07-11.73-9.12-16.8-5.6-4.69-11.86-7.43-17.8-9.83a123.83,123.83,0,0,0-12.56-4.11l-2.36-.68c-4.56-1.32-9.26-2.86-13.95-4.55a64.82,64.82,0,0,1-14.49-7.37,31.54,31.54,0,0,1-9.68-10.5c-2.36-4.05-3.56-9.53-3.56-16.29,0-7.08,1.83-13,5.6-18a46.21,46.21,0,0,1,16.33-13.42,80.49,80.49,0,0,1,29.81-8.25c2.08-.16,4.19-.25,6.28-.25m0-10.08q-3.56,0-7.08.28a90.81,90.81,0,0,0-33.57,9.3,55.85,55.85,0,0,0-19.84,16.38q-7.62,10.17-7.61,24,0,12.92,4.93,21.37a41.92,41.92,0,0,0,12.72,13.76,74.56,74.56,0,0,0,16.74,8.52q7.2,2.6,14.55,4.75a139.75,139.75,0,0,1,14,4.45c5.38,2.18,10.61,4.45,15.1,8.21,2.69,2.26,5.51,5.33,5.51,9.07a6,6,0,0,1-1.89,4.3c-2.73,2.68-6.64,4.06-10.75,4.67a39.93,39.93,0,0,1-5.76.4,50.92,50.92,0,0,1-5.71-.33,39.59,39.59,0,0,1-21.05-9,54.41,54.41,0,0,1-14.86-19.6c-.73-1.3-2.07-2-4-2q-3.54,0-8.59,3a26.22,26.22,0,0,0-8.82,9.07q-3.78,6.09-3.78,15.22,0,23.63,17.66,36.16a65.48,65.48,0,0,0,21.69,9.8,103.66,103.66,0,0,0,25.68,3.19c3.26,0,6.52-.15,9.72-.45a94.38,94.38,0,0,0,29.22-7.37,59.81,59.81,0,0,0,21.92-15.7,33.87,33.87,0,0,0,8.4-22.71q0-10.71-4.08-18.08A39.11,39.11,0,0,0,538,504.4a72,72,0,0,0-14.91-8.58q-8.22-3.52-16.56-6.51t-15.76-6.15a54.25,54.25,0,0,1-12.17-7.49,32.77,32.77,0,0,1-5.5-5.79,21.81,21.81,0,0,1-4.49-12.77,11.43,11.43,0,0,1,2.44-7.67c3.77-4.45,11.72-6.94,18-6.94a20.25,20.25,0,0,1,2.25.12,22.16,22.16,0,0,1,9.38,3,7.54,7.54,0,0,1,3.89,6.7,6.86,6.86,0,0,1-1.27,3.77,36.5,36.5,0,0,1-3.11,4,11.2,11.2,0,0,0-2.68,6.94q0,7.43,9.2,13.33a35.87,35.87,0,0,0,19.78,5.9,26.63,26.63,0,0,0,11.81-2.73,21.42,21.42,0,0,0,9.13-8.89q3.52-6.15,3.53-16.62-.24-16.92-8.22-28.12a50.66,50.66,0,0,0-21.06-17c-1.61-.72-3.25-1.38-4.9-2a83.89,83.89,0,0,0-28.35-4.8Z" transform="translate(-418.55 -377.72)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "fire") {
    shape = `<svg id="Fire_full" data-name="Fire full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.64 230.85">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Fire_full-2" data-name="Fire full">
            <path id="Fire_R" data-name="Fire R" class="cls-1" d="M536.9,486.23a81.36,81.36,0,0,0-1.62-22.08c-.11-.6-.41-1.4.2-1.76s1.15.32,1.63.69a59.41,59.41,0,0,1,20.38,29.49c4.44,13.7,3.57,27.4.11,41.12A86.22,86.22,0,0,1,543.28,564c-8,10.84-18.16,18.71-31.41,22-10.23,2.52-20.21,1.18-29.84-3a50.77,50.77,0,0,1-14.72-9.24,46.88,46.88,0,0,1-13.69-24.21A62.09,62.09,0,0,1,454,520.3c2.27-9.52,6.87-17.88,11.94-26.09,5.39-8.71,11.56-16.88,17.17-25.44a166.85,166.85,0,0,0,14.44-26.14,109.36,109.36,0,0,0,8.1-30.63c.08-.67-.14-1.72.59-1.87.9-.19,1.1.93,1.39,1.56,6,12.74,10.15,26,11.37,40.1a68.47,68.47,0,0,1-4.09,30,42.71,42.71,0,0,1-4.65,8.72c-5.1,7.74-10.19,15.5-13.43,24.26-1.72,4.64-3,9.33-2,14.4.86,4.44,5.93,10.25,12.66,8.63S519,532.1,523.14,527c7.17-8.75,11.08-18.93,12.93-30A52.09,52.09,0,0,0,536.9,486.23Z" transform="translate(-410.88 -356.35)"/>
            <path id="Fire_L" data-name="Fire L" class="cls-1" d="M496.09,404.84c-.08,9.59-2.78,20.31-6.73,30.74-6,15.73-14.45,30.09-24.07,43.81-6.13,8.73-12.54,17.26-17.28,26.89-4.51,9.17-7.07,18.77-6.68,29,.32,8.56,2.38,16.79,5.08,24.87,2.14,6.39,4.37,12.75,6.84,19,.23.58.57,1.31-.05,1.74s-1.2-.13-1.69-.49A93.8,93.8,0,0,1,438.6,568.4a124.08,124.08,0,0,1-13.36-17.06c-8.17-12.65-14.41-26.05-14.36-41.57,0-9.94,3.43-18.73,8.81-27,9.39-14.44,21.43-26.68,32.5-39.72,8-9.46,15.42-19.31,19.91-31,4.55-11.89,4.69-24,1.85-36.24a96.83,96.83,0,0,0-6.27-17.63c-.23-.52-1-1.12-.28-1.67.45-.36,1.08.09,1.56.35,11.63,6.23,19.94,15.32,24.22,27.92A59.61,59.61,0,0,1,496.09,404.84Z" transform="translate(-410.88 -356.35)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "fire_Line") {
    shape = `<svg id="Fire_line" data-name="Fire line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.64 230.85">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Fire_line-2" data-name="Fire line">
            <path id="Fire_R_line" data-name="Fire R line" class="cls-1" d="M508.3,436.74a95.22,95.22,0,0,1,2.7,15.73A60.15,60.15,0,0,1,507.39,479a36.27,36.27,0,0,1-3.83,7.08c-5.25,8-10.67,16.21-14.25,25.89-1.95,5.25-3.75,11.58-2.38,18.69,1.46,7.56,8.67,15.39,18.22,15.39a17.49,17.49,0,0,0,4.17-.51c7.53-1.81,14.07-6.21,20-13.45,7.61-9.27,12.4-20.32,14.64-33.76a60.1,60.1,0,0,0,.95-12c.05-.78.09-1.57.12-2.36a56.83,56.83,0,0,1,4.85,11c3.54,10.92,3.53,22.58,0,36.69a78.31,78.31,0,0,1-13,27.47c-7.48,10.14-16.27,16.34-26.88,18.95a35.71,35.71,0,0,1-8.51,1,40.83,40.83,0,0,1-16.24-3.59,42.4,42.4,0,0,1-12.45-7.76,38.78,38.78,0,0,1-11.36-20.19,54,54,0,0,1,.36-25.49c1.94-8.11,5.79-15.36,11-23.74,3-4.89,6.27-9.56,9.71-14.5,2.43-3.49,4.94-7.1,7.34-10.76a172.48,172.48,0,0,0,15.11-27.41q1.89-4.47,3.41-9m-1.88-26.63-.2,0c-.73.15-.51,1.2-.59,1.87a109.36,109.36,0,0,1-8.1,30.63,166.85,166.85,0,0,1-14.44,26.14c-5.61,8.56-11.78,16.73-17.17,25.44-5.07,8.21-9.67,16.57-11.94,26.09a62.09,62.09,0,0,0-.36,29.19,46.88,46.88,0,0,0,13.69,24.21A50.77,50.77,0,0,0,482,582.94a48.68,48.68,0,0,0,19.42,4.25,43.55,43.55,0,0,0,10.42-1.27c13.25-3.26,23.42-11.13,31.41-22a86.22,86.22,0,0,0,14.32-30.26c3.46-13.72,4.33-27.42-.11-41.12a59.41,59.41,0,0,0-20.38-29.49c-.38-.3-.8-.79-1.27-.79a.7.7,0,0,0-.36.1c-.61.36-.31,1.16-.2,1.76a81.36,81.36,0,0,1,1.62,22.08,52.09,52.09,0,0,1-.83,10.78c-1.85,11.08-5.76,21.26-12.93,30-4.17,5.08-9.08,9.15-15.7,10.75a9.75,9.75,0,0,1-2.29.28c-5.57,0-9.61-5-10.37-8.91-1-5.07.31-9.76,2-14.4,3.24-8.76,8.33-16.52,13.43-24.26a42.71,42.71,0,0,0,4.65-8.72,68.47,68.47,0,0,0,4.09-30c-1.22-14.13-5.38-27.36-11.37-40.1-.27-.59-.46-1.58-1.19-1.58Z" transform="translate(-410.88 -356.35)"/>
            <path id="Fire_L_line" data-name="Fire L line" class="cls-1" d="M483.15,381.51a43.24,43.24,0,0,1,2.46,5.82,51.29,51.29,0,0,1,2.48,17.44c-.06,7.84-2.15,17.25-6.22,28-5.09,13.45-12.44,26.81-23.13,42.05-.91,1.3-1.83,2.59-2.74,3.88-5.34,7.53-10.86,15.31-15.16,24.07-5.47,11.11-7.92,21.86-7.51,32.86a83.34,83.34,0,0,0,2.53,17c-1.38-1.86-2.68-3.74-3.9-5.62-9.08-14.08-13.12-25.55-13.08-37.2,0-7.62,2.41-14.83,7.51-22.67,6.55-10.06,14.4-18.95,22.71-28.36,3-3.43,6.16-7,9.19-10.55,8.06-9.5,16.22-20.12,21.28-33.34a66,66,0,0,0,3.58-33.37m-15.36-25.16a.58.58,0,0,0-.39.13c-.69.55.05,1.15.28,1.67A96.83,96.83,0,0,1,474,375.78c2.84,12.25,2.7,24.35-1.85,36.24-4.49,11.72-11.89,21.57-19.91,31-11.07,13-23.11,25.28-32.5,39.72-5.38,8.27-8.78,17.06-8.81,27-.05,15.52,6.19,28.92,14.36,41.57A124.08,124.08,0,0,0,438.6,568.4a93.8,93.8,0,0,0,12.91,12.05,2.39,2.39,0,0,0,1.23.65.78.78,0,0,0,.46-.16c.62-.43.28-1.16.05-1.74-2.47-6.27-4.7-12.63-6.84-19-2.7-8.08-4.76-16.31-5.08-24.87-.39-10.26,2.17-19.86,6.68-29,4.74-9.63,11.16-18.16,17.28-26.89,9.62-13.72,18.11-28.08,24.07-43.81,3.95-10.43,6.65-21.15,6.73-30.74a59.61,59.61,0,0,0-2.91-20.09c-4.28-12.6-12.59-21.69-24.22-27.92a2.83,2.83,0,0,0-1.17-.48Z" transform="translate(-410.88 -356.35)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "flower") {
    shape = `<svg id="Flower" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.19 201.13">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Flower_full" data-name="Flower full">
            <path id="Petal_1_full" data-name="Petal 1 full" class="cls-1" d="M478,487.4l-41.55-20.3,36.83,24.81a59.17,59.17,0,0,0-37.9.75c-1.2.43-2.38.9-3.56,1.41-1.63-.75-3.22-1.57-4.79-2.48a56.92,56.92,0,0,1-28.24-44.45l-.16-1.88,1.71-.79a56.94,56.94,0,0,1,52.61,2.22,57.73,57.73,0,0,1,7.59,5.24,56.66,56.66,0,0,1,20.09,34.79c-1.16-1-2.28-1.93-3.34-3C477.54,485,477.77,486.18,478,487.4Z" transform="translate(-398.6 -394.98)"/>
            <path id="Petal_2_lull" data-name="Petal 2 lull" class="cls-1" d="M476.34,504.5A59.18,59.18,0,0,0,458,537.7c-.23,1.25-.41,2.52-.56,3.79-1.46,1-3,2-4.54,2.91a56.91,56.91,0,0,1-52.61,2.23l-1.7-.8.15-1.87A57,57,0,0,1,427,499.5a57.53,57.53,0,0,1,8.33-3.95,56.56,56.56,0,0,1,40.17,0q-2.1.79-4.23,1.41,1.77.54,3.51,1.2L436.43,524Z" transform="translate(-398.6 -394.98)"/>
            <path id="Petal_3_full" data-name="Petal 3 full" class="cls-1" d="M511.62,548.36A56.93,56.93,0,0,1,487.24,595l-1.54,1.07L484.15,595a56.85,56.85,0,0,1-3.55-90.66c-.24,1.47-.54,2.92-.88,4.35.89-.84,1.82-1.64,2.78-2.42l3.2,46.13,3.07-44.31a59.17,59.17,0,0,0,19.59,32.45c1,.83,2,1.62,3,2.39C511.54,544.75,511.62,546.55,511.62,548.36Z" transform="translate(-398.6 -394.98)"/>
            <path id="Petal_4_full" data-name="Petal 4 full" class="cls-1" d="M572.79,545.83l-1.71.8a56.85,56.85,0,0,1-80.29-42.25c1.16.94,2.28,1.93,3.34,2.95-.28-1.2-.51-2.41-.71-3.63l1.64.8L535,524l-36.83-24.81a59.23,59.23,0,0,0,37.9-.74c1.2-.43,2.38-.9,3.56-1.41,1.63.74,3.22,1.57,4.79,2.47A57,57,0,0,1,572.63,544Z" transform="translate(-398.6 -394.98)"/>
            <path id="Petal_5_full" data-name="Petal 5 full" class="cls-1" d="M572.79,445.26l-.16,1.88a56.85,56.85,0,0,1-76.73,48.41c1.39-.53,2.81-1,4.22-1.41-1.18-.36-2.35-.77-3.51-1.21L535,467.1l-39.91,19.5a59.27,59.27,0,0,0,18.32-33.2c.23-1.26.41-2.52.56-3.8q2.19-1.55,4.54-2.91a56.94,56.94,0,0,1,52.61-2.23Z" transform="translate(-398.6 -394.98)"/>
            <path id="Petal_6_full" data-name="Petal 6 full" class="cls-1" d="M511.62,442.74a56.72,56.72,0,0,1-20.83,44c.24-1.48.54-2.93.89-4.37-.9.84-1.84,1.66-2.79,2.43l-3.2-46.13L482.62,483A59.29,59.29,0,0,0,463,450.51c-1-.83-2-1.62-3-2.38-.17-1.78-.25-3.58-.25-5.39a56.91,56.91,0,0,1,24.38-46.68L485.7,395l1.54,1.08A56.93,56.93,0,0,1,511.62,442.74Z" transform="translate(-398.6 -394.98)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "flower_Line") {
    shape = `<svg id="Flower_line" data-name="Flower line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.83 205.65">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Flower_lline" data-name="Flower lline">
            <g id="Petal_1_line" data-name="Petal 1 line">
              <path class="cls-1" d="M427.67,443.28a48.07,48.07,0,0,1,24,6.44,47.17,47.17,0,0,1,6.42,4.43,47.89,47.89,0,0,1,17,29.42c-1-.8-1.92-1.64-2.82-2.5.23,1,.44,2,.6,3.07L437.76,467l31.14,21a50,50,0,0,0-32,.63c-1,.36-2,.76-3,1.19q-2.05-.94-4-2.09a48.13,48.13,0,0,1-23.87-37.59l-.14-1.59,1.44-.67a48.06,48.06,0,0,1,20.45-4.56m0-8a56.62,56.62,0,0,0-23.85,5.31l-1.43.68a8,8,0,0,0-4.58,7.93l.14,1.59a56.13,56.13,0,0,0,27.84,43.83c1.53.88,3.11,1.7,4.72,2.43a7.94,7.94,0,0,0,3.33.73,8,8,0,0,0,3.19-.66c.84-.37,1.68-.7,2.51-1a42.1,42.1,0,0,1,27-.53,8,8,0,0,0,9.57-4.08,8,8,0,0,0,6.94-9.24A56.06,56.06,0,0,0,463.19,448a57,57,0,0,0-7.48-5.16,56.2,56.2,0,0,0-28-7.51Z" transform="translate(-397.78 -394.48)"/>
            </g>
            <g id="Petal_2_line" data-name="Petal 2 line">
              <path class="cls-1" d="M453.79,497a48.31,48.31,0,0,1,17,3.11c-1.19.45-2.38.85-3.59,1.19q1.5.47,3,1l-32.43,21.85,33.76-16.49A50.1,50.1,0,0,0,456,535.7c-.19,1.07-.35,2.13-.47,3.21a44.76,44.76,0,0,1-3.84,2.46,48.15,48.15,0,0,1-44.49,1.89l-1.44-.68.14-1.58a48.11,48.11,0,0,1,23.87-37.59,48.66,48.66,0,0,1,7-3.35,47.77,47.77,0,0,1,17-3.11m0-8A55.58,55.58,0,0,0,434,492.58a56.19,56.19,0,0,0-36.06,47.74l-.13,1.59a8,8,0,0,0,4.57,7.91l1.44.68a56.15,56.15,0,0,0,51.89-2.2c1.55-.89,3.05-1.86,4.47-2.86a8,8,0,0,0,3.32-5.62c.1-.89.23-1.8.4-2.71a41.82,41.82,0,0,1,13-23.58,8,8,0,0,0,1.25-10.34,8,8,0,0,0-4.54-10.61A56,56,0,0,0,453.79,489Z" transform="translate(-397.78 -394.48)"/>
            </g>
            <g id="Petal_3_line" data-name="Petal 3 line">
              <path class="cls-1" d="M479.63,514.56c-.2,1.24-.45,2.47-.75,3.68.76-.71,1.55-1.39,2.36-2l2.7,39,2.6-37.47a50,50,0,0,0,16.56,27.44c.83.71,1.67,1.37,2.55,2q.21,2.26.21,4.56a48.15,48.15,0,0,1-20.61,39.47l-1.31.91-1.31-.91A48.14,48.14,0,0,1,462,551.75a48,48,0,0,1,17.61-37.19m0-8a8,8,0,0,0-5.07,1.81,56,56,0,0,0-19.81,34.33,56.76,56.76,0,0,0-.73,9,56.15,56.15,0,0,0,24,46l1.3.91a8,8,0,0,0,9.15,0l1.31-.91a56.18,56.18,0,0,0,24-46c0-1.8-.08-3.58-.25-5.32a8,8,0,0,0-3.2-5.66c-.77-.58-1.46-1.13-2.11-1.68A41.8,41.8,0,0,1,494.35,516a8,8,0,0,0-7.81-6.27l-.51,0a8.17,8.17,0,0,0-2.4-2.12,8,8,0,0,0-4-1.07Z" transform="translate(-397.78 -394.48)"/>
            </g>
            <g id="Petal_4_line" data-name="Petal 4 line">
              <path class="cls-1" d="M534,501.31q2.06.94,4.05,2.1A48.13,48.13,0,0,1,562,541l.14,1.59-1.44.68a48.07,48.07,0,0,1-67.89-35.73c1,.8,1.92,1.63,2.82,2.5-.24-1-.44-2-.6-3.08l1.38.68,33.75,16.49-31.15-21a50.23,50.23,0,0,0,32-.63c1-.37,2-.76,3-1.2m0-8a8,8,0,0,0-3.19.67c-.84.36-1.68.7-2.51,1a42.1,42.1,0,0,1-27,.53,8,8,0,0,0-9.57,4.08,8,8,0,0,0-6.94,9.25,56.08,56.08,0,0,0,55.34,47,56.58,56.58,0,0,0,23.84-5.31l1.46-.68a8,8,0,0,0,4.56-7.93l-.14-1.59a56.13,56.13,0,0,0-27.84-43.82c-1.53-.88-3.12-1.7-4.72-2.44a8.1,8.1,0,0,0-3.33-.73Z" transform="translate(-397.78 -394.48)"/>
            </g>
            <g id="Petal_5_line" data-name="Petal 5 line">
              <path class="cls-1" d="M543.73,443.28a48.16,48.16,0,0,1,20.44,4.55l1.44.68-.13,1.59A48,48,0,0,1,500.6,491c1.18-.45,2.37-.85,3.57-1.19q-1.5-.46-3-1L533.63,467l-33.75,16.48a50.05,50.05,0,0,0,15.49-28.07c.19-1.06.35-2.13.47-3.21,1.24-.88,2.52-1.69,3.84-2.46a48.1,48.1,0,0,1,24.05-6.44m0-8h0a56.21,56.21,0,0,0-28.05,7.51c-1.54.9-3,1.86-4.46,2.87a7.93,7.93,0,0,0-3.32,5.61c-.11.9-.24,1.8-.4,2.69a41.82,41.82,0,0,1-13,23.6,8,8,0,0,0-1.24,10.35,7.9,7.9,0,0,0-.63,3.14,8,8,0,0,0,5.17,7.47,56.09,56.09,0,0,0,75.68-47.74l.13-1.6a8,8,0,0,0-4.58-7.92l-1.44-.67a56.5,56.5,0,0,0-23.83-5.31Z" transform="translate(-397.78 -394.48)"/>
            </g>
            <g id="Petal_6_line" data-name="Petal 6 line">
              <path class="cls-1" d="M483.94,402.48l1.3.91a48.07,48.07,0,0,1,3,76.66q.3-1.87.75-3.69c-.76.71-1.55,1.4-2.36,2.05l-2.7-39-2.6,37.45a50.12,50.12,0,0,0-16.57-27.43c-.82-.7-1.67-1.37-2.54-2q-.21-2.26-.21-4.56a48.12,48.12,0,0,1,20.61-39.47l1.31-.91m0-8a8,8,0,0,0-4.57,1.43l-1.31.91a56.14,56.14,0,0,0-24,46c0,1.79.08,3.58.25,5.32a8,8,0,0,0,3.2,5.66c.73.55,1.44,1.11,2.12,1.68a41.89,41.89,0,0,1,13.94,23.08,8,8,0,0,0,7.81,6.26h.5a8,8,0,0,0,11.48,1.39,56,56,0,0,0,19.81-34.32,57,57,0,0,0,.73-9.06,56.15,56.15,0,0,0-24-46l-1.3-.91a8,8,0,0,0-4.58-1.44Z" transform="translate(-397.78 -394.48)"/>
            </g>
            <circle id="center" class="cls-1" cx="87.92" cy="102.61" r="12.54"/>
          </g>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "heart") {
    shape = `<svg id="Heart_full" data-name="Heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.84 178.5">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Heart_full-2" data-name="Heart full" class="cls-1" d="M589.61,467.13c-.62,18.36-9.21,35.06-21.88,50-22.31,26.27-49.55,46.72-77.89,65.86-2.65,1.79-5,2.25-7.83.31-31.42-21.44-62-43.87-84.9-74.9-11.73-15.89-18.08-33.73-14.19-53.75,4.24-21.84,17-37.2,38-44.73,21.84-7.87,42-3.61,59.2,11.9,4.77,4.31,6.78,3.81,11.3-.15,18.8-16.47,40.22-20,63.25-10.14C575.94,420.62,589.69,442.36,589.61,467.13Z" transform="translate(-381.78 -406.04)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "heart_Stroke") {
    shape = `<svg id="Heart_line" data-name="Heart line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.77 176.12">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #fce2ee;
                stroke-miterlimit: 10;
                stroke-width: 14px;
              }
            </style>
          </defs>
          <path id="Heart_line-2" data-name="Heart line" class="cls-1" d="M580.08,469.71c-.57,16.68-8.37,31.85-19.87,45.4-20.27,23.86-45,42.43-70.75,59.82-2.4,1.62-4.53,2-7.11.28-28.54-19.47-56.33-39.84-77.12-68-10.64-14.44-16.41-30.63-12.88-48.82,3.85-19.84,15.48-33.79,34.49-40.63,19.84-7.14,38.17-3.27,53.77,10.81,4.34,3.92,6.17,3.46,10.27-.13,17.07-15,36.53-18.17,57.44-9.22C567.66,427.47,580.15,447.22,580.08,469.71Z" transform="translate(-384.31 -407.23)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "lightning") {
    shape = `<svg id="Lightning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.45 189.09">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Lightning_full" data-name="Lightning full" class="cls-1" d="M495.18,470h12.65c11.92,0,23.84-.07,35.76.08a6.61,6.61,0,0,1,4.67,1.93c.55.72-.44,3.14-1.31,4.39Q511.85,527,476.54,577.38c-1,1.36-3.18,3-4.44,2.73-2.7-.57-1.82-3.15-1.63-5.29.95-10.79,1.77-21.6,2.64-32.4l3-37.94c.06-.78,0-1.58,0-2.92-1.57-.08-3.08-.23-4.59-.23-14.57,0-29.14.05-43.71-.09-1.65,0-4-.65-4.7-1.8s.44-3.38,1.38-4.72q35-50.42,70.16-100.66c1-1.41,3.15-3.25,4.35-3,2.9.62,2,3.3,1.79,5.58-1,10.93-1.77,21.87-2.64,32.81q-1.49,18.57-3,37.14C495.12,467.51,495.18,468.44,495.18,470Z" transform="translate(-422.97 -391.05)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "lightning_Stroke") {
    shape = `<svg id="Lightning_line" data-name="Lightning line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.45 203.09">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #fce2ee;
                stroke-miterlimit: 10;
                stroke-width: 14px;
              }
            </style>
          </defs>
          <path id="Lightning_line-2" data-name="Lightning line" class="cls-1" d="M495.18,470h12.65c11.92,0,23.84-.07,35.76.08a6.61,6.61,0,0,1,4.67,1.93c.55.72-.44,3.14-1.31,4.39Q511.85,527,476.54,577.38c-1,1.36-3.18,3-4.44,2.73-2.7-.57-1.82-3.15-1.63-5.29.95-10.79,1.77-21.6,2.64-32.4l3-37.94c.06-.78,0-1.58,0-2.92-1.57-.08-3.08-.23-4.59-.23-14.57,0-29.14.05-43.71-.09-1.65,0-4-.65-4.7-1.8s.44-3.38,1.38-4.72q35-50.42,70.16-100.66c1-1.41,3.15-3.25,4.35-3,2.9.62,2,3.3,1.79,5.58-1,10.93-1.77,21.87-2.64,32.81q-1.49,18.57-3,37.14C495.12,467.51,495.18,468.44,495.18,470Z" transform="translate(-415.97 -384.05)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "moon") {
    shape = `<svg id="Moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182.45 181.16">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Moon_full" data-name="Moon full" class="cls-1" d="M576.76,518.75A93.14,93.14,0,1,1,456.53,404a3.68,3.68,0,0,1,4.54,5.09A80.09,80.09,0,0,0,571.48,514.47,3.68,3.68,0,0,1,576.76,518.75Z" transform="translate(-394.47 -403.78)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "moon_Stroke") {
    shape = `
		<svg id="Moon_line" data-name="Moon line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.33 178.16">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #fce2ee;
                stroke-miterlimit: 10;
                stroke-width: 14px;
              }
            </style>
          </defs>
          <path id="Moon_line-2" data-name="Moon line" class="cls-1" d="M568.21,516.46a84.4,84.4,0,1,1-108.94-104,3.33,3.33,0,0,1,4.11,4.61,72.58,72.58,0,0,0,100,95.49A3.33,3.33,0,0,1,568.21,516.46Z" transform="translate(-396.03 -405.28)"/>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "paw") {
    shape = `<svg id="Paw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.79 209">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Paw_full" data-name="Paw full">
            <path id="Paw_full-2" data-name="Paw full" class="cls-1" d="M550.39,571.54c-6.27,14.62-22.07,21.33-37.33,16-7.07-2.45-14.21-4.72-21.69-5.6a46.83,46.83,0,0,0-18.45,2c-5.93,1.71-11.78,3.72-17.7,5.49a32.35,32.35,0,0,1-41.8-30.82c-.09-10.68,4.08-19.48,12.15-26.48,6.23-5.4,12.81-10.48,18.46-16.42,5.88-6.18,11-13.09,16.16-19.92,8.11-10.79,22.84-14.89,35.06-9.34,7.5,3.41,12.32,9.25,15.3,16.9,2.92,7.47,5.8,15.15,12.15,20.5A93.38,93.38,0,0,0,535.87,533c6.68,3.87,12.14,8.68,15,16.06A29.17,29.17,0,0,1,550.39,571.54Z" transform="translate(-401.5 -381.87)"/>
            <path id="Finger_1_full" data-name="Finger 1 full" class="cls-1" d="M528.31,476.85c3.11-6.6,6.31-13.12,10.92-18.81,3.43-4.24,4.43-5.11,11.11-3.46,4.6,1.14,8,4.13,10.86,7.77,6.11,7.84,8.64,16.93,9,26.71a45,45,0,0,1-5.18,23.72c-4.18,7.72-10,13.55-19.18,14.81a26.24,26.24,0,0,1-12.11-1.17c-8-2.73-11.38-8.88-12.17-16.82-.67-6.84.51-13.5,2.42-20C525.28,485.28,526.87,481.09,528.31,476.85Z" transform="translate(-401.5 -381.87)"/>
            <path id="Finger_2_full" data-name="Finger 2 full" class="cls-1" d="M527.5,459.76c-3.89,9-11.25,12.94-20.5,14.19-6.55.9-11.37-1.74-14.71-7.28a38,38,0,0,1-4.93-16.36c-1.44-14.84,0-29.32,5.85-43.17a25.75,25.75,0,0,1,2.47-4.24c3.13-4.72,7.32-5,12.15-2.31,4.66,2.56,8,6.56,10.86,10.93a66.24,66.24,0,0,1,11.18,32.83A33.34,33.34,0,0,1,527.5,459.76Z" transform="translate(-401.5 -381.87)"/>
            <path id="Finger_3_full" data-name="Finger 3 full" class="cls-1" d="M477.63,456.88c-2,4.46-3.69,7.3-6.33,9.46-4.32,3.54-9.31,4.05-14.55,2.87-7.39-1.66-12.31-6.49-15.49-13-5.51-11.35-6.54-23.12-1.48-34.86A41.6,41.6,0,0,1,459,400.53a37.72,37.72,0,0,1,7.87-2.63c2.9-.77,5.05.53,6.31,3.11a53,53,0,0,1,3.4,8c3.92,13.26,5.23,26.76,3,40.47C479,452.45,478,455.36,477.63,456.88Z" transform="translate(-401.5 -381.87)"/>
            <path id="Finger_4_full" data-name="Finger 4 full" class="cls-1" d="M406.12,473.64c3.29-7.27,6-12.35,10.3-16.43a16.78,16.78,0,0,1,1.36-1.17c4.49-3.5,8.66-3.47,13.09.16a34.53,34.53,0,0,1,9,12.15c4.61,9.57,7.08,19.62,6.16,30.3-.55,6.36-2.47,12.27-7.44,16.62-6.35,5.55-13.95,6.47-21.89,5-7.63-1.46-11.94-6.62-13.91-13.87s-1.48-14.42.14-21.56C403.94,480.33,405.43,476,406.12,473.64Z" transform="translate(-401.5 -381.87)"/>
            <path id="Nail_1_full" data-name="Nail 1 full" class="cls-1" d="M422.4,435.71c.69-1,1.43-.94,1.91.21a42,42,0,0,1,3.12,13,1.46,1.46,0,0,1-.58,1.17,13.86,13.86,0,0,1-9.25,1c-1.15-.31-1.65-.87-1.27-2.13A99.61,99.61,0,0,1,422.4,435.71Z" transform="translate(-401.5 -381.87)"/>
            <path id="Nail_2_full" data-name="Nail 2 full" class="cls-1" d="M471.45,382.53c.85-1,1.54-.82,2,.43A27.77,27.77,0,0,1,475,393.42c0,.93-.37,1.65-1.41,1.62a47.61,47.61,0,0,1-7.28-.37c-2.47-.43-2.5-.83-1.49-3.07C464.69,391.5,469.09,385.44,471.45,382.53Z" transform="translate(-401.5 -381.87)"/>
            <path id="Nail_3_full" data-name="Nail 3 full" class="cls-1" d="M542.9,449.71c-.13-.29-.64-.85-.58-1.35.4-3.06.86-6.12,1.45-9.15.23-1.19,1.08-1.22,2-.48a29.65,29.65,0,0,1,7.69,9.88c.43.87.3,1.52-.73,1.72A19.78,19.78,0,0,1,542.9,449.71Z" transform="translate(-401.5 -381.87)"/>
            <path id="Nail_4_full" data-name="Nail 4 full" class="cls-1" d="M502.2,395.93a14.79,14.79,0,0,1-1.92-2.3,12.65,12.65,0,0,1-1-8.74c.29-1.34.82-1.55,1.92-.76a27.27,27.27,0,0,1,8.71,10.2c.6,1.2.27,1.84-1,1.84C506.66,396.18,504.41,396,502.2,395.93Z" transform="translate(-401.5 -381.87)"/>
          </g>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "paw_Line") {
    shape = `<svg id="Paw_line" data-name="Paw line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.7 210.12">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Paw_line-2" data-name="Paw line">
            <g id="Paw_line-3" data-name="Paw line">
              <path class="cls-1" d="M483.55,494.22h0a17.69,17.69,0,0,1,7.41,1.59c4.74,2.15,8,5.81,10.21,11.51l.22.57c3.14,8.05,6.69,17.17,14.87,24.06a102.19,102.19,0,0,0,14.66,10.13c5.84,3.39,9,6.7,10.71,11.07a19.78,19.78,0,0,1-18.1,27,21.92,21.92,0,0,1-7.25-1.26c-7-2.42-15.17-5.09-23.91-6.11a46.66,46.66,0,0,0-5.45-.31,61,61,0,0,0-17,2.65c-3.45,1-6.87,2.08-10.17,3.13-2.54.81-5.16,1.64-7.71,2.41a23.38,23.38,0,0,1-6.7,1,22.5,22.5,0,0,1-22.46-22.49c-.07-7.7,2.71-13.73,8.76-19,1.65-1.43,3.38-2.89,5.06-4.3A170.71,170.71,0,0,0,450.86,523a221.73,221.73,0,0,0,16.37-20.09l.62-.82a19.75,19.75,0,0,1,15.7-7.88m0-10a29.79,29.79,0,0,0-23.69,11.87c-5.17,6.87-10.34,13.81-16.25,20-5.69,6-12.3,11.08-18.56,16.51-8.11,7-12.31,15.89-12.21,26.62a32.5,32.5,0,0,0,32.46,32.4,33.3,33.3,0,0,0,9.56-1.41c5.95-1.78,11.83-3.8,17.79-5.51a51.48,51.48,0,0,1,14.27-2.26,38.51,38.51,0,0,1,4.28.24c7.52.88,14.7,3.17,21.8,5.63a32.17,32.17,0,0,0,10.53,1.81A29.77,29.77,0,0,0,551,549.59c-2.82-7.42-8.32-12.26-15-16.16a93.48,93.48,0,0,1-13.24-9.13c-6.39-5.38-9.28-13.1-12.21-20.61-3-7.69-7.85-13.56-15.39-17a27.89,27.89,0,0,0-11.55-2.48Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Finger_1_line" data-name="Finger 1 line">
              <path class="cls-1" d="M547.29,464.14l.8.19c1.12.28,2.91,1,5.43,4.25,4.34,5.57,6.63,12.48,7,21.12a35.09,35.09,0,0,1-4,18.66c-4.19,7.73-8.34,9.27-11.84,9.75a17.63,17.63,0,0,1-2.29.16,16.44,16.44,0,0,1-5.31-.89c-2.45-.83-4.89-2.17-5.5-8.43-.47-4.73.19-9.92,2.07-16.34.8-2.72,1.76-5.45,2.78-8.33.41-1.17.82-2.34,1.22-3.51,2.92-6.19,5.68-11.7,9.47-16.39.06-.06.12-.14.2-.24m-1.66-10.3c-2.72,0-3.94,1.32-6.31,4.25-4.63,5.73-7.86,12.28-11,18.92-1.45,4.26-3.05,8.47-4.32,12.79-1.92,6.56-3.1,13.25-2.42,20.13.78,8,4.18,14.17,12.22,16.91a26.43,26.43,0,0,0,8.54,1.43A27.83,27.83,0,0,0,546,528c9.23-1.27,15.08-7.13,19.28-14.89a45.29,45.29,0,0,0,5.22-23.84c-.41-9.83-3-19-9.1-26.86-2.85-3.66-6.29-6.66-10.91-7.81a21.62,21.62,0,0,0-4.86-.78Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Finger_2_line" data-name="Finger 2 line">
              <path class="cls-1" d="M503.17,409.24c2.42,1.4,4.63,3.75,7.13,7.57a56.25,56.25,0,0,1,9.63,28.12,23.83,23.83,0,0,1-1.58,10.92c-1.58,3.64-4.23,7.17-12.78,8.34a8.75,8.75,0,0,1-1.09.08c-1,0-2.19,0-3.8-2.67-1.93-3.19-3.06-7.08-3.56-12.24-1.41-14.49.27-27.09,5.13-38.53a11.82,11.82,0,0,1,.92-1.59m-1.06-10.61c-2.5,0-4.73,1.24-6.58,4a27.17,27.17,0,0,0-2.48,4.26c-5.92,13.92-7.33,28.49-5.88,43.41a38.35,38.35,0,0,0,4.95,16.44c2.94,4.86,7,7.5,12.36,7.5a18.9,18.9,0,0,0,2.44-.17c9.29-1.27,16.69-5.25,20.6-14.27a33.46,33.46,0,0,0,2.39-15.5,66.69,66.69,0,0,0-11.24-33c-2.88-4.39-6.23-8.41-10.92-11a12,12,0,0,0-5.64-1.7Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Finger_3_line" data-name="Finger 3 line">
              <path class="cls-1" d="M465.4,408.31a26.05,26.05,0,0,1,1.29,3.31c3.76,12.69,4.64,24.53,2.69,36.19a44.32,44.32,0,0,1-1.19,4.86l-.26.9c-1.47,3.25-2.37,4.42-3.24,5.13a5,5,0,0,1-3.46,1.2,12.11,12.11,0,0,1-2.64-.33c-2.42-.55-6-1.94-8.77-7.72-4.57-9.4-5-18.14-1.3-26.71a31.9,31.9,0,0,1,14.75-16,12.36,12.36,0,0,1,2.13-.82m2.72-10.9a6.21,6.21,0,0,0-1.6.22,37.35,37.35,0,0,0-7.91,2.65,41.77,41.77,0,0,0-19.27,20.9c-5.09,11.8-4.06,23.64,1.48,35,3.2,6.58,8.15,11.43,15.57,13.1a22.12,22.12,0,0,0,4.84.58,15,15,0,0,0,9.8-3.46c2.65-2.17,4.38-5,6.35-9.51a76.44,76.44,0,0,0,1.86-7.47c2.3-13.79,1-27.35-3-40.68a53.19,53.19,0,0,0-3.41-8c-1-2.09-2.64-3.35-4.75-3.35Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Finger_4_line" data-name="Finger 4 line">
              <path class="cls-1" d="M423.7,463.72l.34.26c2.38,1.95,4.4,4.75,6.37,8.83,4.23,8.78,5.95,17,5.24,25.25-.54,6.19-2.48,8.62-4.11,10.05a12.76,12.76,0,0,1-8.88,3.16,24.91,24.91,0,0,1-4.66-.48c-2.23-.43-4.74-1.34-6.22-6.75-1.33-4.89-1.25-10.23.25-16.83.66-2.9,1.57-5.82,2.31-8.17.2-.64.38-1.22.54-1.75,2.76-6.06,4.88-9.93,7.88-12.79a5.7,5.7,0,0,1,.6-.53l.34-.25m0-10.24a10.63,10.63,0,0,0-6.51,2.6,15.57,15.57,0,0,0-1.37,1.19c-4.29,4.1-7.05,9.2-10.36,16.51-.68,2.36-2.19,6.73-3.21,11.21-1.63,7.18-2.11,14.46-.15,21.68s6.32,12.47,14,13.94a35,35,0,0,0,6.53.66,22.67,22.67,0,0,0,15.46-5.63c5-4.38,6.94-10.32,7.49-16.72.93-10.74-1.56-20.83-6.2-30.46a34.65,34.65,0,0,0-9-12.21,10.52,10.52,0,0,0-6.65-2.77Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Nail_1_line" data-name="Nail 1 line">
              <path class="cls-1" d="M422.83,434.92c-.31,0-.64.24-1,.72A99.58,99.58,0,0,0,415.76,449c-.38,1.26.12,1.83,1.28,2.14a11.94,11.94,0,0,0,3.09.41,15.66,15.66,0,0,0,6.21-1.42,1.46,1.46,0,0,0,.58-1.18,42.13,42.13,0,0,0-3.13-13.07c-.27-.62-.6-.94-1-.94Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Nail_2_line" data-name="Nail 2 line">
              <path class="cls-1" d="M472.18,381.52a1.44,1.44,0,0,0-1,.67c-2.38,2.92-6.8,9-6.68,9.11-1,2.25-1,2.65,1.49,3.09a48.2,48.2,0,0,0,7.32.37h.06c1,0,1.32-.71,1.36-1.63a27.81,27.81,0,0,0-1.57-10.51c-.25-.72-.58-1.1-1-1.1Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Nail_3_line" data-name="Nail 3 line">
              <path class="cls-1" d="M544.77,438.18c-.43,0-.76.31-.89,1-.59,3-1,6.12-1.45,9.2-.07.49.44,1.06.58,1.36a21.26,21.26,0,0,0,6.17,1,19.76,19.76,0,0,0,3.67-.36c1-.2,1.16-.85.73-1.72a29.76,29.76,0,0,0-7.72-9.94,1.85,1.85,0,0,0-1.09-.5Z" transform="translate(-400.85 -381.52)"/>
            </g>
            <g id="Nail_4_line" data-name="Nail 4 line">
              <path class="cls-1" d="M500,383.33c-.44,0-.71.4-.9,1.23a12.71,12.71,0,0,0,1,8.78,14.94,14.94,0,0,0,1.93,2.31c2.2.09,4.44.25,6.67.25h.08c1.24,0,1.57-.65,1-1.86a27.53,27.53,0,0,0-8.75-10.25,2,2,0,0,0-1-.46Z" transform="translate(-400.85 -381.52)"/>
            </g>
          </g>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "planet") {
    shape = `<svg id="Planet_full" data-name="Planet full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 204.84">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Planet_full-2" data-name="Planet full">
            <path id="Planet_full_down" data-name="Planet full down" class="cls-1" d="M468.81,498.69c26.82,9.76,53.23,17.32,76.74,22a85.61,85.61,0,0,1-144.89-51.9A549.82,549.82,0,0,0,468.81,498.69Z" transform="translate(-343.19 -340.23)"/>
            <path id="Planet_full_up" data-name="Planet full up" class="cls-1" d="M571.39,459.44a85.24,85.24,0,0,1-7.1,34.19c-24.87-4-55-12.13-85.22-23.13-28.18-10.26-54.73-22.35-75.69-34.43a85.63,85.63,0,0,1,168,23.37Z" transform="translate(-343.19 -340.23)"/>
            <path id="Planet_full_ring" data-name="Planet full ring" class="cls-1" d="M627.43,503.65c-5.58,14.65-28.75,14.58-41.54,14.51-52.75-2.18-103.46-18.74-151.24-40-21.88-9.89-100.78-48.73-90.54-77.61,8.9-22.17,62.07-10.26,80.26-6.54,44.26,10,86.95,25.91,128.19,44.68,19.35,9.22,83.32,38.74,74.87,65Zm-11.61-4.23c1.66-7-12.92-19.36-18.36-23.77-51.15-39.68-129.56-67.49-193.62-76-12.16-1.35-25-2.32-36.93-.31a30.7,30.7,0,0,0-7.73,2.3,6.18,6.18,0,0,0-3.47,3.1c-.13,13.38,39.72,35.49,51.59,41.53C435.35,460.8,465,472.41,495,482.33c18,5.93,36.2,11.35,54.66,15.6,13.18,3.21,57.64,12,66.18,1.49Z" transform="translate(-343.19 -340.23)"/>
            <circle id="Planet_full_1" data-name="Planet full 1" class="cls-1" cx="34.02" cy="178.42" r="10.76"/>
            <circle id="Planet_full_2" data-name="Planet full 2" class="cls-1" cx="252.6" cy="61.21" r="5.36"/>
            <circle id="Planet_full_3" data-name="Planet full 3" class="cls-1" cx="85.41" cy="3.54" r="3.54"/>
          </g>
        </svg>	
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "planet_Line") {
    shape = `<svg id="Planet_line" data-name="Planet line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 208.84">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Planet_line-2" data-name="Planet line">
            <path id="Planet_line_down" data-name="Planet line down" class="cls-1" d="M485.77,549.06a89.44,89.44,0,0,1-89.09-79.8,4,4,0,0,1,8-.87,81.61,81.61,0,0,0,138.11,49.47,4,4,0,1,1,5.59,5.72A89,89,0,0,1,485.77,549.06Z" transform="translate(-343.2 -340.23)"/>
            <path id="Planet_line_up" data-name="Planet line up" class="cls-1" d="M564.29,497.63a3.92,3.92,0,0,1-1.6-.33,4,4,0,0,1-2.07-5.27,81.65,81.65,0,0,0-74.85-114.2,81.91,81.91,0,0,0-78.54,59.33,4,4,0,0,1-7.7-2.18,89.63,89.63,0,0,1,175.86,24.46A88.79,88.79,0,0,1,568,495.23,4,4,0,0,1,564.29,497.63Z" transform="translate(-343.2 -340.23)"/>
            <path id="Planet_line_ring" data-name="Planet line ring" class="cls-1" d="M574.86,449.66a90.3,90.3,0,0,1,.53,9.78c0,.27,0,.55,0,.82,7.79,4.9,15.19,10,22.09,15.39,5.43,4.41,20,16.79,18.36,23.77-8.54,10.55-53,1.71-66.18-1.49-18.46-4.26-36.67-9.67-54.66-15.61-30-9.91-59.63-21.52-87.69-36-11.87-6-51.72-28.15-51.58-41.53a6.14,6.14,0,0,1,3.47-3.1,30.74,30.74,0,0,1,7.72-2.31c11.9-2,24.78-1,36.93.32q6.63.88,13.44,2A89.83,89.83,0,0,1,424.6,394l-.22,0c-18.2-3.72-71.37-15.63-80.27,6.54-10.24,28.88,68.67,67.72,90.55,77.6,47.78,21.3,98.48,37.86,151.23,40,12.79.06,36,.14,41.54-14.52C633.67,484.28,600.47,463.12,574.86,449.66Z" transform="translate(-343.2 -340.23)"/>
            <circle id="Planet_line_1" data-name="Planet line 1" class="cls-1" cx="34.02" cy="178.42" r="10.76"/>
            <circle id="Planet_line_2" data-name="Planet line 2" class="cls-1" cx="252.6" cy="61.21" r="5.36"/>
            <circle id="Planet_line_3" data-name="Planet line 3" class="cls-1" cx="85.41" cy="3.54" r="3.54"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "skull") {
    shape = `<svg id="Skull_full" data-name="Skull full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.76 192.8">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Skull_full-2" data-name="Skull full" class="cls-1" d="M394.82,472.13c0,29.33,15,55.29,38,71.16a17.39,17.39,0,0,1,7.59,14.29h0a10,10,0,0,0,10.64,9.95,10.2,10.2,0,0,0,9.3-10.29v-7.45a1.8,1.8,0,0,1,1.8-1.8h0a1.81,1.81,0,0,1,1.8,1.8v17.7a10,10,0,0,0,10.62,10,10.2,10.2,0,0,0,9.32-10.29V549.79a1.8,1.8,0,0,1,1.8-1.8h0a1.81,1.81,0,0,1,1.8,1.8v17.7a10,10,0,0,0,10.62,10,10.2,10.2,0,0,0,9.32-10.29V549.79a1.8,1.8,0,0,1,1.8-1.8h0a1.81,1.81,0,0,1,1.8,1.8v7.45a10.19,10.19,0,0,0,9.29,10.29A10,10,0,0,0,531,557.58h0a17.38,17.38,0,0,1,7.58-14.29c23-15.87,38-41.83,38-71.16,0-48.31-40.69-87.47-90.88-87.47S394.82,423.82,394.82,472.13Zm104.8,1.69c0-16.8,11.71-30.42,26.15-30.42s26.15,13.62,26.15,30.42-11.7,30.42-26.15,30.42S499.62,490.62,499.62,473.82Zm-24.36,43.59a2.61,2.61,0,0,1,.36-1.3l6.5-11.26a4.13,4.13,0,0,1,7.16,0l6.5,11.26a2.6,2.6,0,0,1-2.25,3.9,22.6,22.6,0,0,0-15.66,0A2.61,2.61,0,0,1,475.26,517.41Zm-55.78-43.59c0-16.8,11.7-30.42,26.15-30.42s26.15,13.62,26.15,30.42-11.71,30.42-26.15,30.42S419.48,490.62,419.48,473.82Z" transform="translate(-394.82 -384.66)"/>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "skull_Line") {
    shape = `<svg id="Skull_line" data-name="Skull line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.77 201.65">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Skull_line-2" data-name="Skull line">
            <path id="Skull" class="cls-1" d="M497.6,581.69c-.49,0-1,0-1.49-.08a13.62,13.62,0,0,1-10.3-6.11,13.9,13.9,0,0,1-13,6.13,13.58,13.58,0,0,1-12.65-12.83v0A13.71,13.71,0,0,1,452,572.1c-7.18.62-13-3.16-14.43-9.39-2.25-9.7-8.75-15.89-16.28-23.06-.79-.75-1.58-1.5-2.36-2.26-26.67-25.73-35.27-57.27-24.87-91.23s35.13-56.13,71.44-63.92c40-8.58,81.11,8.36,102.36,42.14a89.37,89.37,0,0,1-19.33,116.87c-7.6,6.18-11.84,12.3-13.74,19.86s-8.7,12.19-16.18,10.92a13.58,13.58,0,0,1-7-3.33,21.39,21.39,0,0,1-.61,2.9A13.76,13.76,0,0,1,497.6,581.69Zm-5.2-25.94h.12v4.5c0,.87,0,1.75,0,2.63a51.58,51.58,0,0,0,.06,5.16,4.73,4.73,0,0,0,4.45,4.62,4.83,4.83,0,0,0,5.39-3.51,26.69,26.69,0,0,0,.69-6c.08-1.92.07-3.84.07-5.87,0-1.73,0-3.52,0-5.31v-.31a7.34,7.34,0,0,1,1.93-5.5,6,6,0,0,1,4.49-1.62c2.17.07,5.87,1.11,6.22,7.3.07,1.18.08,2.25.08,3.29,0,.67,0,1.33,0,2,.11,3.55,1.53,5.58,4.21,6,2.88.49,5.16-1.13,5.94-4.24,2.37-9.44,7.71-17.27,16.8-24.66a80.36,80.36,0,0,0,17.38-105.08C541,398.58,503.7,383.25,467.41,391c-33.4,7.16-55.17,26.6-64.72,57.76-9.48,30.94-1.91,58.56,22.51,82.11.77.75,1.55,1.48,2.32,2.22,7.85,7.48,16,15.22,18.84,27.54.61,2.62,3.89,2.55,4.89,2.46,2.51-.21,3.83-1.44,4.41-4.09a17.93,17.93,0,0,0,.3-2.77c.06-1,.13-2,.29-3,0-.08,0-.47,0-.73-.07-1.56-.19-4.18,1.81-6.18a6.26,6.26,0,0,1,4.89-1.74,6.18,6.18,0,0,1,4.5,2.08c1.89,2.14,1.68,4.89,1.56,6.53a7.79,7.79,0,0,0-.05.86c.07,2.12.06,4.24.05,6.29,0,2.73,0,5.3.13,7.86a4.58,4.58,0,0,0,4.46,4.44,4.81,4.81,0,0,0,5.35-3.54,29.83,29.83,0,0,0,.68-6.34v-.24c.08-2,.08-3.94.09-6,0-1.72,0-3.44.05-5.15A7.39,7.39,0,0,1,481.8,546a6.06,6.06,0,0,1,4.43-1.59c2.76.11,6,2,6.14,7Q492.42,553.62,492.4,555.75Z" transform="translate(-389.79 -380.03)"/>
            <path id="Nose" class="cls-1" d="M492.18,520.31c4.14.05,4.63-2,3.41-4.65a87.29,87.29,0,0,0-5.18-9.92c-2.49-4-6.37-4.15-9-.18a70.13,70.13,0,0,0-5.62,10.81c-1.06,2.47-.2,4.82,3,4C483.53,519.14,488.08,518.26,492.18,520.31Z" transform="translate(-389.79 -380.03)"/>
            <path id="Eye_R" data-name="Eye R" class="cls-1" d="M552.51,473.23c.27-5.16-1.55-10.78-4.61-16-5.24-8.93-15.72-14.12-24.94-12.47-11.45,2-18.34,9.17-21.58,19.94-3.63,12.1-1.1,23,7.86,31.95,9.92,9.85,25,9.36,34.7-.7C549.77,489.91,552.54,482.61,552.51,473.23Z" transform="translate(-389.79 -380.03)"/>
            <path id="Eye_L" data-name="Eye L" class="cls-1" d="M471.74,475.89c.06-7.36-1.25-12.59-3.95-17.44-4.85-8.69-12.25-13.91-22.22-14-10.19-.06-17.91,5.15-22.56,14.17-6.26,12.13-5.46,24.08,2.77,35,9.13,12.17,25.7,13.33,36.75,2.89A29.81,29.81,0,0,0,471.74,475.89Z" transform="translate(-389.79 -380.03)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "snowflake") {
    shape = `<svg id="Snowflake" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171.68 195.01">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Snowflake-2" data-name="Snowflake" class="cls-1" d="M566.33,527.28a10.4,10.4,0,0,0-10.38,0,5.4,5.4,0,0,0-1-.75l-5.42-3.13L565,516.15a5.38,5.38,0,0,0-4.54-9.76l-22.34,10.42-6.3-3.64,15.51-7.23a5.38,5.38,0,0,0-4.55-9.75l-22.34,10.42-13.53-7.82v-12.1l13.53-7.82,22.34,10.42a5.38,5.38,0,0,0,4.55-9.75l-15.51-7.23,6.3-3.64,22.34,10.41a5.38,5.38,0,0,0,4.54-9.75l-15.51-7.23,5.42-3.13a5.4,5.4,0,0,0,1-.75,10.41,10.41,0,1,0-5.23-9.06,5.15,5.15,0,0,0-1.16.5l-5.42,3.12,1.49-17a5.37,5.37,0,0,0-4.89-5.82h0a5.37,5.37,0,0,0-5.82,4.89l-2.15,24.55-6.3,3.64L528,445.94a5.38,5.38,0,0,0-10.72-.94l-2.15,24.56-12.74,7.35-11.28-6.51V455.69l20.19-14.14a5.38,5.38,0,0,0,1.33-7.49h0a5.39,5.39,0,0,0-7.5-1.32l-14,9.81v-7.27l20.19-14.14a5.38,5.38,0,0,0,1.33-7.49h0a5.39,5.39,0,0,0-7.5-1.32l-14,9.82v-6.26a5.16,5.16,0,0,0-.15-1.25,10.41,10.41,0,1,0-10.45,0,5.16,5.16,0,0,0-.15,1.25v6.26l-14-9.82a5.39,5.39,0,0,0-7.5,1.32h0a5.38,5.38,0,0,0,1.33,7.49l20.19,14.14v7.27l-14-9.81a5.39,5.39,0,0,0-7.5,1.32h0a5.38,5.38,0,0,0,1.33,7.49l20.19,14.14v14.56l-11.41,6.59-12.61-7.28L454.15,445a5.38,5.38,0,1,0-10.72.94L444.92,463l-6.3-3.64-2.15-24.55a5.37,5.37,0,0,0-5.82-4.89h0a5.37,5.37,0,0,0-4.89,5.82l1.49,17-5.42-3.12a5.15,5.15,0,0,0-1.16-.5,10.4,10.4,0,1,0-5.23,9.06,5.4,5.4,0,0,0,1,.75l5.42,3.13-15.51,7.23a5.38,5.38,0,0,0,4.54,9.75l22.34-10.41,6.3,3.64L424,479.54a5.38,5.38,0,1,0,4.55,9.75l22.34-10.42,13.28,7.67v12.4l-13.28,7.67-22.34-10.42a5.38,5.38,0,1,0-4.55,9.75l15.51,7.23-6.3,3.64L410.9,506.39a5.38,5.38,0,0,0-4.54,9.76l15.51,7.23-5.42,3.13a5.4,5.4,0,0,0-1,.75,10.41,10.41,0,1,0,5.23,9.06,5.15,5.15,0,0,0,1.16-.5l5.42-3.12-1.49,17a5.38,5.38,0,0,0,4.89,5.82h0a5.37,5.37,0,0,0,5.82-4.89l2.15-24.55,6.3-3.64-1.49,17a5.38,5.38,0,1,0,10.72.94l2.15-24.56,14.07-8.12,9.95,5.74v16.25l-20.19,14.14a5.38,5.38,0,0,0-1.33,7.49h0a5.39,5.39,0,0,0,7.5,1.32l14-9.82v7.28l-20.19,14.14a5.38,5.38,0,0,0-1.33,7.49h0a5.4,5.4,0,0,0,7.5,1.32l14-9.82v6.26a5.16,5.16,0,0,0,.15,1.25,10.41,10.41,0,1,0,10.45,0,5.16,5.16,0,0,0,.15-1.25v-6.26l14,9.82a5.4,5.4,0,0,0,7.5-1.32h0a5.38,5.38,0,0,0-1.33-7.49L491.07,550.2v-7.28l14,9.82a5.39,5.39,0,0,0,7.5-1.32h0a5.38,5.38,0,0,0-1.33-7.49l-20.19-14.14V513.4l9.82-5.67,14.2,8.19,2.15,24.56a5.38,5.38,0,1,0,10.72-.94l-1.49-17,6.3,3.64,2.15,24.55a5.37,5.37,0,0,0,5.82,4.89h0a5.38,5.38,0,0,0,4.89-5.82l-1.49-17,5.42,3.12a5.15,5.15,0,0,0,1.16.5,10.41,10.41,0,1,0,15.61-9Z" transform="translate(-399.86 -395.23)"/>
        </svg>	
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "sparkle") {
    shape = `<svg id="Sparkle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195.15 195.15">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Sparkle_full" data-name="Sparkle full" class="cls-1" d="M485.7,397.92l10.16,29.72a92.63,92.63,0,0,0,57.68,57.69l29.73,10.16-29.73,10.17a92.64,92.64,0,0,0-57.68,57.68L485.7,593.07l-10.17-29.73a92.64,92.64,0,0,0-57.68-57.68l-29.73-10.17,29.73-10.16a92.63,92.63,0,0,0,57.68-57.69Z" transform="translate(-388.12 -397.92)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "sparkle_Stroke") {
    shape = `<svg id="Sparkle_line" data-name="Sparkle line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205.16 205.16">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #fce2ee;
                stroke-miterlimit: 10;
                stroke-width: 14px;
              }
            </style>
          </defs>
          <path id="Sparkle_line-2" data-name="Sparkle line" class="cls-1" d="M485.7,414.55l8.43,24.66A76.85,76.85,0,0,0,542,487.06l24.66,8.43L542,503.92a76.87,76.87,0,0,0-47.85,47.86l-8.43,24.66-8.44-24.66a76.87,76.87,0,0,0-47.85-47.86l-24.66-8.43,24.66-8.43a76.85,76.85,0,0,0,47.85-47.85Z" transform="translate(-383.12 -392.91)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "star") {
    shape = `
		<svg id="Star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.44 177.93">
  			<defs>
    			<style>
      				.cls-1 {
        				fill: #fce2ee;
      				}
    			</style>
  			</defs>
			<path id="Star_full" data-name="Star full" class="cls-1" d="M491.25,404.34l24,48.66a6.18,6.18,0,0,0,4.66,3.38l53.69,7.81A6.18,6.18,0,0,1,577,474.74l-38.85,37.88a6.16,6.16,0,0,0-1.78,5.47l9.17,53.48a6.18,6.18,0,0,1-9,6.52l-48-25.24a6.2,6.2,0,0,0-5.77,0l-48,25.24a6.18,6.18,0,0,1-9-6.52L435,518.09a6.16,6.16,0,0,0-1.78-5.47l-38.85-37.88a6.18,6.18,0,0,1,3.43-10.55l53.69-7.81a6.18,6.18,0,0,0,4.66-3.38l24-48.66A6.2,6.2,0,0,1,491.25,404.34Z" transform="translate(-392.47 -400.89)"/>
		</svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "star_Stroke") {
    shape = `<svg id="Star_line" data-name="Star line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.44 191.93">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #fce2ee;
                stroke-miterlimit: 10;
                stroke-width: 14px;
              }
            </style>
          </defs>
          <path id="Star_line-2" data-name="Star line" class="cls-1" d="M491.25,404.34l24,48.66a6.18,6.18,0,0,0,4.66,3.38l53.69,7.81A6.18,6.18,0,0,1,577,474.74l-38.85,37.88a6.16,6.16,0,0,0-1.78,5.47l9.17,53.48a6.18,6.18,0,0,1-9,6.52l-48-25.24a6.2,6.2,0,0,0-5.77,0l-48,25.24a6.18,6.18,0,0,1-9-6.52L435,518.09a6.16,6.16,0,0,0-1.78-5.47l-38.85-37.88a6.18,6.18,0,0,1,3.43-10.55l53.69-7.81a6.18,6.18,0,0,0,4.66-3.38l24-48.66A6.2,6.2,0,0,1,491.25,404.34Z" transform="translate(-385.47 -393.89)"/>
        </svg>		
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "sun") {
    shape = `<svg id="Sun_full" data-name="Sun full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.23 237.19">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Sun_full-2" data-name="Sun full">
            <path id="Sun_full_24" data-name="Sun full 24" class="cls-1" d="M367.08,462.42c1.79-4.56,5.13-6.16,10-6.09,13.12.21,26.25.07,39.37.07h2.44v15.74h-2.44c-13.12,0-26.25-.14-39.37.07-4.84.07-8.18-1.53-10-6.09Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_23" data-name="Sun full 23" class="cls-1" d="M483.83,582.85c-4.56-1.78-6.15-5.13-6.08-10,.2-13.11.07-26.24.07-39.36v-2.44h15.73v2.44c0,13.12-.13,26.25.07,39.36.07,4.84-1.52,8.19-6.08,10Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_22" data-name="Sun full 22" class="cls-1" d="M435.2,365.23a8,8,0,0,1,8-7.88,8.59,8.59,0,0,1,8.05,8.56,8.16,8.16,0,0,1-7.83,7.9A8.51,8.51,0,0,1,435.2,365.23Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_21" data-name="Sun full 21" class="cls-1" d="M432.94,422.64c-.45-.41-.92-.81-1.34-1.24q-14.5-14.47-29-29c-2.61-2.6-3.91-5.54-2.59-9.18a7.83,7.83,0,0,1,11.82-3.76A11.94,11.94,0,0,1,413.6,381q14.83,14.79,29.64,29.62a4.43,4.43,0,0,1,.46.52c-3.75,3.62-7.44,7.18-11.12,10.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_20" data-name="Sun full 20" class="cls-1" d="M538.81,422,528,411.19l-.71.5a11,11,0,0,1,1-1.19Q543,395.76,557.73,381c3.12-3.11,6.5-3.76,9.85-2a7.8,7.8,0,0,1,3,11.26,12.69,12.69,0,0,1-1.62,2l-29.63,29.63c-.27.27-.57.51-.85.76Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_19" data-name="Sun full 19" class="cls-1" d="M432.51,506.57l10.92,10.89.6-.5a7.61,7.61,0,0,1-.55.72c-10,10-20,20.13-30.14,30.1-4.75,4.68-11.93,2.89-13.57-3.27-.86-3.22.31-5.88,2.59-8.16q8.2-8.18,16.38-16.37l12.94-12.93c.42-.42.9-.79,1.35-1.18Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_18" data-name="Sun full 18" class="cls-1" d="M527.93,517.46l10.92-10.88-.53-.7c.4.34.84.64,1.2,1q14.67,14.64,29.32,29.3c2.47,2.46,3.76,5.25,2.61,8.75a7.8,7.8,0,0,1-12.19,3.9,13.63,13.63,0,0,1-1.57-1.37l-29.31-29.3c-.37-.37-.71-.79-1.06-1.18Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_17" data-name="Sun full 17" class="cls-1" d="M493.41,397.46H478a13.17,13.17,0,0,1-.15-1.49q0-21.15,0-42.31a7.86,7.86,0,0,1,15.47-2.1,7,7,0,0,1,.24,1.82q0,21.51,0,43A8.94,8.94,0,0,1,493.41,397.46Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_16" data-name="Sun full 16" class="cls-1" d="M552.51,472V456.56a13.17,13.17,0,0,1,1.49-.15q21.15,0,42.32,0a7.81,7.81,0,0,1,7.91,6.68,7.91,7.91,0,0,1-5.82,8.79,7,7,0,0,1-1.82.23H553.8A10.61,10.61,0,0,1,552.51,472Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_15" data-name="Sun full 15" class="cls-1" d="M518.72,405.7,504,399.52c2.42-5.65,4.65-11.45,7.36-17,1.72-3.53,6.24-4.66,9.84-3.05a7.51,7.51,0,0,1,4.3,9.34C523.42,394.53,521,400.15,518.72,405.7Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_14" data-name="Sun full 14" class="cls-1" d="M421,445.88c-5.46-2.28-10.89-4.42-16.21-6.83a7.86,7.86,0,0,1,6.07-14.49c5.44,2.09,10.79,4.44,16.25,6.71Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_13" data-name="Sun full 13" class="cls-1" d="M544.27,497.29c2.09-5,4.08-9.68,6.19-14.69,5.69,2.45,11.56,4.71,17.16,7.5,3.45,1.71,4.51,6.27,2.91,9.68-1.73,3.67-5.66,5.7-9.35,4.34C555.44,502,549.82,499.55,544.27,497.29Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_12" data-name="Sun full 12" class="cls-1" d="M452.63,522.85,467.27,529c-.74,1.77-1.5,3.65-2.3,5.53-1.59,3.74-3.05,7.55-4.84,11.2a7.62,7.62,0,0,1-7.68,4,7.73,7.73,0,0,1-6.75-6.07,6.7,6.7,0,0,1,0-3.61C447.94,534.28,450.33,528.55,452.63,522.85Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_11" data-name="Sun full 11" class="cls-1" d="M467.58,399.45l-14.68,6.08c-2.26-5.59-4.69-11.16-6.76-16.85-1.4-3.85.9-8.11,4.73-9.57a7.65,7.65,0,0,1,9.87,4.05C463.16,388.54,465.32,394.05,467.58,399.45Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_10" data-name="Sun full 10" class="cls-1" d="M550.49,446.18l-6.06-14.72c5.77-2.3,11.51-4.88,17.45-6.86,3.75-1.24,7.7,1.31,9,5a7.59,7.59,0,0,1-4,9.69C561.49,441.72,556,443.88,550.49,446.18Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_9" data-name="Sun full 9" class="cls-1" d="M426.94,497.07c-5.76,2.31-11.5,4.89-17.44,6.86-3.78,1.26-7.76-1.39-9.07-5.23a7.52,7.52,0,0,1,4.07-9.45c5.38-2.43,10.88-4.6,16.38-6.89C422.89,487.23,424.85,492,426.94,497.07Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_8" data-name="Sun full 8" class="cls-1" d="M518.48,523c2.29,5.69,4.81,11.36,6.85,17.2,1.28,3.69-1.11,7.76-4.74,9.19a7.46,7.46,0,0,1-9.53-3.39c-2.66-5.52-4.9-11.25-7.34-16.92Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_7" data-name="Sun full 7" class="cls-1" d="M386.82,514.75a8.07,8.07,0,0,1-8.07-7.85c0-4.3,3.87-8.11,8.4-8.2a8.2,8.2,0,0,1,8.07,7.91A8.47,8.47,0,0,1,386.82,514.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_6" data-name="Sun full 6" class="cls-1" d="M584.58,514.75a8.47,8.47,0,0,1-8.43-8.11,8.19,8.19,0,0,1,8-7.94c4.52.05,8.45,3.86,8.44,8.17A8.07,8.07,0,0,1,584.58,514.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_5" data-name="Sun full 5" class="cls-1" d="M592.62,421.75a8.56,8.56,0,0,1-8.52,8.07,8.22,8.22,0,0,1-8-8,8.48,8.48,0,0,1,8.78-8A8,8,0,0,1,592.62,421.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_4" data-name="Sun full 4" class="cls-1" d="M386.72,413.79a8.43,8.43,0,0,1,8.49,8,8.21,8.21,0,0,1-8.23,8,8.52,8.52,0,0,1-8.23-8.11A8,8,0,0,1,386.72,413.79Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_3" data-name="Sun full 3" class="cls-1" d="M536.17,563.26a8,8,0,0,1-7.72,7.93,8.67,8.67,0,0,1-8.33-8.54,8.18,8.18,0,0,1,8-7.93A8.46,8.46,0,0,1,536.17,563.26Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_2" data-name="Sun full 2" class="cls-1" d="M536.17,365.21a8.51,8.51,0,0,1-8.19,8.6,8.16,8.16,0,0,1-7.86-7.88,8.59,8.59,0,0,1,8-8.58A8,8,0,0,1,536.17,365.21Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_1" data-name="Sun full 1" class="cls-1" d="M435.2,563.24a8.42,8.42,0,0,1,8-8.51,8.16,8.16,0,0,1,8,7.94,8.66,8.66,0,0,1-8.36,8.52A8,8,0,0,1,435.2,563.24Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_full_circle" data-name="Sun full circle" class="cls-1" d="M485.65,408.25a56,56,0,0,0-.1,112h.17a56,56,0,0,0,.1-112Z" transform="translate(-367.08 -345.66)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "sun_Line") {
    shape = `<svg id="Sun_line" data-name="Sun line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.23 237.19">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <g id="Sun_line-2" data-name="Sun line">
            <path id="Sun_line_24" data-name="Sun line 24" class="cls-1" d="M367.08,462.42c1.79-4.56,5.13-6.16,10-6.09,13.12.21,26.25.07,39.37.07h2.44v15.74h-2.44c-13.12,0-26.25-.14-39.37.07-4.84.07-8.18-1.53-10-6.09Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_23" data-name="Sun line 23" class="cls-1" d="M483.83,582.85c-4.56-1.78-6.15-5.13-6.08-10,.2-13.11.07-26.24.07-39.36v-2.44h15.73v2.44c0,13.12-.13,26.25.07,39.36.07,4.84-1.52,8.19-6.08,10Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_22" data-name="Sun line 22" class="cls-1" d="M435.2,365.23a8,8,0,0,1,8-7.88,8.59,8.59,0,0,1,8.05,8.56,8.16,8.16,0,0,1-7.83,7.9A8.51,8.51,0,0,1,435.2,365.23Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_21" data-name="Sun line 21" class="cls-1" d="M432.94,422.64c-.45-.41-.92-.81-1.34-1.24q-14.5-14.47-29-29c-2.61-2.6-3.91-5.54-2.59-9.18a7.83,7.83,0,0,1,11.82-3.76A11.94,11.94,0,0,1,413.6,381q14.83,14.79,29.64,29.62a4.43,4.43,0,0,1,.46.52c-3.75,3.62-7.44,7.18-11.12,10.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_20" data-name="Sun line 20" class="cls-1" d="M538.81,422,528,411.19l-.71.5a11,11,0,0,1,1-1.19Q543,395.76,557.73,381c3.12-3.11,6.5-3.76,9.85-2a7.8,7.8,0,0,1,3,11.26,12.69,12.69,0,0,1-1.62,2l-29.63,29.63c-.27.27-.57.51-.85.76Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_19" data-name="Sun line 19" class="cls-1" d="M432.51,506.57l10.92,10.89.6-.5a7.61,7.61,0,0,1-.55.72c-10,10-20,20.13-30.14,30.1-4.75,4.68-11.93,2.89-13.57-3.27-.86-3.22.31-5.88,2.59-8.16q8.2-8.18,16.38-16.37l12.94-12.93c.42-.42.9-.79,1.35-1.18Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_18" data-name="Sun line 18" class="cls-1" d="M527.93,517.46l10.92-10.88-.53-.7c.4.34.84.64,1.2,1q14.67,14.64,29.32,29.3c2.47,2.46,3.76,5.25,2.61,8.75a7.8,7.8,0,0,1-12.19,3.9,13.63,13.63,0,0,1-1.57-1.37l-29.31-29.3c-.37-.37-.71-.79-1.06-1.18Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_17" data-name="Sun line 17" class="cls-1" d="M493.41,397.46H478a13.17,13.17,0,0,1-.15-1.49q0-21.15,0-42.31a7.86,7.86,0,0,1,15.47-2.1,7,7,0,0,1,.24,1.82q0,21.51,0,43A8.94,8.94,0,0,1,493.41,397.46Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_16" data-name="Sun line 16" class="cls-1" d="M552.51,472V456.56a13.17,13.17,0,0,1,1.49-.15q21.15,0,42.32,0a7.81,7.81,0,0,1,7.91,6.68,7.91,7.91,0,0,1-5.82,8.79,7,7,0,0,1-1.82.23H553.8A10.61,10.61,0,0,1,552.51,472Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_15" data-name="Sun line 15" class="cls-1" d="M518.72,405.7,504,399.52c2.42-5.65,4.65-11.45,7.36-17,1.72-3.53,6.24-4.66,9.84-3.05a7.51,7.51,0,0,1,4.3,9.34C523.42,394.53,521,400.15,518.72,405.7Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_14" data-name="Sun line 14" class="cls-1" d="M421,445.88c-5.46-2.28-10.89-4.42-16.21-6.83a7.86,7.86,0,0,1,6.07-14.49c5.44,2.09,10.79,4.44,16.25,6.71Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_13" data-name="Sun line 13" class="cls-1" d="M544.27,497.29c2.09-5,4.08-9.68,6.19-14.69,5.69,2.45,11.56,4.71,17.16,7.5,3.45,1.71,4.51,6.27,2.91,9.68-1.73,3.67-5.66,5.7-9.35,4.34C555.44,502,549.82,499.55,544.27,497.29Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_12" data-name="Sun line 12" class="cls-1" d="M452.63,522.85,467.27,529c-.74,1.77-1.5,3.65-2.3,5.53-1.59,3.74-3.05,7.55-4.84,11.2a7.62,7.62,0,0,1-7.68,4,7.73,7.73,0,0,1-6.75-6.07,6.7,6.7,0,0,1,0-3.61C447.94,534.28,450.33,528.55,452.63,522.85Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_11" data-name="Sun line 11" class="cls-1" d="M467.58,399.45l-14.68,6.08c-2.26-5.59-4.69-11.16-6.76-16.85-1.4-3.85.9-8.11,4.73-9.57a7.65,7.65,0,0,1,9.87,4.05C463.16,388.54,465.32,394.05,467.58,399.45Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_10" data-name="Sun line 10" class="cls-1" d="M550.49,446.18l-6.06-14.72c5.77-2.3,11.51-4.88,17.45-6.86,3.75-1.24,7.7,1.31,9,5a7.59,7.59,0,0,1-4,9.69C561.49,441.72,556,443.88,550.49,446.18Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_9" data-name="Sun line 9" class="cls-1" d="M426.94,497.07c-5.76,2.31-11.5,4.89-17.44,6.86-3.78,1.26-7.76-1.39-9.07-5.23a7.52,7.52,0,0,1,4.07-9.45c5.38-2.43,10.88-4.6,16.38-6.89C422.89,487.23,424.85,492,426.94,497.07Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_8" data-name="Sun line 8" class="cls-1" d="M518.48,523c2.29,5.69,4.81,11.36,6.85,17.2,1.28,3.69-1.11,7.76-4.74,9.19a7.46,7.46,0,0,1-9.53-3.39c-2.66-5.52-4.9-11.25-7.34-16.92Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_7" data-name="Sun line 7" class="cls-1" d="M386.82,514.75a8.07,8.07,0,0,1-8.07-7.85c0-4.3,3.87-8.11,8.4-8.2a8.2,8.2,0,0,1,8.07,7.91A8.47,8.47,0,0,1,386.82,514.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_6" data-name="Sun line 6" class="cls-1" d="M584.58,514.75a8.47,8.47,0,0,1-8.43-8.11,8.19,8.19,0,0,1,8-7.94c4.52.05,8.45,3.86,8.44,8.17A8.07,8.07,0,0,1,584.58,514.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_5" data-name="Sun line 5" class="cls-1" d="M592.62,421.75a8.56,8.56,0,0,1-8.52,8.07,8.22,8.22,0,0,1-8-8,8.48,8.48,0,0,1,8.78-8A8,8,0,0,1,592.62,421.75Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_4" data-name="Sun line 4" class="cls-1" d="M386.72,413.79a8.43,8.43,0,0,1,8.49,8,8.21,8.21,0,0,1-8.23,8,8.52,8.52,0,0,1-8.23-8.11A8,8,0,0,1,386.72,413.79Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_3" data-name="Sun line 3" class="cls-1" d="M536.17,563.26a8,8,0,0,1-7.72,7.93,8.67,8.67,0,0,1-8.33-8.54,8.18,8.18,0,0,1,8-7.93A8.46,8.46,0,0,1,536.17,563.26Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_2" data-name="Sun line 2" class="cls-1" d="M536.17,365.21a8.51,8.51,0,0,1-8.19,8.6,8.16,8.16,0,0,1-7.86-7.88,8.59,8.59,0,0,1,8-8.58A8,8,0,0,1,536.17,365.21Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_1" data-name="Sun line 1" class="cls-1" d="M435.2,563.24a8.42,8.42,0,0,1,8-8.51,8.16,8.16,0,0,1,8,7.94,8.66,8.66,0,0,1-8.36,8.52A8,8,0,0,1,435.2,563.24Z" transform="translate(-367.08 -345.66)"/>
            <path id="Sun_line_circle" data-name="Sun line circle" class="cls-1" d="M485.65,416.25h.14a48,48,0,0,1-.07,96h-.14a48,48,0,0,1,.07-96m0-8a56,56,0,0,0-.1,112h.17a56,56,0,0,0,.1-112Z" transform="translate(-367.08 -345.66)"/>
          </g>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "wing") {
    shape = `<svg id="Wing_full" data-name="Wing full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205.6 189.9">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Butterfly_line" data-name="Butterfly line" class="cls-1" d="M581.94,469c-8.83-16-25.23-28.63-40.75-36.31-38.79-19.18-84.43-15.68-122.9-35.51-7-3.63-14.85-8-23-7.91a11.41,11.41,0,0,0-11,7.65,25.56,25.56,0,0,0-1.32,9.71c.14,6.9,2.16,13.6,4.84,19.9,9.62,22.64,24.48,41.55,43.38,57.15a53.91,53.91,0,0,0,13.21,8.08,49.09,49.09,0,0,0,14.94,3.68q2.4.19,4.8.18a17.11,17.11,0,0,1,4.29.33,1.85,1.85,0,0,1,1.21,2.73,3.08,3.08,0,0,1-2.21,1.24c-3,.48-6,.29-9,.54s-6,.64-9,1c-5.81.66-12.38,1.85-17.08,5.55-5.7,4.48-6.27,10.51-5.51,17.2.9,6.22,4.28,11,9.21,14.53,14.13,10.27,37.12,8.68,49.89-3.32l3.2-1.94c1-.58,3.13-.93,3.82.27,1.1,1.94-3.32,4.33-4.59,5.2-3.63,2.49-7.39,4.84-10,8.45-3.45,4.68-4.9,9.67-1.63,15.12,3.08,7.36,11.37,12.3,19.07,10.71a48.3,48.3,0,0,0,16.06-6.34,42.9,42.9,0,0,0,6.89-5.32c1.08-1,2.22-2,3.22-3.12a13.38,13.38,0,0,0,1.35-1.75,5,5,0,0,1,1.41-1.83,1.45,1.45,0,0,1,2,.76,3.75,3.75,0,0,1-.48,2.32,32.73,32.73,0,0,0-2.59,8.53c-.51,4.12-.29,7.83,3.65,10,11.65,6.44,24.42.56,31.84-9.24,8-10.57,12.33-22.88,16-35.44-4.14,3.17-8.19,6.46-12.79,9a62.94,62.94,0,0,1-11.92,4.61c-15,3.76-28.89,1.91-39.86-9.89-9.24-9.93-13-22.25-12.64-35.66.31-10.91,7.23-20.25,16.45-25.68,9.8-5.78,21.1-6.17,31.81-3a40.34,40.34,0,0,1,18.85,15.57,27.68,27.68,0,0,1,3.21,9.07,28.25,28.25,0,0,1,.37,9.44c-.65,4.88-2.52,10.74-6.19,14.19a25.76,25.76,0,0,1-13.57,7c-5.74.86-12-.88-15.93-5.14a16.28,16.28,0,0,1-4.17-12.14,12.42,12.42,0,0,1,3.56-8.16,10.9,10.9,0,0,1,1.76-1.34,8.45,8.45,0,0,1,2-.93,6.34,6.34,0,0,1,2.93-.22,1,1,0,0,1,.69,1.4.79.79,0,0,1-.71.42c-.62.07-1.26.07-1.89.16a7,7,0,0,0-3.46,1.54,9.44,9.44,0,0,0-3,5.87A14.68,14.68,0,0,0,535.27,521c6.45,5.61,16.61,3.83,22.94-1.07,4.62-3.57,6.68-8.61,7.57-14.25,1.59-10.09-2.26-19.29-10-25.84a35.35,35.35,0,0,0-32.92-6.44c-12.86,4.07-22.95,15.93-21.6,29.88-.37,4.11.72,8,1.91,11.87,4.23,13.55,11.78,24.08,26.61,27.24,17,3.61,38.94-6,48.45-21,2.71-4.28,5.56-8.08,7.39-12.88a42.62,42.62,0,0,0,2.83-13.29A49.21,49.21,0,0,0,581.94,469Z" transform="translate(-382.89 -389.25)"/>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }
  else if (iconChoice == "wing_Line") {
    shape = `<svg id="Wing_line" data-name="Wing line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.61 197.93">
          <defs>
            <style>
              .cls-1 {
                fill: #fce2ee;
              }
            </style>
          </defs>
          <path id="Wing_line-2" data-name="Wing line" class="cls-1" d="M538.11,583.18a27.21,27.21,0,0,1-5.47-.55c-5.51-1.13-9.2-3.1-11.29-6-2.23-3.13-2.55-6.81-2.05-10.32a49.34,49.34,0,0,1-5.42,3.94,52.34,52.34,0,0,1-17.38,6.87C487.25,579,477,573.39,473,564.29c-3.2-5.54-3-11.33.62-17.26-13.3,4.44-29,2.9-40-5.09-6.19-4.5-9.83-10.29-10.82-17.21v-.11c-.75-6.53-.63-14.79,7-20.8,5.4-4.25,12.47-5.6,18.74-6.33a55.5,55.5,0,0,1-20-10.75c-20-16.5-35-36.24-44.52-58.66-3.34-7.85-5-14.85-5.16-21.39a29.84,29.84,0,0,1,1.58-11.23,15.48,15.48,0,0,1,14.76-10.21c8.58-.07,16.54,4,23.52,7.65l1.36.71c19,9.79,40.44,13.86,61.17,17.79s42.07,8,61.67,17.69c18.79,9.29,34.27,23.12,42.48,38a53.09,53.09,0,0,1,7,28.37,46.47,46.47,0,0,1-3.09,14.53,56.65,56.65,0,0,1-6.05,11c-.55.83-1.1,1.67-1.65,2.53l-2.79,9.46c-4.28,14.47-8.76,26.26-16.69,36.72-5.12,6.75-10.7,10.88-17.07,12.62A26.48,26.48,0,0,1,538.11,583.18Zm-13.35-32.42a5.64,5.64,0,0,1,5,2.33c1.65,2.45.51,5.19,0,6.35-1.4,3.36-4,9.62-1.92,12.52.48.67,1.94,1.92,6.38,2.83a19.08,19.08,0,0,0,8.77-.25c4.6-1.26,8.78-4.45,12.8-9.74,5-6.63,8.57-14,11.62-22.5-1.06.68-2.14,1.34-3.26,2l-.21.1a68.13,68.13,0,0,1-12.67,4.89c-18,4.5-32.75.78-43.76-11.06-9.54-10.25-14.15-23.2-13.71-38.5.33-11.56,7.21-22.41,18.42-29,10.14-6,22.24-7.16,35-3.39l.4.14a44.45,44.45,0,0,1,20.67,17.08c2.13,3.27,3.18,7.53,3.78,10.45a32.58,32.58,0,0,1,.42,10.76c-.44,3.31-2.05,11.53-7.42,16.58a29.46,29.46,0,0,1-15.72,8c-7.34,1.09-14.8-1.35-19.46-6.38a20.43,20.43,0,0,1-5.22-15.16,16.35,16.35,0,0,1,4.8-10.77,15.47,15.47,0,0,1,2.4-1.83,12.89,12.89,0,0,1,2.93-1.36,10.41,10.41,0,0,1,5.09-.27,5.08,5.08,0,0,1,3.28,2.58,5,5,0,0,1,.14,4.18,4.74,4.74,0,0,1-4,2.92c-.36,0-.72.06-1.07.08s-.49,0-.73.06a3,3,0,0,0-1.47.67,5.66,5.66,0,0,0-1.64,3.42,10.65,10.65,0,0,0,3.46,9.55c4.81,4.18,12.86,2.67,17.87-1.21,3.28-2.53,5.2-6.25,6.07-11.71,1.33-8.46-1.73-16.33-8.63-22.16a31.39,31.39,0,0,0-29.13-5.69c-10.28,3.25-20,13.12-18.83,25.68l0,.37,0,.37c-.3,3.38.66,6.82,1.75,10.33,4.44,14.24,12,22,23.62,24.51,15.31,3.26,35.56-5.54,44.24-19.22q.89-1.38,1.77-2.73a48.7,48.7,0,0,0,5.26-9.42A38.4,38.4,0,0,0,584.45,495a45.11,45.11,0,0,0-6-24.12c-7.44-13.44-21.66-26.08-39-34.66-18.62-9.21-39.47-13.17-59.63-17-21.29-4-43.3-8.22-63.33-18.54l-1.39-.72c-6.45-3.34-13.09-6.8-19.77-6.75a7.44,7.44,0,0,0-7.35,5.08,22.48,22.48,0,0,0-1.05,8.21c.11,5.49,1.59,11.52,4.52,18.41,9,21.23,23.24,39.94,42.25,55.62a46,46,0,0,0,31.93,11,12.41,12.41,0,0,1,5.1.62,6,6,0,0,1,3.33,3.65c1,2.71-.46,5.56-2.79,7-2.56,1.61-6.11,1.33-9,1.41l-2,.07c-2.71.13-5.4.46-8.08.78l-2.33.28c-5.24.59-11.12,1.62-15.06,4.71-3.66,2.88-4.79,6.68-4,13.54.69,4.74,3.18,8.61,7.59,11.82a32.58,32.58,0,0,0,15,5.67,40.42,40.42,0,0,0,16.55-1.3,36.15,36.15,0,0,0,7.56-3.18c4.67-2.65,9.47-9.5,15.62-7.47l.3.11a6.26,6.26,0,0,1,2.91,2.4,5,5,0,0,1,.83,3.29,5.8,5.8,0,0,1-1.38,3,23.9,23.9,0,0,1-5.12,4.22l-1.08.74c-3.09,2.1-6,4.08-8,6.78-3,4.11-3.45,7.3-1.42,10.69l.26.51c2.41,5.76,8.95,9.51,14.57,8.35a44.49,44.49,0,0,0,14.74-5.82,38.47,38.47,0,0,0,6.25-4.82l1.14-1.07a24.18,24.18,0,0,0,2.58-2.68c1.21-1.52,1.8-3.13,3.78-3.84A5.14,5.14,0,0,1,524.76,550.76ZM491.45,536.7Zm-25.1-37.14" transform="translate(-378.89 -385.25)"/>
        </svg>
		`
    element.innerHTML = shape;

    icons1 = document.querySelectorAll(".cls-1");

  }

}

function colorApplier() {

  fullBarGradient.children[0].setAttribute("stop-color", fullColor1);
  fullBarGradient.children[1].setAttribute("stop-color", fullColor2);
  fullBarGradient.children[2].setAttribute("stop-color", fullColor3);
  fullBarGradient.children[3].setAttribute("stop-color", fullColor1);
  fullBarGradient.children[4].setAttribute("stop-color", fullColor2);
  fullBarGradient.children[5].setAttribute("stop-color", fullColor3);
  fullBarGradient.children[6].setAttribute("stop-color", fullColor1);

  if (fullGlowOn == "on") {
    fullBar.style.filter = "drop-shadow(0 0 6px " + fullGlow + ")";
  }
  //fullBarGradient.setAttribute("x2", emptyBarSVG.getAttribute("width")/fullBarSVG.getAttribute("width"));
  if (idleOn == "on") {
    gradientAnimator(fullBarGradient, idleSpeed, true);
  }

  highGradient.children[0].setAttribute("stop-color", borderHighColor1);
  highGradient.children[1].setAttribute("stop-color", borderHighColor2);
  highGradient.children[2].setAttribute("stop-color", borderHighColor3);
  highGradient.children[3].setAttribute("stop-color", borderHighColor1);
  highGradient.children[4].setAttribute("stop-color", borderHighColor2);
  highGradient.children[5].setAttribute("stop-color", borderHighColor3);
  highGradient.children[6].setAttribute("stop-color", borderHighColor1);

  //highGradient.setAttribute("x2", marginHighlightSVG2.getAttribute("width"));
  if (idleOn == "on") {
    gradientAnimator(highGradient, idleSpeed);
  }

  holderGradient.children[0].setAttribute("stop-color", holderHighColor1);
  holderGradient.children[1].setAttribute("stop-color", holderHighColor2);
  holderGradient.children[2].setAttribute("stop-color", holderHighColor3);
  holderGradient.children[3].setAttribute("stop-color", holderHighColor1);
  holderGradient.children[4].setAttribute("stop-color", holderHighColor2);
  holderGradient.children[5].setAttribute("stop-color", holderHighColor3);
  holderGradient.children[6].setAttribute("stop-color", holderHighColor1);

  //holderGradient.setAttribute("x2", iconHolderHighlight2.getAttribute("width"));
  if (idleOn == "on") {
    gradientAnimator(holderGradient, idleSpeed);
  }

  margin.style.fill = borderColor;
  iconHolder.style.fill = holderColor;
  dotSVG2.style.fill = emptyColor;
  emptyBar.style.fill = emptyColor;

  goalTitle.style.color = textsColor;
  goalCounter.style.color = textsColor;

  if (textGlowOn == "on") {
    console.log(textGlow);
    textsDiv.style.filter = "drop-shadow(0 0 6px " + textGlow + ")";
  }
  if (iconGlowOn == "on") {
    iconPerse.style.filter = "drop-shadow(0 0 150px " + iconGlow + ")";
  }

  if (barGlowOn == "on") {
    cloneAndBlur(marginHighlightSVG2);
  }
  if (iconHolderGlowOn == "on") {
    cloneAndBlur(iconHolderHighlight2);
  }

  if (iconType == "icon") {
    if (iconChoice.split("_")[1] != "Stroke") {
      icons1.forEach(function (icon) {
        icon.style.fill = iconColor;
      });
    }
    else {
      icons1.forEach(function (icon) {
        icon.style.stroke = iconColor;
      });
    }
  }

}

function gradientAnimator(linearGradient, speed, fullBarBool) {
  fullBarBool = fullBarBool || false;
  let animatString;

  if (fullBarBool == true) {
    animateString = `
    		<animate attributeName="x1" values="` + (-1) * goalTotal / (currentValue + 0.01) + `; ` + 0 * goalTotal / (currentValue + 0.01) + `" dur="` + 15 / speed + `s" repeatCount="indefinite" />
    		<animate attributeName="x2" values="` + (2) * goalTotal / (currentValue + 0.01) + `; ` + 3 * goalTotal / (currentValue + 0.01) + `" dur="` + 15 / speed + `s" repeatCount="indefinite" />
    		`;
  }
  else {
    animateString = `
    		<animate attributeName="x1" values="-1; 0" dur="` + 15 / speed + `s" repeatCount="indefinite" />
    		<animate attributeName="x2" values=" 2; 3" dur="` + 15 / speed + `s" repeatCount="indefinite" />
    		`;
  }

  linearGradient.innerHTML += animateString;

}

function staticGradientRescaler(linearGradient, oldValue) {
  let startTimestamp;

  function animate(timestamp) {
    // Store the start timestamp when animation starts
    if (!startTimestamp) {
      startTimestamp = timestamp;
    }

    // Calculate progress based on time elapsed
    const progress = (timestamp - startTimestamp) / 1000; // 1500ms = 1.5s

    // Calculate new values for x1 and x2 based on progress
    const newX1 = ((-1) * goalTotal / oldValue) * (1 - progress) + ((-1) * goalTotal / (currentValue + 0.01)) * progress;
    const newX2 = ((2) * goalTotal / oldValue) * (1 - progress) + ((2) * goalTotal / (currentValue + 0.01)) * progress;

    // Update x1 and x2 attributes of linearGradient
    linearGradient.setAttribute('x1', newX1);
    linearGradient.setAttribute('x2', newX2);

    // Continue animation until progress reaches 1
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  // Start the animation
  requestAnimationFrame(animate);
}

function cloneAndBlur(originalElement, isFull) {

  isFull = isFull || false;
  // Check if the original element exists
  if (!originalElement) {
    console.error("Element not found.");
    return;
  }

  // Clone the original element
  const clonedElement = originalElement.cloneNode(true);
  const clonedElement2 = originalElement.cloneNode(true);

  // Apply filter blur to the cloned element
  clonedElement.style.filter = "blur(5px)";
  clonedElement.style.zIndex -= 1;

  clonedElement2.style.filter = "blur(15px)";
  clonedElement2.style.zIndex -= 2;

  // Insert the cloned element after the original element
  originalElement.parentNode.insertBefore(clonedElement, originalElement.nextSibling);
  originalElement.parentNode.insertBefore(clonedElement2, originalElement.nextSibling);

  if (isFull) {
    fullClone = clonedElement;
    fullClone2 = clonedElement2;
  }
}

function idleAnimator(element, animation, time) {
  element.style.animation = animation + " " + time + "s";
  element.style.animationTimingFunction = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";
  element.style.animationIterationCount = "infinite";
}

function pulseAnimation(element, duration, initialScale, finalScale, isEvery) {
  isEvery = isEvery || false;
  initialScale = initialScale || 1.1;
  finalScale = finalScale || 1.3;
  const clone = element.cloneNode(true);
  const rect = element.getBoundingClientRect();
  const finalOpacity = 0;

  let rescaleY = 1;

  // Copy the transform property from the original element to the clone
  //clone.style.transform = window.getComputedStyle(element).getPropertyValue('transform');

  // Set other styles for the clone
  let leftPosPer;

  if (flipBar == "on") {
    leftPosPer = (-1) * (rect.left * 100 / everything.offsetWidth);
  }
  else {
    leftPosPer = rect.left * 100 / everything.offsetWidth;
  }

  let topPosPer = rect.top * 100 / everything.offsetHeight;

  clone.style.position = 'absolute';
  clone.style.zIndex = '-1';
  clone.style.opacity = '0.5';
  clone.style.left = leftPosPer + '%';
  clone.style.top = topPosPer + '%';
  //clone.style.left = rect.left + 'px';
  //clone.style.top = rect.top + 'px';

  // Append the clone to the parent of the original element
  element.parentNode.appendChild(clone);

  if (isEvery) {
    rescaleY = 0.8;
    clone.removeChild(clone.children[0]);
  }

  // Apply animation styles to the clone
  //clone.style.transformOrigin = 'center';

  clone.style.transform = `scale(${initialScale}) translate(0%, 0%) scaleX(${rescaleY})`;

  //clone.style.transformOrigin = 'center';
  clone.getBoundingClientRect();
  clone.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  clone.style.transform = `scale(${finalScale}) translate(0%, 0%) scaleX(${rescaleY})`;
  clone.style.opacity = finalOpacity;

  // Remove the clone after the animation duration
  setTimeout(() => {
    clone.parentNode.removeChild(clone);
  }, duration);
}

function reachAnimation() {
  pulseAnimation(iconDiv, 1500, 1.2, 1.5);
  pulseAnimation(everything, 1500, 1.1, 1.4, true);

  setTimeout(() => {
    reachAnimation();
  }, 1500);
}

function fieldSetter() {

  pastGoal = "{pastGoal}";
  countOne = "{countOne}";
  widgetRoundness = "{widgetRoundness}";



  barGlowOn = "{barGlowOn}";
  iconType = "{iconType}";
  iconChoice = "{iconChoice}";
  customImage = "{customImage}";



  iconGlowOn = "{iconGlowOn}";
  iconHolderGlowOn = "{iconHolderGlowOn}";

  dotOn = "off";

  titleOn = "{titleOn}";
  textGlowOn = "{textGlowOn}";
  fullGlowOn = "{fullGlowOn}";
  titleText = "{titleText}";
  reachTitleOn = "{reachTitleOn}";
  reachTitleText = "{reachTitleText}";

  titleFont = "{titleFont}";
  counterType = "{counterType}";
  counterSize = "{counterSize}";
  counterAlign = "{counterAlign}";
  counterPosH = "{counterPosH}";
  counterPosV = "{counterPosV}";
  showCents = "{showCents}";
  idleOn = "{idleOn}";
  idleSpeed = "{idleSpeed}";
  eventOn = "{eventOn}";
  reachOn = "{reachOn}";
  flipBar = "{flipBar}";


  fullHeight = "22";
  emptyHeight = "7";
  progressWidth = "33";
  progressPosH = "0";
  progressPosV = "0";

  borderWidth = "0";
  borderHeight = "0";
  highlightWidth = "0";
  highlightHeight = "0";
  highlightPosH = "0";
  highlightPosV = "0";

  iconFollow = "on";
  iconScale = "{iconScale}";
  iconHolderScale = "{iconHolderScale}";
  iconHolderPosH = "{iconHolderPosH}";
  iconHolderPosV = "{iconHolderPosV}";
  iconPosH = "{iconPosH}";
  iconPosV = "{iconPosV}";
  iconHolderHighlightPosH = "{iconHolderHighlightPosH}";
  iconHolderHighlightPosV = "{iconHolderHighlightPosV}";
  iconHolderHighlightWidth = "{iconHolderHighlightWidth}";
  iconHolderHighlightHeight = "{iconHolderHighlightHeight}";

  titleAlign = "{titleAlign}";
  titleSize = "{titleSize}";
  titlePosH = "{titlePosH}";
  titlePosV = "{titlePosV}";

  marginOn = "off";
  marginHighlightOn = "off";

  iconHolderOn = "{iconHolderOn}";
  iconHolderHighlightOn = "{iconHolderHighlightOn}";

  colorTheme = "{colorTheme}";

  if (colorTheme == "custom") {
    emptyColor = "{emptyColor}";
    fullColor1 = "{fullColor1}";
    fullColor2 = "{fullColor2}";
    fullColor3 = "{fullColor3}";
    fullGlow = "{fullGlow}";
    borderColor = "{borderColor}";
    borderHighColor1 = "{borderHighColor1}";
    borderHighColor2 = "{borderHighColor2}";
    borderHighColor3 = "{borderHighColor3}";
    iconColor = "{iconColor}";
    iconGlow = "{iconGlow}";
    holderColor = "{holderColor}";
    holderHighColor1 = "{holderHighColor1}";
    holderHighColor2 = "{holderHighColor2}";
    holderHighColor3 = "{holderHighColor3}";
    textsColor = "{textsColor}";
    textGlow = "{textGlow}";
  }
  else {
    let colorArray = colorTheme.split(" ");
    emptyColor = colorArray[0];

    fullColor1 = colorArray[1];
    fullColor2 = colorArray[2];
    fullColor3 = colorArray[3];
    fullGlow = colorArray[4];

    borderColor = colorArray[5];
    borderHighColor1 = colorArray[6];
    borderHighColor2 = colorArray[7];
    borderHighColor3 = colorArray[8];

    iconColor = colorArray[9];
    iconGlow = colorArray[10];
    holderColor = colorArray[11];
    holderHighColor1 = colorArray[12];
    holderHighColor2 = colorArray[13];
    holderHighColor3 = colorArray[14];

    textsColor = colorArray[15];
    textGlow = colorArray[16];
  }

}