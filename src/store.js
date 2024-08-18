import { reactive } from 'vue'

export const store = reactive({
  travels: [
    {
      name: 'Alessandria',
      days: 3,
      description: 'Sono arrivato e mi sono divertito molto',
      rating: 3
    },
    {
      name: 'Piombino',
      days: 1,
      description: 'Ho dormito bene',
      rating: 4
    },
    {
      name: 'Trabocchi',
      days: 5,
      description: 'Migliori scorci mai visti',
      rating: 5
    },
    {
      name: 'Rimini',
      days: 2,
      description: 'Terrificante',
      rating: 1
    },
  ],
})