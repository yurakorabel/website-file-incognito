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

    const reader = new FileReader();
    reader.onload = async function () {
        const base64FileContent = reader.result.split(",")[1]; // Remove base64 prefix

        const payload = {
            file_content: base64FileContent,
            file_name: file.name,
            recipient_email: email,
        };

        statusMessage.textContent = "Uploading file...";
        statusMessage.className = "";

        try {
            const response = await fetch("https://twgo2qnlb4.execute-api.us-east-1.amazonaws.com/run/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to upload file.");
            }

            const result = await response.json();
            statusMessage.textContent = `File uploaded successfully! Access code: ${result.access_code}`;
            statusMessage.className = "success";
        } catch (error) {
            statusMessage.textContent = `Error: ${error.message}`;
            statusMessage.className = "error";
        }
    };
    reader.readAsDataURL(file);
});

// JavaScript to update the file name display when a file is selected
document.getElementById("fileInput").addEventListener("change", function() {
    const fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
    document.getElementById("file-name").textContent = fileName;
});
