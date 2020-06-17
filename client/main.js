document.addEventListener('DOMContentLoaded', () => {
    Question.all()
      .then(data => {
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
      });
    Question.one(10)
      .then(data => {
        // get the show page main tag
        const main = document.getElementById('questions-show')
        // container
        const div = document.createElement('div');
        div.style.border = '5px solid green';
        // header
        const header = document.createElement('h2');
        header.innerText = `${data.id} | ${data.title}`;
        // body
        const body = document.createElement('p');
        body.innerText = `${data.body}`;
        // attach elements to container
        div.appendChild(header);
        div.appendChild(body);
        // attach container to show page main tag
        main.appendChild(div);
      })
  
    const navbar = document.querySelector('nav');
    const anchors = navbar.querySelectorAll('a');
    anchors.forEach(a => {
      a.addEventListener('click', (event) => {
        // const currentTarget = event.currentTarget;
        const { currentTarget } = event;
        console.log(currentTarget.dataset);
      })
    })
  
    function navigateTo(page) {
      const pages = document.querySelectorAll('.page');
      pages.forEach(p => {
        p.classList.remove('active');
      })
      const displayPage = document.getElementById(page);
      displayPage.classList.add('active');
    }
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
    },
    one(id) {
      // get http://localhost:3000/api/v1/questions/:id
      return fetch(`${BASE_URL}/questions/${id}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          return data;
        })
    }
  }