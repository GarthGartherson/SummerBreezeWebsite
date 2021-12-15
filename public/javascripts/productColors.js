const buttonAddColor = document.querySelector("#buttonAddColor");
const buttonDeleteColor = document.querySelector("#buttonDeleteColor");
const selectColorList = document.querySelector("#selectColorList");

buttonAddColor.addEventListener("click", function (e) {
  e.preventDefault();

  let newColor = document.createElement("input");
  let chosenColor = document.querySelector("#message-text");
  newColor.type = "text";

  newColor.innerText = `${chosenColor.value}`;
  newColor.value = `${chosenColor.value}`;
  newColor.name = `colors[${chosenColor.value}]`;
  newColor.classList.add("my-2", "my-md-1", "d-block");
  newColor.setAttribute("readonly", "");

  if (chosenColor.name === null || chosenColor.value === "") {
    return;
  }
  selectColorList.appendChild(newColor);
  chosenColor.value = "";
});

buttonDeleteColor.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("delete color");
  let currentColorList = document.querySelector("#selectColorList");
  if (currentColorList.children.length > 1) {
    for (i = 0; i < 1; i++) {
      currentColorList.removeChild(currentColorList.lastElementChild);
    }
  }
});
