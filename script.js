const stateSelector = document.querySelector("select");
const messageElement = document.getElementById("message");

stateSelector.addEventListener("change", (e) => {
    
    if (stateSelector.value == "--") {
        messageElement.innerText = "Please select a state.";
        return;
    }

    messageElement.innerText = stateSelector.value;
})