const form = document.querySelector("#form-container");
const btn = form.querySelector("button");
const email = form.querySelector("#user-email");
const password = form.querySelector("#user-password");
const username = form.querySelector("#user-name");
const pElement = document.querySelector("#register-message");
btn.addEventListener("click" ,() => { 
    register(email.value , password.value , username.value);
});

const register = (email , password , username) => {
    if (typeof email !== "string" || !email){
        return;
    }
    
    if(typeof password != "string" || !password){
        return;
    }

    if(typeof username != "string" || !username){
        return;
    }
    // console.log("nothing to show!")
    // console.log(email,password);
    pElement.innerHTML = "Loading ...";
    axios({
        url: "https://api.realworld.io/api/users" ,
        method: "post" ,
        data: {
            user: {
                email,
                password,
                username,
            },
        },

    }).then((response) => {
        const data = response.data;
        const token = data.user.token;
        // console.log (token);
        window.localStorage.setItem ( "token" , token);
        setTimeout(() => {
            window.location.href = "http://localhost:5501";
            console.log("registered successfully");
        }, 1000);
    }).catch((error) => {
        const response = error.response;
        if(response.status === 403){
            pElement.innerHTML = "registeration did not done";
        resetForm();
        }
    });
};

const resetForm = () => {
    email.value = "";
    password.value = "";
    username.value = "";
}

const switchToWelcomePage = () => {
    const token = window.localStorage.getItem("token");
if (typeof token === "string" && token){
    window.location.href = "http://localhost:5501";
}
};

switchToWelcomePage();