const baseURL = "https://api.propublica.org/congress/v1/members/";
const key = "KIHXDljmVqhH5Ii79ljEaATexFGm3C6D3rOAw9lB";
let url;

const searchForm = document.querySelector(".searchForm");
const submitBtn = document.querySelector(".btn");
const firstNameSearch = document.querySelector(".first-name");
const lastNameSearch = document.querySelector(".last-name");
const stateSearch = document.querySelector(".state");
const section = document.querySelector("section");
const chamberSelector = document.querySelector(".chamberSelector");

searchForm.addEventListener("submit", fetchResults);

function fetchResults(e) {
  console.log(e);
  e.preventDefault();

  url = baseURL + "senate/" + stateSearch.value + "/current.json";

  fetch(url, {
    method: "GET",
    headers: {
      "X-API-Key": key,
    },
  })
    .then(function (result) {
      console.log(result);
      return result.json();
    })
    .then(function (json) {
      console.log(json);
      displayResults(json);
    })
    .catch(function (err) {
      console.log(err);
    });

  function displayResults(json) {
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }

    let senators = json.results;

    for (let i = 0; i < senators.length; i++) {
      let senatorDiv = document.createElement("div");
      let senatorName = document.createElement("h2");
      let senatorParty = document.createElement("p");
      let senatorTwitter = document.createElement("p");
      let nextElection = document.createElement("p");
      let cardDiv = document.createElement("div");
      let cardRow = document.createElement("div");

      let current = senators[i];

      senatorName.textContent = "Senator " + current.name;
      senatorParty.textContent = "Party: " + current.party;
      senatorTwitter.textContent = "Twitter: @" + current.twitter_id;
      nextElection.textContent =
        "Senator " +
        current.last_name +
        " is up for reelection in " +
        current.next_election +
        ".";

      function appendLink() {
        if (
          current.times_topics_url === "" ||
          current.times_topics_url === null
        ) {
          console.log(current.times_topics_url);
        } else {
          let senatorNews = document.createElement("a");
          senatorNews.href = current.times_topics_url;
          console.log(senatorNews);
          senatorNews.textContent =
            "Read the latest news on Senator " + current.last_name + " here";
          senatorDiv.appendChild(senatorNews);
        }
      }

      cardDiv.setAttribute("class", "card h-100");
      section.setAttribute("class", "row row-cols-1 row-cols-md-3 senatorDiv");
      cardRow.setAttribute("class", "col mb-4");
      senatorDiv.setAttribute("class", "card-body");
      senatorDiv.setAttribute("id", "senatorDiv");

      senatorDiv.appendChild(senatorName);
      senatorDiv.appendChild(senatorParty);
      senatorDiv.appendChild(senatorTwitter);
      senatorDiv.appendChild(nextElection);
      appendLink();
      cardDiv.appendChild(senatorDiv);
      cardRow.appendChild(cardDiv);
      section.appendChild(cardRow);
    }
  }
}
