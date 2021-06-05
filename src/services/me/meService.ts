import axios from 'axios'

export default class MeService {
  static async getMyData (): Promise<any> {
    try {
      const axiosResponse = await axios.get('/me')
      return axiosResponse.data
    } catch (err) {
      throw new Error('failed get my data ' + err)
    }
  }
}
