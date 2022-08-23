import {defineStore} from 'pinia';
const axios=require("axios");

export const userInfo=defineStore({
    id:'user',
    state:()=>({
        dataFromServer:new Array()
    }),
    getters:{
        getData:(state)=>state.dataFromServer
    },
    actions:{
        async getDataFromServer(){
            const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
            const headers = {
                "content-type": "application/json",
                "x-hasura-admin-secret": process.env.VUE_APP_HASURA_ADMIN_KEY
            };
            const graphqlQuery = {
                "operationName": "getData",
                "query": `query getData {
                    Information {
                      objectKey
                      objectNumber
                      objectValue
                    }
                  }
                  `,
                "variables": {}
            };
            
            const response =await axios({
              url: endpoint,
              method: 'post',
              headers: headers,
              data: graphqlQuery
            });
            this.dataFromServer=response.data.data.Information;
        },
        async deleteObjectWithKey(id){
            const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
            const headers = {
                "content-type": "application/json",
                "x-hasura-admin-secret": process.env.VUE_APP_HASURA_ADMIN_KEY
            };
            const graphqlQuery = {
                "operationName": "deleteInfo",
                "query": `mutation deleteInfo($id:uuid) {
                    delete_Information(where: {objectNumber: {_eq: $id}}) {
                      affected_rows
                    }
                  }
                  `,
                "variables": {
                    "id":id
                }
            };
            
            await axios({
              url: endpoint,
              method: 'post',
              headers: headers,
              data: graphqlQuery
            });
            this.getDataFromServer();
        },
        async updateDataWithId(id,key,value){
          const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
            const headers = {
                "content-type": "application/json",
                "x-hasura-admin-secret": process.env.VUE_APP_HASURA_ADMIN_KEY
            };
            const graphqlQuery = {
                "operationName": "updateInfo",
                "query": `mutation updateInfo($id: uuid, $key: String, $value: String) {
                  update_Information(where: {objectNumber: {_eq: $id}}, _set: {objectKey: $key, objectValue: $value}) {
                    affected_rows
                  }
                }
                  `,
                "variables": {
                    "id":id,
                    "key":key,
                    "value":value
                }
            };
            
            await axios({
              url: endpoint,
              method: 'post',
              headers: headers,
              data: graphqlQuery
            });
            this.getDataFromServer();
        },
        async addDataInServer(key,value){
          const endpoint = "https://fair-squirrel-48.hasura.app/v1/graphql";
            const headers = {
                "content-type": "application/json",
                "x-hasura-admin-secret": process.env.VUE_APP_HASURA_ADMIN_KEY
            };
            const graphqlQuery = {
                "operationName": "addInfo",
                "query": `mutation addInfo($key: String, $value: String) {
                  insert_Information(objects: {objectKey: $key, objectValue: $value}) {
                    affected_rows
                  }
                }
                  `,
                "variables": {
                    "key":key,
                    "value":value
                }
            };
            
            await axios({
              url: endpoint,
              method: 'post',
              headers: headers,
              data: graphqlQuery
            });
            this.getDataFromServer();
        }
    }
})