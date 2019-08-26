"use strict";

document.getElementById("get-ranking-button").addEventListener("click", () => {
  const http = new XMLHttpRequest();
  const url = "http://localhost:3007/rankings";
  http.open("GET", url);
  http.onload = () => {
    if (http.status === 200) {
      addRankingsToHTML(JSON.parse(http.responseText));
    } else {
      console.log("error");
    }
  };
  http.send();
});

function addRankingsToHTML(data) {
  const table = document.getElementById("rankings");
  table.innerHTML = "";
  data.forEach(team => {
    const tableRow = document.createElement("tr");

    const tableDataRanking = document.createElement("td");
    tableDataRanking.innerText = team.ranking;
    tableRow.appendChild(tableDataRanking);

    const tableDataName = document.createElement("td");
    tableDataName.innerText = team.name;
    tableRow.appendChild(tableDataName);

    const tableDataPoints = document.createElement("td");
    tableDataPoints.innerText = team.points;
    tableRow.appendChild(tableDataPoints);

    table.appendChild(tableRow);
  });
}

document.getElementById("file-input").addEventListener("change", event => {
  // const fileData = document.getElementById('file-input').value;
  const file = event.target.files[0];
  //Read file only if is plain text
  if (file.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = function() {
      const http = new XMLHttpRequest();
      http.open("POST", "http://localhost:3007/file-upload", true);
      http.setRequestHeader("Content-type", "application/json");
      http.onload = () => {
        if (http.status === 200) {
          document.getElementById("get-ranking-button").click();
          console.log("success", http.responseText);
        } else {
          console.log("error");
        }
      };
      // http.send(this.result);
      http.send(JSON.stringify({ file: this.result }));
    };
    reader.readAsText(file);
  }
});
