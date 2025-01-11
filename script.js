function callIndex() {

}


function callGrid() {
    const canvas = document.querySelector("#mainCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    // for (let i=0;i<128;i++) {
    //     for (let j=0;j<128;j++) {
    //         ctx.rect(i*5,j*5,5,5);
    //     }
    // }
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,10,10); /* DO NOT DELETE THIS LINE (VERY IMPORTANT) !!!*/
    
    ctx.stroke();
    let everyDrawn = [];
    let drawn = [];

    function ctrlZ() {
        ctx.fillStyle="black";
        if (everyDrawn.length != 0) {
            for (let {x,y} of everyDrawn[everyDrawn.length-1]) {
                ctx.fillRect(x,y,10,10);
            }
        
            ctx.fillStyle="red";
            drawn = [];
            everyDrawn.splice(-1);
        }
        ctx.fillStyle="red";
    }
    
    let drawing = false;
    canvas.addEventListener("mouseup", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];

    });
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        
        
    });
    canvas.addEventListener("mousemove", (e) => {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            x = Math.floor(x/10)*10;
            y = Math.floor(y/10)*10;
            ctx.fillRect(x,y,10,10);
            ctx.stroke();
            drawn.push({x,y});
            

        }
    });
    canvas.addEventListener("mouseout", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];
    });


    document.addEventListener("keydown",(e) => {
        e.preventDefault();
        if (e.code === "KeyZ" && e.ctrlKey === true) {
            ctrlZ();
            console.log("ctrlz");
        }
    });
}