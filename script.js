const stateSelector = document.querySelector("select");
const messageElement = document.getElementById("message");
const districtListElement = document.getElementById("district-list");
const pincodeListElement = document.getElementById("pincode-list");

const BASE_URL = "https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd"
const KEY = "579b464db66ec23bdd00000146920f2ff2a444c973bcc2ee67a1dfe8";

stateSelector.addEventListener("change", async (e) => {

    districtListElement.innerHTML = ""
    pincodeListElement.innerHTML = ""

    const totalPincodes = new Set();
    const totaDistricts = new Set();
    const state = stateSelector.value;

    if (state == "--") {
        messageElement.innerText = "Please select a state.";
        return;
    }

    messageElement.innerText = "Loading..."

    let offset = 0;
    const LIMIT = 1000;
    let allFetched = false;

    // Limit can be set to 1000 maximum. For states with more than 1000 records, it is required to refetch data with changed offset value to get all the records.
    while (!allFetched) {
        try {
            const response = await fetch(`${BASE_URL}?api-key=${KEY}&format=json&offset=${offset}&limit=${LIMIT}&filters%5Bstatename%5D=${state}`);
            const data = await response.json();
            
            for (const record of data.records) {
                totalPincodes.add(record.pincode);
                totaDistricts.add(record.district);
            }

            // 'count' is the total number records fetched in a request.
            if (data.count < LIMIT) allFetched = true;
            offset += LIMIT;

        } catch (error) {
            console.error(error);
            messageElement.innerText = "Something went wrong, please try again.";
            break;
        }
    };

    messageElement.innerText = `${state} has ${totalPincodes.size} pincodes and ${totaDistricts.size} districts.`;

    for (const district of totaDistricts.values()) {
        districtListElement.innerHTML += `<li>${district}</li>`
    }

    for (const pincode of totalPincodes.values()) {
        pincodeListElement.innerHTML += `<li>${pincode}</li>`
    }
});