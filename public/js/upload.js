// upload.js

document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const fileInput = document.getElementById("fileInput");
    const emailInput = document.getElementById("emailInput");
    const statusMessage = document.getElementById("statusMessage");
    
    const file = fileInput.files[0];
    const email = emailInput.value;

    if (!file || !email) {
        statusMessage.textContent = "Please select a file and enter a recipient email.";
        statusMessage.className = "error";
        return;
    }

    // Simulating an API call
    statusMessage.textContent = "Uploading file...";
    statusMessage.className = "";

    // For the sake of this example, we're mimicking the success of the upload
    setTimeout(function () {
        statusMessage.textContent = "File uploaded successfully! An email has been sent to the recipient.";
        statusMessage.className = "success";
    }, 2000);

    // Here you would typically use AJAX (fetch/axios) to call your backend to handle file upload to S3
});

// JavaScript to update the file name display when a file is selected
document.getElementById("fileInput").addEventListener("change", function() {
    const fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
    document.getElementById("file-name").textContent = fileName;
});
