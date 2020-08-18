const baseURL = 'https://api.propublica.org/congress/v1/members/house/in/current.json';
const key = 'KIHXDljmVqhH5Ii79ljEaATexFGm3C6D3rOAw9lB'; 
let url;

const searchForm = document.querySelector('.searchForm');
const submitBtn = document.querySelector('.btn');
const firstNameSearch = document.querySelector('.first-name');
const lastNameSearch = document.querySelector('.last-name');
const stateSearch = document.querySelector('.state');
const section = document.querySelector('section');
const senate = document.querySelector('.senate');
const houseOfReps = document.querySelector('.houseOfReps');



searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    console.log(e);
    e.preventDefault();


    if (stateSearch !== '') {

    }
    // Need to create conditionals based on inputs to append to url (state, chamber, names pointing to id value, party?);
    //if ()

    url = baseURL;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-API-Key': key,
        },
    })
      .then(function(result) {
        console.log(result);
        return result.json();
    })
      .then(function(json) {
        console.log(json);
        //displayResults(json);
    })
      .catch(function(err) {
        console.log(err);
    });

}