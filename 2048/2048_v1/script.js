document.addEventListener('DOMContentLoaded',()=>{
    document.addEventListener('keyup',control)
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const width = 4;
    const squares = [];
    let score =0;
    function createBoard(){
        for(let i=0; i<width*width; i++){
            const square = document.createElement('div')
            square.innerHTML =0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }   

    createBoard();
    moveLeft();

    //generete a number randomly
    function generate(){
        const randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML ==0){
            squares[randomNumber].innerHTML = 2;
            checkForGameOver()
        }else generate()
    }

    //swipte rigth
    function moveRigth(){
        for(let i=0;i<16;i++){
            if(i%4 === 0){
                const totalOne = squares[i].innerHTML;
                const totalTwo = squares[i+1].innerHTML;
                const totalThree = squares[i+2].innerHTML;
                const totalFour = squares[i+3].innerHTML;
                const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour),]
                
                const filteredRow = row.filter((num) => {return num})
                
                const missing = 4 - filteredRow.length 
                const zeros = Array(missing).fill(0);
                
                const newRow = zeros.concat(filteredRow)
                
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }
    //swipe left
    function moveLeft(){
        for(let i=0;i<16;i++){
            if(i%4 === 0){
                const totalOne = squares[i].innerHTML;
                const totalTwo = squares[i+1].innerHTML;
                const totalThree = squares[i+2].innerHTML;
                const totalFour = squares[i+3].innerHTML;
                const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                
                const filteredRow = row.filter((num) => {return num})
                
                const missing = 4 - filteredRow.length 
                const zeros = Array(missing).fill(0);
                
                const newRow = filteredRow.concat(zeros)
                
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }
    //swipe down
    function moveDown(){
        for(let i=0;i<4;i++){
            const totalOne = squares[i].innerHTML;
            const totalTwo = squares[i+1*width].innerHTML;
            const totalThree = squares[i+2*width].innerHTML;
            const totalFour = squares[i+3*width].innerHTML;
            
            const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            
            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill(0);

            const newColumn = zeros.concat(filteredColumn);
            squares[i].innerHTML = newColumn[0];
            squares[i+1*width].innerHTML = newColumn[1];
            squares[i+2*width].innerHTML = newColumn[2];
            squares[i+3*width].innerHTML = newColumn[3];
        

        }
    }
    //swipe up
    function moveUp(){
        for(let i=0;i<4;i++){
            const totalOne = squares[i].innerHTML;
            const totalTwo = squares[i+width].innerHTML;
            const totalThree = squares[i+2*width].innerHTML;
            const totalFour = squares[i+3*width].innerHTML;
            
            const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            
            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill(0);

            const newColumn = filteredColumn.concat(zeros);
            squares[i].innerHTML = newColumn[0];
            squares[i+1*width].innerHTML = newColumn[1];
            squares[i+2*width].innerHTML = newColumn[2];
            squares[i+3*width].innerHTML = newColumn[3];
        }
    }

    function combineRow(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                const combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i+1].innerHTML = 0;
                score += combineTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn(){
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                const combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i+width].innerHTML = 0;
    
                score += combineTotal;
                scoreDisplay.innerHTML =score;
            }
        }
        
        checkForWin();
    }
    function control(e){
        if(e.keyCode === 39){
            keyRigth();
        }else if(e.keyCode === 37){
            keyLeft()
        }else if(e.keyCode === 38){
            keyUp();
        }else if(e.keyCode === 40 ){
            keyDown();
        }
    }
    
    function keyRigth(){
        moveRigth();
        combineRow()
        moveRigth()
        generate();
    }
    function keyLeft(){
        moveLeft();
        combineRow()
        moveLeft()
        generate();
    }
    function keyDown(){
        moveDown();
        combineColumn()
        moveDown();
        generate();
    }
    function keyUp(){
        moveUp();
        combineColumn()
        moveUp();
        generate();
    }
    function checkForWin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You win!';
                document.removeEventListener('keyup',control);
            }
        }
    }
    function checkForGameOver(){
        let zeros = 0;
        for(let i=0; i<squares.length; i++){
            if(squares[i].innerHTML ==0){
                zeros++;
            }
        }
        if(zeros ===0){
            resultDisplay.innerHTML = "You Lose"
            document.removeEventListener('keyup',control);
        }
    }
})
