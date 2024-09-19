<script>

import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
      errorInputName: false,
      errorPay: false,
      errorNight: false,
      confirm: false,
      newTrip: {
        tripName: '',
        rating: '',
        description: '',
        payed: '',
        days: ''
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
    openConfirm(){
      if (this.confirm === false) {
        return this.confirm = true;
      }
    },
    closeConfirm(){
      if (this.confirm === true) {
        return this.confirm = false;
      }
    },
    emptyTravels(){
      this.store.travels.splice(0);
      this.keep();
      this.closeConfirm();
    },
    generalStars(){
      let total = 0;
      let lenght = this.store.travels.length;
      if (this.store.travels.length > 0){
      for (let i = 0; i < this.store.travels.length; i++) {
        const singleTravel = this.store.travels[i];

        const singleTravelRating = singleTravel.rating;

        total += singleTravelRating;
      }
      
        let trueTotal = total / lenght;
        return Math.round(trueTotal);
      }
      else {
        return 0;
      }
    },
    totalPrice(){
      let totalPrice = 0;
      if (this.store.travels.length > 0){
      for (let i = 0; i < this.store.travels.length; i++) {
        const singleTravel = this.store.travels[i];
        const singlePrice = Number(singleTravel.payed);

        totalPrice += singlePrice;
      }
        return totalPrice.toFixed(2);
      }
      else {
        return 0;
      }
    },
    totalDays(){
      let totalNights = 0;
      if (this.store.travels.length > 0){
      for (let i = 0; i < this.store.travels.length; i++) {
        const singleTravel = this.store.travels[i];
        const singleTravelNights = Number(singleTravel.days);

        totalNights += singleTravelNights;
      }
        return Math.round(totalNights);
      }
      else {
        return 0;
      }
    },
    priceXNight(nights, totalPrice){
      const total = totalPrice / nights;
      return Number(total).toFixed(2);
    },
    addTrip(newTrip){
      if (this.newTrip.tripName === ''){
        return this.errorInputName = true;
      }
      else if(this.newTrip.payed < 0 || isNaN(this.newTrip.payed) === true || this.newTrip.payed === ''){
        return this.errorPay = true;
      }
      else if(this.newTrip.days < 0 || isNaN(this.newTrip.days) === true || this.newTrip.days === ''){
        return this.errorNight = true;
      }
      else {
        this.errorInputName = false;
        this.errorPay = false;
        this.errorNight = false;
        this.store.travels.push({...newTrip});
        this.generalStars();
        this.totalPrice();
        this.totalDays();
        this.keep();
        this.newTrip.tripName = '';
        this.newTrip.rating = '';
        this.newTrip.description = '';
        this.newTrip.payed = '';
        this.newTrip.days = '';
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
            <h2 class="logo seagreen">Il tuo Diario di Viaggio</h2>

            <div class="container">
              <div class="row">

                <!-- FORM -->
                <div class="col col-sm-12 col-md-6 col-lg-4">
                  <h3 class="my-3 coral">Aggiungi una tappa</h3>
                  <p>I campi con * sono obbligatori</p>
                  <div class="d-flex flex-column gap-3">
                    <input type="text" v-model="newTrip.tripName" class="form-control" placeholder=" * Nome della tappa" @keyup.enter="addTrip(this.newTrip)">
                    <div v-if="this.errorInputName === true">
                      <div class="error">
                        <p>Inserisci il nome della tua tappa</p>
                      </div>
                    </div>
                    <input type="text" id="cost" name="cost" v-model="newTrip.payed" class="form-control" placeholder=" * Costo della tappa in €" @keyup.enter="addTrip(this.newTrip)">
                      <div class="error" v-if="this.errorPay === true">
                          <p>Il costo deve essere un numero positivo</p>
                      </div>
                    <input type="text" v-model="newTrip.days" class="form-control" placeholder=" * Notti di permanenza" @keyup.enter="addTrip(this.newTrip)">
                      <div class="error" v-if="this.errorNight === true">
                          <p>Inserisci un numero pari o superiore a 0</p>
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
                <div class="col col-sm-12 col-md-6 col-lg-4">
                  <h3 class="my-3 coral">Le tue tappe</h3>
                  <div v-for="(travel, i) in store.travels" :key="i">
                      <h4 class="seagreen"><strong>{{ travel.tripName }}</strong></h4>
                      <p>{{ travel.description }}</p>
                      <p><strong>Costo tappa: </strong>{{ Number(travel.payed).toFixed(2) }} €</p>
                      <p><strong>Durata: </strong>{{ Number(travel.days) }} Notti</p>
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
                      <div class="btn btn-danger btn-sm" @click="removeTravel(travel)">Rimuovi</div>
                    <hr>
                  </div>
                </div>
              

                <!-- RIEPILOGO -->
                 <div class="col">
                    <div class="card_recap py-2">
                      <h3 class="my-3">Riepilogo Viaggio</h3>
                      <div class="d-flex flex-column"
                        v-if="this.store.travels.length > 0">
                        <p><strong class="goldsand ">Tappe: </strong>{{ this.store.travels.length }}</p>
                        <p><strong class="goldsand ">Notti di viaggio: </strong> {{ totalDays() }}</p>
                        <p><strong class="goldsand ">Costo totale: </strong> {{ totalPrice() }} €</p>
                        <p><strong class="goldsand ">Costo medio per notte: </strong> {{ priceXNight(totalDays(), totalPrice()) }} €</p>
                        <p><strong class="goldsand ">Valutazione generale: </strong></p>
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
                        <div class="d-flex justify-content-center my-3">
                          <div class="btn btn-danger btn-sm" @click="openConfirm()">Svuota il diario</div>
                        </div>
                        
                      </div>
                    </div>
                  
                    <!-- CONFIRM -->
                      <div v-if="confirm === true" class="py-3">
                        <h5>Vuoi svuotare il tuo diario?</h5>
                        <p>Le tappe verranno eliminate definitivamente</p>
                        <div class="d-flex gap-3 justify-content-center">
                          <div class="btn btn-danger btn-sm" @click="emptyTravels()">Elimina</div>
                          <div class="btn btn-primary btn-sm" @click="closeConfirm()">Annulla</div>
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