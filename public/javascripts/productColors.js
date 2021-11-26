const buttonAddColor = document.querySelector("#buttonAddColor");
const buttonDeleteColor = document.querySelector("#buttonDeleteColor");
const selectColorList = document.querySelector("#selectColorList");

buttonAddColor.addEventListener("click", function (e) {
  e.preventDefault();
  const lineBreak = document.createElement("br");
  selectColorList.append(lineBreak);

  let newColor = document.createElement("input");
  let chosenColor = document.querySelector("#message-text");
  newColor.type = "text";

  newColor.innerText = `${chosenColor.value}`;
  newColor.value = `${chosenColor.value}`;
  newColor.name = `colors[${chosenColor.value}]`;
  newColor.classList.add("my-2", "my-md-1");

  if (chosenColor.name === null || chosenColor.value === "") {
    selectColorList.lastChild.remove();
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
    for (i = 0; i < 2; i++) {
      currentColorList.removeChild(currentColorList.lastChild);
    }
  }
});
