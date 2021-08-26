const elList = document.querySelector("#list");
const elListPosts = document.querySelector("#listPosts");
const elListComents = document.querySelector("#listComents");

function renderUsers(user, element) {
    elList.innerHTML = "";


    user.forEach(elem => {

        //*new create atributes...
        const newLi = document.createElement("li");

        const addressWrite = document.createElement("div");
        const companyWrite = document.createElement("div");

        const userName = document.createElement("span");
        const userTitle = document.createElement("h3");

        const streetText = document.createElement("span");
        const suiteText = document.createElement("span");
        const cityText = document.createElement("span");
        const zipcodeText = document.createElement("span");

        const companyNameText = document.createElement("p");
        const companyCatchPhraseText = document.createElement("p");
        const companyBsText = document.createElement("p");
        const buttonModal = document.createElement("button");

        //add class
        newLi.classList.add("list-item");
        userName.classList.add("user-name");
        addressWrite.classList.add("address-write");
        companyWrite.classList.add("company-write");
        buttonModal.classList.add("user-button");

        //textContents
        userName.textContent = elem.username;
        userTitle.textContent = elem.name;

        streetText.textContent = elem.address.street;
        suiteText.textContent = elem.address.suite; 
        cityText.textContent = elem.address.city;
        zipcodeText.textContent = elem.address.zipcode;

        companyNameText.textContent = elem.company.name;
        companyCatchPhraseText.textContent = elem.company.catchPhrase;
        companyBsText.textContent = elem.company.bs;
        buttonModal.dataset.uuid = elem.id
        buttonModal.textContent = "post"

        //appendchilds
        newLi.appendChild(userName);
        newLi.appendChild(userTitle);

        addressWrite.appendChild(streetText);
        addressWrite.appendChild(suiteText);
        addressWrite.appendChild(cityText);
        addressWrite.appendChild(zipcodeText);
        newLi.appendChild(addressWrite);

        companyWrite.appendChild(companyNameText);
        companyWrite.appendChild(companyCatchPhraseText);
        companyWrite.appendChild(companyBsText);
        newLi.appendChild(companyWrite);


        newLi.appendChild(buttonModal);


        element.appendChild(newLi);
        buttonModal.addEventListener(`click`, (e) => {
            elListPosts.textContent = null;
            elListComents.innerHTML = null
            let x = e.target.dataset.uuid
            fetch(`https://jsonplaceholder.typicode.com/posts`).then(response => response.json()).then(data => {

                data.forEach((posts) => {
                    let postsId = posts.userId;
                    if (x == postsId) {
                        const postsLi = document.createElement("li");
                        const postsTitle = document.createElement("h3");
                        const postsText = document.createElement("p");
                        const buttonPosts = document.createElement("button");

                        postsLi.classList.add("list-item");
                        buttonPosts.classList.add("user-button");
                        postsText.classList.add("company-write");

                        postsTitle.textContent = posts.title;
                        postsText.textContent = posts.body;
                        buttonPosts.textContent = "comment";
                        buttonPosts.dataset.uuid = posts.id;
                        console.log(buttonPosts);
                        postsLi.appendChild(postsTitle);
                        postsLi.appendChild(postsText);
                        postsLi.appendChild(buttonPosts);
                        elListPosts.appendChild(postsLi);

                        buttonPosts.addEventListener("click", (evn) => {
                            elListComents.textContent = null
                            let y = evn.target.dataset.uuid;

                            fetch(`https://jsonplaceholder.typicode.com/comments`).then(response => response.json()).then(data => {
                                data.forEach((comments) => {
                                    if (y == comments.postId) {
                                        const commentsLi = document.createElement("li")
                                        const commentsName = document.createElement("h3");
                                        const commentsEmail = document.createElement("p");
                                        const commentsText = document.createElement("p");

                                        commentsLi.classList.add("lis-item");
                                        commentsEmail.classList.add("address-write");
                                        commentsText.classList.add("company-write");

                                        commentsName.textContent = comments.name;
                                        commentsEmail.textContent = comments.email;
                                        commentsText.textContent = comments.body;

                                        commentsLi.appendChild(commentsName)
                                        commentsLi.appendChild(commentsEmail)
                                        commentsLi.appendChild(commentsText)
                                        elListComents.appendChild(commentsLi)
                                    }
                                })
                            }
                            )
                        })
                    }
                })
            })
        })
    });
}

async function promiseUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const json = renderUsers(data, elList)
    console.log(data);
}
promiseUser()

