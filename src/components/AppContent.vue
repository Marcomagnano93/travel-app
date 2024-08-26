<script>

import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
      newTrip: {
        tripName: '',
        rating: '',
        description: ''
      }
    }
  },
  methods: {
    keep(){
      localStorage.travels = JSON.stringify(this.store.travels);
    },
    keepUp() {
      this.store.travels = localStorage.travels
        ? JSON.parse(localStorage.travels)
        : [];
    },
    addTrip(newTrip){
      this.store.travels.push({...newTrip})
      this.keep();
      this.newTrip.tripName = '';
      this.newTrip.rating = '';
      this.newTrip.description = '';
    },
    removeTravel(trip) {
      this.store.travels.splice(trip, 1);
      this.keep();
    },
    emptyStars(stars){
      const totalStars = 5 - stars;
      return totalStars;
    }
  },
  mounted() {
    this.keepUp();
  }
}

</script>

<template>

  <main>
    <section class="h-100">
      <div class="container py-5 h-100">
        <div class="row aling-items-center flex-column justify-content-center h-100">
          <div class="col-auto text-center">
            <h1>Diario di Viaggio</h1>

            <div class="container">
              <div class="row">

                <!-- FORM -->
                <div class="col">
                  <h3 class="my-3">Aggiungi una tappa</h3>
                  <div class="d-flex flex-column gap-3">
                    <input type="text" v-model="newTrip.tripName" placeholder="Dove hai viaggiato?">
                    <textarea name="" id="" cols="30" rows="10" v-model="newTrip.description" placeholder="Descrivi il tuo viaggio"></textarea>
                    <div class="d-flex gap-3">
                      <h5>Valutazione:</h5>
                      <div v-for="(inp, i) in 6" :key="i">
                        <label :for="i" class="form-check-label mx-1">{{ i }}</label>
                        <input class="form-check-input" type="radio" :name="i" :id="i " :value="i" v-model="newTrip.rating">
                      </div>
                    </div>                    
                    <div class="btn btn-primary" @click="addTrip(this.newTrip)">Aggiungi</div>
                  </div>
                </div>

                <!-- DATA -->
                <div class="col">
                  <h3 class="my-3">Le tue tappe</h3>
                  <div v-for="(travel, i) in store.travels" :key="i">
                      <h5>{{ travel.tripName }}</h5>
                      <p>{{ travel.description }}</p>
                      <p><strong>Valutazione: </strong></p>
                      <div class="d-flex justify-content-center">
                        <ul class="d-flex gap-3 stars mb-3">
                          <li
                          v-for="(star, i) in travel.rating" :key="i" class="gold">
                            <font-awesome-icon :icon="['fas', 'star']" />
                          </li>
                          <li v-for="(eStar, i) in emptyStars(travel.rating)" :key="i" class="gold">
                            <font-awesome-icon :icon="['far', 'star']" />
                          </li>
                        </ul>
                      </div>
                      <div class="btn btn-danger btn-sm" @click="removeTravel(i)">Rimuovi</div>
                    <hr>
                  </div>
                </div>
                
              </div>
            </div>          
          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<style>

</style>