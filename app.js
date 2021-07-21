const imagesUrl = [
    'http://challenge.publitas.com/images/0.jpg',
    'http://challenge.publitas.com/images/1.jpg',
    'http://challenge.publitas.com/images/2.jpg',
    'http://challenge.publitas.com/images/3.jpg',
];

const imagesElement = imagesUrl.map(url => {
    const imageElement = new Image();
    imageElement.src = url;
    return imageElement;
});

const setCanvasImage = () => {
    var c = document.getElementById("image_slider");
    var ctx = c.getContext("2d");
    ctx.drawImage(imagesElement[currentImage], 10, 10, 640, 400);
}

let currentImage = 1;

window.onload = () => setCanvasImage(imagesElement[currentImage]);

const changeImg = () => {
    currentImage++;
    currentImage = currentImage < imagesElement.length ? currentImage : 0;

    setCanvasImage(imagesElement[currentImage])
};