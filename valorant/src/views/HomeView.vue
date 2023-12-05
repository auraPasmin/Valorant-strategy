<template>
  <div class="container">
    <div class="row">
      <div class="">
        <div class="row">
          <div
            v-for="(agent, i) in agents"
            :key="agent.uuid"
            class="card mx-3 my-3"
            style="width: 18rem"
          >
          <div class="border">
            <div class="card-body">
              <h5 class="card-title">{{ agent.displayName }}</h5>
              <p class="card-text">{{ agent.description }}</p>
              <!-- <div>
                <router-link
                  :to="{ path: '/editar+{agent.uuid}' }"
                  class="btn btn-warning"
                >
                  editar</router-link
                >
                &nbsp;
              </div> -->
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { agents: null };
  },
  mounted() {
    axios;
    this.getAgents();
    this.getMaps();
  },
  methods: {
    getAgents() {
      axios.get("https://valorant-api.com/v1/agents").then((response) => {
        this.agents = response.data.data;
      });
    },
    getMaps() {
      axios.get("https://valorant-api.com/v1/maps").then((response) => {
        this.maps = response.data.data;
      });
    }
  },
};
</script>
<style>

.card-body {
  background-color: #121b26;
  color: #ece8e1;
  width: 18rem;
  height: 18rem;
}
.card-title {
  font-size: 1.5rem;
  color: #ff4655;
}	
.card-text{
  font-family: "roboto";
}



</style>