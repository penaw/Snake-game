let inputdirection = {x:0, y:0};
let speed = 10;
let lastpainttime = 0;
let snake = [{x:5, y:15}];
let food = {x:14, y:7}
let score = 0;

 const scontrols =document.querySelectorAll("i");
let highscore = localStorage.getItem("highscore") || 0;

background = document.querySelector('#background');
highscorebox.innerText = `High Score:${highscore}`;
        highscore = document.querySelector("score");
        
        
    


function main(currentTime){
    window.requestAnimationFrame(main);
console.log(currentTime);
if((currentTime - lastpainttime)/ 1000<1/speed){
return;
}
lastpainttime = currentTime
gameengine();
}
function isColide(){
    

    for(let i = 1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }

    }
    if(snake[0].x >= 20 || snake[0].x <=0|| snake[0].y >=20|| snake[0].y<=0){
        return true;
    }

}

function gameengine(){




    if(isColide(snake)){
        inputdirection = {x:0, y:0};
        alert("Game Over. Press any key to play again");
        snake = [{x:13, y:15}];
        score = 0;
        
        
    }

    if(snake[0].y == food.y && snake[0].x == food.x){
        snake.unshift({x: snake[0].x + inputdirection.x, y: snake[0].y + inputdirection.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
        score += 1;
        highscore = score >= highscore ? score : highscore;
        scorebox.innerHTML = "Score:" + score;
        localStorage.setItem("highscore", highscore);
        
    
    }

    for(let i = snake.length -2; i>=0;i--){
        snake[i+1] = {...snake[i]}
    }
    snake[0].x += inputdirection.x;
    snake[0].y += inputdirection.y;
    background.innerHTML = "";
    snake.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        background.appendChild(snakeElement);
        
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }


    });
    
    

    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    background.appendChild(foodelement);
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) =>{
    inputdirection = {x: 0, y: 1}
    switch(e.key){
        case "ArrowUp":
            inputdirection.x = 0;
            inputdirection.y = -1;
            break;
        case "ArrowDown":
            inputdirection.x = 0;
            inputdirection.y = 1;
            break;
        case"ArrowLeft":
            inputdirection.x = -1;
            inputdirection.y = 0;
            break;
        case "ArrowRight":
            inputdirection.x = 1;
            inputdirection.y = 0;
            break;
    }

    scontrols.forEach(( key) =>
        key.addEventListener("click", ()=>changeDir({key :key.dataset.key})));

})




