// download.js

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

    // Simulating an API call
    statusMessage.textContent = "Searching for file...";
    statusMessage.className = "";

    // For the sake of this example, we're mimicking the success of the file retrieval
    setTimeout(function () {
        // Simulate a successful file retrieval
        statusMessage.textContent = "File found! Click below to download.";
        statusMessage.className = "success";

        // Add a download link (this would typically be a URL generated by the backend)
        const downloadLink = document.createElement('a');
        downloadLink.href = "#";  // Set this to the actual download URL
        downloadLink.textContent = "Download Your File";
        downloadLink.classList.add("download-link");
        statusMessage.appendChild(downloadLink);
    }, 2000);

    // Here you would typically use AJAX (fetch/axios) to verify the access code and fetch the file from S3
});
