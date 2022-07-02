const pCreateArticle = document.querySelector("#createArticle-message");
const title = document.querySelector("#newTitle");
const description = document.querySelector("#description");
const body = document.querySelector("#body");
const tagList = postTags();

//create the article function
function createArticle(title,description,body,tagList){
        const token = localStorage.getItem("token");
        pCreateArticle.innerHTML = "Loading ...";
        axios({
            method: 'get',
            url: "https://api.realworld.io/api/articles",
            headers: {Authorization: `Bearer ${token}`},
            data:{
                article: {
                    title: title,
                    description: description,
                    body: body,
                    tagList: tagList
    },
},

}).then((response) => {
const article = response.data.article;
console.log("article submitted successfully");
resetForm();
setTimeout(() => {
    window.location.href = "http://localhost:5501";
    return article;
}, 1000);

}).catch((error) => {
    console.log({error});
    const response = error.response;
    if( response.status === 401){
        pCreateArticle.innerHTML = response.data.message;
        setTimeout(() => {
            window.location.href = "http://localhost:5501/login.html";
        },5000);
};
});

//if submit button clicked
const btn = document.querySelector("#btn");
btn.addEventListener("onclick" ,() => { 
    createArticle(title,description,body,tagList);
    });// end of submit button

const resetForm = () => {
    title,description,body,tagList = "";
}
}
createArticle(title,description,body,tagList);