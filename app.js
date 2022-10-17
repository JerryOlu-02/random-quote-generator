'use strict';
const mainBody = document.querySelector('.main');
const noId = document.querySelector('#advice--id');
const adviceText = document.querySelector('.advice--text');

const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

const editHtml = function (id, text) {
  noId.textContent = `#${id}`;
  adviceText.textContent = text;
};

const showError = function (err) {
  adviceText.textContent = `Something went wrong, Try again. ${err}`;
};

const getApi = async function () {
  try {
    // Generate random Quote
    let slip_id = (await Math.floor(Math.random() * 199)) + 1;

    // Get Quote
    const request = await fetch(`https://api.adviceslip.com/advice/${slip_id}`);

    const { slip: dataQuotes } = await request.json();

    adviceText.style.opacity = 0;
    let adviceId = await dataQuotes.id;
    let adviceQuote = await dataQuotes.advice;

    // Append Quote into HTML
    await editHtml(adviceId, adviceQuote);
    await wait(1);
    adviceText.style.opacity = 1;
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
};

mainBody.addEventListener('click', function (e) {
  if (!e.target.classList.contains('generate--advice')) return;
  getApi();
});
