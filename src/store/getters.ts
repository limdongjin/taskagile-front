// import IState from '@/store/IState'
import User from '@/services/user/User'
import Board from '@/services/board/Board'
import { State } from '@/store/state'
import { GetterTree } from 'vuex'
import { GettersType } from '@/store/getters-type'

export type Getters = {
  [GettersType.user](state: State): User,
  [GettersType.hasBoards](state: State): boolean,
  [GettersType.personalBoards](state: State): Board[],
  [GettersType.teamBoards](state: State): Array<any>
}

export const getters: GetterTree<State, State> & Getters = {
  [GettersType.user]: state => {
    // mock
    return { name: 'limdongjin', authenticated: true }

    // real code
    // return state.user
  },
  [GettersType.hasBoards]: state => {
    // mock
    return true

    // real code
    // return state.boards.length > 0
  },
  [GettersType.personalBoards]: state => {
    // mock
    return [{
      id: 1,
      name: 'taskagile',
      description: 'vuejs + typescript',
      teamId: 1
    }]

    // real code
    // return state.boards.filter(board => board.teamId === 0)
  },
  [GettersType.teamBoards]: state => {
    // mock
    return [{
      id: 1,
      name: 'Sales & Marketing',
      boards: [{
        id: 2,
        name: '2018 Planning',
        description: '2018 sales & marketing planning'
      }, {
        id: 3,
        name: 'Ongoing Campaigns',
        description: '2018 ongoing marketing campaigns'
      }]
    }]

    // real code
    // const teams: Array<any> = []
    //
    // state.teams.forEach((team: Team) => {
    //   teams.push({
    //     id: team.id,
    //     name: team.name,
    //     boards: state.boards.filter(board => board.teamId === team.id)
    //   })
    // })
    //
    // return teams
  }
}
