document.addEventListener('DOMContentLoaded', () => {
    Question.all()
      .then(data => {
        console.log(data);
        const main = document.getElementById('questions-index');
        data.forEach(q => {
          // Question Container
          const div = document.createElement('div');
          // Question Header
          const header = document.createElement('h3');
          header.innerText = `${q.id} | ${q.title}`
          // Question Body
          const body = document.createElement('p');
          body.innerText = `${q.body}`
  
          // Attached header and body to container
          div.appendChild(header);
          div.appendChild(body);
          main.appendChild(div);
        })
      })
  });
  
  const BASE_URL = 'http://localhost:3000/api/v1';
  
  const Question = {
    all() {
      // send a AJAX request to our Rails API
      return fetch(`${BASE_URL}/questions`)
        // fetch returns a promise with `response` object
        .then(response => {
          // the response object has a method `.json()` used to parse the body (data) of a response. It returns a promise
          return response.json();
        })
        .then(data => {
          // when .json() is completed we get the data from our backend data.
          return data;
        })
    }
  }
  