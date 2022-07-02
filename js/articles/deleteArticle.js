function deleteArticle(slug){
const token = localStorage.getItem("token");
// console.log({token});

axios({
  method: "DELETE",
  url: "https://api.realworld.io/api/articles/" + slug,
  headers: {Authorization: `Bearer ${token}`},
})
  .then(
    console.log("deleted!"),
    /* setTimeout(() => {
      window.location.reload();
    }, 1000) */
  )
  .catch((error) => {
    // console.log(error);
    console.log("not deleted!")
  }); 


function deletePostHandler(slug) {
  const newList = [];
  //لیست مقالات را بخوان
  for (let i = 0; i < articlesList.length; i += 1) {
    if (articlesList[i].slug !== slug) {
      newList.push(articlesList[i]); 
         }
      articlesList = newList;
      console.log(`the article with ${slug} is deleted.`);
      return articlesList;

    }
    
  }
}