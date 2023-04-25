const map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2,2,2],
    [2,3,2,2,3,2,2,2,3,2],
    [3,3,3,2,3,3,2,3,3,3],
    [3,3,3,3,3,3,3,3,3,3],
    [getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6)],
    [getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6)],
    [getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6)],
    [getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6)],
    [getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6),getRndInteger(3,6)],
]
const fps = 10;
let canMine = true;

const grass = new Image();
grass.src = "img/grass.png";
const ground = new Image();
ground.src = "img/ground.png";
const stone = new Image();
stone.src = "img/stone.png";
const iron = new Image();
iron.src = "img/iron.png";
const coal = new Image();
coal.src = "img/coal.png";

const ladder = new Image();
ladder.src = "img/ladder.png";

const sPlayer = new Image();
sPlayer.src = "img/player/player.png";

let player = {
    img: sPlayer,
    width: 64,
    height: 64,
    x: 0,
    y: 64*3
}

wnd.width = 640;
wnd.height = 896;

let y = 0;
let x = 0;
let breaky = 0;
let breakx = 0;
const tileW = 64;
const tileH = 64

randomSeed = Math.floor(Math.random() * 2) + 1;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

const drawMap = () => {
    for (let i = 0; i < map.length; i++) {
        x = 0
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 1) {
                ctx.drawImage(grass, j*tileW, i*tileH, 64, 64);
            }
            if (map[i][j] == 2) {
                ctx.drawImage(ground, j*tileW, i*tileH, 64, 64);
            }
            if (map[i][j] == 3) {  
                ctx.drawImage(stone, j*tileW, i*tileH, 64, 64);
            }
            if (map[i][j] == 4) {  
                ctx.drawImage(iron, j*tileW, i*tileH, 64, 64);
            }
            if (map[i][j] == 5) {  
                ctx.drawImage(coal, j*tileW, i*tileH, 64, 64);
            }
            if (map[i][j] == -1) {  
                ctx.drawImage(ladder, j*tileW, i*tileH, 64, 64);
            }
            x += 64;
        }
        y += 64;
    }
}

document.addEventListener("keypress", event => {
    if (!canMine) return;
    if (event.key == "d"){
        if (player.x != 576 && map[player.y/64][(player.x/64)+1] <= 0)
            player.x += tileW;
            else if (map[player.y/64][(player.x/64)+1] > 0)
            checkBreaking((player.x/64)+1, player.y/64);
    }
    else if (event.key == "a" || event.key == "q"){
        if (player.x != 0 && map[player.y/64][(player.x/64)-1] <= 0)
            player.x -= tileW;
        else if (map[player.y/64][(player.x/64)-1] > 0)
            checkBreaking((player.x/64)-1, player.y/64);
    }
    else if (event.key == "s"){
        if(map[(player.y/64)+1][player.x/64] <= 0)
        {
            player.y += tileW;
            
        }
        else
        {
            checkBreaking(player.x/64, (player.y/64)+1);
        }
    }
    else if (event.key == "w"){
        if (map[(player.y/64)-1][player.x/64] <= 0)
        {
            if (map[player.y/64][player.x/64] == -1)
                player.y -= tileW;

        }
        else if (map[(player.y/64)-1][player.x/64] > 0)
        {
            checkBreaking(player.x/64, (player.y/64)-1)
        }
    }
    if (event.key == "e")
    {
        if (map[player.y/64][player.x/64] <= 0)
        {
            map[player.y/64][player.x/64] = -1
        }
    }
});

document.addEventListener("keyup", event => {
    if (event.key == "a" || event.key == "q"  || event.key == "w"  || event.key == "s"  || event.key == "d" )
        canMine = true
});


const checkBreaking = (x, y) => {
    if (breakx == x  && breaky == y)
    {
        map[y][x] = 0;
        canMine = false;
        breakx, breaky = 0, 0
    }
    else {
        breakx = x;
        breaky = y;
    }
}

const updatePlayer = () => {
    if (map[(player.y/64)+1][player.x/64] == 0)
        player.y += 64;
    ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
}

const updateAll = () => {
    drawRect(0, 0, wnd.width, wnd.height, "cyan")
    drawMap()
    updatePlayer()
    setTimeout(() => {
        window.requestAnimationFrame(updateAll);
    }, 1000 / fps);
    
}

window.onload = () => {
    window.requestAnimationFrame(updateAll);
}