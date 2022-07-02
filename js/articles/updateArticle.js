const pElement =document.querySelector("#loading")
function updateArticle(slug, article) {
    for (let i = 0; i < articlesList.length; i += 1) {
      if (articlesList[i].slug === slug) {
        articlesList[i].title = article.title;
        articlesList[i].description = article.description;
        articlesList[i].body = article.body;
        // const tags = articlesList[i].tags = article.tags;
        //complete tags
        const loadTags = () => {
          pElement.innerHTML = "Loading...";
          axios({
            method: 'get',
            url: "https://api.realworld.io/api/articles/" + slug,
            headers: {Authorization: `Bearer ${token}`
          },
          }).then((response) => {
         const tags = response.data.article.tagList;
         const tagList = document.querySelector("tagList");
         for(let j=0 ; j<tags.length ; j+=1){
           const li = document.createElement("li");
           const span = document.createElement("span");
           span.innerHTML = tags[j];
           li.appendChild(span);
           tagList.appendChild(li);
         }
         
         return tags;
         
    }).catch((error) => {
        console.log({error});
        const response = error.response;
        if( response.status === 422){
          pElement.innerHTML = response.data.errors.title;
      }
        if(response.status === 403){
          pElement.innerHTML = response.data.message;
            setTimeout(() => {
                window.location.href = "http://localhost:5501/index.html";
            },1000);

        }
    });
  };
  loadTags();
      }
    }
  }
        