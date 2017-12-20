<template>
  <v-data-table
    v-bind:headers="headers"
    :items="members"
    :total-items="totalItems"
    :loading="loading"
    v-bind:search="search"
  >
  <!-- :pagination.sync="tablePagination" -->
    <template slot="items" scope="props">
      <tr style="cursor: pointer">
        <td class="text-xs-left">
            <div class="avatar ml-2" style="height: 24px; width: 24px;">
              <img :src="props.item.avatar" :alt="props.item.firstname + ' ' + props.item.lastname"></div>
            {{ props.item.firstname + ' ' + props.item.lastname }}
        </td>
        <td class="text-xs-left">{{ props.item.companylegalname }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td v-if="user.uid === group.admin.uid" class="text-xs-left">
            <v-tooltip right>
              <v-btn @click="remove(props.item)" class="reduce-fab" flat fab slot="activator">
                  <v-icon class="red--text">mdi-close-circle</v-icon>
              </v-btn>
              <span>Remove {{ props.item.firstname + ' ' + props.item.lastname }}</span>
            </v-tooltip>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: ['groupId', 'group'],
    data () {
      return {
        totalItems: 0,
        search: '',
        loading: false,
        members: [],
        headers: [
          { text: 'Full Name', align: 'center', value: 'firstname', sortable: false },
          { text: 'Company', align: 'center', value: 'companylegalname', sortable: false },
          { text: 'Email', align: 'center', value: 'email', sortable: false },
          { text: 'Actions', align: 'left', value: 'actions', sortable: false }
        ]
      }
    },
    methods: {
      remove (user) {
        this.$firebase.database().ref(`groups/-${this.groupId}/members/${user.uid}`).set({})
      }
    },
    watch: {
      members (val) {
        // this.totalItems = val.length
      }
    },
    mounted () {
      const self = this
      this.$firebase.database().ref(`groups/-${this.groupId}/members`).on('value', snap => {
        self.members = []
        snap.forEach(childSnap => {
          const member = childSnap.val()
          if (member.approvalStatus === 1) {
            self.members.push(member)
          }
        })
      })
    },
    computed: {
      user () {
        return this.$store.getters.getUserDetails
      }
    }
  }
</script>

<style>
    .reduce-fab {
        width: 40px !important;
        height: 40px !important;
    } 
</style>
