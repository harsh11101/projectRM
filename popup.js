let addbtn=document.getElementById('addButton');
let donebtn=document.getElementById('doneButton');
let backbtn=document.getElementById('backButton');
let deletebtn=document.getElementById('deleteButton');
let donedelete=document.getElementById('donedelete');
let inputObjKey='';
let inputObjValue='';
let checkerAdd=0;
let checkerDelete=0;
window.onload = function() {
    showLoading();
    getData();
    addbtn.addEventListener("click",addValues,false);
    donebtn.addEventListener("click",mutateValues,false);
    backbtn.addEventListener("click",goBack,false);
    deletebtn.addEventListener("click",deleteValues,false);
    donedelete.addEventListener("click",deletethis,false);
}

async function getData(){
    const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": "pWD016uZJjGDoWAnciCSjZMjVZjUce3IS1vUmQX3hu2nY1SF9OxCIFGSfCV5VXpx"
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
    setPopUp(array);
};
function setPopUp(data){
    console.log('data: ',data);
    let divEle=document.createElement('div');
    divEle.setAttribute('id','popup');
    let container=document.getElementById('container');
    data.forEach(element=>{
        divEle.innerHTML+=`<div><span class="left objectKey">${element.objectKey}</span>--><span class="right objectValue">${element.objectValue}</span><span></span></div><br>`
    });
    console.log(divEle);
    container.innerHTML='';
    container.appendChild(divEle);
}
function addValues(){
    checkerAdd+=1;
    if(checkerAdd!==1){
        console.log("No");
    }
    else if(checkerAdd===1){
    addbtn.style.display="none";
    deletebtn.style.display="none";
    donedelete.style.display="none";
    donebtn.style.display="inline-block";
    backbtn.style.display="inline-block";
    let container=document.getElementById('container');
    container.innerHTML+=`<span><span class="inputHere" id="objectKey"><input class="input"></span><span class="inputHere" id="objectValue"><input class="input"></span></span>`
    }
}
function mutateValues(){
    checkerAdd=0;
    console.log("mutateValues");
    let inputKey=document.getElementById("objectKey").firstChild;
    let inputValue=document.getElementById("objectValue").firstChild;
    if(inputKey.value===''||inputValue.value===''){
        checkerAdd=1;
        console.log("Please add some value");
    }
    else{
        addbtn.style.display="inline-block";
        deletebtn.style.display="inline-block";
        donebtn.style.display="none";
        donedelete.style.display="none";
        backbtn.style.display="none";
        console.log(inputKey.value," ",inputValue.value)
        
        let check=addData(inputKey.value,inputValue.value);
        console.log(check);
        getData();
    }
}
async function addData(key,value){
    showLoading();
    console.log("addData");
    const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": "pWD016uZJjGDoWAnciCSjZMjVZjUce3IS1vUmQX3hu2nY1SF9OxCIFGSfCV5VXpx"
    };
    const values = {
        "operationName": "addvalues",
        "query": `mutation addvalues($key: String!, $value: String!) {
            insert_Information(objects: {objectKey: $key, objectValue: $value}) {
              affected_rows
            }
          }`,
        "variables": {
            "key":key,
            "value":value
          }
    };

    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(values)
    };
    const response = await fetch(endpoint, options);
    console.log(response);
    return response;
}
function showLoading(){
    document.getElementById('container').innerText="Loading...";
}
function goBack(){
    checkerAdd=0;
    checkerDelete=0;
    showLoading();
    getData();
    addbtn.style.display="inline-block";
    deletebtn.style.display="inline-block";
    donebtn.style.display="none";
    donedelete.style.display="none";
    backbtn.style.display="none";
}
function deleteValues(){
    checkerDelete+=1;
    if(checkerDelete!==1){
        console.log("No");
    }
    else if(checkerDelete===1){
    deletebtn.style.display="none";
    addbtn.style.display="none";
    donedelete.style.display="inline-block";
    donebtn.style.display="none";
    backbtn.style.display="inline-block";
    let container=document.getElementById('container');
    container.innerHTML+=`<span><div class="inputHere" id="objectKey"><input><div></span>`
    }
}
function deletethis(){
    checkerDelete=0;
    console.log("deleteThis");
    let inputKey=document.getElementById("objectKey").firstChild;
    if(inputKey.value===''){
        checkerDelete=1;
        console.log("Please add some value");
    }
    else{
        addbtn.style.display="inline-block";
        deletebtn.style.display="inline-block";
        donebtn.style.display="none";
        backbtn.style.display="none";
        donedelete.style.display="none";
        console.log(inputKey.value)
        
        let check=deleteData(inputKey.value);
        console.log(check);
        getData();
    }
}
async function deleteData(key){
    showLoading();
    const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": "pWD016uZJjGDoWAnciCSjZMjVZjUce3IS1vUmQX3hu2nY1SF9OxCIFGSfCV5VXpx"
    };
    const values = {
        "operationName": "deletevalues",
        "query": `mutation deletevalues($key: String!) {
            delete_Information(where: {objectKey: {_eq: $key}}) {
              affected_rows
              returning {
                objectKey
                objectNumber
                objectValue
              }
            }
          }`,
        "variables": {"key":key}
    };

    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(values)
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();
    console.log(data);
}