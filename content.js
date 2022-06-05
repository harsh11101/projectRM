// chrome.runtime.onMessage.addListener(gotMessage(message,sender,sendResponse));
// function gotMessage(message,sender,sendResponse){
//     console.log("I'm in");
//     switch (message.tis) {
//         case "replaceText":
//             replaceText();
//             break;
    
//         default:
//             console.log("Not Correct Call");
//             break;
//     }
// }
// let checkingRegExp={
    //     GForm_Regex:new RegExp("docs.google.com/forms")
    // }
    


async function getData(){
    const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": "<admin-key>"
    };
    const values = {
        "operationName": "getvalues",
        "query": `query getvalues{
                    Information {
                        objectKey
                        objectValue
                    }
                }`,
        "variables": {}
    };

    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(values)
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();
    const array=data.data.Information;
    console.log(array);
    replaceText(array)
};
function replaceText(data){
    //console.log(message.txt);
let valToCheck=document.getElementsByClassName('G4EHhc');
let idSpanArray=[];
let spanArrayText=[];
let divsToBeChanged;
Array.from(valToCheck).forEach(element => {
    if(element.tagName === 'SPAN'){
        spanArrayText.push(element.textContent);
        idSpanArray.push(element.parentNode.id);
    }
});
let allInputstemp=document.getElementsByTagName('input');
let allTextareas=document.getElementsByTagName('textarea');
let allInputs=[];
Array.from(allInputstemp).forEach(element =>{
    if(element.className==="whsOnd zHQkBf"){
        allInputs.push(element);
    }
});
if(allInputs.length!==0){
    divsToBeChanged=document.getElementsByClassName("OabDMe cXrdqd");
}
data.forEach(element => {
    if(spanArrayText.includes(element.objectKey)){
        let idTofill=idSpanArray[spanArrayText.indexOf(element.objectKey)];
        fillTextGFORM(idTofill,element);
    }
});

function fillTextGFORM(idToFill,dataElement){
    allInputs.forEach(element =>{
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
}
window.onload=getData();

// let allInputs=document.getElementsByTagName('input');
// var arr=[];
// function other(){
//     let allLabels=document.getElementsByTagName('label');
//     // console.log(allLabels);
//     // console.log(allInputs);
//     Array.from(allLabels).forEach(element =>{
//         // console.log(element.textContent);
//         data.forEach(dataElements =>{
//             if(element.textContent===dataElements.objectKey){
//                 arr.push(element);
//                 fillText(dataElements.objectValue,element.getAttribute('for'),element);
//             }
//         })
//     });
// }
// function fillText(value,labelFor,labelTag){
//     Array.from(allInputs).forEach(element=>{
//         // console.log(element);
//         if(labelFor!==null && element.getAttribute('id')!==null){    
//             if(element.getAttribute('id').includes(labelFor) || labelFor.includes(element.getAttribute('id'))){
//                 element.innerText=value;
//             }
//         }
//         else if(labelFor===null && element.getAttribute('id')!==null){
//             if(element.getAttribute('id').includes(labelTag.textContent)){
//                 element.innerText=value;
//             }
//         }
//         // console.log(element.getAttribute('id'));
//     })
// }
// other();
