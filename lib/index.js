const refresh = document.querySelector("#refresh");
const baseUrl = `https://wagon-chat.herokuapp.com/`;
let batch = 284;

const list = document.querySelector(".list-unstyled");
const form = document.querySelector("#comment-form");

const batchSelector = document.querySelector('#batch');

// Every time we change the batch selector value, it updates the batch value

const updateBatch = (event) => {
  batch = event.target.value;
  refreshChat();
}

batchSelector.addEventListener('change',updateBatch)

const buildMessage = (message) => {
  // Add a message to the chat list
  const differenceDate = (new Date() - new Date(message.created_at)) / 60000;
  list.insertAdjacentHTML("beforeend", `<li>${message.content} (posted <span class=date>${Math.floor(differenceDate)} minutes ago</span>) by ${message.author}</li>`);
}

const refreshChat = () => {
  // Clear chat list, fetch and add all available messages
  const url = `${baseUrl}/${batch}/messages`;

  fetch(url)
  .then(response => response.json())
  .then((data) => {
    list.innerHTML = '';
    data.messages.forEach((message) => {
      buildMessage(message);
    });
  });
}

refresh.addEventListener('click', refreshChat);


const sendMessage = (event) => {
  event.preventDefault();

  const yourMessage = document.querySelector("#your-message");
  const yourName = document.querySelector("#your-name");

  const message = {
    author: yourName.value,
    content: yourMessage.value,
  };

  yourMessage.value = "";
  yourName.value = "";

  const options = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }

  const url = `${baseUrl}/${batch}/messages`;

  fetch(url, options)
  .then(response => response.json())
  .then((data) => {
    buildMessage(data);
  });
}

form.addEventListener('submit', sendMessage);

refreshChat();
setInterval(refreshChat, 3000);


































// let batch = 284; // change to your own batch id
// const baseUrl = "https://wagon-chat.herokuapp.com/";

// const updateBatch = (value) => {
//   batch = value;
// }

// batchSelector = document.querySelector('#batch');

// batchSelector.addEventListener('change', (event) => {
//   updateBatch(event.target.value)
// })
// updateBatch(batchSelector.value);

// const chatList = document.querySelector('#messages .list-unstyled');

// const clearChat = () => {
//   chatList.innerHTML = '';
// };

// const addMessage = (message) => {
//   const text = `<li>${message.content} (posted <span class="date">10 minutes ago</span>) by ${message.author}</li>`
//   chatList.insertAdjacentHTML('beforeend', text);
// }

// const buildChat = (messages) => {
//   clearChat();

//   messages.forEach((message) => {
//     addMessage(message);
//   });
// };

// const getMessages = () => {
//   fetch(baseUrl + `${batch}/messages`)
//   .then(response => response.json())
//   .then((data) => {
//     buildChat(data.messages);
//   });
// };

// const postMessage = (event) => {
//   event.preventDefault();

//   const content = event.target.querySelector('#your-message').value;
//   const author = event.target.querySelector('#your-name').value;

//   const options = {
//     method: 'POST',
//     body: JSON.stringify({
//       "author": author,
//       "content": content
//     })
//   };

//   fetch(baseUrl + `${batch}/messages`, options)
//   .then(response => response.json())
//   .then((data) => {
//     addMessage(data);
//   });
// };

// const refresh = document.querySelector('#refresh');
// refresh.addEventListener('click', getMessages);

// const form = document.querySelector('#comment-form');
// form.addEventListener('submit', postMessage);

// setInterval(getMessages, 1000);
