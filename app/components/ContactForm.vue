<template>
  <form
    id="contact-form"
    class="relative bg-primary-color"
    @submit.prevent="submitForm"
  >
    <div id="contact-form-transition" class="absolute -top-12"></div>
    <div class="max-w-7xl mx-auto px-5 py-10 sm:p-10 md:p-20">
      <h3
        class="font-black text-lg sm:text-xl md:text-3xl text-center text-white"
      >
        RESERVE UM HORÁRIO
      </h3>

      <div class="mx-auto w-full md:w-1/2 text-base sm:text-lg">
        <div class="mb-2">
          <label for="loja" class="text-white font-roboto">LOJA:</label>
          <select
            class="w-full md:h-14"
            v-model="state.selectedStore"
            id="loja"
          >
            <option value="Drip 1">R. de Soares dos Reis 44</option>
            <option value="Drip 2">R. do Marquês de Sá da Bandeira 332</option>
          </select>
        </div>

        <div class="mb-2">
          <label for="servico" class="text-white font-roboto">SERVIÇO:</label>
          <input
            v-model="state.service"
            class="w-full md:h-14"
            type="text"
            id="servico"
            placeholder="Corte e Sobrancelha"
          />
        </div>

        <div class="mb-2">
          <label for="barbeiro" class="text-white font-roboto">BARBEIRO:</label>
          <input
            v-model="state.barber"
            class="w-full md:h-14"
            type="text"
            id="barbeiro"
            placeholder="João Silva"
          />
        </div>

        <div class="mb-2">
          <label for="dataHora" class="text-white font-roboto"
            >DATA E HORA:</label
          >
          <input
            class="w-full md:h-14"
            v-model="state.dateTime"
            type="datetime-local"
            id="dataHora"
          />
        </div>

        <div class="mb-2">
          <label for="nome" class="text-white font-roboto">NOME:</label>
          <input
            class="w-full md:h-14"
            v-model="state.name"
            type="text"
            id="nome"
          />
        </div>

        <div class="mb-2">
          <label for="telefone" class="text-white font-roboto">TELEFONE:</label>
          <input
            class="w-full md:h-14"
            v-model="state.phone"
            type="tel"
            id="telefone"
            placeholder="+351"
          />
        </div>

        <div>
          <label for="email" class="text-white font-roboto">EMAIL:</label>
          <input
            class="w-full md:h-14"
            v-model="state.email"
            type="email"
            id="email"
            placeholder="example@dripbr.com"
          />
        </div>
        <br />

        <div class="w-full flex justify-center">
          <button
            class="w-1/2 py-3 bg-fourth-color rounded-md text-button-cta font-bold hover:bg-sixth-color"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const mail = useMail();

const state = ref({
  selectedStore: "Drip 1",
  service: "",
  barber: "",
  dateTime: "",
  name: "",
  phone: "",
  email: "",
});

const submitForm = () => {
  mail.send({
    from: "Drip Barber System",
    subject: "Confirmação de Marcação de Hora na Drip Barber",
    text: `Nova marcação de hora realizada na barbearia ${state.value.selectedStore}.\n\nDetalhes da Marcação:\n\nServiço: ${state.value.service}\nBarbeiro: ${state.value.barber}\nData e Hora: ${state.value.dateTime}\n\nCliente:\n\nNome: ${state.value.name}\nTelefone: ${state.value.phone}\nEmail: ${state.value.email}`,
  });
};
</script>