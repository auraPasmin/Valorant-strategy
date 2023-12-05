<template>
    <div>
      <!-- ... otras partes del componente -->
  
      <h2>Agentes</h2>
      <ul>
        <li v-for="agente in agentes" :key="agente.id">
          <h3>{{ agente.nombre }}</h3>
          <p>Habilidades: {{ agente.habilidades.join(', ') }}</p>
          <p>Estrategias: {{ agente.estrategias }}</p>
          <p>Consejos: {{ agente.consejos }}</p>
          <p>Mapa: {{ obtenerNombreMapa(agente.mapaId) }}</p>
          <button @click="editarAgente(agente)">Editar</button>
        </li>
      </ul>
  
      <!-- Formulario para agregar o editar un agente -->
      <h2>{{ modoEdicion ? 'Editar' : 'Agregar' }} Agente</h2>
      <form @submit.prevent="modoEdicion ? actualizarAgente() : agregarAgente()">
        <!-- ... campos del formulario aquí -->
        <button type="submit">{{ modoEdicion ? 'Actualizar' : 'Agregar' }} Agente</button>
      </form>
    </div>
  </template>
  
  <script>
  import { agentesData, mapasData } from '../data';
  
  export default {
    data() {
      return {
        agentes: agentesData,
        mapas: mapasData,
        nuevoAgente: {
          nombre: '',
          habilidades: '',
          estrategias: '',
          consejos: '',
          mapaId: null
        },
        agenteEditando: null,
        modoEdicion: false
      };
    },
    methods: {
      agregarAgente() {
        // Implementación para agregar un agente (similar a la anterior)
      },
      editarAgente(agente) {
        // Configurar el formulario para editar un agente existente
        this.nuevoAgente = { ...agente };
        this.agenteEditando = agente;
        this.modoEdicion = true;
      },
      actualizarAgente() {
        // Implementación para actualizar un agente existente
        const indice = this.agentes.indexOf(this.agenteEditando);
        this.$set(this.agentes, indice, { ...this.agenteEditando, ...this.nuevoAgente });
  
        // Restablecer el formulario y salir del modo de edición
        this.nuevoAgente = {
          nombre: '',
          habilidades: '',
          estrategias: '',
          consejos: '',
          mapaId: null
        };
        this.agenteEditando = null;
        this.modoEdicion = false;
      }
    }
  };
  </script>
  