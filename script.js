const stateSelector = document.querySelector("select");
const messageElement = document.getElementById("message");

const BASE_URL = "https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd"
const KEY = "579b464db66ec23bdd00000146920f2ff2a444c973bcc2ee67a1dfe8";


stateSelector.addEventListener("change", async (e) => {

    const totalPincodes = new Set();
    const totaDistricts = new Set();

    const state = stateSelector.value;

    if (state == "--") {
        messageElement.innerText = "Please select a state.";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?api-key=${KEY}&format=json&limit=1000&filters%5Bstatename%5D=${state}`);
        const data = await response.json();

        for (const record of data.records) {
            totalPincodes.add(record.pincode);
            totaDistricts.add(record.district);
        }
    
        messageElement.innerText = `${state} has ${totalPincodes.size} pincodes and ${totaDistricts.size} districts.`;

    } catch (error) {
        console.error(error);
        messageElement.innerText = "Something went wrong, please try again."
    }
})