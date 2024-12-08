document.getElementById("uploadForm").addEventListener("submit", async function (e) {
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

    // Show uploading status
    statusMessage.textContent = "Uploading file...";
    statusMessage.className = "";

    try {
        // Read file content as Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async function () {
            const base64FileContent = reader.result.split(",")[1]; // Extract Base64 content without prefix

            // Prepare the request payload
            const payload = {
                file_content: base64FileContent,
                file_name: file.name,
                recipient_email: email
            };

            // Call the upload API
            const response = await fetch("https://o9tmcbn2qe.execute-api.us-east-1.amazonaws.com/run/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                statusMessage.textContent = `File uploaded successfully! Access code: ${result.access_code}. An email has been sent to the recipient.`;
                statusMessage.className = "success";
            } else {
                throw new Error(result.message || "File upload failed");
            }
        };

        reader.onerror = function () {
            throw new Error("Failed to read the file.");
        };
    } catch (error) {
        // Display error message
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.className = "error";
    }
});

// JavaScript to update the file name display when a file is selected
document.getElementById("fileInput").addEventListener("change", function () {
    const fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
    document.getElementById("file-name").textContent = fileName;
});
