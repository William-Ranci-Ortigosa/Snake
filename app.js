document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    const startBtn1 = document.querySelector('#start')
    const final_score = document.querySelector('.final_score')
    
    const width = 20
    let currentIndex = 0
    let currentSnake = [2,1,0]
    let appleIndex = 0 
    let score = 0
    let speed = .9
    let intervalTime = 1000
    let interval = 0
    randomApple()

    function popup() {
      document.getElementById("popup-1").classList.toggle("active");
    }
  
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 700
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }

    function startGame1() {
      popup()
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 700
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
    function moveOutcomes() {
  
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        final_score.innerHTML = 'Final Score: ' + score;
        popup()
        return clearInterval(interval);
      }
  
      const tail = currentSnake.pop()
      squares[tail].classList.remove('snake')
      currentSnake.unshift(currentSnake[0] + direction)

      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake'))
      squares[appleIndex].classList.add('apple')
    }
  
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if (e.keyCode === 38 && currentSnake[0] - currentSnake[1] === width) {
          direcrion = +width
      } else if (e.keyCode === 40 && currentSnake[0] - currentSnake[1] === -width) {
        direcrion = -width
      } else if (e.keyCode === 37 && currentSnake[0] - currentSnake[1] === 1) {
        direction = 1
      } else if (e.keyCode === 39 && currentSnake[0] - currentSnake[1] === -1) {
          direction = -1 
      } else if (e.keyCode === 39) {
        direction = 1
      } else if (e.keyCode === 38) {
        direction = -width 
      } else if (e.keyCode === 37) {
        direction = -1 
      } else if (e.keyCode === 40) {
        direction = +width 
      }
  }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
    startBtn1.addEventListener('click', startGame1)
  })