const form = document.querySelector("#form-container");
const btn = form.querySelector("#login-button");
const email = form.querySelector("#user-email");
const password = form.querySelector("#user-password");
const pElement = document.querySelector("#login-message");
btn.addEventListener("click" ,() => { 
    login(email.value , password.value);
});

const login = (email , password) => {
    if (typeof email !== "string" || !email){
        return;
    }
    
    if(typeof password != "string" || !password){
        return;
    }
    // console.log("nothing to show!")
    // console.log(email,password);
    pElement.innerHTML = "Loading ...";
    axios({
        url: "https://api.realworld.io/api/users/login" ,
        method: "post" ,
        data: {
            user: {
                email: email,
                password: password,
            },
        },

    }).then((response) => {
        const data = response.data;
        const token = data.user.token;
        // console.log (token);
        window.localStorage.setItem ( "token" , token);

        window.location.href = "http://localhost:5501";
    }).catch((error) => {
        const response = error.response;
        if(response.status === 403){
            pElement.innerHTML = "Invalid Username or Password";
        resetForm();
        }
    });
};

const resetForm = () => {
    email.value = "";
    password.value = "";
}

const switchToWelcomePage = () => {
    const token = window.localStorage.getItem("token");
if (typeof token === "string" && token){
    window.location.href = "http://localhost:5501";
}
};

switchToWelcomePage();