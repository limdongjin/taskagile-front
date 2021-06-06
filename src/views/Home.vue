<template>
  <div>
    <PageHeader />
    <div class="boards-container">
      <div class="boards-section">
        <h2 class="section-title">Personal Boards</h2>
        <div class="boards d-flex align-content-start flex-wrap">
          <div class="board list-inline-item" v-for="board in personalBoards"
               v-bind:key="board.id" @click="openBoard(board)">
            <h3>{{ board.name }}</h3>
            <p>{{ board.description }}</p>
          </div>
          <div class="board add list-inline-item" @click="createBoard()">
            <font-awesome-icon icon="plus" />
            <div>Create New Board</div>
          </div>
        </div>
      </div>

      <div class="create-team-wrapper">
        <button class="btn btn-link" @click="createTeam()">+ Create New Team</button>
      </div>
    </div>
<!--        v-show="showCreateBoardModal"-->
      <CreateBoardModal
        :showModal="showCreateBoardModal"
        :teamId="selectedTeamId"
        @closeBoardModal="closeBoardModal"
        @created="onBoardCreated" />
      <CreateTeamModal
      v-show="showCreateTeamModal"
      @closeTeamModal="closeTeamModal"
      />
  </div>
</template>

<script lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { GettersType } from '@/store/getters-type'
import Board from '@/services/board/Board'
import Team from '@/services/team/Team'
import CreateBoardModal from '@/modals/CreateBoardModal.vue'
import CreateTeamModal from '@/modals/CreateTeamModal.vue'

@Options({
  components: {
    PageHeader,
    CreateBoardModal,
    CreateTeamModal
  },
  computed: {
    ...mapGetters([
      GettersType.personalBoards,
      GettersType.teamBoards
    ])
  }
})
export default class Home extends Vue {
  public selectedTeamId: number = 0
  public showCreateBoardModal: boolean = false
  public showCreateTeamModal: boolean = false

  openBoard (board: Board) {
    this.$router.push({ name: 'board', params: { boardId: board.id } })
  }

  createBoard (team: Team) {
    console.log('createBoard')
    this.selectedTeamId = team ? team.id : 0
    this.showCreateBoardModal = !this.showCreateBoardModal
  }

  createTeam () {
    this.showCreateTeamModal = true
  }

  closeTeamModal (x: any) {
    console.log('close! team modal')
    this.showCreateTeamModal = !this.showCreateTeamModal
  }

  closeBoardModal (x: any) {
    console.log('close! board modal')
    this.showCreateBoardModal = !this.showCreateBoardModal
  }

  onBoardCreated (boardId: number) {
    console.log('onBoardCreated')
    this.$router.push({ name: 'Board', params: { boardId: boardId } })
  }
}
</script>

<style lang="scss" scoped>
.boards-container {
  padding: 0 35px;

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 400;
  }

  .boards-section {
    margin: 30px 10px;

    .boards {

      .board {
        width: 270px;
        height: 110px;
        border-radius: 5px;
        background-color: #377EF6;
        color: #fff;
        padding: 15px;
        margin-right: 10px;
        cursor: pointer;

        h3 {
          font-size: 16px;
        }

        p {
          line-height: 1.2;
          font-size: 90%;
          font-weight: 100;
          color: rgba(255, 255, 255, 0.70)
        }
      }

      .add {
        background-color: #f4f4f4;
        color: #666;
        text-align: center;
        padding-top: 30px;
        font-weight: 400;
      }
    }
  }

  .create-team-wrapper {
    .btn-link {
      color: #666;
      text-decoration: underline;
    }
  }
}
</style>
