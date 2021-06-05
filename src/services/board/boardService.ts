import axios from 'axios'

export default class BoardService {
  async create (detail: any) {
    try {
      const axiosResponse = await axios.post('/boards', detail)
      return axiosResponse.data
    } catch (err) {
      throw new Error('failed get board ' + err)
    }
  }
}
