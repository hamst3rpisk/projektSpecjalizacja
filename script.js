function callIndex() {
    const gridButton = document.querySelector("#gridButton");
    const nextPageTransitionDiv = document.querySelector("#nextPage");
    gridButton.addEventListener("click", (e) => {
        setTimeout(() => { 
        nextPageTransitionDiv.style.height = "0vh";
        window.location.href = "grid.html";
        },2000);
        nextPageTransitionDiv.style="animation: switchPage 0.4s forwards";
    });
    
    
}

function callGrid() {
    const nextPageTransitionDivReverse = document.querySelector("#nextPageGrid");
    nextPageTransitionDivReverse.style="animation: switchPageReverse 0.4s forwards";

    

    let gridColor = "white";
    let ctrlZMax = 8;
    const canvas = document.querySelector("#mainCanvas");
    const ctx = canvas.getContext("2d", {willReadFrequently: true});
    canvas.width = 600;
    canvas.height = 600;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = "1";
    ctx.strokeStyle="gray";
    const widthSlider = document.querySelector("#canvasWidth");
    const heightSlider = document.querySelector("#canvasHeight");
    const pixelSlider = document.querySelector("#pixelSize");
    const pixelText = document.querySelector("#pixelText");
    const widthText = document.querySelector("#widthText");
    const heightText = document.querySelector("#heightText");
    let pixelSize = pixelSlider.value;

    let drawnPixels = new Set();
    let everyDrawn = [];
    let drawn = [];
    function drawPixel(x, y) {
        const pixelKey = `${x},${y}`;
        let imageData = ctx.getImageData(x,y,pixelSize,pixelSize);
        let pixelData = imageData.data;
        let color = `rgba(${pixelData[0]},${pixelData[1]},${pixelData[2]})`;
        if (!drawnPixels.has(pixelKey)) {
            ctx.fillRect(x, y, pixelSize, pixelSize);
            drawnPixels.add(pixelKey);
            drawn.push({x,y,reverseColor: color});
        }
    }
    
    function drawGridLines() {
        ctx.beginPath();
        ctx.fillStyle="gray";
        for (let i=0;i<canvas.width/pixelSize;i++)
        {
            for(let j=0;j<canvas.height/pixelSize;j++) {
                if (!(j%2)) {
                    ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
                    console.log("darw");
                }
            }
        }
        ctx.stroke();
        ctx.closePath();
    }
    drawGridLines();
    /* fill canvas init */
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    ctx.strokeStyle = "gray";
    const colorPicker = document.querySelector("#colorInput");
    

    /* For the grid scaling sliders */
    
   
    // for (let i=0;i<128;i++) {
    //     for (let j=0;j<128;j++) {
    //         ctx.rect(i*5,j*5,5,5);
    //     }
    // }
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,pixelSize,pixelSize); /* DO NOT DELETE THIS LINE (VERY IMPORTANT) !!!*/
    let color = colorPicker.value;
    colorPicker.addEventListener("change", (e) => {
        console.log(colorPicker.value);
        ctx.fillStyle = colorPicker.value;
        console.log(ctx.fillStyle);
    });

    ctx.stroke();

    function ctrlZ() {
        if (everyDrawn.length != 0) {
            for (let {x,y,reverseColor} of everyDrawn[everyDrawn.length-1]) {
                ctx.fillStyle=reverseColor;
                console.log(reverseColor);
                ctx.fillRect(x,y,pixelSize,pixelSize);
            }
        
            ctx.fillStyle=colorPicker.value;
            drawn = [];
            everyDrawn.splice(-1);
        }
        ctx.fillStyle=colorPicker.value;
    }
    
    let drawing = false;
    canvas.addEventListener("mouseup", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
        }
        drawnPixels.clear();

    });
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            x = Math.floor(x/pixelSize)*pixelSize;
            y = Math.floor(y/pixelSize)*pixelSize;


                ctx.fillStyle = colorPicker.value;
                drawPixel(x,y);
                ctx.stroke();
                
                console.log(drawn[drawn.length-1]);

        
    });
    canvas.addEventListener("mousemove", (e) => {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            x = Math.floor(x/pixelSize)*pixelSize;
            y = Math.floor(y/pixelSize)*pixelSize;


                ctx.fillStyle = colorPicker.value;
                drawPixel(x,y);

                console.log(drawn[drawn.length-1]);
                
                ctx.stroke();

        }
    });
    canvas.addEventListener("mouseout", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
            console.log(everyDrawn.length);
        }
        drawnPixels.clear();
    });


    document.addEventListener("keydown",(e) => {
        e.preventDefault();
        if (e.code === "KeyZ" && e.ctrlKey === true) {
            ctrlZ();
            console.log("ctrlz");
        }
    });
    heightSlider.addEventListener("change", (e) => {

        if (heightSlider.value > window.innerWidth*0.9) {
            heightSlider.value = window.innerWidth*0.9;
        };
        heightSlider.step=pixelSize;
        heightText.textContent = "Canvas Height: " + heightSlider.value;
        canvas.height = heightSlider.value;
        ctx.imageSmoothingEnabled = false;
        ctx.lineWidth = "1";
        ctx.strokeStyle = "gray";
        ctx.fillStyle = colorPicker.value;
        
    });
    widthSlider.addEventListener("change", (e) => {
        if (widthSlider.value > window.innerWidth*0.8) {
            widthSlider.value = window.innerWidth*0.8;
        };
        widthSlider.step=pixelSize;
        widthText.textContent = "Canvas Width: "+ widthSlider.value;
        canvas.width = widthSlider.value;
        ctx.imageSmoothingEnabled = false;
        ctx.lineWidth = "1";
        ctx.strokeStyle = "gray";
        ctx.fillStyle = colorPicker.value;
        
    });
    pixelSlider.addEventListener("change", (e) => {
        pixelText.textContent = "Pixel Size: " + pixelSlider.value;
        pixelSize = pixelSlider.value;
        
    });

}