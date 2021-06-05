import meService from '@/services/me/meService'
import { ActionTypes } from '@/store/action-types'
import { Mutations } from '@/store/mutations'
import { ActionContext, ActionTree } from 'vuex'
import { State } from '@/store/state'
import Team from '@/services/team/Team'
import Board from '@/services/board/Board'
import { MutationTypes } from '@/store/mutation-types'

// commit(key, payload)
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.GET_MY_DATA](
    { commit }: AugmentedActionContext,
    payload: undefined
  ): void,

  [ActionTypes.ADD_TEAM](
    { commit }: AugmentedActionContext,
    payload: Team
  ): void,

  [ActionTypes.ADD_BOARD](
    { commit }: AugmentedActionContext,
    payload: Board
  ): void
}

export const actions: ActionTree<State, State> = {
  [ActionTypes.GET_MY_DATA] ({ commit }) {
    meService.getMyData()
      .then(data => {
        commit(MutationTypes.UPDATE_MY_DATA, data)
      })
  },

  [ActionTypes.ADD_TEAM] ({ commit }, team) {
    commit(MutationTypes.ADD_TEAM, team)
  },

  [ActionTypes.ADD_BOARD] ({ commit }, board) {
    commit(MutationTypes.ADD_BOARD, board)
  }
}
//
// // @ts-ignore
// export const getMyData = ({ commit }) => {
//   meService.getMyData()
//     .then((data: any) => {
//       commit('updateMyData', data)
//     })
// }
//
// // @ts-ignore
// export const addTeam = ({ commit }, team) => {
//   commit('addTeam', team)
// }
//
// // @ts-ignore
// export const addBoard = ({ commit }, board) => {
//   commit('addBoard', board)
// }
