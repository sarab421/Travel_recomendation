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
               let name = document.createElement("div");
               document.getElementById("result_under_search").appendChild(name);
               name.textContent = item.name;

               let descript = document.createElement("div");
               document
                 .getElementById("result_under_search")
                 .appendChild(descript);
               descript.textContent = item.description;
            


               let imgUrl = document.createElement("div");
               document
                 .getElementById("result_under_search")
                 .appendChild(imgUrl);
               imgUrl.textContent = item.imageUrl;
             
              

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
              let name = document.createElement("div");
              document.getElementById("result_under_search").appendChild(name);
              name.textContent = item.name;

              let descript = document.createElement("div");
              document
                .getElementById("result_under_search")
                .appendChild(descript);
              descript.textContent = item.description;

              let imgUrl = document.createElement("div");
              document
                .getElementById("result_under_search")
                .appendChild(imgUrl);
              imgUrl.textContent = item.imageUrl;
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
  var children = document.getElementById("result_under_search").children;
  for(const key in children){
    children[key].textContent=" "
  }
    document.getElementById("result_under_search").style.display="none";
}