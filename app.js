const sources = [
    'http://challenge.publitas.com/images/0.jpg',
    'http://challenge.publitas.com/images/1.jpg',
    'http://challenge.publitas.com/images/2.jpg',
    'http://challenge.publitas.com/images/3.jpg',
    'https://github.com/polinelottin.png'
];

const state = {
    currentIndex: 0,
    images: [],
};

const setIndex = increase => { 
    const { currentIndex } = state;
    let newIndex = currentIndex + increase;

    if (newIndex === sources.length) {
        newIndex = 0;
    }

    if (newIndex < 0) {
        newIndex = sources.length -1;
    }

    state.currentIndex = newIndex;
};

dimensions = {
    max_height : 800,
    max_width  : 600,
    width  : 800, // this will change
    height : 600, // this will change
    largest_property : function () {
        return this.height > this.width ? "height" : "width";
    },
    read_dimensions : function (img) {
        this.width = img.width;
        this.height = img.height;
        return this;
    },
    scaling_factor : function (original, computed) {
        return computed / original;
    },
    scale_to_fit : function () {
        var x_factor = this.scaling_factor(this.width,  this.max_width),
            y_factor = this.scaling_factor(this.height, this.max_height),

            largest_factor = Math.min(x_factor, y_factor);

        this.width  *= largest_factor;
        this.height *= largest_factor;
    }
};

const selectAreaAndDraw = () => {
    const image = state.images[state.currentIndex];
    const canvas = document.getElementById("slider");
    const ctx = canvas.getContext("2d");

    dimensions.read_dimensions(image).scale_to_fit();

    canvas.width  = dimensions.width;
    canvas.height = dimensions.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);

    // const { width, height } = image;
    // const dHeight = height >= width ? canvas.height : (height * canvas.width) / width;
    // const dWidth = width >= height ? canvas.width : (width * canvas.height) / height;

    // const dx = dWidth === canvas.width ? 0 : (canvas.width - dWidth) * 0.5;
    // const dy = dHeight === canvas.height ? 0 : (canvas.height - dHeight) * 0.5;

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(image, 0, 0, width, height, dx, dy, dWidth, dHeight);
};

const loadImages = async () => {
    for (const source of sources) {
        const img = new Image();
        img.src = source;
        await img.decode();
        state.images.push(img);
    }
};

(async () => {
    const loading = document.getElementById("loading");
    loading.style.display = 'block';

    await loadImages();

    selectAreaAndDraw();
    loading.style.display = 'none';
})();

const next = () => {
    setIndex(1);
    selectAreaAndDraw();
};

const previous = () => {
    setIndex(-1);
    selectAreaAndDraw();
};

const handleImageClick = event => {
    const canvas = document.getElementById("slider");

    if (event.layerX > canvas.width * 0.5){
        next();
    } else {
        previous();
    }
};