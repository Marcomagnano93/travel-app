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
            <h1>Pianifica il tuo viaggio</h1>

            
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