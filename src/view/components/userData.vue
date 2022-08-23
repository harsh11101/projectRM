<template>
    <div v-for="elements in infoStore.dataFromServer" :key="elements.objectNumber" class="ind-data" :id="elements.objectNumber">
        <div contenteditable="true" style="display: inline;" class="left data-holder data-key">{{elements.objectKey}}</div>
        <div contenteditable="true" style="display: inline;" class="middle data-holder data-value">{{elements.objectValue}}</div>
        <button @click="deleteThisObject(elements.objectNumber)" class="right data-holder delete-button"><fa icon="fa-solid fa-trash" /></button>
        <button @click="updateData(elements.objectNumber)" class="right data-holder update-button"><fa icon="fa-solid fa-pen-to-square" /></button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { userInfo } from '../store/store.js';
const infoStore=userInfo();
onMounted(()=>{
    infoStore.getDataFromServer();
})
function deleteThisObject(id){
    infoStore.deleteObjectWithKey(id);
}
function updateData(id){
    let divToBeEdited=document.getElementById(id);
    let childOfDiv=divToBeEdited.children;
    let key,value;
    Array.from(childOfDiv).forEach((div)=>{
        if(div.classList.contains("data-key")){
            key=div.innerHTML;
        }
        else if(div.classList.contains("data-value")){
            value=div.innerHTML;
        }
    });
    if(key && value){
        infoStore.updateDataWithId(id,key,value);
    }
}

</script>

<style scoped>
    .ind-data{
        margin: 3px 3px 3px 3px;
        display: flex;
        justify-content: space-between;
    }
    .data-holder{
        margin: 3px 3px 3px 3px;
        padding:4px 4px 4px 4px;
        border-width: 0.5px;
        border-style:solid;
        border-color: black;
        border-radius: 10px;
        width: 200px;
        text-align: left;
    }
    .left{
        background-color: #2cd3ac;
    }
    .right{
        width:30px;
        background-color: #9cfff2;
        text-align: center;
    }
    .middle{
        background-color: #d29df4;
    } 

</style>