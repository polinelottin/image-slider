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
    const canvas = document.getElementById("image_slider");
    const ctx = canvas.getContext("2d");
    const image = imagesElement[state.currentIndex];

    const { width, height } = image;
    const dHeight = height >= width ? canvas.height : (height * canvas.width) / width;
    const dWidth = width >= height ? canvas.width : (width * canvas.height) / height;

    const dx = dWidth === canvas.width ? 0 : (canvas.width - dWidth) * 0.5;
    const dy = dHeight === canvas.height ? 0 : (canvas.height - dHeight) * 0.5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, width, height, dx, dy, dWidth, dHeight)
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
