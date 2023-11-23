<template>
    <div class="Compromissos">
        <h1>Compromissos!</h1>
        <label for="nome"> Nome: </label>
        <input id="nome" type="text" v-model="nome"/><br>
        <label for="dataHora"> dataHora: </label>
        <input id="dataHora" type="datetime" v-model="dataHora"/><br>
        <label for="duracaoPrevista"> Duracão Prevista: </label>
        <input id="duracaoPrevista" type="number" v-model="duracaoPrevista"/><br>
        <label for="cep"> cep: </label>
        <input id="cep" type="number" v-model="cep"/><br>
        <label for="numero"> numero: </label>
        <input id="numero" type="number" v-model="numero"/><br>
        <button @click="cadastrar"> Cadastrar </button>
        <button @click="filtrar"> Filtrar</button>

        <table>
            <thead>
                <td>id</td>
                <td>nome</td>
                <td>dataHora</td>
                <td>tipo</td>
            </thead>
            <tr v-for="compromisso in compromissos" :key="compromisso.id">
                <td>{{ compromisso.id }}</td>
                <td>{{ compromisso.nome }}</td>
                <td>{{ compromisso.dataHora }}</td>
                <td>{{ compromisso.cep ? 'presencial' : 'online' }}</td>
            </tr>
            <p v-if="compromissos && compromissos.length < 1">Nenhum registro foi encontrado para os critérios
fornecidos</p>
        </table>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from 'axios';

const compromissos = ref();
const nome = ref();
const dataHora = ref();
const duracaoPrevista = ref();
const cep = ref();
const numero = ref();


async function atualizar() {
    compromissos.value = (await axios.get("compromisso/getAll")).data;
}

async function cadastrar() {
   await axios.post("compromisso/criar",
    {
        nome: nome.value,
        dataHora: dataHora.value,
        duracaoPrevista:  duracaoPrevista.value,
        cep: cep.value,
        numero:  numero.value,
        });
        nome.value = '';
        dataHora.value = '';
        duracaoPrevista.value = '';
        cep.value = '';
        numero.value = '';
    atualizar();
}

async function filtrar() {
    compromissos.value = (await axios.get(`compromisso?nome=${nome.value}&dataHora=${dataHora.value}`)).data;
}
// atividades.value = (await axios.get(`compromisso/${nome.value}/${dataHora.value}`)).data;
onMounted(() => {
    atualizar();
    
});
</script>