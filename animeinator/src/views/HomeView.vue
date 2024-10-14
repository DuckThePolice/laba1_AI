<script setup lang="ts">
import axios from "axios";
import { ref, useTemplateRef } from "vue";
let tree:any;
let bridge:number[] = [];
let curId = 0;
let prevId = [0,false];
let textplace = ref("text");
let visible = ref(false);
let input_text:string =""
let input_question:string="" 
let componentkey = ref(0);
try {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:8080/`,
        });
        console.log(response.data);
        tree = response.data;
        tree.forEach((node: { [x: string]: number; }) => {
          bridge.push(node['id'])
        });
        let temp = bridge.indexOf(tree[curId]['id']);
        textplace.value = tree[temp]['text'];
        prevId = [curId,false];
        curId = tree[temp]['id']
        // textplace.value = tree[curId]['text']
      } catch (e) {
        console.log(e);
      }
      
async function NewEntry()
{
  if(input_text==undefined||input_question==undefined)
{
  alert("Заполните оба поля")
  return
}
let idOfNewAnime;
let idOfNewQuestion;
try{
  const response = await axios({
          method: 'POST',
          url: `http://localhost:8080/create`,
          data:{
            yes_root:null,
            no_root:null,
            text:input_text,
            final:true,
          }
        });
  idOfNewAnime=response.data['id']
}
catch (e) {
        console.log(e);
      }
try{
  const response = await axios({
          method: 'POST',
          url: `http://localhost:8080/create`,
          data:{
            yes_root:idOfNewAnime,
            no_root:curId,
            text:input_question,
            final:false,
          }
        });
        idOfNewQuestion = response.data['id']
}catch (e) {
        console.log(e);
      }
try {
  if(prevId[1])
{
  const response = await axios({
    method:'PATCH',
    url:`http://localhost:8080/update`,
    data:{
      id:prevId[0],
      yes_root:idOfNewQuestion
    }
  })
}
else 
{
  const response = await axios({
    method:'PATCH',
    url:`http://localhost:8080/update`,
    data:{
      id:prevId[0],
      no_root:idOfNewQuestion
    }
  })
}
  const response = await axios({
    method:'PATCH',
    url:`http://localhost:8080/update`,
    data:{
      id:prevId
    }
  })
}catch (e) {
        console.log(e);
      }
    alert("Новое аниме занесено в базу")
    location.reload()
}

function NextEntry(root:boolean)
{
  
  let temp = bridge.indexOf(curId);
  if(!tree[temp]['final'])
{
  prevId = [curId,root];
  if(root)
    curId = tree[temp]['yes_root']
  else
  curId = tree[temp]['no_root']
  temp = bridge.indexOf(curId)
  let newString = tree[temp]['text'];
  newString+='\n'
  newString+=textplace.value;
  textplace.value = newString;
  
}
 else
 {
  let newString
  if (root)
    {
      newString = "Круто, я отгадал";
    }
    else
    {
      newString = "Печально, а что вы загадали?"
      visible.value=true;
    }
    newString+='\n'
  newString+=textplace.value;
  textplace.value = newString;
 }
 


}

</script>

<template>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Animeinator</title>
</head>

<body>
    <div class="container">
        <div id="log" style="padding-right: 500px">
          <!-- <span v-text="textplace" ></span>  -->
          <p @change="">{{textplace}}</p>
        </div>
        <div id="main" >
            <div id="questions" v-show="!visible">
                <button @click=NextEntry(true)>Да</button>
                <button @click=NextEntry(false)>Нет</button></div>
            </div>
            <div v-show="visible">
              <p style="margin-top: 20px;">Введите то, что вы загадали сюда:</p>
              <input v-model="input_text" type="text">
              <p style="margin-top: 20px;">А сюда введите наводящий на это вопрос</p>
              <input v-model="input_question" type="text">
              <button @click="NewEntry()">Добавить новое аниме в базу</button>
            </div>
            
    </div>
</body>
</template>
<style lang="css" scoped>
.container {
    font-size: larger;

    background-color: rgb(4, 90, 63);
    display: flex;
    justify-content:stretch;
    padding: 1em;
    box-sizing: border-box;

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: auto;
  }
  
  .container div {
    width: 5em;
    height: 2em;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
