function appendMyElement(elementVariable, elementId, elementParent, elementClasses) {
  elementVariable.id = elementId;
  elementVariable.className = elementClasses;
  elementParent.appendChild(elementVariable);
}

function createTransformRadios() {
  for (let i = 0; i < transformRadioId.length; i++) {
    let radioBtnContainer = document.createElement('div');
    let radioBtn = document.createElement('input');
    let radioBtnLabel = document.createElement('label');
    appendMyElement(radioBtnContainer, "", transformRadioForm, 'radioContainer');
    appendMyElement(radioBtn, transformRadioId[i], transformRadioForm, 'radio ' + transformRadioId[i]);
    appendMyElement(radioBtnLabel, "", transformRadioForm, 'radioLabel ' + transformRadioId[i]);
    radioBtn.setAttribute('type', 'radio');
    radioBtn.setAttribute('name', 'transformCanvas');
    radioBtnLabel.setAttribute('for', transformRadioId[i]);
    radioBtnLabel.innerHTML = transformRadioLabel[i];
    if (transformRadioId[i] === 'original') {
      radioBtn.checked = true;
    }
  };
};

function checkTransform (radioArr) {
  for(radio in radios) { //for each element of array radios
    radios[radio].onclick = function() {
      transformChoice = this.id;
      switch(transformChoice) {
        case 'original':
          theCanvas.style.transform = "translateY(-50%)";
          break;
        case 'flip-180deg':
          theCanvas.style.transform = "rotateY(180deg) translateY(-50%)";
          break;
        case 'turn-right':
          theCanvas.style.transform = "rotate(90deg) translateX(-50%)";
          break;
        case 'turn-left':
          theCanvas.style.transform = "rotate(-90deg) translateX(50%)";
      }
    }
  }
}

function checkCanvasSizeInput() {
  if (canvasHeight === "" || canvasWidth === "" || canvasHeight < 300 || canvasWidth < 300 ||  canvasHeight > 700 || canvasWidth > 700) {
    alert('Invalid size!!! Min = 300 / Max = 700');
  } else {
    theCanvas.style.height = canvasHeight +'px';
    theCanvas.style.width = canvasWidth + 'px';
   document.getElementById('modal-wrapper').style.display = 'none'; 
  }
}

function showCoords(event) {
  xOffset = event.offsetX;
  yOffset = event.offsetY;
}

function drawOnCanvas(){
  if (isDrawing) {
    let drawSpot = document.createElement('div');
    drawSpot.className = "pen " + Functionalities.selectedSize + " " + Functionalities.selectedColor;
    drawSpot.style.top = yOffset +'px';
    drawSpot.style.left = xOffset + 'px';
    theCanvas.appendChild(drawSpot); 
  };
}


let Functionalities = {};
let isDrawing = false;
let canvasHeight;
let canvasWidth;
let xOffset, yOffset; 

var mainContainer = document.getElementById("mainContainer");
var modalWrapper = document.createElement('div');
var modal = document.createElement('div');
var modalTitle = document.createElement('div');
var modalHeightInput = document.createElement('div');
var modalWidthInput = document.createElement('div');
var modalOkBtn = document.createElement('button');
var functionContainer = document.createElement('div');
var colorContainer = document.createElement('ul');
var penContainer = document.createElement('div');
var penSizeHeader = document.createElement('ul');
var eraserContainer = document.createElement('div');
var eraserOption= document.createElement('input');
var eraserLabel= document.createElement('h3');
var transformContainer = document.createElement('div');
var transformHeader = document.createElement('h3');
var transformRadioForm = document.createElement('form');
var clearContainer = document.createElement('div');
var clearCanvasBtn = document.createElement('button');
var canvasContainer = document.createElement('div');
var theCanvas = document.createElement('div');

appendMyElement(modalWrapper, 'modal-wrapper', mainContainer, 'modal-wrapper');
appendMyElement(modal, 'modal', modalWrapper, 'modal');
appendMyElement(modalTitle, 'modalTitle', modal, 'modal-title');
appendMyElement(modalHeightInput, 'heightInput', modal, 'modal-content');
appendMyElement(modalWidthInput, 'widthInput', modal, 'modal-content');
appendMyElement(modalOkBtn, 'modalOk', modal, 'modalOk');
appendMyElement(functionContainer, 'functionalities', mainContainer, 'functionalities');
appendMyElement(canvasContainer, 'canvasContainer', mainContainer, 'container canvasContainer');
appendMyElement(colorContainer, 'colorContainer', functionContainer, 'colorContainer');
appendMyElement(penContainer, 'penContainer', functionContainer, 'penContainer function-bg');
appendMyElement(penSizeHeader, 'penSizeHeader', penContainer, 'penSizeHeader');
appendMyElement(eraserContainer, 'eraserContainer', functionContainer, 'container eraserContainer function-bg');
appendMyElement(eraserLabel, 'eraserSizeHeader', eraserContainer, 'eraserSizeHeader');
appendMyElement(eraserOption, 'eraserCheck', eraserContainer, "eraserCheck");
appendMyElement(transformContainer, 'transformContainer', functionContainer, 'container transformContainer');
appendMyElement(transformHeader, 'transformHeader', transformContainer, 'transformHeader');
appendMyElement(transformRadioForm, 'transformRadioForm', transformContainer, '')
appendMyElement(clearContainer, 'clearContainer', functionContainer, 'container clearContainer');
appendMyElement(clearCanvasBtn, 'clearCanvasBtn', clearContainer, 'clearCanvasBtn');
appendMyElement(theCanvas, 'canvas', canvasContainer, 'canvas');

transformHeader.innerHTML = "Transform original canvas"
penSizeHeader.innerHTML = "Select brush size";

modalTitle.innerHTML = 'Set Canvas Size';
modalHeightInput.innerHTML = 'Height (px): <input type="number" id="height" placeholder="input a number (300-700)" />'
modalWidthInput.innerHTML = 'Width (px): <input type="number" id="width" placeholder="input a number (300-700)" />'
modalOkBtn.innerHTML = 'OK';

eraserOption.setAttribute('type', 'checkbox');
eraserOption.setAttribute('name', 'checkbox');
eraserLabel.innerHTML = "Use eraser";

clearCanvasBtn.innerHTML = "Clear Canvas";

transformRadioForm.setAttribute('name', 'radioForm');
theCanvas.style.transform = "translateY(-50%)";
transformRadioLabel = ['original', 'flip 180deg', 'turn right', 'turn left'];
transformRadioId = ['original', 'flip-180deg', 'turn-right', 'turn-left'];

createTransformRadios();
var transformChoice = 'original';
var radios = document.forms["transformRadioForm"].elements["transformCanvas"]; //creates an array
checkTransform(radios);

modalOkBtn.addEventListener('click', function() {
  canvasHeight = document.getElementById('height').value;
  canvasWidth = document.getElementById('width').value;
  checkCanvasSizeInput();
});

document.addEventListener('keydown', function(e) {
  if (e.which === 13) {
    canvasHeight = document.getElementById('height').value;
    canvasWidth = document.getElementById('width').value;  
    checkCanvasSizeInput();
  };
});

clearCanvasBtn.addEventListener('click', function(){
  while (canvas.hasChildNodes()) {  
    canvas.removeChild(canvas.firstChild);
  };
});

var checkbox = document.querySelector("input[name=checkbox]");
checkbox.addEventListener( 'change', function() {
  if(this.checked) {
    Functionalities.selectedColor = 'whiteInk';
  } else {
    var userSelectedColor = document.getElementsByClassName('selectedColor');
    Functionalities.selectedColor = userSelectedColor[0].id;
  }
});

Functionalities.colorId = ['blackInk', 'blueInk', 'greenInk', 'redInk', 'violetInk','yellowInk', 'lightBlueInk','darkVioletInk','orangeInk'];
Functionalities.selectedColor = 'blackInk'; //default ink color

Functionalities.generateColor = function() {
  for(let i = 0; i < Functionalities.colorId.length; i++) {
    var colorListItem = document.createElement('li');
    var colorListButton = document.createElement('button');
    colorListButton.className = 'colorButton ' + Functionalities.colorId[i];
    colorListButton.id = Functionalities.colorId[i];
    if (Functionalities.colorId[i] === 'blackInk'){
      colorListButton.classList.add('selectedColor');
    }
    colorContainer.appendChild(colorListItem);
    colorListItem.appendChild(colorListButton);
    colorListButton.addEventListener('click', function(e){
      document.getElementById(Functionalities.selectedColor).classList.remove("selectedColor");
      var clickedColor = e.target;
      Functionalities.selectedColor = clickedColor.id;
      clickedColor.classList.add('selectedColor');
    });
  };
};
Functionalities.generateColor();

Functionalities.penSizeBtnId = ['smallPenBtn', 'mediumPenBtn', 'largePenBtn'];
Functionalities.penSizeClass = ['smallPenBtn', 'mediumPenBtn', 'largePenBtn']; //size of spot to draw
Functionalities.penSizeBtnLabel = ['S (4px)', 'M (8px)', 'L (12px)'];
Functionalities.selectedSize = 'smallPenBtn'; //default pen size for drawing

Functionalities.generateSizeBtn = function () {
  for (let j = 0; j < Functionalities.penSizeBtnId.length; j++) {
    var sizeListItem = document.createElement('li');
    var sizeListButton = document.createElement('button');
    var buttonLabel = document.createTextNode(Functionalities.penSizeBtnLabel[j]);
    sizeListButton.className = "penSizeBtn";
    sizeListButton.id = Functionalities.penSizeBtnId[j];
    if (Functionalities.penSizeBtnId[j] === 'smallPenBtn') {
      sizeListButton.classList.add('selectedSize');
    }
    penSizeHeader.appendChild(sizeListItem);
    sizeListItem.appendChild(sizeListButton);
    sizeListButton.appendChild(buttonLabel);
    sizeListButton.addEventListener('click', function(e){
      document.getElementById(Functionalities.selectedSize).classList.remove('selectedSize');
      var clickedSize = e.target;
      Functionalities.selectedSize = clickedSize.id;
      clickedSize.classList.add('selectedSize');
    });
  };  
};
Functionalities.generateSizeBtn();

canvas.addEventListener('mousedown', function() {
  isDrawing = true;
});

mainContainer.addEventListener('mouseup', function() { //changed from 'canvas' to 'canvasContainer' to 'mainContainer'
  isDrawing = false;
});

canvas.addEventListener('mousemove', function(e) {  
  showCoords(e); 
  drawOnCanvas(); 
});