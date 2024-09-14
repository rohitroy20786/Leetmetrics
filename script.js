document.addEventListener("DOMContentLoaded", () => {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.querySelector("#easy-label");
    const mediumLabel = document.querySelector("#medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");

    //  check if username is valid
     const validateUsername = function(){
          if(username.trim===""){
             alert("Please enter a valid username");
             return false;
          }
          const regex = /^[a-zA-Z0-9_-]{1,15}$/;
          const isMatching = regex.test(username);
          if(!isMatching){
             alert("Please enter a valid username");
          }
          return isMatching;
     }

     async function fetchUserDetails(username){
          //    video continue from :- 42:07 / 1:21:45
          const url = `https://leetcode-stats-api.herokuapp.com/users/api/${username}`;   
          try{
            searchButton.textContent = "Loading...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            const data = await response.json();
            console.log("Loggin data:", data);
          }
          catch(error){
             statsContainer.innerHTML=`<p>No data found</p>`
          }
          finally{
             searchButton.textContent = "Search";
             searchButton.disabled = false;
          }
    }

    

     searchButton.addEventListener("click", () => {
        const username = usernameInput.value;
        if(validateUsername(username)){
             fetchUserDetails(username);
        }
        
     })




})
