const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput =  document.querySelector(".input-box input"),
passIndicator =  document.querySelector(".pass-indicator"),
generateBtn =  document.querySelector(".generate-btn");

const characters = { //object of ....
    lowercase:"abcdefghijklmnopqrstuvwyz",
    uppercase:"ABCDEFGHIKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
    symbols: "!@#$%^&*()_+={}[]<>/?()-;':"

}

const generatePassword = () =>{
    let staticPassword = "";
    randomPassword = "";
    excludeDuplicate = false;
    passLength = lengthSlider.value;

    options.forEach(option => { //looping through each option's checkbox
        if (option.checked) { // if checkbox is checked
            // if checkbox isn't exc-duplicate and spaces
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
                //adding particular key value from character object to staticPassword
                staticPassword += characters[option.id];
            }else if (option.id === 'spaces') {// if checkbox is spaces
                staticPassword += ` ${staticPassword}` //adding spaces at the begining and of staticPassword
            } else{ //pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
            
        }
    })
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else{
            randomPassword += randomChar;
        }
        
    }
    passwordInput.value = randomPassword; //passing randomPassword to passInput value
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () =>{
    //passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () =>{
    navigator.clipboard.writeText(passwordInput.value);//copying random password
    copyIcon.innerText = "check"//changing copy icon to tick
    setTimeout(() => {// after 1500ms, changing tick icon back to copy
        copyIcon.innerText = "copy_all"
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);