(async function () {
  const words = [
    "apple",
    "school",
    "subliminary",
    "tree",
    "elementary",
    "penguin",
    "video",
    "games",
    "testiment",
    "female",
    "teller",
    "flippers",
    "broccoli",
    "kale",
    "abreast",
    "abrege",
    "abreges",
    "abri",
    "abricock",
    "abricocks",
    "abridgable",
    "abridge",
    "abridgeable",
    "abridged",
    "abridgement",
    "abridger",
    "abridgers",
    "abridges",
    "abridging",
    "abridgment",
    "abridgments",
    "abrim",
    "abrin",
    "abrins",
    "abris",
    "abroach",
    "abroad",
    "abroads",
    "abrogable",
    "abrogate",
    "abrogated",
    "abrogates",
    "abrogating",
    "abrogation",
    "abrogations",
    "abrogative",
    "abrogator",
    "abrogators",
    "abrooke",
    "abrooked",
    "abrookes",
    "abrooking",
    "abrosia",
    "abrosias",
    "abrupt",
    "abrupter",
    "abruptest",
    "abridgements"
];

  const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const directions = {
    0: "left",
    1: "right",
    2: "up",
    3: "down",
  };

  let crosswordData = {
    grid: [],
    longestWordLength: 0,
    padding: 20,
    maxStacked: 3,
    timeout: 3,
    wordData: {},
  };

  // - First Function/Step
  function processWords() {
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordLength = word.length;

      const largestWord = words.reduce(function (a, b) {
        return a.length > b.length ? a : b;
      });

      const isLargest =
        largestWord === word && largestWord.length === wordLength;

      const isLastWord = i === words.length - 1;

      const wordObject = {
        isLargest,
        wordLength,
        word,
        coordinates: {},
      };

      if (isLargest) crosswordData.longestWordLength = wordLength;

      crosswordData.wordData[word.toUpperCase()] = wordObject;
    }

    generateGrid();
  }

  // - Second Function/Step
  function generateGrid() {
    const largestWord = crosswordData.longestWordLength;

    const size = largestWord + crosswordData.padding;

    for (let i = 0; i < size; i++) {
      const rowArray = Array(size).fill("");

      crosswordData.grid.push(rowArray);
    }

    placeWords();
  }

  // -- Helper Function
  async function checkSafe(
      startingPoint = {
          Y: 0,
          X: 0
      },
      word = "",
      direction = directions[0]
  ) {
    const wordLength = word.length;
    const wordArray = word.split("");
    const maxAttempts = crosswordData.timeout;
    
    let safe = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        let tempSafe = true;
        const { Y, X } = startingPoint;
        const safeView = crosswordData.longestWordLength + crosswordData.padding - 1;

        switch (direction) {
            case "left":

                for (let index = 0; index < wordLength - 1; index++) {
                    const letter = wordArray[index];
                    
                    if (0 > X - index > safeView) {
                        tempSafe = false;
                        console.log("Out of bounds!");
                        break;
                    };

                    if (
                        crosswordData.grid[Y] === undefined
                    ) {
                        tempSafe = false;
                        break;
                    }

                    if (
                        crosswordData.grid[Y][X - index] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined X grid cell!");
                        break;
                    }

                    const cell = crosswordData.grid[Y][X - index];

                    if (
                        cell !== letter &&
                        cell !== ""
                    ) {
                        tempSafe = false;
                        console.log("Word seems to exist there already!");
                        break;
                    }

                    continue;
                }

                break;
            case "right":

                for (let index = 0; index < wordLength - 1; index++) {
                    const letter = wordArray[index];
                    
                    if (0 > X + index > safeView) {
                        tempSafe = false;
                        console.log("Out of bounds!");
                        break;
                    };

                    if (
                        crosswordData.grid[Y] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined Y grid cell!");
                        break;
                    }

                    if (
                        crosswordData.grid[Y][X + index] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined X grid cell!");
                        break;
                    }

                    const cell = crosswordData.grid[Y][X + index];

                    if (
                        cell !== letter &&
                        cell !== ""
                    ) {
                        tempSafe = false;
                        console.log("Word seems to exist there already!");
                        break;
                    }

                    continue;
                }

                break;
            case "up":

                for (let index = 0; index < wordLength - 1; index++) {
                    const letter = wordArray[index];
                    
                    if (0 > Y - index > safeView) {
                        tempSafe = false;
                        console.log("Out of bounds!");
                        break;
                    };

                    if (
                        crosswordData.grid[Y - index] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined Y grid cell!");
                        break;
                    }

                    if (
                        crosswordData.grid[Y - index][X] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined X grid cell!");
                        break;
                    }

                    const cell = crosswordData.grid[Y - index][X];

                    if (
                        cell !== letter &&
                        cell !== ""
                    ) {
                        tempSafe = false;
                        console.log("Word seems to exist there already!");
                        break;
                    }

                    continue;
                }

                break;
            case "down":

                for (let index = 0; index < wordLength - 1; index++) {
                    const letter = wordArray[index];
                    
                    if (0 > Y + index > safeView) {
                        tempSafe = false;
                        console.log("Out of bounds!");
                        break;
                    };

                    if (
                        crosswordData.grid[Y + index] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined Y grid cell!");
                        break;
                    }

                    if (
                        crosswordData.grid[Y + index][X] === undefined
                    ) {
                        tempSafe = false;
                        console.log("Undefined X grid cell!");
                        break;
                    }

                    const cell = crosswordData.grid[Y + index][X];

                    if (
                        cell !== letter &&
                        cell !== ""
                    ) {
                        tempSafe = false;
                        console.log("Word seems to exist there already!");
                        break;
                    }

                    continue;
                }

                break;
        }

        console.log(tempSafe);

        if (tempSafe === true) {
            safe = tempSafe;
            break;
        }
    }

    return safe;
  }

  // -- Third Function/Step
  async function placeWords() {
    const largestIndex =
      crosswordData.longestWordLength + crosswordData.padding;

    wordLoop: for (key in crosswordData.wordData) {
      const wordObject = crosswordData.wordData[key];

      console.log(wordObject);
      console.log(crosswordData.wordData);

      const wordText = wordObject.word;
      const wordLength = wordObject.wordLength;

      async function generateCoordinates() {
        return {
          Y: await Math.floor(Math.random() * largestIndex),
          X: await Math.floor(Math.random() * largestIndex),
        };
      }

      let coordinates = await generateCoordinates();

      let direction = directions[Math.floor(Math.random() * 4)];

     const isSafe = await checkSafe(
         coordinates,
         wordText,
         direction
     );

     if (!isSafe)
        continue;

      const letters = wordText.split("");
      const coordX = coordinates.X;
      const coordY = coordinates.Y;
    
      switch (direction) {
        case "left":
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            try {
                crosswordData.grid[coordY][coordX - i] = letter;
            } catch (err) {
                location.reload();
            }
          }
          break;
        case "right":
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            console.log(letters, crosswordData.longestWordLength + crosswordData.padding, coordX + i, coordY, "Y", crosswordData);
            try {
                crosswordData.grid[coordY][coordX + i] = letter;
            } catch (err) {
                location.reload();
            }
          }
          break;
        case "up":
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            console.log(letters, crosswordData.longestWordLength + crosswordData.padding, coordY, i, coordX, "X", crosswordData);
            try {
                crosswordData.grid[coordY - i][coordX] = letter;
            } catch (err) {
                location.reload();
            }
          }
          break;
        case "down":
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            console.log(letters, crosswordData.longestWordLength + crosswordData.padding, coordY, i, coordX, "X", crosswordData);
            try {
                crosswordData.grid[coordY + i][coordX] = letter;
            } catch (err) {
                location.reload();
            }
          }
          break;
        default:
          break;
      }
    }
    
    console.log("drawing", crosswordData)
    generate();
  }

  function generate() {
    const wrapper = document.createElement("ws-wrapper");

    crosswordData.grid.forEach((row) => {
      const rowEl = document.createElement("ws-row");

      row.forEach((cell) => {
        const cellEl = document.createElement("ws-cell");
        cellEl.style.color = cell && `rgb(255, 0, 0)`;
        cellEl.innerText = cell
          ? cell.toUpperCase()
          : characters[Math.floor(Math.random() * characters.length)];

        rowEl.appendChild(cellEl);
      });

      wrapper.appendChild(rowEl);
    });

    document.querySelector("body").appendChild(wrapper);
  }

  // - Debugging Function
  function debugObject() {
    function output(inp) {
      document.body.appendChild(document.createElement("pre")).innerHTML = inp;
    }

    function syntaxHighlight(json) {
      json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          var cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return '<span class="' + cls + '">' + match + "</span>";
        }
      );
    }

    const obj = {
      a: 1,
      b: "foo",
      c: [false, "false", null, "null", { d: { e: 1.3e5, f: "1.3e5" } }],
    };
    const str = JSON.stringify(crosswordData, undefined, 4);

    output(syntaxHighlight(str));
  }

  processWords();
})();
