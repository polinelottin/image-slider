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

const state = {
    currentIndex: 0,
};

const setIndex = increase => { 
    const { currentIndex } = state;
    let newIndex = currentIndex + increase;

    if (newIndex === imagesElement.length) {
        newIndex = 0;
    }

    if (newIndex < 0) {
        newIndex = imagesElement.length -1;
    }

    state.currentIndex = newIndex;
};

const drawImageOnCanvas = () => {
    var c = document.getElementById("image_slider");
    var ctx = c.getContext("2d");
    ctx.drawImage(imagesElement[state.currentIndex], 10, 10, 640, 400);
}

window.onload = () => drawImageOnCanvas();

const next = () => {
    setIndex(1);
    drawImageOnCanvas()
};

const previous = () => {
    setIndex(-1);
    drawImageOnCanvas()
};
