<template>
  <div class="container">
    <h2>Your Data</h2>
    <div class="snippets">
      <user-data></user-data>
    </div>
    <div class="add-new-data">
      <h3>Add new value:</h3>
      <div class="form-to-add">
        <form v-on:submit.prevent class="add-new-form">
          <input type="text" placeholder="Enter key" v-model="key_add" class="input-data" id="input-key" required>
          <input type="text" placeholder="Enter value" v-model="value_add" class="input-data" id="input-value" required>
          <button type="submit" @click="addData(key_add,value_add)" id="add-btn">
            <fa icon="fa-solid fa-circle-plus" />
          </button>
        </form>
      </div>
    </div>
    <div class="action-buttons bottom-most">
      <button class="action" @click="fillForm()">Replace</button>
      <button class="action" @click="deleteAll()">Delete All</button>
    </div>
  </div>
</template>

<script setup>
import userData from './components/userData.vue';
  import { userInfo } from './store/store.js';
  const infoStore=userInfo();
  let key_add;
  let value_add;
  function addData(key,value){
      infoStore.addDataInServer(key,value);
      key_add="";
      value_add="";
  }
  function deleteAll(){
    if(infoStore.dataFromServer.length===0){
      return;
    }
    let dataToDelete=infoStore.dataFromServer;
    dataToDelete.forEach((ele)=>{
      infoStore.deleteObjectWithKey(ele.objectNumber);
    })
  }
  function fillForm(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      let port=chrome.tabs.connect(tabs[0].id,{name:"fillTheFormNow"});
      port.postMessage({message:"fillForm",data:infoStore.dataFromServer})
    });

  }
</script>

<style>
.container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
  color:black;
  margin: 10px 10px 10px 10px;
  padding:10px 10px 10px 10px;
  width: 400px;
}
.add-new-data{
  text-align: left;
}
.add-new-form{
  display: flex;
  justify-content: space-between;
}
.input-data{
  margin:0px 3px 3px 3px;
  border-radius: 10px;
  padding:4px 4px 4px 4px;
}
#input-key{
  background-color: #2cd3ac;
}
#input-value{
  background-color: #d29df4;
}
#add-btn{
  border-radius: 100px;
  background-color: #9cfff2;
}
.action{
  margin:3px 10px 3px 3px;
  border-radius: 10px;
  padding:4px 4px 4px 4px;
  background-color: #9cfff2;
}
</style>
