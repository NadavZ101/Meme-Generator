'use strict'

let gElCanvas
let gCtx
let gTextStartPoss = { x: 100, y: 100 }


function onInit() {
    setCanvas()
    renderMeme()
}


function renderMeme() {
    setMeme()
    drawMemeText()
}

function setMeme() {
    const elImg = new Image()
    elImg.src = 'meme-imgs-square/1.jpg'

    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawMemeText(text) {
    console.log(text)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'tomato'         //will come from the btn from service

    gCtx.fillStyle = 'lightsteelblue'   //will come from the btn from service

    gCtx.font = '20px Arial'            //will come from the btn from service
    gCtx.textAlign = 'center'           //will come from the btn from service
    gCtx.textBaseline = 'middle'        //will come from the btn from service

    gCtx.fillText(text, gTextStartPoss.x, gTextStartPoss.y)
    gCtx.strokeText(text, gTextStartPoss.x, gTextStartPoss.y)
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}



