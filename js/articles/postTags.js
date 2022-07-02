//create tag list
function  postTags(){
const token = localStorage.getItem("token");
const pElement = document.querySelector("#loadTags");
const newTag = document.querySelector("#New-tag");
let tagList = [];
let ID = 0;
let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = ID;
    checkbox.name = `tagTitle${ID}`;
    checkbox.value = `${newTag}`.value;
 
    let br = document.createElement('br');
    let container = document.getElementById('tagContainer');
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = checkbox;
    li.appendChild(span);
    container.appendChild(li);
    container.appendChild(br);
    createTagsList(checkbox);

function createTagsList(checkbox) {
    const tag = {
      id: ID,
      title: checkbox.value,
    };
    ID += 1;
    tagList.push(tag);
    return tagList;
}
  
  const postTags = (tagList) => {
      pElement.innerHTML = "Loading...";
      axios({
        method: 'get',
          url: "https://api.realworld.io/api/tags",
          headers: {Authorization: `Bearer ${token}`
        },
          data: {
              article: {
                  tagList,
                }
            }
            }).then((response) => {
        if(response.status === 200){
        console.log("Tags saved successfully!")
        return tagList
        }
    }).catch((error) => {
        console.log(`${error}`);
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
}; //end of axios for loading tags
return tagList;
}//end of create tag list
