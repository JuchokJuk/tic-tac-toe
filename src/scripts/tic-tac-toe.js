class TicTacToe {
    width;
    height;
    needToWin;
    field = [];
    player = 'O';
    step = 0;
    state = '';

    constructor(width, height, needToWin) {
        if(width <= 0 || height <= 0){
            throw new Error('Invalid field size')
        }
        if(needToWin <= 0){
            throw new Error('Invalid needToWin')
        }
        
        this.width = width;
        this.height = height;
        this.needToWin = needToWin;

        for (let x = 0; x < this.width; x++) {
            this.field.push([]);
            for (let y = 0; y < this.height; y++) {
                this.field[x].push();
            }
        }
    }

    clearField() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.field[x][y] = undefined;
            }
        }
    }

    newGame() {
        this.clearField();
        this.player = 'O';
        this.step = 0;
        this.state = '';
    }

    getMainDiagonalCoordinates(x, y, i) {
        return {
            x: x - (this.needToWin - 1) + i,
            y: y - (this.needToWin - 1) + i
        }
    }
    
    getSideDiagonalCoordinates(x, y, i) {

        return {
            x: x + (this.needToWin - 1) - i,
            y: y - (this.needToWin - 1) + i
        }
    }

    getVerticalCoordinates(x, y, i) {
        return {
            x: x,
            y: y - (this.needToWin - 1) + i
        }
    }

    getHorizontalCoordinates(x, y, i) {
        return {
            x: x - (this.needToWin - 1) + i,
            y: y
        }
    }

    checkWinner(player, x, y) {
        let lines = [
            this.getMainDiagonalCoordinates.bind(this),
            this.getVerticalCoordinates.bind(this),
            this.getSideDiagonalCoordinates.bind(this),
            this.getHorizontalCoordinates.bind(this)
        ];
        for (let line of lines) {
            let count = 0;
            for (let i = 0; i < this.needToWin * 2 - 1; i++) {

                let fieldX = line(x, y, i).x;
                let fieldY = line(x, y, i).y;

                if (fieldX >= 0 && fieldX < this.width && fieldY >= 0 && fieldY < this.height) {
                    if (this.field[fieldX][fieldY] === player) {
                        count++;
                        if (count === this.needToWin) {
                            return true;
                        }
                    } else {
                        count = 0;
                    }
                }
            }
        }
        return false;
    }

    takePosition(x, y) {
        if (this.field[x][y] === undefined && this.state === '') {
            this.player = this.player === 'X' ? "O" : "X";
            this.field[x][y] = this.player;
            this.step++;

            if (this.checkWinner(this.player, x, y)) {
                this.state = `${this.player} won`;
            } else if (this.step === this.width * this.height) {
                this.state = 'Dead heat';
            }
            return { success: true, gameResult: this.state }
        }
        return { success: false, gameResult: this.state }
    }

}