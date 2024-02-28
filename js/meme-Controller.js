'use strict'

let gElCanvas
let gCtx
let gTextStartPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}


function renderMeme() {
    const elImg = new Image()
    elImg.src = 'meme-imgs-square/1.jpg'

    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}



