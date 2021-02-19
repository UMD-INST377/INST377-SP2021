document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220 
    let birdBottom = 100
    let gravity = 2 
    let isGameOver = false


    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let timerId = setInterval(startGame, 20)

    function control(e) {
        if (e,keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obsatcleBottom = randomHeight
        const obstacle = document.createElement('div')
        if (!isGameover) obstacle.classList.add('obstacle')
        gameDisplay.appendChild(obstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obsatcleBottom + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
    
            if (obstacleLeft === -60) {
            clearInterval()
            gameDisplay.removeChild(obstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                birdBottom < obsatcleBottom + 153||
                birdBottom == 0 
                ){
                gameOver()
                clearInterval(timerId)
            }

        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()  

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true 
        document.removeEventListener('keyup', control)
    }

  
})
