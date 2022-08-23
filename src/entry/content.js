console.log("content");
const FORM_REGEX=/https:\/\/docs.google.com\/forms/;
chrome.runtime.onConnect.addListener((port)=>{
    if (port.name === "fillTheFormNow") {
        port.onMessage.addListener(function(msg) {
            console.log(msg);
            if(msg.message==="fillForm" && FORM_REGEX.test(location.href)){
                replaceText(msg.data);
            }
        });
    }
});

function replaceText(data){
    let valToCheck=document.getElementsByClassName('M7eMe');
    let idSpanArray=new Array();
    let spanArrayText=new Array();
    let divsToBeChanged;
    Array.from(valToCheck).forEach(element => {
        if(element.tagName === 'SPAN'){
            spanArrayText.push(element.textContent);
            idSpanArray.push(element.parentNode.id);
        }
    });
    let allInputTags=document.getElementsByTagName('input');
    let allTextareas=document.getElementsByTagName('textarea');
    let allInputsForReplacement=new Array();
    Array.from(allInputTags).forEach(element =>{
        if(element.hasAttribute("class")){
            allInputsForReplacement.push(element);
        }
    });
    if(allInputsForReplacement.length!==0){
        divsToBeChanged=document.getElementsByClassName("OabDMe cXrdqd");
    }
    data.forEach(element => {
        if(spanArrayText.includes(element.objectKey)){
            console.log(spanArrayText);
            let idTofill=idSpanArray[spanArrayText.indexOf(element.objectKey)];
            fillTextGFORM(idTofill,element,allInputsForReplacement,allTextareas,divsToBeChanged);
        }
    });
}
function fillTextGFORM(idToFill,dataElement,allInputsForReplacement,allTextareas,divsToBeChanged){
    console.log("filing");
    allInputsForReplacement.forEach(element =>{
        if(element.getAttribute("aria-labelledby")===idToFill){
            element.value=dataElement.objectValue;
            element.setAttribute("data-initial-value",dataElement.objectValue);
            element.setAttribute("badinput",false);
            element.parentNode.parentNode.parentNode.parentNode.classList.add("CDELXb");
        }
        Array.from(divsToBeChanged).forEach(element=>{
            element.classList.add("Y2Zypf");
            element.setAttribute("style","transform-origin: 0px center;");
        })
    });
    Array.from(allTextareas).forEach(element =>{
        if(element.getAttribute("aria-labelledby")===idToFill){
            element.value=dataElement.objectValue;
            element.setAttribute("data-initial-value",dataElement.objectValue);
            element.setAttribute("badinput",false);
            element.parentNode.parentNode.parentNode.classList.add("CDELXb");
        }
    });
}