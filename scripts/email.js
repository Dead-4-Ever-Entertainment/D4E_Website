// Sending Emails from site
emailjs.init('j784a0geRr7_GprUh')
const btn = document.getElementById('button');

document.getElementById('contact-form')
  .addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_7p6nxyk';
 
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
        this.reset();
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
    });
});