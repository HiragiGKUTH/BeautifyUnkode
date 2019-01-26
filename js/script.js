let tabSize = 4;

function changeTabSize() {
	const tabSizeNode = document.querySelector("#tabSize");
	tabSize = tabSizeNode.value;
}

function loadFile() {
	const reader = new FileReader();

}


function main() {
	//get texts on Textarea as a List
	const lineList = document.querySelector("#input").value.split('\n');
  //tabSize = 4;

  //Quality ratio :Type => number
  const qualityRatio = AnalyzeQuality(lineList, tabSize);

  //Compute beautified code :Type => string
  const beautifulCode = BeautifyCode(lineList, tabSize);

  //Output results into HTML
  //Code output
  let outputCode = document.querySelector("#output");
  outputCode.value = beautifulCode;

  //Evaluate output
	let outputQualityRatio = document.querySelector("#qualityRatio");
	outputQualityRatio.textContent = qualityRatio*100;
}

/**
 * Analyzing Code Quality
 * @param lineList {string} Unkode list, splited by \n.
 * @return {number} Code quality ratio [0 - 1.0].
 */
function AnalyzeQuality(lineList, tabSize) {
  let bracketDepth = 0;
  let correctLine = 0;
  const lineSize = lineList.length;

  const SpaceCounter = (str) => {
    let cnt = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        cnt++;
      } else {
        return cnt;
      }
    }
    return 0;
  }

	for (let li = 0; li < lineList.length; li++) {
    const line = lineList[li];
    let prevLine = lineList[li==0 ? 0 : li-1];
		bracketDepth = getNextBracketDepthHelper(line, prevLine, bracketDepth);

		if (SpaceCounter(line) === bracketDepth*tabSize) {
      correctLine++;
    }
  }
  return correctLine / lineSize;
}

/**
 * Beautify Unkode
 * @param {Array} lineList Unkode list, splited by \n
 * @returns {string} Beautiful Code
 */
function BeautifyCode(lineList, tabSize) {
  let bracketDepth = 0;
  /* result */
  let beautyCode = "";

  /* insert num spaces function */
  const InsSpace = (str, num) => {
    let spaces = "";
    for (let i = 0; i < num; i++) {
      spaces+=" ";
    }
    return spaces + str;
  }

  for (let li = 0; li < lineList.length; li++) {
    const line = lineList[li].trim();
    const prevLine = lineList[li==0 ? 0 : li-1].trim();

		bracketDepth = getNextBracketDepthHelper(line, prevLine, bracketDepth);

    /* push to result */
    beautyCode += InsSpace(line, tabSize * bracketDepth) + "\n";
  }
  return beautyCode;
}

function getNextBracketDepthHelper(line, prevLine, nowDepth) {
	let nextDepth = nowDepth;
	/* bracket detection */
	//add indentation to the next line of the open bracket, so I use previous line data.
	if (prevLine.indexOf("{") !== -1 && line !== prevLine) {
		nextDepth++;
	}
	if (line.indexOf("}") !== -1) {
		nextDepth--;
	}
	return nextDepth;
}
