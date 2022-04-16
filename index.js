//Variables

const sendBtn = document.getElementById("send-btn");
let requestedServices = [];
const offeredServices = [
    {
        btnId: "wash-car-btn",
        taskId: "wash-car",
        task: "Wash Car",
        price: 10
    },
    {
        btnId: "maw-lawn-btn",
        taskId: "maw-lawn",
        task: "Maw Lawn",
        price: 20
    },
    {
        btnId: "pull-weeds-btn",
        taskId: "pull-weed",
        task: "Pull Weed",
        price: 30
    },
    {
        btnId: "clean-pool-btn",
        taskId: "clean-pool",
        task: "Clean Pool",
        price: 50
    }
]

//========================
//Generating the services buttons

addServiceBtn()

/*
Adding the event listeners to the service buttons of all objects inside the offeredServices array.
The event calls the addService function and passes the service as a parameter.
*/

for (let service of offeredServices) {
    document.getElementById(service.btnId).addEventListener("click", function() {
        addService(service)
    })
}

//adding the event listeners to the send invoice buttons
sendBtn.addEventListener("click", sendInvoice);


//Functions

function addServiceBtn() {
    /*
    function generates the service buttons for all objects inside the 
    offeredServices array.
    */
    
    let outputHTML = "";
    for (let service of offeredServices) {
        outputHTML += `
            <button id="${service.btnId}" class="service-btn">
            ${service.task}: $${service.price}
            </button> 
        `
    }
    document.getElementById("btn-section").innerHTML = outputHTML;
}

function addService(service) {
    /*function adds a service to the requestedServices array.
    if requestedServices does not include that service.
    and calls the renderInvoice() function
    */
    if (!requestedServices.includes(service)) {
        requestedServices.push(service);
        renderInvoice();
    }
}

function renderInvoice() {
    /*
    function render the invoice by calling the generateHTML function
    for each object in the requestedServices array and passes the taskId, task and price of 
    each service as parameters. After that it calls addRemoveBtn() function 
    */
    
    let totalCost = 0;
    let outputHTML = "";
    
    for (let service of requestedServices) {
        outputHTML += generateHtml(service.taskId, service.task, service.price);
        totalCost += service.price;
    }
    
    document.getElementById("task-output-container").innerHTML = outputHTML;
    document.generateHtml("total-amount").innerText = totalCost;
    addRemoveBtn();
}

function generateHtml(taskId, task, price) {
    /*
    Function creates the HTML for the renderInvoice function.
    The id for the remove button is concatenated by the taskId with a "remove-" prefix
    */
    return `
        <div class="container-flex">
            <p class="task">
                ${task}
                <button id="remove-${taskId}" class="remove-btn">
                    Remove${task}
                </button>
            </p>
        </div>
    `
}

function addRemoveBtn() {
    /**
     * function adds the event listener to the remove button for each object in the 
     * requestedServices array.
     * The id for the remove button is concatenated by the taskId with a "remove-" prefix
     * The event calls the removeService() function and passes the service as parameter.
     */
    for (let service of requestedServices) {
        const removeBtn = document.getElementById("remove-" + service.taskId);
        removeBtn.addEventListener("click", function() {
            removeService(service)
        })
    }
}

function removeService(service) {
    /**
     * function removes the service passed as parameter from the requestedServices
     * by first getting the index position of the service and then removing the object at the given
     * index with the .splice() method
     */
    
    const serviceIndex = requestedServices.indexOf(service);
    requestedServices.splice(serviceIndex, 1);
    renderInvoice();
}

function sendInvoice() {
    requestedServices = [];
    renderInvoice();
}
