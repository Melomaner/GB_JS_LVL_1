"use strict";
const bucket = {
    item: 0,
    sum: 0,

    addItem(price){
        this.item++
        this.sum += +price
    },
    setNewSum(event){
        document.querySelector("#sum").innerHTML=`Колличество товаров: ${this.item} Итого: ${this.sum}`;
    },
}
let item = 0


document.querySelector(".bucket").addEventListener("click", event => {
    if (event.target.tagName !== "BUTTON"){
        return ;
    }
    const price = event.target.dataset.price;
    bucket.addItem(price)
    bucket.setNewSum(event)
})
