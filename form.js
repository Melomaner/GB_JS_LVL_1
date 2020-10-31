"use strict";

const inputValidation = {
    name: null,
    phone: null,
    password: null,
    repPassword: null,

    acceptData() {
        this.name = document.querySelector("#name");
        this.phone = document.querySelector("#phone");
        this.password = document.querySelector("#password");
        this.repPassword = document.querySelector("#repPassword");
    },
    validationData(){
        let valid = true
        if (this.name.value.length < 1 || this.name.value.length > 50){
            this.name.parentElement.querySelector("p").innerHTML =
                "Должно содержать как минимум 1 символ, не более 50 символов."
            ;
            this.name.classList.add("fail");
            valid = false;
        } else {
            this.name.parentElement.querySelector("p").innerHTML = "&nbsp";
            this.name.classList.remove("fail");
        }
        if (this.phone.value.length !== 11){
            this.phone.parentElement.querySelector("p").innerHTML =
                "Должно содержать 11 цифр, не больше, не меньше."
            ;
            this.phone.classList.add("fail");
            valid = false;
        } else {
            this.phone.parentElement.querySelector("p").innerHTML = "&nbsp";
            this.phone.classList.remove("fail");
        }
        if (this.password.value.length < 5 || this.password.value.length > 50){
            this.password.parentElement.querySelector("p").innerHTML =
                "Минимум 5 символов, максимум 50"
            ;
            this.password.classList.add("fail");
            valid = false;
        } else {
            this.password.parentElement.querySelector("p").innerHTML = "&nbsp";
            this.password.classList.remove("fail");
        }
        if (this.repPassword.value !== this.password.value){
            this.repPassword.parentElement.querySelector("p").innerHTML =
                "Значение должно совпадать с полем пароль."
            ;
            this.repPassword.classList.add("fail");
            valid = false;
        } else {
            this.repPassword.parentElement.querySelector("p").innerHTML = "&nbsp";
            this.repPassword.classList.remove("fail");
        }
        return valid;
    }
}

const button = document.querySelector("button");
button.addEventListener("click",event => {
    inputValidation.acceptData();
    if(inputValidation.validationData()){
     alert("Данные успешно отправленны")
    }

})