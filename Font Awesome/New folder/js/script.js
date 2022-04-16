const output = document.getElementById('output'),
      input = document.getElementById('zipInput'),
      waiting = document.getElementById('waiting'),
      maxOutput = 20;
let postcodes,
    temp,
    checkId = [],
    maxCount = 0,
    longitude = '',
    latitude = '',
    deleteEvntStatus = false;
input.addEventListener('input', searchDriver);



// Getting data from json file
getData();
function getData() {
    waitingMsg();
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data/postcode.json', true);
    xhr.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            postcodes = JSON.parse(this.responseText);
            output.innerHTML = '';
            waiting.innerHTML = '';
        }
    }
    xhr.send();
}


// calling different functions for different input
function searchDriver(e) {
    e.preventDefault();
    deleteEvntStatus = false;
    temp = input.value.trim().toLowerCase();
    maxCount = 0;
    let inputValue = input.value.trim();
    let enDigit = /[0-9]/g;
    let bnDigit = /[১-৯]/g;
    let enAlpha = /[A-Za-z]/g;
    let bnAlpha = /[\u0995-\u09B9\u09CE\u09DC-\u09DF\u0985-\u0994\u09BE-\u09CC\u09D7\u09BC]/g;
    
    if (inputValue.search(enDigit) != -1 && 
        inputValue.search(bnDigit) == -1 && 
        inputValue.search(enAlpha) == -1 && 
        inputValue.search(bnAlpha) == -1) {
        getFromEnDgit();
    } else if (inputValue.search(enDigit) == -1 && 
               inputValue.search(bnDigit) != -1 && 
               inputValue.search(enAlpha) == -1 && 
               inputValue.search(bnAlpha) == -1) {
        getFromBnDigit();
    } else if (inputValue.search(enDigit) == -1 && 
               inputValue.search(bnDigit) == -1 && 
               inputValue.search(enAlpha) != -1 && 
               inputValue.search(bnAlpha) == -1) {
        getFromAlpha('en');
    } else if (inputValue.search(enDigit) == -1 && 
               inputValue.search(bnDigit) == -1 && 
               inputValue.search(enAlpha) == -1 && 
               inputValue.search(bnAlpha) != -1) {
        getFromAlpha('bn');
    } else if (input.value !== '') {
        showError("আপনার প্রদত্ত ইনপুট সঠিক নয়।<br> দয়া করে আবার চেষ্টা করুন।", 'wrong-input');
    } else {
        output.innerHTML = '';
    }
    
    
}





function getFromEnDgit(){
    output.innerHTML = '';
    waitingMsg();
    let temp = input.value.trim();
    Object.keys(postcodes).forEach((k, v) => {
        let tempK = k.trim();
        if (tempK.search(temp) > -1 && maxCount < maxOutput) {
            waiting.innerHTML = '';
            showData(k);
            maxCount ++;
        } 
    });
    addEventLis();
}

function getFromBnDigit(){
    output.innerHTML = '';
    waitingMsg();
    let temp = input.value.trim();
    Object.keys(postcodes).forEach((k, v) => {
        let tempK = postcodes[k]['bn']['postcode'].trim();
        if (tempK.search(temp) > -1 && maxCount < maxOutput) {
            waiting.innerHTML = '';
            showData(k);
            maxCount ++;
        } 
    });
    addEventLis();
}

function getFromAlpha(lang){
    output.innerHTML = '';
    waitingMsg();
    maxCount = 0;
    for (let i = 0; i < 10000; ++i) checkId[i] = false;
    
    maxCount = getFromAlphaMini(lang, 'suboffice', maxCount);
    if (maxCount < maxOutput) maxCount = getFromAlphaMini(lang, 'thana', maxCount);
    if (maxCount < maxOutput) maxCount = getFromAlphaMini(lang, 'district', maxCount);
    if (maxCount < maxOutput) maxCount = getFromAlphaMini(lang, 'division', maxCount);
    addEventLis();
}


function showError(msg, clss){
    waiting.innerHTML = '';
    let errOutput = `
        <div class="${clss}">${msg}</div>
    `;
    output.innerHTML = errOutput;
}

function showData(id) {
    let msg = `
        <div class="message"> 
            <div class="message-header">
                <div><h2>Location Info</h2></div>
                <div class="closeBtn">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="message-body">
                <div class="message-en">
                    <ul>
                        <li>
                            <strong>Division: </strong> 
                            ${postcodes[id]['en']['division']}
                        </li>
                        <li>
                            <strong>District: </strong> 
                            ${postcodes[id]['en']['district']}
                        </li>
                        <li>
                            <strong>Thana: </strong> 
                            ${postcodes[id]['en']['thana']}
                        </li>
                        <li>
                            <strong>Sub Office: </strong> 
                            ${postcodes[id]['en']['suboffice']}
                        </li>
                        <li>
                            <strong>Postcode: </strong> 
                            ${postcodes[id]['en']['postcode']}
                        </li>

                    </ul>
                </div>
                <div class="message-bn">
                    <ul>
                        <li>
                            <strong>বিভাগ: </strong> 
                            ${postcodes[id]['bn']['division']}
                        </li>
                        <li>
                            <strong>জেলা: </strong> 
                            ${postcodes[id]['bn']['district']}
                        </li>
                        <li>
                            <strong>থানা: </strong> 
                            ${postcodes[id]['bn']['thana']}
                        </li>
                        <li>
                            <strong>উপ কার্যালয়: </strong> 
                            ${postcodes[id]['bn']['suboffice']}
                        </li>
                        <li>
                            <strong>পোস্টকোড: </strong> 
                            ${postcodes[id]['bn']['postcode']}
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    `;
    output.innerHTML += msg;
}


function getFromAlphaMini(lang, searchItem, maxCount) {
    Object.keys(postcodes).forEach((k, v) => {
        let tempK = postcodes[k][lang][searchItem].trim().toLowerCase();
        let keyInt = parseInt(k.trim());
        if (tempK.search(temp) > -1 && maxCount < maxOutput && checkId[keyInt] === false) {
            waiting.innerHTML = '';
            showData(k);
            maxCount ++;
            checkId[keyInt] = true;
        } 
    });
    return maxCount;
}

function addEventLis() {
    if (deleteEvntStatus === false) {
        let closeBtns = document.getElementsByClassName('closeBtn');
        if (closeBtns.length == 0){
            showError("আপনার প্রদত্ত ইনপুটের সাথে সম্পর্কিত তথ্য পাওয়া যায় নি।", 'not-found');
        }
        console.log(closeBtns.length);
        for (let i = 0; i < closeBtns.length; ++i) {
            closeBtns[i].addEventListener('click', removeMsg);
        }
    }
    deleteEvntStatus = true;
}

function removeMsg(e) {
    if (e.target.classList.contains('closeBtn')) e.target.parentElement.parentElement.remove();
    if (e.target.classList.contains('fa-times')) e.target.parentElement.parentElement.parentElement.remove();
}

function waitingMsg() {
    waiting.innerHTML = '<div class="waiting-div">দয়া করে অপেক্ষা করুন <i class="fa fa-spinner fa-pulse"></i></div>';
}
