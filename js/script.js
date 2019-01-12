
function main() {
	//get string data on input textarea
	const inputCode = document.querySelector("#input").value;
  //To List
	let lineList = inputCode.split('\n');
  
  //Quality ratio :Type => number
  const qualityRatio = AnalyzeQuality(lineList);
  
  //Compute beautified code :Type => string
  const beautifulCode = BeautifyCode(lineList);
  
  //Apply code color scheme :Type => textContent
  // !Optical
  //beautifulCode = ApplyColorScheme(beautifulCode);
  
  
  //Output results into HTML
  //Code output
  let outputCode = document.querySelector("#output");
  outputCode.value = beautifulCode;
  
  //Evaluate output
}

/**
 * Analyzing Code Quality
 * @param lineList {string} Unkode list , splited by \n.
 * @return quality {number} Code quality ratio [0 - 1.0].
 */
function analyzeQuality(lineList) {
	let tabSize = 0;
  let bracketCnt = 0;
  
	for (let li = 0; li < lineList.length; li++) {
  	
  }
}

function applyScheme(code) {
	
}