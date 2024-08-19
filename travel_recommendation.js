function recommend() {
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let val = document.getElementById("search_input").value;
      val = val.toLowerCase();

      function searching(val, obj) {
        const results = [];

        // Helper function to search recursively
        function search(obj) {
          if (typeof obj === "object" && obj !== null) {
            if (Array.isArray(obj)) {
              // Handle arrays
              for (let item of obj) {
                search(item);
              }
            } else {
              for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                  // Check if the key itself matches the search value
                  if (key.toLowerCase().includes(val)) {
                    results.push(obj[key]);
                  }
                  // Check if the value matches the search value
                   if (
                    typeof obj[key] === "string" &&
                    obj[key].toLowerCase().includes(val)
                  ) {
                   
                    
                  
                   
                       results.push(obj);
                
                    
                    break; // Exit the loop if match is found in the current object
                  }
                 
                  else {
                    search(obj[key]); // Recurse into the next level
                  }
                }
              }
            }
          }
        }

        search(obj);
        return results;
      }

      const searchResults = searching(val, data);
      if (Array.isArray(searchResults)) {
        searchResults.forEach((item,index)=>{
          if (typeof item === "string"){ 
            console.log("withput array is:", item)
          } 
          if(Array.isArray(item)){
            item.forEach((item,index)=>{
              console.log("With array")
               document.getElementById("result_under_search").style.display =
                 "block";



                 let imgUrl = document.createElement("img");
                 document
                   .getElementById("result_under_search")
                   .appendChild(imgUrl);
                 imgUrl.src = item.imageUrl;
                imgUrl.style.width = "310px";
                imgUrl.style.height = "190px";
                imgUrl.style.objectFit = "contain"; 


               let name = document.createElement("div");
               document.getElementById("result_under_search").appendChild(name);
               name.textContent = item.name;

               let descript = document.createElement("div");
               document
                 .getElementById("result_under_search")
                 .appendChild(descript);
               descript.textContent = item.description;

               let line_break= document.createElement("br");
               document.getElementById("result_under_search").appendChild(line_break);
              
                    

            })
          }
        })
      }
     try{
       if(typeof searchResults === "object"){
        console.log("Without any array")
        let temp = searchResults[0].cities;
        // console.log(temp);
        temp.forEach((item,index)=>{
            console.log(item.name);
            console.log(item.imageUrl);
            console.log(item.description);
              document.getElementById("result_under_search").style.display =
                "block";
              
              let imgUrl = document.createElement("img");
              document.getElementById("result_under_search").appendChild(imgUrl);
              imgUrl.src = item.imageUrl;
              imgUrl.style.width = "310px";
              imgUrl.style.height = "190px";
              imgUrl.style.objectFit = "contain"; 
               
              let name = document.createElement("div");
              document.getElementById("result_under_search").appendChild(name);
              name.textContent = item.name;

              let descript = document.createElement("div");
              document
                .getElementById("result_under_search")
                .appendChild(descript);
              descript.textContent = item.description;
              
                  let line_break = document.createElement("br");
                  document
                    .getElementById("result_under_search")
                    .appendChild(line_break);
            
        })
      }
     }
     catch(err){
      console.log(error);
     }

      // Display or process the results as needed
      // Example: document.getElementById("results").innerHTML = JSON.stringify(searchResults, null, 2);
    })
    .catch((error) => console.error("Error fetching the data:", error));
}


function clearall() {
  document.getElementById("search_input").value =""
  let parentElement = document.getElementById("result_under_search");

  // Loop through and remove all child elements
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

    document.getElementById("result_under_search").style.display="none";
}