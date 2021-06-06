<template>
  <form @submit.prevent="saveBoard">
    <!-- Modal Div-->
    <div tabindex="-1"
             role="dialog"
             backdrop="static"
             id="createBoardModal"
             v-show="isVisible"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Board</h5>
            <button type="button" class="close" @click="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-show="errorMessage" class="alert alert-danger failed">{{ errorMessage }}</div>
            <div class="form-group">
              <input type="text" class="form-control" id="boardNameInput" v-model="board.name" placeholder="Board name" maxlength="128">
<!--              <div class="field-error" v-if="$v.board.name.$dirty">-->
<!--                <div class="error" v-if="!$v.board.name.required">Name is required</div>-->
<!--              </div>-->
            </div>
            <div class="form-group">
              <textarea class="form-control" v-model="board.description" placeholder="Add board description here"></textarea>
<!--              <div class="field-error" v-if="$v.board.description.$dirty">-->
<!--                <div class="error" v-if="!$v.board.description.required">Description is required</div>-->
<!--              </div>-->
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Create</button>
            <button type="button" class="btn btn-default btn-cancel" @click="close">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
// import $ from 'jquery'
// import * as $ from 'jquery'
// import { required } from 'vuelidate/lib/validators'
import boardService from '@/services/board/boardService'
import { ActionTypes } from '@/store/action-types'
import Board from '@/services/board/Board'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    teamId: Number,
    showModal: Boolean
  },
  computed: {
    isVisible () {
      return this.showModal
    }
  }
})
export default class CreateBoardModal extends Vue {
  public board: any = {
    name: '',
    description: ''
  }

  public errorMessage = ''

  saveBoard () {
    // [TODO] validation
    console.log('saveBoard')

    const board: Board = {
      id: -1,
      // @ts-ignore
      teamId: this.$props.teamId,
      name: this.board.name,
      description: this.board.description
    }
    console.log(board)
    boardService.create(board).then((createdBoard: Board) => {
      this.$store.dispatch(ActionTypes.ADD_BOARD, createdBoard)

      // @ts-ignore
      this.$emit('created', createdBoard.id)
      this.close()
    }).catch((error: any) => {
      alert(error)
      this.errorMessage = error.message
    })
  }

  close () {
    // [TODO] validation reset
    console.log('close')
    this.board.name = ''
    this.board.description = ''
    this.errorMessage = ''
    // @ts-ignore
    this.$emit('closeBoardModal', 1)
  }
}

</script>

<style lang="scss" scoped>
.modal {
  .modal-dialog {
    width: 400px;
  }
}
</style>
