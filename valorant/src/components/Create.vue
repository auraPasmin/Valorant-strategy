<!-- En tu componente Vue -->
<template>
  <div class="container">
    <!-- agregar agentes -->
    <div class="card">
      <h2>Agregar Agente</h2>
      <form class="form-card col-lg col-md" @submit.prevent="agregarAgente">
        <div class="mb-3 col-lg-8">
          <label class="col-sm col-form-label">Nombre:</label>
          <input class="form-control" v-model="nuevoAgente.nombre" />
        </div>
        <div class="mb-3 col-lg-8">
          <label class="col-sm-6 col-form-label"
            >Habilidades (separadas por comas):</label
          >
          <div>
            <input class="form-control" v-model="nuevoAgente.habilidades" />
          </div>
        </div>
        <div class="mb-3 col-lg-8">
          <label class="col-sm-6 col-form-label">Estrategias:</label>
          <div>
            <textarea
              class="form-control"
              v-model="nuevoAgente.estrategias"
              rows="3"
              required
            ></textarea>
          </div>
        </div>
        <div class="mb-3 col-lg-8">
          <label>Consejos:</label>
          <textarea
            class="form-control"
            v-model="nuevoAgente.consejos"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="mb-3 col-lg-8">
          <label class="form-label">Mapa:</label>
          <select class="form-select" v-model="nuevoAgente.mapaId" required>
            <option v-for="mapa in mapas" :key="mapa.id" :value="mapa.id">
              {{ mapa.nombre }}
            </option>
          </select>
        </div>
        <div>
          <button class="btn" type="submit">
            <span class="btn__inner">
              <span class="btn__slide"></span>
              <span class="btn__content button-fon">agregar perfil</span>
            </span>
          </button>
        </div>
      </form>
    </div>
    <div>
<!-- agentes agregados -->
      <h2>Agentes</h2>
      <ul class="card-agentes">
        <li v-for="agente in agentes" :key="agente.id">
          <h3>{{ agente.nombre }}</h3>
          <p>Habilidades: {{ agente.habilidades.join(", ") }}</p>
          <p>Estrategias: {{ agente.estrategias }}</p>
          <p>Consejos: {{ agente.consejos }}</p>
          <p>Mapa: {{ obtenerNombreMapa(agente.mapaId) }}</p>
          <button class="btn" @click="eliminarAgentePorId(agente.id)">
            <span class="btn__inner">
              <span class="btn__slide"></span>
              <span class="btn__content button-fon">eliminar perfil</span>
             </span>
          </button>
        </li>
      </ul>
      
    </div>
  </div>
</template>
<script>
import { agentesData, mapasData } from "../data.js";
import { ref, reactive } from "vue";

export default {
  setup() {
    const agentes = ref(agentesData);
    const mapas = ref(mapasData);

    const nuevoAgente = reactive({
      nombre: "",
      habilidades: "",
      estrategias: "",
      consejos: "",
      mapaId: null,
    });

    const agregarAgente = () => {
      try {
        if (
          !nuevoAgente.nombre ||
          !nuevoAgente.habilidades ||
          !nuevoAgente.estrategias ||
          !nuevoAgente.consejos ||
          nuevoAgente.mapaId === null
        ) {
          throw new Error("Por favor, completa todos los campos.");
        }

        const nuevoId = agentes.value.length + 1;

        const nuevoAgenteData = {
          id: nuevoId,
          nombre: nuevoAgente.nombre,
          habilidades: nuevoAgente.habilidades
            .split(",")
            .map((habilidad) => habilidad.trim()),
          estrategias: nuevoAgente.estrategias,
          consejos: nuevoAgente.consejos,
          mapaId: nuevoAgente.mapaId,
        };

        agentes.value.push(nuevoAgenteData);

        Object.assign(nuevoAgente, {
          nombre: "",
          habilidades: "",
          estrategias: "",
          consejos: "",
          mapaId: null,
        });
      } catch (error) {
        console.error("Error al agregar agente:", error.message);
      }
    };

    const obtenerNombreMapa = (mapaId) => {
      const mapa = mapas.value.find((mapa) => mapa.id === mapaId);
      return mapa ? mapa.nombre : "Desconocido";
    };
    const eliminarAgente = (agenteId) => {
  try {
    const indice = agentes.value.findIndex((agente) => agente.id === agenteId);

    if (indice === -1) {
      throw new Error("Agente no encontrado");
    }

    agentes.value.splice(indice, 1);
  } catch (error) {
    console.error("Error al eliminar agente:", error.message);
  }
};
    const eliminarAgentePorId = (agenteId) => {
      if (window.confirm("¿Seguro que quieres eliminar este agente?")) {
        eliminarAgente(agenteId);
      }
    };

    // const editarAgente = (agente) => {
    //   nuevoAgente = { ...agente };
    //   agenteEditando.value = agente;
    //   modoEdicion.value = true;
    // };

    // const actualizarAgente = () => {
    //   const indice = agentes.value.indexOf(agenteEditando.value);
    //   if (indice !== -1) {
    //     agentes.value[indice] = { ...agenteEditando.value, ...nuevoAgente };
    //   }
    //   nuevoAgente.nombre = "";
    //   nuevoAgente.habilidades = "";
    //   nuevoAgente.estrategias = "";
    //   nuevoAgente.consejos = "";
    //   nuevoAgente.mapaId = null;
    //   agenteEditando.value = null;
    //   modoEdicion.value = false;
    // };
    return {
      agentes,
      mapas,
      nuevoAgente,
      //   agenteEditando,
      //   modoEdicion,
      agregarAgente,
      obtenerNombreMapa,
      eliminarAgentePorId, //   eliminarAgente,
      //   editarAgente,
      //   actualizarAgente,
    };
  },
};
</script>
<style>
.container {
  border-left: 0.5px solid #7d8082; /* Ancho y color del borde izquierdo */
  padding-left: 10px; /* Espacio adicional a la izquierda para que no se solape con el contenido */
}

.card {
  display: flex;
  border: none;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
}
.form-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: #121b26;
  
}
h2 {
  text-transform: uppercase;
  color: #ff4655;
}
h3 {
  font-family: "roboto", sans-serif;
}
.btn {
  /* Clean style */
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  color: var(--button-text-color);
  cursor: pointer;
  font-family: "roboto", sans-serif;
  /* Clean style */

  --button-text-color: var(--background-color);
  --button-text-color-hover: var(--button-background-color);
  --border-color: #7d8082;
  --button-background-color: #ece8e1;
  --highlight-color: #ff4655;
  --button-inner-border-color: transparent;
  --button-bits-color: var(--background-color);
  --button-bits-color-hover: var(--button-background-color);

  position: relative;
  padding: 8px;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.15s ease;
}

.btn::before,
.btn::after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(50% - 5px);
  border: 1px solid var(--border-color);
  transition: all 0.15s ease;
}

.btn::before {
  top: 0;
  border-bottom-width: 0;
}

.btn::after {
  bottom: 0;
  border-top-width: 0;
}

.btn:active,
.btn:focus {
  outline: none;
}

.btn:active::before,
.btn:active::after {
  right: 3px;
  left: 3px;
}

.btn:active::before {
  top: 3px;
}

.btn:active::after {
  bottom: 3px;
}

.btn__inner {
  position: relative;
  display: block;
  padding: 20px 30px;
  background-color: var(--highlight-color);
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px var(--button-inner-border-color);
}

.btn__inner::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: var(--button-bits-color);
}

.btn__inner::after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: var(--button-bits-color);
  transition: all 0.2s ease;
}

.btn__slide {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  background-color: #121b26;
  transform: skew(-15deg);
  transition: all 0.2s ease;
}

.btn__content {
  position: relative;
}

.btn:hover {
  color: var(--button-text-color-hover);
}

.btn:hover .btn__slide {
  width: calc(100% + 15px);
}

.btn:hover .btn__inner::after {
  background-color: var(--button-bits-color-hover);
}

.btn--light {
  --button-background-color: var(--background-color);
  --button-text-color: var(--highlight-color);
  --button-inner-border-color: var(--highlight-color);
  --button-text-color-hover: #ece8e1;
  --button-bits-color-hover: #ece8e1;
}

ul {
  list-style-type: square; /* Establece el tipo de marcador a cuadrado */
  /* Otros estilos para la lista si es necesario */
}
.card-agentes {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3rem;
  margin-bottom: 3rem ;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
}
.card-agentes h3 {
  color: #ff4655;
}
.card-agentes p {
  font-family: "roboto", sans-serif;
  text-transform: lowercase;
}
</style>
