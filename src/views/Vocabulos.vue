<template>
    <div class="Gvocabulos">
        <h1>Vocabulos!</h1>
        <label for="termo"> Termo: </label>
        <input id="termo" type="text" v-model="termo"/>
        <label for="significado"> Significado: </label>
        <input id="significado" type="text" v-model="significado"/>
        <label for="versao"> Versao: </label>
        <input id="versao" type="number" v-model="versao"/>
        <button @click="cadastrar"> Cadastrar </button>
        <button @click="filtrar"> Buscar termo e versão</button>

        <table>
            <thead>
                <td>id</td>
                <td>termo</td>
                <td>significado</td>
                <td>versão</td>
            </thead>
            <tr v-for="vocabulo in vocabulos" :key="vocabulo.id">
                <td>{{ vocabulo.id }}</td>
                <td>{{ vocabulo.termo }}</td>
                <td>{{ vocabulo.significado }}</td>
                <td>{{ vocabulo.versao }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from 'axios';

const vocabulos = ref();
const termo = ref();
const significado = ref();
const versao = ref();

async function atualizar() {
    vocabulos.value = (await axios.get("vocabulo")).data;
}

async function cadastrar() {
   await axios.post("vocabulo",
    {
        termo: termo.value,
        significado: significado.value,
        versao: versao.value
        });
        termo.value = '';
        significado.value = '';
        versao.value = '';
    atualizar();
}

async function filtrar() {
  const results = (await axios.get(`vocabulo/${termo.value}/${versao.value}`)).data;
  if (results.length == '') {
    vocabulos.value = "Nenhum vocábulo foi encontrado para os critérios fornecidos";
  } else {
    vocabulos.value = results;
  }
}

onMounted(() => {
    atualizar();
});
</script>