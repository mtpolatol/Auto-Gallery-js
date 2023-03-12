const form = document.getElementById("car-form");
const titleElement=document.querySelector("#title");
const priceElement=document.querySelector("#price");
const urlElement=document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");


//UI Start
const ui= new UI();

const storage = new Storage();
//All event 

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addCar);

    document.addEventListener("DOMContentLoaded",function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });



    cardbody.addEventListener("click", deleteCar);

    clear.addEventListener("click", clearAllCars);
}


function addCar(e){
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if(title==="" || price === ""|| url===""){

        ui.displayMessages("Fill all blanks...", "danger");

    }
    else{
        //new car
        const newCar = new Car(title,price,url);

        ui.addCarToUI(newCar); //Add car UI

        storage.addCarToStorage(newCar);

        ui.displayMessages("Car added successfully..", "success");
    }
    ui.clearInputs(titleElement,urlElement
        
        ,priceElement);


        e.preventDefault();
}

function deleteCar(e){
    
    if(e.target.id==="delete-car"){
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Başarıyla silindi.", "success");
    }
 
}

function clearAllCars(){
    

    if(confirm("Tüm araçları silmek istediğinizdden emin misiniz?")){
        ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
    }
}