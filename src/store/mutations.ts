// import IState from '@/store/IState'
import Team from '@/services/team/Team'
import Board from '@/services/board/Board'
import { State } from '@/store/state'
import { MutationTypes } from '@/store/mutation-types'
import { MutationTree } from 'vuex'

export type Mutations<S = State> = {
  [MutationTypes.UPDATE_MY_DATA](state: State, data: State): void,
  [MutationTypes.LOGOUT](state: State): void,
  [MutationTypes.ADD_TEAM](state: State, team: Team): void,
  [MutationTypes.ADD_BOARD](state: State, board: Board): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.UPDATE_MY_DATA] (state: State, data: State): void {
    state.user.name = data.user.name
    // state.user.authenticated = true
    state.teams = data.teams
    state.boards = data.boards
  },

  [MutationTypes.LOGOUT] (state: State): void {
    state.user.name = ''
    state.user.authenticated = false
    state.teams = []
    state.boards = []
  },

  [MutationTypes.ADD_TEAM] (state: State, team: Team): void{
    state.teams.push(team)
  },

  [MutationTypes.ADD_BOARD] (state: State, board: Board): void{
    state.boards.push(board)
  }
}
