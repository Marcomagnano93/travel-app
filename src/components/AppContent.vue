<script>

import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
      errorInputName: false,
      newTrip: {
        tripName: '',
        rating: '',
        description: '',
        payed: 0
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
    generalStars(){
      let total = 0;
      if (this.store.travels.length > 0){
      for (let i = 0; i < this.store.travels.length; i++) {
        const singleTravel = this.store.travels[i];

        const singleTravelRating = singleTravel.rating;

        total += singleTravelRating;
      }
      
        let trueTotal = total  / this.store.travels.length;
        return parseInt(trueTotal);
      }
      else {
        return 0;
      }
    },
    totalPrice(){
      let totalPrice = 0;
      for (let i = 0; i < this.store.travels.length; i++) {
        const singleTravel = this.store.travels[i];
        const singlePrice = singleTravel.payed;

        totalPrice += singlePrice;
      }
      if (this.store.travels.length > 0){
        // return totalPrice.toFixed(2);
        return totalPrice;
      }
      else {
        return 0;
      }
    },
    addTrip(newTrip){
      if (this.newTrip.tripName === ''){
        return this.errorInputName = true;
      }
      else {
        this.errorInputName = false;
        this.store.travels.push({...newTrip});
        this.generalStars();
        this.keep();
        this.newTrip.tripName = '';
        this.newTrip.rating = '';
        this.newTrip.description = '';
        this.newTrip.payed = 0;
      }
    },
    removeTravel(trip) {
      this.store.travels.splice(trip, 1);
      this.generalStars();
      this.keep();
    },
    emptyStars(stars){
      const totalStars = 5 - stars;
      return totalStars;
    }
  },
  mounted() {
    this.keepUp();
    this.generalStars();
  }
}

</script>

<template>

  <main>
    <section class="h-100">
      <div class="container py-4 h-100">
        <div class="row aling-items-center flex-column justify-content-center h-100">
          <div class="col-auto text-center">
            <h1 class="logo seagreen">Diario di Viaggio</h1>

            <div class="container">
              <div class="row">

                <!-- FORM -->
                <div class="col">
                  <h3 class="my-3">Aggiungi una tappa</h3>
                  <div class="d-flex flex-column gap-3">
                    <input type="text" v-model="newTrip.tripName" class="form-control" placeholder="Nome della tappa *">
                    <div v-if="this.errorInputName === true">
                      <div class="error">
                        <p>Inserisci il nome della tua tappa!</p>
                      </div>
                    </div>
                    <label for="cost" class="form-check-label mx-1 left">Costo della tappa: </label>
                    <input type="number" id="cost" name="cost" v-model="newTrip.payed" class="form-control" placeholder="Costo della tappa in €">
                      <div class="error">
                          <p v-if="isNaN(this.newTrip.payed)">Il costo della tappa deve essere un numero!</p>
                          <p v-if="this.newTrip.payed < 0">Il costo della tappa deve essere positivo!</p>
                      </div>
                    <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="newTrip.description" placeholder="Aggiungi informazioni sulla tappa"></textarea>
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
                      <h4 class="seagreen"><strong>{{ travel.tripName }}</strong></h4>
                      <p>{{ travel.description }}</p>
                      <p><strong>Costo tappa: </strong>{{ travel.payed }} €</p>
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
                
                <!-- RIEPILOGO -->
                 <div class="col">
                  <h3 class="my-3">Riepilogo Viaggio</h3>
                  <div class="d-flex flex-column"
                  v-if="this.store.travels.length > 0">
                    <p><strong>Tappe: </strong>{{ this.store.travels.length }}</p>
                    <p><strong>Costo totale: </strong>{{ totalPrice() }} €</p>
                    <p><strong>Valutazione generale: </strong></p>
                    <div class="d-flex justify-content-center">
                        <ul class="d-flex gap-3 stars">
                          <li
                          v-for="(star, i) in generalStars()" :key="i" class="gold">
                            <font-awesome-icon :icon="['fas', 'star']" />
                          </li>
                          <li v-for="(eStar, i) in emptyStars(generalStars())" :key="i" class="gold">
                            <font-awesome-icon :icon="['far', 'star']" />
                          </li>
                        </ul>
                    </div>
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