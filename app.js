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

const drawImageOnCanvas = () => {
    var c = document.getElementById("image_slider");
    var ctx = c.getContext("2d");
    ctx.drawImage(imagesElement[currentImage], 10, 10, 640, 400);
}

let currentImage = 1;

window.onload = () => drawImageOnCanvas(imagesElement[currentImage]);

const next = () => {
    currentImage++;
    currentImage = currentImage < imagesElement.length ? currentImage : 0;

    console.log('next', currentImage)
    drawImageOnCanvas(imagesElement[currentImage])
};

const previous = () => {
    currentImage--;
    currentImage = currentImage < 0 ? imagesElement.length - 1 : currentImage;

    console.log('previous', currentImage)
    drawImageOnCanvas(imagesElement[currentImage])
};
