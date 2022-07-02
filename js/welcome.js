const pElement = document.querySelector("#user-name");
const pArticlestdst = document.querySelector("#articlesUl");
const pCreateArticleMessage = document.querySelector("createArticle-message");
const token = localStorage.getItem("token");
const welcomeToUser = () => {
  pElement.innerHTML = "Loading ...";
  axios({
    method: "get",
    url: "https://api.realworld.io/api/user",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      pElement.innerHTML = `welcome ${response.data.user.username}`;
      readArticles();
    })
    .catch((error) => {
      console.log({ error });
      const response = error.response;
      if (response.status === 401) {
        pElement.innerHTML = response.data.message;
        setTimeout(() => {
          window.location.href = "http://localhost:5501/login.html";
        }, 5000);
      }
    });
};

const logoutBtn = document.querySelector("#logout-button");
logoutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.href = "http://localhost:5501/login.html";
});

welcomeToUser();

//table of articles
const articlesUl = document.querySelector("#listOfArticles");
const readArticles = () => {
  pArticlestdst.innerHTML = "Loading ...";
  axios({
    method: "get",
    url: "https://api.realworld.io/api/articles",
  })
    .then((response) => {
      const articlestdst = response.data.articles;
      console.log(`${articlestdst}`);
      showArticlestdst(articlestdst);
    })
    .catch((error) => {
      console.log(`${error}`);
      articlesUl.innerHTML = "Articles weren't loaded!";
    });

  const showArticlestdst = (articlestdst) => {
    articlesUl.innerHTML = "";
    for (let i = 0; i < articlestdst.length; i += 1) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      span.innerHTML = `
      ${articlestdst[i].title} ,
      ${articlestdst[i].author.username} , 
      ${articlestdst[i].createdAt} ,
      ${articlestdst[i].updatedAt}
      `;
      td.appendChild(span);

      const select = document.createElement("select");
      select.value = "...";
      select.innerHTML = `
      <option value="null">...</option>
      <option value="EDIT">EDIT</option>
      <option value="DELETE">DELETE</option>
      `;

      select.dataset.articleSlug = articlestdst[i].slug;
      select.dataset.field = "slug";
      td.appendChild(select);

      articlesUl.appendChild(td);
    } //end of for
  }; //end of showArticlestdst
};

//if Add Article button clicked
const addArticleBtn = document.querySelector("btn");
if (addArticleBtn) {
  addArticleBtn.addEventListener("onclicked", function () {
    if (typeof article !== "undefined") {
      alert(
        (pCreateArticleMessage.innerHTML =
          "<b>Well DONE!</b>Article created successfully")
      );
    }
  });
}
readArticles();

//if del or edit clicked
articlesUl.addEventListener("change", function (event) {
  /* console.log(event.target.dataset.articleSlug);
          console.log(event.target.dataset.field);
          console.log(event.target.value); */

  const articleSlug = event.target.dataset.articleSlug;
  const article = event.target.value;

  if (typeof article !== "undefined") {
    if (event.target.value === "EDIT") {
      window.location.href =
        "http://localhost:5501/js/articles/updatearticle.html?slug=" +
        `${"articleSlug"}` +
        "&article=" +
        `${"article"}`;
    }

    if (event.target.value === "DELETE") {
      if (window.confirm("Are you sure to delete Article?")) {
        deleteArticle(articleSlug);
      }
      showArticlestdst();
      // console.log ({articleSlug});
    }
  }
});
