const submit = document.querySelector("#submit");
const userData = document.querySelectorAll(".userurl");
const userDataPost = userData[0];
const userDataPostUrl = userData[1];
const value = userDataPost.value;
const POST = document.querySelector("#POST");

const createTicketDomP = (id, url, shortcuturl) => {
  const ticket = document.createElement("div");
  ticket.classList.add("ticket");
  ticket.id = id;
  ticket.innerHTML = `<p>${url}</p> <p>${shortcuturl}</p>`;
  return ticket;
};

// http://localhost:5000/api/UserUrl

let url = [];
let shorturl = [];

(async function () {
  try {
    const posturl = await fetch("http://localhost:5000/api/UserUrl");
    url = await posturl.json();

    url.data.forEach((task) => {
      userDataPost.appendChild(createTicketDomP(task.id, task.url));
    });

    const postshorturl = await fetch("http://localhost:5000/api/UserUrl");
    shorturl = await postshorturl.json();

    shorturl.data.forEach((task) => {
      userDataPostUrl.appendChild(createTicketDomP(task.id, task.shortcuturl));
    });
  } catch (err) {
    console.error(err.message);
  }
})(url, shorturl, createTicketDomP);

submit.addEventListener("click", async () => {
  const data = POST.querySelector("input").value;
  const response = await fetch("http://localhost:5000/api/UserUrl", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ url: data }),
  });
});

// Set the URL to be redirected to
var targetURL = POST.querySelector("input").value;

// Create the shortcut URL
function createShortcutURL() {
  // Modify the URL without reloading the page
  window.history.pushState({}, "", "/shortcut");

  // Redirect to the target URL
  window.location.href = targetURL;
}
