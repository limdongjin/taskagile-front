<template>
  <form @submit.prevent="saveTeam">
    <b-modal tabindex="-1" role="dialog" backdrop="static" id="createTeamModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Team</h5>
            <button type="button" class="close" @click="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-show="errorMessage" class="alert alert-danger failed">{{ errorMessage }}</div>
            <div class="form-group">
              <input type="text"
                     class="form-control"
                     id="teamNameInput"
                     v-model="team.name"
                     placeholder="Team name"
                     maxlength="128"
              >
<!--              <div class="field-error" v-if="$v.team.name.$dirty">-->
<!--                <div class="error" v-if="!$v.team.name.required">Name is required</div>-->
<!--              </div>-->
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Create</button>
            <button type="button" class="btn btn-default btn-cancel" @click="close">Cancel</button>
          </div>
        </div>
      </div>
    </b-modal>
  </form>
</template>

<script lang="ts">
// import { required } from 'vuelidate/lib/validators'
import teamService from '@/services/team/teamService'
import { Options, Vue } from 'vue-class-component'
import { ActionTypes } from '@/store/action-types'
import Team from '@/services/team/Team'

@Options({
  props: {
    showModal: Boolean
  }
})
export default class CreateTeamModal extends Vue {
  public team = {
    name: ''
  }

  public errorMessage = ''

  saveTeam () {
    // [TODO] validation

    teamService.create(this.team).then((createdTeam: Team) => {
      this.$store.dispatch(ActionTypes.ADD_TEAM, createdTeam)
      this.close()
    }).catch((error: any) => {
      this.errorMessage = error.message
    })
  }

  close () {
    // [TODO] validation reset

    this.team.name = ''
    this.errorMessage = ''

    // @ts-ignore
    this.$emit('closeTeamModal', 1)
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
