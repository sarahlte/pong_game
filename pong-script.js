let boardGame = document.querySelector('#boardGame');

let ctx = boardGame.getContext('2d');

boardGame.width = 650;
boardGame.height = 400;

let score1 = 0;
let score2 = 0;
let keys={};
let cheat={};

window.addEventListener('keydown', function (e){
    keys[e.keyCode] = true;
    e.preventDefault();
});

window.addEventListener('keyup', function (e){
    delete keys[e.keyCode];
});

class Box{
    constructor(options){
        this.x = options.x || 10;
        this.y = options.y || 10;
        this.width = options.width || 40;
        this.height = options.height || 50;
        this.color = options.color || '#FFFFFF';
        this.speed = options.speed || 2;
        this.gravity = options.gravity || 2;
    }
}

let player1 = new Box({
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: '#FFFFFF',
    gravity: 2
});

let player2 = new Box({
    x:625,
    y:100,
    width: 15,
    height: 80,
    color: '#FFFFFF',
    gravity: 2
});

let midLine = new Box({
    x: (boardGame.width/2)-2.5,
    y: -1,
    width: 5,
    height: boardGame.height+1,
    color: '#FFFFFF'
});

let ball = new Box({
    x:(boardGame.width/2),
    y: (boardGame.height/2),
    width: 15,
    height: 5,
    color: '#FF0000',
    speed: 1,
    gravity: 1,
})

function input(){
    if (90 in keys){
        if(player1.y - player1.gravity>0){
            player1.y -= player1.gravity;
        }
    } else if (83 in keys){
        if(player1.y + player1.height+player1.gravity < boardGame.height){
            player1.y += player1.gravity;
        }
    }
    if (38 in keys){
        if(player2.y - player2.gravity>0){
            player2.y -= player2.gravity;
        }
    } else if (40 in keys){
        if(player2.y + player2.height+player2.gravity < boardGame.height){
            player2.y += player2.gravity;
        }
    }

}

function drawBox(box){
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x,box.y,box.width,box.height);
}

function drawball(ball){
    ctx.beginPath();
    ctx.lineWidth = '3';
    ctx.fillStyle  = ball.color;
    ctx.arc(ball.x, ball.y, 4, 0 * Math.PI / 180, 360 * Math.PI / 180);
    ctx.closePath();
    ctx.fill();
}

function displayScore1(){
    ctx.font='20px Arial';
    ctx.fillStyle = "rgb(255,255,255)";
    let str1 = score1;
    ctx.fillText(str1, (boardGame.width/2)-50, 30);
}

function displayScore2(){
    ctx.font='20px Arial';
    ctx.fillStyle = "rgb(255,255,255)";
    let str2 = score2;
    ctx.fillText(str2, (boardGame.width/2)+50, 30);

}

function draw(){
    ctx.clearRect(0, 0, boardGame.width, boardGame.height);
    displayScore1();
    displayScore2();
    drawBox(player1);
    drawBox(player2);
    drawBox(midLine);
    drawball(ball);
}

function loop(){
    // color();
    ballBounce();
    input(player1);
    input(player2);
    
    window.requestAnimationFrame(loop);
} 

function ballBounce(){
    if (((ball.y+ball.gravity)<= 0) || ((ball.y+ball.gravity+ball.height)>= boardGame.height) || (32 in keys)){
        ball.gravity = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else {
        ball.x += ball.speed;
        ball.y += ball.gravity;
    }
    ballCollision();
}

function ballCollision(){
    if (((ball.x + ball.speed <= player1.x + player1.width)&&(ball.y + ball.gravity > player1.y)&&(ball.y + ball.gravity <= player1.y + player1.height)) || ((ball.x + ball.speed >= player2.x)&&(ball.y + ball.gravity > player2.y)&&(ball.y + ball.gravity <= player2.y + player2.height))){
        ball.speed = ball.speed * -1;
    } else if (ball.x + ball.speed < player1.x){
        score2 += 1;
        ball.speed = ball.speed * -1;
        ball.x = 100 + ball.speed;
        ball.y += ball.gravity;
    } else if (ball.x +ball.speed > player2.x + player2.width){
        score1 += 1;
        ball.speed = ball.speed * -1;
        ball.x = 500 + ball.speed;
        ball.y += ball.gravity;
    } else if(32 in keys){
        ball.speed = ball.speed*-1;
        ball.x += ball.speed;
        ball.y += ball.gravity;
    }else {
        ball.x += ball.speed;
        ball.y += ball.gravity;
    }
    draw();
}

draw();

function restart(){
    location.reload();
}


function color(){
    let r = Math.floor((Math.random() * 255) + 1);
    let g = Math.floor((Math.random() * 255) + 1);
    let b = Math.floor((Math.random() * 255) + 1);
    console.log(ball.color);
    ball.color = `rgb(${r}, ${g}, ${b})`;
}

let mouseMoved = false;
let button = document.getElementById("instructions");
let mouseMoveHandler =  event => {
    clearInterval(loop);
    document.onemousemove = null;
    button.classListe.remove('infoButton_isActive');
}

let toggleHandler = event => {
    let classes = button.classList;
    if (classes.contains('infoButton_isActive')){
        classes.remove('infoButton_isActive');
    } else {
        classes.add('infoButton_isActive')
    }
}


let hiddenValue = true;
function instructions(){
    

    if (hiddenValue == true){
        document.getElementById('instructions').hidden = false;
        hiddenValue = false;
        console.log(hiddenValue)
    } else if (hiddenValue == false) {
        document.getElementById('instructions').hidden = true;
        hiddenValue = true
        console.log(hiddenValue)
    }
}

