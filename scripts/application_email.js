document.getElementById("application-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    let file = document.getElementById("resume").files[0]; // Get file directly

    if (!file) {
        alert("Please attach a resume before submitting.");
        return;
    }

    console.log("File Selected:", file); // Debugging step

    // Convert file to ArrayBuffer
    let reader = new FileReader();
    reader.onload = async function (event) {  // Fix: Use event.target.result
        let fileData = event.target.result; // Get raw file data

        // Proceed with Dropbox Upload
        let fileUrl = await uploadToDropbox(file.name, fileData);
        
        if (fileUrl) {
            sendEmail(file.name);
        } else {
            alert("Failed to read Resume.");
        }
    };

    reader.onerror = function(error) {
        console.error("Error reading file:", error);
        alert("Error reading Resume.");
    };

    reader.readAsArrayBuffer(file); // Start reading the file
});



// 🔹 Function to Upload File to Dropbox
async function uploadToDropbox(fileName, fileData) {
    const ACCESS_TOKEN = "sl.u.AFhdI4v0whqf7KtscSqTuKNfcLoh_n57qBCIPLFQoGlPCNXe3av84xKaTMU5wNx5WRzO7Nf3mzF_-T62cGHJovjeGW1k3lBsAjzoOvhwKucHTEMt0Y8dxcER6uB-NHI_m0ecI-6FOFGN2AA22pagTHQbxRFq4q5xoGi37a3o9vK2iU_cz0WzokYqu01NHOkb7snCejSSFdEvvucjvEgnWgvcBhnDgz4pn8HO8rhjIvWFhFKtJgIA_DoldE1Z7QkzZd3qUNFBtPiox4dGvQxdjI6IdRZrxYBDC_TNFxxFYVnxKIIs4DyVctK_Au0lRachiWJXeDlTXxiDyE6B_dH1UpAoy_7FggWAUkFAaZG7vuVSazmgjihuNTRbwXNJdjcxD5jZ6OxvHmDEwJDjX15uLp6zADq75h3duX-DHWyW_fzP6CZC5d-s_GnarOkblPU0N4MUdGwEJDwDi9djBX6jIN9XYSi80klysWOnERok6OCfZTkzrqRm9aaD0IfmG00khIvCJ73eqTFH3EVrHHae_Yc3UUCrnDO2YBIzF6yrem85DnP5iKYDXbVBTh8W87ZPTkzF3klyjc8yGHZ6Bc0XQ58-iKLBCWURmgCqa7GA2LiXpR4aQ4qhEgamXiB0XKghmeH5ry7P-8HI5wMLxAMcvGqNi8qgDvl7iDQ65eWjNqZye5tRyjxqOUdx6E_Elxumrs8JHZCSof6CMssaqMdEmDc-xvzukmAdu8Fkj_mOgd9RkXGEZK-bDg0L0Mb-H4rZnAIqBvPJu06BlIiYW7m0X3s5hmOdDIkqK64eYRv2jg-IayfoAU3T1vuD_CnITdgvPbGTDg24dlLYpJWCfLg6-rFDjFJyewfn1pz-16LGch0PeuKx8ItoIVwAD--OxPSmpsJuk8wHPvM7vOUhQy5ApdK3MxHIo1mYYnuUWYZ000aPVmaNdTaDJEvSRZQCxmHoD70i_222mG7WhsxaK0Ims2w9Huft9BxQ2OZNooshoYyfYFjGX08nLWdBvPfKiiSETUiMuw62ROObDrats1Fx1ba4D5vLpmpbfvKFuzDhVOROvbqI-Ca7zHEW2Ar3VAliEiuPCrLpJ1CiBHIt8CHbwb1pBdbwQoz9R6n5RcGKJNVU0-uBgmk6ZBjHxp3MnLOQiZ0ZYzDlOEaO1aBWZHW24n_qbB0K51-FCcyERTH8l7_2OyLkPm3pMewZThQ0jn18JBIF3NS7wiU-9xA7NkSy3nxl_vJlR1aKSrTm61JWMO4pEjbsG_jV6FVlXITSA8kuqhlc5Jc5KfPoQdZUub9eu8WMbnR8bz63Tk5pQbtw_nZYBKz0-q-etPROm8G2ghDFFhB9i82-tRgC5gpmKv3hhMmqYD9jTYNdX8K04cY-nlD2PosyRKoS8TNWlcnFB-tIG9ehZEf9RBoBaJacVK0P8mNP1gFlcr4rDsI3aGzsBAevAc5oXJ57CQo_L_mlIJ5Eme4"; // Replace with your actual token
    const UPLOAD_URL = "https://content.dropboxapi.com/2/files/upload";

    try {
        let response = await fetch(UPLOAD_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/Applications/${fileName}`,
                    mode: "add",
                    autorename: true,
                    mute: false
                }),
                "Content-Type": "application/octet-stream"
            },
            body: fileData // Send raw file binary data
        });

        let resultText = await response.text(); // Capture raw response
        console.log("Dropbox Response:", resultText);

        if (!response.ok) throw new Error(resultText); // Throw error if response is not OK

        let result = JSON.parse(resultText);
        return `https://www.dropbox.com/home/Applications/${result.name}`; // Construct URL manually
    } catch (error) {
        console.error("Upload to Dropbox failed:", error);
        return null;
    }
}


// Function to send email with resume link
function sendEmail(fileName) {
    emailjs.init('j784a0geRr7_GprUh'); // Your EmailJS Public Key

    let formElement = document.getElementById('application-form'); // Get the form element
    if (!formElement) {
        console.error("Error: Form element not found!");
        return;
    }

    let titleElement = document.getElementById('job_title'); // Get job title
    let title = titleElement.textContent || titleElement.value;

    console.log("Job Title:", title);

    // Remove a specific element from the form (e.g., "resume" input)
    let resume = document.getElementById("resume");
    if (resume) {
        resume.remove(); // Removes the file input from the form
        console.log("Removed resume input field");
    }

    // 🔹 Add or update a hidden input for resume_name
    let resumeInput = document.getElementById('hidden_resume_name');
    if (!resumeInput) {
        resumeInput = document.createElement('input');
        resumeInput.type = 'hidden';
        resumeInput.name = 'resume_name';
        resumeInput.id = 'hidden_resume_name';
        formElement.appendChild(resumeInput);
    }
    resumeInput.value = fileName; // Set the resume name dynamically

    // 🔹 Add or update a hidden input for job_title
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
        resume_name: resumeInput.value,
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

