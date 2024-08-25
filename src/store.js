import { reactive } from 'vue'

export const store = reactive({
  travels: [{
    tripName: '',
    rating: '',
    description: ''
  },
],
  trips: []
})