<script>

import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
    }
  }
}

</script>

<template>

  <main>
    <section class="h-100">
      <div class="container py-5 h-100">
        <div class="row aling-items-center flex-column justify-content-center h-100">
          <div class="col-auto text-center">
            <h1>Descrivi tuo viaggio</h1>
            <form action="">
              <input type="text" placeholder="dove sei stato?" v-model="name">
              <input type="text" placeholder="quanto sei stato?" v-model="days">
              <input type="text" placeholder="descrivi la tappa" v-model="description">
              <input type="text" placeholder="valuta" v-model="rating">

            </form>
            
              <div v-for="(travel, i) in store.travels" :key="i">
                  <h5>{{ travel.name }}</h5>
                  <p><strong>Durata: </strong>{{ travel.days }}</p>
                  <p>{{ travel.description }}</p>
                  <p><strong>Valutazione: </strong>{{ travel.rating }}</p>
                <hr>
              </div>
            

          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<style></style>