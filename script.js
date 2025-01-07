function callIndex() {

}
function callGrid() {
    const canvas = document.querySelector("#mainCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    // for (let i=0;i<128;i++) {
    //     for (let j=0;j<128;j++) {
    //         ctx.rect(i*5,j*5,5,5);
    //     }
    // }
    
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,10,10);
    
    ctx.stroke();
    canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        console.log(x + " " + y + " ");
        x = Math.floor(x/10)*10;
        y = Math.floor(y/10)*10;
        ctx.fillRect(x,y,10,10);
        ctx.stroke();
        console.log(x + " " + y + " ");

    });
}