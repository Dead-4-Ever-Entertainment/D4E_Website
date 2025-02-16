// Function to send email with resume link
function sendEmail() {
    emailjs.init('j784a0geRr7_GprUh'); // Your EmailJS Public Key

    let formElement = document.getElementById('application-form'); // Get the form element
    if (!formElement) {
        console.error("Error: Form element not found!");
        return;
    }

    let titleElement = document.getElementById('job_title'); // Get job title
    let title = titleElement.textContent || titleElement.value;

    console.log("Job Title:", title);
    // Add or update a hidden input for job_title
    let titleInput = document.getElementById('hidden_job_title');
    if (!titleInput) {
        titleInput = document.createElement('input');
        titleInput.type = 'hidden';
        titleInput.name = 'job_title';
        titleInput.id = 'hidden_job_title';
        formElement.appendChild(titleInput);
    }
    titleInput.value = title; // Set the job title dynamically

    console.log("Updated Form Fields:", {
        job_title: titleInput.value
    });

    // Send the updated form
    const serviceID = 'default_service';
    const templateID = 'template_729qqdb';

    emailjs.sendForm(serviceID, templateID, formElement)
        .then(response => {
            alert("Application submitted successfully!");
            location.reload(); // Refresh the page after successful submission
        })
        .catch(error => {
            alert("Error sending email: " + JSON.stringify(error));
        });
}

// Form submission handler
document.getElementById("application-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    sendEmail();


});