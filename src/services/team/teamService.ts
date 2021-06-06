import axios from 'axios'

export default class TeamService {
  static async create (detail: any) {
    try {
      const axiosResponse = await axios.post('/teams', detail)
      return axiosResponse.data
    } catch (err) {
      throw new Error('failed get teams ' + err)
    }
  }
}
