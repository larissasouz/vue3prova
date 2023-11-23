<template>
    <div class="Gatividades">
        <h1>Atividades!</h1>
        <label for="enunciado"> Enunciado: </label>
        <input id="enunciado" type="text" v-model="enunciado"/><br>
        <label for="dataHoraCadastro"> data-HoraCadastro: </label>
        <input id="dataHoraCadastro" type="datetime" v-model="dataHoraCadastro"/><br>
        <label for="dataHoraLimite"> data-HoraLimite: </label>
        <input id="dataHoraLimite" type="datetime" v-model="dataHoraLimite"/><br>
        <label for="peso"> peso: </label>
        <input id="peso" type="number" v-model="peso"/><br>
        <label for="observacoes"> observacoes: </label>
        <input id="observacoes" type="text" v-model="observacoes"/>
        <button @click="cadastrar"> Cadastrar </button>
        <button @click="filtrar"> Buscar dataHoraLimite</button>

        <table>
            <thead>
                <td>id</td>
                <td>enunciado</td>
                <td>data-HoraCadastro</td>
                <td>data-HoraLimite</td>
                <td>peso</td>
                <td>observacoes</td>
            </thead>
            <tr v-for="atividade in atividades" :key="atividade.id">
                <td>{{ atividade.id }}</td>
                <td>{{ atividade.enunciado }}</td>
                <td>{{ atividade.dataHoraCadastro }}</td>
                <td>{{ atividade.dataHoraLimite }}</td>
                <td>{{ atividade.peso }}</td>
                <td>{{ atividade.observacoes }}</td>
            </tr>
            <p v-if="atividades && atividades.length < 1">Nenhuma atividade foi encontrada para os critérios
fornecidos</p>
        </table>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from 'axios';

const atividades = ref();
const enunciado = ref();
const dataHoraCadastro = ref();
const dataHoraLimite = ref();
const peso = ref();
const observacoes = ref();

async function atualizar() {
    atividades.value = (await axios.get("atividade")).data;
}

async function cadastrar() {
   await axios.post("atividade",
    {
        enunciado: enunciado.value,
        dataHoraCadastro: dataHoraCadastro.value,
        dataHoraLimite:  dataHoraLimite.value,
        peso: peso.value,
        observacoes:  observacoes.value
        });
        enunciado.value = '';
        dataHoraCadastro.value = '';
        dataHoraLimite.value = '';
        peso.value = '';
        observacoes.value = '';
    atualizar();
}

async function filtrar() {
  atividades.value = (await axios.get(`atividade/${dataHoraLimite.value}`)).data;
}
// atividades.value = (await axios.get(`vocabulo/${enunciado.value}/${versao.value}`)).data;
onMounted(() => {
    atualizar();
});
</script>