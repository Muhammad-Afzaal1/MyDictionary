const tableBody = document.getElementById("tableBody");
function createSelect(options){
    if(!options || options.length <= 1){
        return document.createTextNode(options && options.length === 1?options[0]:"");
    }
    const select = document.createElement("select");
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
    });
    return select;
}

function addRow(){
    const row = document.createElement("tr");

    const wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.addEventListener("input", () => updateRow(row, wordInput.value));

    const wordCell = document.createElement("td");
    wordCell.appendChild(wordInput);

    const urduCell = document.createElement("td");
    const synonymCell = document.createElement("td");
    const sentenceCell = document.createElement("td");
    sentenceCell.classList.add("col-sentence");

    row.appendChild(wordCell);
    row.appendChild(urduCell);
    row.appendChild(synonymCell);
    row.appendChild(sentenceCell);

    tableBody.appendChild(row);
}

function updateRow(row, word){
    const[_, urduCell, synonymCell, sentenceCell] = row.children;

    const urduOptions = word ? ["اردو مطلب 1", "اردو مطلب 2"] : [];
    const synonymOptions = word?["synonym 1", "synonym 2"]:[];
    const sentenceOptions = word ? [
    "This is a sentence using the word.",
    "Another usage of the word in a sentence."
    ] : [];

    urduCell.innerHTML = "";
    synonymCell.innerHTML = "";
    sentenceCell.innerHTML = "";

    urduCell.appendChild(createSelect(urduOptions));
    synonymCell.appendChild(createSelect(synonymOptions));
    sentenceCell.appendChild(createSelect(sentenceOptions));
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    addRow();
  }
}

function fillInitialRows(){
    const rowHeight = 50;
    const rowsNeeded = Math.ceil(window.innerHeight / rowHeight);
    for(let i = 0; i < rowsNeeded; i++){
        addRow();
    }
}

window.addEventListener("scroll", handleScroll);

fillInitialRows();