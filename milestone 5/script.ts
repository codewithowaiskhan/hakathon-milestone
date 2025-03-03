// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareablelinkcontainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareablelinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadpdfButton = document.getElementById('download-pdf') as HTMLButtonElement;


// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value
    const name = (document.getElementById('name') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const phone = (document.getElementById('phone') as HTMLInputElement).value
    const education = (document.getElementById('education') as HTMLTextAreaElement).value
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value
    // save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data loacally

    // Generate the resume content dunamically
    const resumeHtml =`
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Username:</b><span contenteditable="true">${username}</span></p>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
    `;

    // display the generated resume
        resumeDisplayElement.innerHTML = resumeHtml;

    // generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username = ${encodeURIComponent(username)}`

    // Display the shareable link
    shareablelinkcontainer.style.display = 'block';
    shareablelinkElement.href = shareableURL;
    shareablelinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadpdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {

    // Autofill form if data is found in locationStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
        const resumeData = JSON.parse(savedResumeData);
        (document.getElementById('username') as HTMLInputElement).value = username;
        (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
        (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
        (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
        (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
        (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
        (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
    }
    }
})