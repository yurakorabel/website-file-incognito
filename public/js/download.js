document.getElementById("downloadForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const accessCodeInput = document.getElementById("accessCodeInput");
    const statusMessage = document.getElementById("statusMessage");

    const accessCode = accessCodeInput.value;

    if (!accessCode) {
        statusMessage.textContent = "Please enter a valid access code.";
        statusMessage.className = "error";
        return;
    }

    // Display message while searching for the file
    statusMessage.textContent = "Searching for file...";
    statusMessage.className = "";

    // Make the API call to check the access code and retrieve the download URL
    fetch(`https://5bezw5qz7d.execute-api.us-east-1.amazonaws.com/run/download?access_code=${accessCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Presigned URL generated successfully") {
                // If the presigned URL is returned, show it to the user
                statusMessage.textContent = "File found! Click below to download.";
                statusMessage.className = "success";

                // Create a download link with the presigned URL
                const downloadLink = document.createElement('a');
                downloadLink.href = data.download_url;  // Set this to the actual download URL
                downloadLink.textContent = "Download Your File";
                downloadLink.classList.add("download-link");
                statusMessage.appendChild(downloadLink);
            } else {
                statusMessage.textContent = "Error: " + data.message;
                statusMessage.className = "error";
            }
        })
        .catch(error => {
            statusMessage.textContent = "Error fetching download URL. Please try again.";
            statusMessage.className = "error";
            console.error("Error fetching data:", error);
        });
});
