document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.querySelector(".container");

    const calendarDays = 24;

    // Function to open the door
    const openDoor = (event) => {
        console.log("Open door called with:", event);
        const target = event.target || window.event.srcElement;
        console.log("Target:", target);
        const doorNumber = parseInt(target.parentNode.id.split('_')[1]);
        const currentDate = new Date();
        const openingDate = new Date(document.getElementById(`door${doorNumber}Date`).value);
        
        console.log("Door Number:", doorNumber);
        console.log("Current Date:", currentDate.toDateString());
        console.log("Opening Date:", openingDate.toDateString());

        // Check if today's date matches the opening date
        if (currentDate.toDateString() === openingDate.toDateString()) {
            target.style.backgroundImage = `url(${target.dataset.imagePath})`;
            target.style.opacity = "0";
            target.style.backgroundColor = "blueviolet";

            const pdfUrl = `./res/Door_${doorNumber}.pdf`;
            window.open(pdfUrl, '_blank');
            
            // Add a message to confirm the door was opened
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `Door ${doorNumber} opened!`;
            messageDiv.style.color = 'white';
            messageDiv.style.textAlign = 'center';
            messageDiv.style.paddingTop = '20px';
            target.appendChild(messageDiv);
            
            console.log(`Door ${doorNumber} opened successfully.`);
        } else {
            alert(`Sorry, door ${doorNumber} opens on ${openingDate.toLocaleDateString()}.`);
            console.log(`Door ${doorNumber} cannot be opened yet.`);
        }
    }

    // Function to create the calendar
    const createCalendar = () => {
        console.log("Creating calendar...");
        for (let i = 0; i < calendarDays; i++) {
            console.log(`Creating door ${i + 1}`);
            const calendarDoor = document.createElement("div");
            const calendarDoorText = document.createElement("div");
    
            calendarDoor.classList.add("image");
            calendarDoor.style.gridArea = "door" + (i + 1);
            calendarDoor.id = `door_${i + 1}`;
            calendarContainer.appendChild(calendarDoor);
    
            calendarDoorText.classList.add("number-inside");
            calendarDoorText.innerHTML = i + 1;
            calendarDoor.appendChild(calendarDoorText);
    
            // Add dataset for image path
            calendarDoor.setAttribute('data-image-path', `./res/image${i+1}.jpg`);
    
            calendarDoorText.addEventListener("click", (event) => openDoor(event));
            
            console.log(`Added click listener to door ${i + 1}`);
        }
        console.log("Calendar creation completed.");
    }

    // Create the calendar automatically on page load
    createCalendar();
});
