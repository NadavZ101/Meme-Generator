'use strict'

let gElCanvas
let gCtx
let gTextStartPoss = { x: 70, y: 50 } // maybe use reduce to move to the next pos


function onInit() {
    setCanvas()
    renderGallery()

}

function renderMeme(memeImg) {
    console.log(memeImg)
    memeImg.onload = () =>
        gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onImgSelect(selectedImg) {
    const meme = getMeme(selectedImg)

    const elImg = new Image
    elImg.src = setImg(meme)

    renderMeme(elImg)
}


function onMemeTxt(text) {
    console.log(text)
    const meme = setLineTxt(text)

    //  ---------- Move it to separeted function ---------------- //
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'orange'         //will come from the btn from service

    gCtx.fillStyle = 'lightsteelblue'   //will come from the btn from service

    gCtx.font = '20px Arial'            //will come from the btn from service
    gCtx.textAlign = 'center'           //will come from the btn from service
    gCtx.textBaseline = 'middle'        //will come from the btn from service

    gCtx.fillText(meme.lines[0].txt, gTextStartPoss.x, gTextStartPoss.y)
    gCtx.strokeText(meme.lines[0].txt, gTextStartPoss.x, gTextStartPoss.y) // the Render
}

function onTxtColor(color) {
    console.log(color)
    // const meme = getMemeImg(selectedImg)
    const meme = setTxtColor(color)

}

function downloadMeme(elLink) {
    const meme = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = meme
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

// function toggleHidden(ev) {
//     console.log(ev.classList.value)
//     const elMemeEditor = document.querySelector('.meme-flex-container')
//     const elGallery = document.querySelector('.gallery')
//     const elAbout = document.querySelector('.about')


//     if (ev.classList.value === 'gallery-btn btn') {
//         elMemeEditor.classList.remove('meme-flex-container')
//         elGallery.classList.add('gallery')
//         // elAbout.style.display = 'none'

//     }

//     if (ev.classList.value === 'editor-btn btn') {
//         elMemeEditor.classList.add('meme-flex-container')
//         elGallery.classList.remove('gallery')
//         renderMeme()
//         // elAbout.style.display = 'none'
//     }

//     if (ev.classList.value === 'about-btn btn') {
//         elAbout.style.display = 'flex'
//         elMemeEditor.style.display = 'none'
//         elGallery.style.display = 'none'
//     }

// }





