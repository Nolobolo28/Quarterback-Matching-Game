const mainDiv = document.querySelector("#main-div");
const img1 = document.querySelector("#one-img");
const img2 = document.querySelector("#two-img");
const img3 = document.querySelector("#three-img");
const img4 = document.querySelector("#four-img");
const img5 = document.querySelector("#five-img");
const img6 = document.querySelector("#six-img");
const img7 = document.querySelector("#seven-img");
const img8 = document.querySelector("#eight-img");
const img9 = document.querySelector("#nine-img");
const img10 = document.querySelector("#ten-img");
let howManyClicked = [];
let numberClass = []; //array for the number class so we can remove it when matched
let matches = 0;
let checkNumber = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
]; //this helps us figure out if we clicked on a matched card
let imageURLS = [
  "https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu",
  "https://static.www.nfl.com/image/private/t_headshot_desktop/league/pbl27kxsr5ulgxmvtvfn",
  "https://static.www.nfl.com/image/private/t_headshot_desktop/league/iv04omcunr78zezpnf8t",
  "https://static.www.nfl.com/image/private/t_headshot_desktop/league/q7dpdlxyu5rs05rgh1le",
  "https://static.www.nfl.com/image/private/t_headshot_desktop/league/hh8azxeqpydxofvo0suc",
];

let images = [img2, img6, img9, img8, img4, img5, img10, img3, img1, img7];

(function () {
  while (imageURLS.length != 0) {
    let imgurl = Math.floor(Math.random() * imageURLS.length); //this is choosing a random number according to the imageURLS array
    let url = imageURLS[imgurl]; //here we are grabbing the actual url from the array
    imageURLS.splice(imgurl, 1); //we are deleting the url that we grabbed from the array at that specific index
    let imgsrc1 = Math.floor(Math.random() * images.length);
    let image1 = images[imgsrc1];
    images.splice(imgsrc1, 1);
    let imgsrc2 = Math.floor(Math.random() * images.length);
    let image2 = images[imgsrc2];
    images.splice(imgsrc2, 1);
    image1.src = url; //setting the random image we got from the images array using the DOM
    image2.src = url;
  }
})();

function handleClick(e) {
  let clicked = e.target.getAttribute("class"); //this is using delegation and we're getting the class of the div that was clicked
  if (clicked !== null) {
    let clickedSplit = clicked.split(" "); //this is splitting the the clicked target so we can get the last class
    let last = clickedSplit[clickedSplit.length - 1];
    if (checkNumber.indexOf(last) !== -1) {
      let formatClick = `.${last}`; //here we are formatting the last class we got so we can use it in querySelector
      let showImg = `#${last}-img`;
      document.querySelector(formatClick).style.display = "none";
      document.querySelector(showImg).style.display = "block";
      howManyClicked.push(formatClick, showImg);
      numberClass.push(last);
    }
  } else if (clicked == null) {
    clear();
  }

  if (howManyClicked.length === 4) {
    checkMatch();
  }
}

function match() {
  let div1 = document.querySelector(howManyClicked[0]);
  div1.style.background = "#7777";
  div1.style.display = "block";
  div1.classList.remove(numberClass[0]); //removing the number class that way we can't select it anymore
  let img1 = document.querySelector(howManyClicked[1]);
  img1.style.display = "none";
  img1.classList.remove(numberClass[0]);
  let div2 = document.querySelector(howManyClicked[2]);
  div2.style.display = "block";
  div2.style.background = "#7777"; //changing the original card's background-color to indicate no need to match it again
  div2.classList.remove(numberClass[1]);
  let img2 = document.querySelector(howManyClicked[3]);
  img2.style.display = "none";
  img2.classList.remove(numberClass[1]);
  matches++;
  console.log(matches);
  document.querySelector("h1").textContent = `Matches ${matches}`; //displays how many matches we have 
  clearTimeout();
  if (matches == 5) {
    document.location.reload(); //refreshing the page if we matched all cards
  }
  clear();
}

function checkMatch() {
  let match1 = document.querySelector(howManyClicked[1]).src; //getting both the img's source and checking if they match
  let match2 = document.querySelector(howManyClicked[3]).src;
  if (match1 === match2) {
    setTimeout(match, 800);
  } else if (match1 !== match2) {
    setTimeout(clear, 1000);
  }
}

function clear() {
  document.querySelector(howManyClicked[0]).style.display = "block";
  document.querySelector(howManyClicked[1]).style.display = "none";
  document.querySelector(howManyClicked[2]).style.display = "block";
  document.querySelector(howManyClicked[3]).style.display = "none";
  numberClass = [];
  howManyClicked = [];
  clearTimeout();
}

mainDiv.addEventListener("click", handleClick);
