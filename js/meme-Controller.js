'use strict'

let gElCanvas
let gCtx
let gTextStartPoss = { x: 70, y: 50 } // maybe use reduce to move to the next pos


function onInit() {
    setCanvas()
    renderMeme()
    renderGallery()
}


function renderMeme() {
    let meme = getMeme()

    const elImg = onMemeImg(meme)
    meme = getMeme()

    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onMemeImg({ selectedImgId }) {
    const elImg = new Image()           //the selected image from the gallery
    elImg.src = getMemeImg(selectedImgId)

    return elImg
    // elImg.onload = () =>
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function onMemeTxt(text) {
    console.log(text)
    const meme = setLineTxt(text)

    //  ---------- Move it to separeted function ---------------- //
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'         //will come from the btn from service

    gCtx.fillStyle = 'lightsteelblue'   //will come from the btn from service

    gCtx.font = '20px Arial'            //will come from the btn from service
    gCtx.textAlign = 'center'           //will come from the btn from service
    gCtx.textBaseline = 'middle'        //will come from the btn from service

    gCtx.fillText(meme.lines[0].txt, gTextStartPoss.x, gTextStartPoss.y)
    gCtx.strokeText(meme.lines[0].txt, gTextStartPoss.x, gTextStartPoss.y) // the Render
}


function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function toggleHidden(ev) {
    console.log(ev)

}





