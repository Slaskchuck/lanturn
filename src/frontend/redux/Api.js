import axios from 'axios'

export default {
  api: axios.create({
    baseURL: process.env.API_URL
  }),
  routes: {
    getcommonsstudents: {
      base: () => `api/getcommonsstudents`
    }
  }
}