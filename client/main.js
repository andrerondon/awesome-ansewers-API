document.addEventListener('DOMContentLoaded', () => {
    // Mocking logged in user. Do not do this ever.
    fetch(`http://localhost:3000/api/v1/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'js@winterfell.gov',
        password: 'supersecret'
      })
    }).then(res => res.json())
    .then(data => console.log(data));
  
    Question.all()
      .then(data => {
        const main = document.getElementById('questions-index');
        data.forEach(q => {
          // Question Container
          const div = document.createElement('div');
          div.setAttribute('data-id', q.id)
          div.classList.add('item')
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
  
    // Show Page
    Question.one(10)
      .then(data => {
        renderShowPage(data);
      })
  
    const navbar = document.querySelector('nav');
    const anchors = navbar.querySelectorAll('a');
    anchors.forEach(a => {
      a.addEventListener('click', (event) => {
        // const currentTarget = event.currentTarget;
        const { currentTarget } = event;
        const redirectpage = currentTarget.dataset.page;
        navigateTo(redirectpage);
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
  
    const newQuestionForm = document.getElementById('new-question-form')
    newQuestionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      // console.log(currentTarget.querySelector('input').value); // get input data from form without using FormData class
      const formData = new FormData(currentTarget)
      const params = {
        question: {
          title: formData.get('title'),
          body: formData.get('body')
        }
      }
      Question.create(params)
        .then(data => {
          Question.one(data.id)
            .then(data => {
              renderShowPage(data);
              navigateTo('questions-show')
            })
        })
    })
  
    function renderShowPage(question) {
      // get the show page main tag
      const main = document.getElementById('questions-show')
      main.innerHTML = '';
      // container
      const div = document.createElement('div');
      div.style.border = '5px solid green';
      // header
      const header = document.createElement('h2');
      header.innerText = `${question.id} | ${question.title}`;
      // body
      const body = document.createElement('p');
      body.innerText = `${question.body}`;
      // attach elements to container
      div.appendChild(header);
      div.appendChild(body);
      // attach container to show page main tag
      main.appendChild(div);
    }
  
    const main = document.getElementById('questions-index');
    main.addEventListener('click', (event) => {
      console.log('Target:', event.target);
      console.log('CurrentTarget', event.currentTarget);
      const questionDiv = event.target.closest('.item')
      console.log(questionDiv);
      Question.one(questionDiv.dataset.id)
        .then(data => {
          renderShowPage(data)
          navigateTo('questions-show')
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
    },
    create(params) {
      return fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(params)
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data
      })
    }
  }