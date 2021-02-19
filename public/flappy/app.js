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



    Function startGame() {
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
        if(!isGameOver) obstacle.classList.add('obstacle')
        gameDisplay.appendChild(obstacle)
        obstacle.style.left= obstacleLeft + 'px'
        obstacle.style.bottom= obstacleBottom + 'px'

        function moveObstacle(){
            obstacleLeft -=2
            obstacle.style.left= obstacleLeft +'px'

            if (obstacleLeft === -60)
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)

            if(obstacleLeft> 200 && obstacleLeft<280 && birdleft === 220 ||
            birdbottom === 0
            ){
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


})