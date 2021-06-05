// import IState from '@/store/IState'
import User from '@/services/user/User'
import Team from '@/services/team/Team'
import Board from '@/services/board/Board'

export type State = {
  user: User,
  teams: Team[],
  boards: Board[]
}

export const state: State = {
  user: {
    name: '',
    authenticated: false
  },
  teams: [],
  boards: []
}
