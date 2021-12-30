const score = document.querySelector('.score');
const startSreen = document.querySelector('.startSreen');
const gameArea = document.querySelector('.gameArea');

// console.log(score);
let player = {
    speed : 5,
    score : 0
};

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

const keyDown = (e) => {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
const keyUp = (e) => {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

const isCollide = (a,b) => {
    playerCar = a.getBoundingClientRect();
    otherCar = b.getBoundingClientRect();

    return !((playerCar.top > otherCar.bottom) || (playerCar.bottom < otherCar.top) || (playerCar.left > otherCar.right) || (playerCar.right < otherCar.left))
}

const end = () => {
    player.start = false;
    startSreen.classList.remove('hide');
    startSreen.innerHTML = "Game Over <br> Your final score is: " + player.score + "<br> Press here to restart the Game.";
}

const moveLines = () => {
    let lines = document.querySelectorAll('.lines');
    let road = gameArea.getBoundingClientRect();

    lines.forEach((item) => {

        if(item.y >= (road.bottom + 50)) {
            item.y -= (road.bottom + 50);
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}
const moveEnemy = (car) => {
    let enemy = document.querySelectorAll('.enemy');
    let road = gameArea.getBoundingClientRect();

    enemy.forEach((item) => {

        if(isCollide(car, item)) {
            // console.log("BOOM HIT");
            end();
        }

        if(item.y >= (road.bottom + 100)) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}

const play = () => {
    // console.log("I am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    const styles_applied = window.getComputedStyle(car);
    const carwidth = styles_applied.width.replace('px', '');
    const carheight = styles_applied.height.replace('px', '');

    // console.log(road);

    if(player.start) {

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top + carheight)) { player.y -= player.speed; }
        if(keys.ArrowDown && player.y < (road.bottom - carheight)) { player.y += player.speed; }
        if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        if(keys.ArrowRight && player.x < (road.width - carwidth - 15)) { player.x += player.speed; }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(play);
        console.log(player.score++);

        player.score++;
        let ps = player.score - 2;
        score.innerHTML = "Score: " + ps;
    }
   
}

const randomColor = () => {

    const c = () => {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}


const start = () => {

    // gameArea.classList.remove('hide');
    startSreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(play);

    for(x = 0; x < 5 ; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }
    

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top position: " + car.offsetTop);
    // console.log("left position: " + car.offsetLeft);

    for(x = 0; x < 3 ; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
    
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
startSreen.addEventListener('click', start);
