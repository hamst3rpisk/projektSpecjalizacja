function callIndex() {

}


function callGrid() {
    let ctrlZMax = 8;
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

    let color = "red";
    const colorInputs = document.querySelectorAll('.buttonColor');

    let defaultColor = {
        button1: "#ff0000",
        button2: "#00ff00",
        button3: "#0000ff",
        button4: "#ffff00",
        button5: "#00ffff",
        button6: "#ff00ff"
    };

    colorInputs.forEach(input => {
        input.addEventListener(`click`, function(){
            color = defaultColor[this.id];
            document.getElementById("currentColor").value = color;
            ctx.fillStyle = document.getElementById("currentColor").value;

            
        })
    });

    document.getElementById("currentColor").addEventListener('change', function(){
        ctx.fillStyle = document.getElementById("currentColor").value;
    })
    ctx.stroke();
    let everyDrawn = [];
    let drawn = [];

    function ctrlZ() {
        ctx.fillStyle="black";
        if (everyDrawn.length != 0) {
            for (let {x,y} of everyDrawn[everyDrawn.length-1]) {
                ctx.fillRect(x,y,10,10);
            }
        
            ctx.fillStyle=color;
            drawn = [];
            everyDrawn.splice(-1);
        }
        ctx.fillStyle=color;
    }
    
    let drawing = false;
    canvas.addEventListener("mouseup", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
            console.log(everyDrawn.length);
        }

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
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
            console.log(everyDrawn.length);
        }
    });


    document.addEventListener("keydown",(e) => {
        e.preventDefault();
        if (e.code === "KeyZ" && e.ctrlKey === true) {
            ctrlZ();
            console.log("ctrlz");
        }
    });
}