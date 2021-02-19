const { is } = require("cypress/types/bluebird")

document.addEventListener('DomContentLoaded', () =>{
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdleft= 220
    let birdbottom = 100
    let gravity = 2
    let hop = 50
    let isGameOver = false
    let gap = 400


    function startGame() {
        birdbottom -= gravity
        bird.style.bottom= birdbottom +'px'
        bird.style.left= birdleft +'px'
    }
    
    let GameTimerId= setInterval(startGame, 20)
    
    function control(e){
    if(e.keycode=== 32){
        jump()
    }
}

    function jump(){
       if(birdbottom< 500) birdbottom += hop
        bird.style.bottom= birdbottom +'px'
    }
    document.addEventListener('keyup', jump)

    function generateObstacle (){
        let obstacleLeft= 500
        let randomHeight = math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle =document.createElement('div')
        const topObstacle = document.createElement('div')
        if(!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
       
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
            obstacle.style.left= obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
            obstacle.style.bottom= obstacleBottom + 'px'
            topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle(){
            obstacleLeft -=2
            obstacle.style.left= obstacleLeft +'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0) {{
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if(!isGameOver) setTimeout(generateObstacle, 3000)
    }

    generateObstacle()

    function gameOver(){
        clearInterval(GameTimerId)
        isGameOver = true 
        document.removeEventListener('keyup', control)
    }


}})