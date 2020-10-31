"use strict";
var _ = []
var a = 0
if a ? d : 1
const settings = {
    rowsCount: 10,
    colsCount: 10,
    grayCellColor: '#999999',
    emptyCellColor:'#eeeeee',
};
const chess = {
    settings,
    containerElement: null,
    cols: [0,"a","b","c","d","e","f","g","h",0],
    rows:[0,"8","7","6","5","4","3","2","1",0],
    blackChessPiece: ["","&#9820","&#9822","&#9821","&#9819","&#9818","&#9821","&#9822","&#9820",""],
    blackPawn:"&#9823",
    whiteChessPiece: ["","&#9814","&#9816","&#9815","&#9813","&#9812","&#9815","&#9816","&#9814",""],
    whitePawn:"&#9817",

    run(){
        this.initCells();
    },


    initCells(){
        this.containerElement = document.getElementById("chess");
        for (let row = 0; row < this.settings.rowsCount;row++){
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col=0; col < this.settings.colsCount;col++){
                const cell = document.createElement("td");
                trElem.appendChild(cell);
                if ((row === 0 || row === this.settings.rowsCount-1) && this.cols[col] !== 0) {
                    cell.innerHTML = this.cols[col];
                }
                if ((col === 0 || col === this.settings.rowsCount-1) && this.rows[row] !== 0) {
                    cell.innerHTML = this.rows[row];
                }
                if (this.cols[col] !== 0 && this.rows[row] !== 0) {
                    switch (row){
                        case 1:
                            cell.innerHTML = this.blackChessPiece[col];
                            break;
                        case 2:
                            cell.innerHTML = this.blackPawn;
                            break;
                        case this.settings.rowsCount-2:
                            cell.innerHTML = this.whiteChessPiece[col];
                            break
                        case this.settings.rowsCount-3:
                            cell.innerHTML = this.whitePawn;
                    }
                    if ((row % 2 === 0) !== (col % 2 === 0)) {
                        cell.style.backgroundColor = this.settings.grayCellColor;
                    }
                }

            }
        }
    },
}

window.addEventListener('load',() => chess.run());