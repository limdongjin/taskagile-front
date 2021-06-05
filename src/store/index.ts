import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from 'vuex'
import { State, state } from '@/store/state'
import { Getters, getters } from '@/store/getters'
import { Mutations, mutations } from '@/store/mutations'
import { Actions, actions } from '@/store/actions'

export const store = createStore({
  state,
  getters,
  mutations,
  actions
})

export type Store = Omit<VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
  > & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

// // import Vue from 'vue'
// import Vuex from 'vuex'
// import * as getters from '@/store/getters'
// import * as actions from './actions'
// import mutations from '@/store/mutations'
// // import createLogger from 'vuex/dist/logger'
// import IState from '@/store/IState';
//
// const state: IState = {
//   user: {
//     name: '',
//     authenticated: false
//   },
//   teams: [],
//   boards: []
// }
//
// export const store = new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations
//   // plugins: process.env.NODE_ENV !== 'production'
//   //   ? [createLogger()]
//   //   : []
// })
