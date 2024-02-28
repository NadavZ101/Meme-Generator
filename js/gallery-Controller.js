'use strict'

function renderGallery() {
    const strImgsHTML = `
    <img src="meme-imgs-square/${1}.jpg" onclick="onImgSelect(this)">
    <img src="meme-imgs-square/${2}.jpg" onclick="onImgSelect(this)">
    `
    const elGallery = document.querySelector('.memes-gallery')
    elGallery.innerHTML = strImgsHTML
}