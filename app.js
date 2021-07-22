const imagesUrl = [
    'http://challenge.publitas.com/images/0.jpg',
    'http://challenge.publitas.com/images/1.jpg',
    'http://challenge.publitas.com/images/2.jpg',
    'http://challenge.publitas.com/images/3.jpg',
];

const state = {
    currentIndex: 0,
};

const setIndex = increase => { 
    const { currentIndex } = state;
    let newIndex = currentIndex + increase;

    if (newIndex === imagesUrl.length) {
        newIndex = 0;
    }

    if (newIndex < 0) {
        newIndex = imagesUrl.length -1;
    }

    state.currentIndex = newIndex;
};

const selectAreaAndDraw = image => {
    const canvas = document.getElementById("slider");
    const ctx = canvas.getContext("2d");

    const { width, height } = image;
    const dHeight = height >= width ? canvas.height : (height * canvas.width) / width;
    const dWidth = width >= height ? canvas.width : (width * canvas.height) / height;

    const dx = dWidth === canvas.width ? 0 : (canvas.width - dWidth) * 0.5;
    const dy = dHeight === canvas.height ? 0 : (canvas.height - dHeight) * 0.5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, width, height, dx, dy, dWidth, dHeight);
};

const drawImageOnCanvas = () => {
    const loading = document.getElementById("loading");
    loading.style.display = 'block';

    var img = new Image();
    img.onload = () => {
        selectAreaAndDraw(img);
        loading.style.display = 'none';
    };
    img.onerror = () => {
        console.log('Error loading image :-(');
        loading.display = 'none';
        next();
    };
    img.src = imagesUrl[state.currentIndex];
}

const next = () => {
    setIndex(1);
    drawImageOnCanvas();
};

const previous = () => {
    setIndex(-1);
    drawImageOnCanvas();
};

const handleImageClick = event => {
    const canvas = document.getElementById("slider");

    if (event.layerX > canvas.width * 0.5){
        next();
    } else {
        previous();
    }
};