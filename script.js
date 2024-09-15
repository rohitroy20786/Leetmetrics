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

        try{
            searchButton.textContent = "Loading...";
            searchButton.disabled = true;
            statsContainer.style.display = "none";


            const proxyUrl = "https://cors-anywhere.herokuapp.com/";
            const targetUrl = 'https://leetcode.com/graphql/';

            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

           const graphql = JSON.stringify({
           query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
           variables: { "username": `${username}` }
            })
          const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
          };

           const response = await fetch(proxyUrl +  targetUrl, requestOptions);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            const parseddata = await response.json();
            console.log("Loggin data:", parseddata);

             displayuserdata(parseddata);

          }
          catch(error){
             statsContainer.innerHTML=`<p>${error.message}</p>`
          }
          finally{
             searchButton.textContent = "Search";
             searchButton.disabled = false;
          }
    }

    function updateProgress(solved,total,label,circle){
            const progressDegree = (solved/total)*100;
            circle.style.setProperty("--progress-degree",`${progressDegree}%`);
            label.textContent = `${solved}/${total}`;
    }


    const displayuserdata = function(parseddata){
          const totalQues = parseddata.data.allQuetionsCount[0].count;
          const totalEasyQues = parseddata.data.allQuetionsCount[1].count;
          const totalMediumQues = parseddata.data.allQuetionsCount[2].count;
          const totalHardQues = parseddata.data.allQuetionsCount[3].count;

         const solvedTotalQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[0].count;
         const solvedTotalEasyQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count;
         const solvedTotalMediumQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count;
         const solvedTotalHardQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count;

         updateProgress(solvedTotalEasyQues,totalEasyQues,easyLabel,easyProgressCircle);
         updateProgress(solvedTotalMediumQues,totalMediumQues,mediumLabel,mediumProgressCircle);    
         updateProgress(solvedTotalHardQues,totalHardQues,hardLabel,hardProgressCircle);

         const carddata = [
              {label: "Overall submissions",value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
              {label: "Easy submissions",value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
              {label: "Medium submissions",value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
              {label: "Hard submissions",value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[3].submissions},  
         ];

         cardStatsContainer.innerHTML = carddata.map(
            data=>
                `<div class="card"> 
                  <h4>${data.label}</h4>
                  <p>${data.value}</p>
                 </div>                                          
                 `
         ).join("")
    }

    

     searchButton.addEventListener("click", () => {
        const username = usernameInput.value;
        if(validateUsername(username)){
             fetchUserDetails(username);
        }
        
     })




})
