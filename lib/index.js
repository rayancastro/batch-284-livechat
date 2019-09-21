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
