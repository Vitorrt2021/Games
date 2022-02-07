$(document).ready(function(){
    const game = new Game();
    game.createBoard()
    
    $(document).on('keyup',game.control)
    $('#new_game').on('click',game.newGame)
    $('#save_game').on('click',game.saveGame)
})

class Game{
    constructor (){
        this._bestScore = 0;
        this._score = 0;
        this._width = 4;
        this._squares = [];
        this._elementGridDisplay = document.querySelector('.grid');
        this._elementScore = document.querySelector('#score');
        this._elementBestScore = document.querySelector('#best-score');
        this._elementResult = document.querySelector('#result');
    }
    saveGame = ()=>{
        if(this._score > this._bestScore){
            this._bestScore = this._score;
            this._elementBestScore.innerHTML = this._bestScore;
        }
    }
    newGame = ()=>{
        $(this._elementGridDisplay).html('');
        if(this._score > this._bestScore){
            this._bestScore = this._score;
            this._elementBestScore.innerHTML = this._bestScore;
        }
        this._elementScore.innerHTML = '0';
        this._score = 0;
        this._squares = [];
        this.createBoard();
    }
    createBoard = ()=>{
        
        for(let i=0; i<this._width*this._width; i++){
            const square = document.createElement('div')
            square.setAttribute('class','number_element')
            square.innerHTML = '';
            this._elementGridDisplay.appendChild(square);
            this._squares.push(square);
        }
        this.generate();
        this.generate();
    }
    generate = ()=>{
        const randomNumber = Math.floor(Math.random() * this._squares.length)
        if(this._squares[randomNumber].innerHTML ==0){
            this._squares[randomNumber].innerHTML = 2;
            this.checkForGameOver()
        }else this.generate()

        this.coloring();
    }

    moveRigth = ()=>{   
        for(let i=0;i<16;i++){
            if(i%4 === 0){
                const row = this.parseIntRow(i)
            
                const filteredRow = row.filter((num) => {return num})
                
                const missing = 4 - filteredRow.length 
                const zeros = Array(missing).fill('');
                
                const newRow = zeros.concat(filteredRow)
                this.updateRow(i,newRow);        
            }
        }
    }

    moveLeft = ()=>{     
        for(let i=0;i<16;i++){
            if(i%4 === 0){
                const row = this.parseIntRow(i)
                const filteredRow = row.filter((num) => {return num})
                const missing = 4 - filteredRow.length 
                const zeros = Array(missing).fill('');
                const newRow = filteredRow.concat(zeros)
                this.updateRow(i,newRow);         
            }
        }
    }
    moveDown = ()=>{   
        for(let i=0;i<4;i++){
            const column = this.parseIntColumn(i);
            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill('');

            const newColumn = zeros.concat(filteredColumn);
            this.updateColumn(i,newColumn)
        }
    }
    moveUp = ()=>{
        for(let i=0;i<4;i++){  
            const column = this.parseIntColumn(i);       
            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill('');
            const newColumn = filteredColumn.concat(zeros);
            this.updateColumn(i,newColumn)
        }
    }
    updateRow = (i,newRow)=>{
        this._squares[i].innerHTML = newRow[0];
        this._squares[i+1].innerHTML = newRow[1];
        this._squares[i+2].innerHTML = newRow[2];
        this._squares[i+3].innerHTML = newRow[3];
    }
    updateColumn = (i,newColumn)=>{
        this._squares[i].innerHTML = newColumn[0];
        this._squares[i+1*this._width].innerHTML = newColumn[1];
        this._squares[i+2*this._width].innerHTML = newColumn[2];
        this._squares[i+3*this._width].innerHTML = newColumn[3];
    }
    parseIntColumn = (i)=>{
        const totalOne = this._squares[i].innerHTML;
        const totalTwo = this._squares[i+1*this._width].innerHTML;
        const totalThree = this._squares[i+2*this._width].innerHTML;
        const totalFour = this._squares[i+3*this._width].innerHTML;       
        const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        return column
    }
    parseIntRow = (i)=>{
        const totalOne = this._squares[i].innerHTML;
        const totalTwo = this._squares[i+1].innerHTML;
        const totalThree = this._squares[i+2].innerHTML;
        const totalFour = this._squares[i+3].innerHTML;
        const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        return row;
    }
    coloring = ()=>{
        this._squares.forEach((e)=>{
            switch (e.innerHTML) {
                case '':
                    e.setAttribute('class','number_element')
                    break;
                case '0':
                    e.setAttribute('class','value_0')
                    break;
                case '2':
                    e.setAttribute('class','value_2')
                    break;
                case '4':
                    e.setAttribute('class','value_4')
                    break;
                case '8':
                    e.setAttribute('class','value_8')
                    break;
                case '16':
                    e.setAttribute('class','value_16')
                    break;
                case '32':
                    e.setAttribute('class','value_32')
                    break;
                case '64':
                    e.setAttribute('class','value_64')
                    break;
                case '128':
                    e.setAttribute('class','value_128')
                    break;
                default:
                    e.setAttribute('class','value_big')
                    break;
            }
        })
    }
    combineRow =()=>{
        for(let i=0;i<15;i++){
            if(this._squares[i].innerHTML === this._squares[i+1].innerHTML && this._squares[i].innerHTML !==''){
                const combineTotal = parseInt(this._squares[i].innerHTML) + parseInt(this._squares[i+1].innerHTML);
                this._squares[i].innerHTML = combineTotal;
                this._squares[i+1].innerHTML = 0;
                this.sumScore(combineTotal);                    
            }
        }
        this.checkForWin();
    }
    sumScore = (combineTotal)=>{
        this._score += combineTotal;
        this._elementScore.innerHTML = this._score;
    }
    combineColumn = ()=>{
        for(let i=0;i<12;i++){
            if(this._squares[i].innerHTML === this._squares[i+this._width].innerHTML && this._squares[i].innerHTML !==''){
                const combineTotal = parseInt(this._squares[i].innerHTML) + parseInt(this._squares[i+this._width].innerHTML);
                this._squares[i].innerHTML = combineTotal;
                this._squares[i+this._width].innerHTML = 0;
                this.sumScore(combineTotal)
            }
        }
        this.checkForWin();
    }
    control = (e) =>{
        if(e.keyCode === 39){
            this.keyRigth();
        }else if(e.keyCode === 37){
            this.keyLeft()
        }else if(e.keyCode === 38){
            this.keyUp();
        }else if(e.keyCode === 40 ){
            this.keyDown();
        }
    }
    keyRigth = ()=>{
        this.moveRigth();
        this.combineRow()
        this.moveRigth()
        this.generate();
        this.coloring();
    }
    keyLeft = ()=>{
        this.moveLeft();
        this.combineRow()
        this.moveLeft()
        this.generate();
        
        this.coloring();
    }
    keyDown = ()=>{
        this.moveDown();
        this.combineColumn()
        this.moveDown();
        this.generate();
        
        this.coloring();
    }
    keyUp = ()=>{
        this.moveUp();
        this.combineColumn()
        this.moveUp();
        this.generate();    
        this.coloring();
    }
    checkForWin = ()=>{
        for(let i=0;i<this._squares.length;i++){
            if(this._squares[i].innerHTML == 2048){
                this._elementResult.innerHTML = 'You Win!'
                document.removeEventListener('keyup',this.control);
            }
        }
    }
    checkForGameOver =()=>{
        let zeros = 1;
        // for(let i=0; i<this._squares.length; i++){
        //     if(this._squares[i].innerHTML === ''){
        //         zeros++;
        //     }
        // }
        if(zeros ===0){
            this._elementResult.innerHTML = 'You Lose!'
            document.removeEventListener('keyup',control);
        }
    }

}