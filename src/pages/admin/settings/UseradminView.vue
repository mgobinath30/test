<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs11 order-md2 order-xs2>
        <v-card fill-height height="750px">
          <v-toolbar class="white elevation-0">
            <v-toolbar-title class="">
              User Settings
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            User Administration              </v-card-text>
          <v-flex xs12 class="mt-3">
            <v-card>
              <v-data-table
                v-bind:headers="headers"
                v-bind:items="allUsers"
                v-bind:search="search"
                v-model="selected"
                select-all
                class="elevation-1"
                :rows-per-page-items="[15, 25, 50, 100]"
              >
                <template slot="headers" scope="props">
                  <tr>
                    <th>
                      <v-checkbox
                        primary
                        hide-details
                        @click.native="toggleAll"
                        :input-value="props.all"
                        :indeterminate="props.indeterminate"
                      ></v-checkbox>
                    </th>
                    <th v-for="header in props.headers" :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', header.value === 'status' ? 'indent' : '']"
                        @click="changeSort(header.value)"
                    >
                      <v-icon>arrow_upward</v-icon>
                      {{ header.text }}
                    </th>
                  </tr>
                </template>
                <template slot="items" scope="props">
                  <tr :active="props.selected" @click="props.selected = !props.selected">
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      :input-value="props.selected"
                    ></v-checkbox>
                  </td>
                  <td class="text-xs-center">
                    <v-icon small color="green lighten-1" v-if=" props.item.status == 'online' ">mdi-circle</v-icon>
                    <v-icon small color="gray lighten-1" v-if=" props.item.status == 'offline' ">mdi-circle</v-icon>

                  </td>
                  <td class="text-xs-left">
                    <div class="avatar ml-2" style="height: 24px; width: 24px;">
                      <img :src="props.item.avatar" :alt="returnName(props.item)"></div>
                    {{ returnName(props.item) }}</td>
                  <td class="text-xs-left">{{ props.item.email }}</td>
                  <td class="text-xs-left"  v-for="role in roles" v-if="role.value==props.item.role">
                    {{ role.text |checkRoleData}}</td>
                  <td class="text-xs-left">{{ props.item.createdAt |formatDate}}</td>
                  <td class="text-xs-left">{{ props.item.lastlogin |formatDateTime}}</td>
                  <td class="text-xs-right">
                    <v-menu bottom left>
                      <v-btn icon slot="activator" class="darken-1" flat="flat">
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile v-for="item in menuitems" :key="item.title">
                          <v-list-tile-title dark  @click="checkFunc(item.dialog)" @click.prevent="assignId(props.item.uid,props.item.role)" >{{ showEnableDisable(item.title,props.item.role) }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </td>
                  </tr>
                </template>
              </v-data-table>
              <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
              </div>
            </v-card>
          </v-flex>
        </v-card>

        <v-dialog v-model="grouppassword">
          <v-card>
            <v-card-title>
              <span class="headline">Password Change</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <alert v-if="passwordUpdatedError.length" :text="passwordUpdatedError" color="error"  @dismissed="removePasswordAlert" class="py-2"/>
                    <alert v-if="passwordUpdated" :text="'Successfully updated password'" color="success"  @dismissed="removePasswordAlert" class="py-2"/>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field  class="pt-0" type="password" placeholder="New Password" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="grouppassword = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="groupmember">
          <v-card>
            <v-card-title>
              Group Membership
            </v-card-title>
            <v-card-text>
              <v-select
                v-bind:items="roles"
                v-model="selectedMembership"
                label="Select Membership"
                class="input-group--focused"
                item-value="value"
                item-text="text"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" flat @click.stop="groupmember=false">Close</v-btn>
              <v-btn color="primary" flat @click.native="updateGroupMemberShip()">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deletemember" >
          <v-card>
            <v-card-title>
              <div class="headline">Really delete?</div>
            </v-card-title>
            <v-card-text>Are you sure you want to delete?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue--text darken-1" flat @click.native="deletemember = false">No</v-btn>
              <v-btn color="blue--text darken-1" flat @click.native="deleteRow()">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="togglestatus" >
          <v-card>
            <v-card-title>
              <div class="headline">Really {{getUserStatus()}}?</div>
            </v-card-title>
            <v-card-text>Are you sure you want to {{getUserStatus()}} it?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue--text darken-1" flat @click.native="togglestatus = false">No</v-btn>
              <v-btn color="blue--text darken-1" flat @click.native="disableUser(5)">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-flex>
      <v-flex xs2 order-md1 order-xs3 class="mr-3 ml-0">
        <AdminSideBarMenu />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import AdminSideBarMenu from './Components/AdminSideBar.vue'
  import moment from 'moment'
  import Vue from 'vue'
  Vue.filter('checkRoleData', function (value) {
    console.log('******'+value)
    if (value) {
      return value 
    }
    else {
      return 'NA'
    }
  })
  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
    }
    else {
      return 'NA'
    }
  })
  Vue.filter('formatDateTime', function (value) {
    if (value) {
      return moment(String(value)).format('MMM DD, YYYY')
    }
    else {
      return 'NA'
    }
  })
  export default {
    components: {
      AdminSideBarMenu
    },
    computed: {
      users () {
        return this.$store.getters.fetchUsers
      },
      loading () {
        return this.$store.getters.getLoading
      },
      error () {
        return this.$store.getters.getError
      },
      updateProcess () {
        return this.$store.getters.getProcess === 'Settings Saved'
      },
      process () {
        return this.$store.getters.getProcess
      },
      allUsers () {
        return this.users
      },
      pages () {
        return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
      },
      all_priviledges () {
        return this.$store.getters.getAllPriviledges
      },
      roles () {
        const allRoles = []
        const levels = Object.keys(this.all_priviledges)
        levels.forEach((role) => {
          const data = {}
          data['text'] = this.all_priviledges[role]['title']
          data['value'] = role
          allRoles.push(data)
        })
        return allRoles
      }
    },
    data () {
      return {
        currentUserId: '',
        grouppassword: false,
        groupmember: false,
        deletemember: false,
        togglestatus: false,
        newPassword: '',
        passwordUpdatedError: '',
        passwordUpdated: false,
        selectedMembership: '',
        selected: [],
        search: '',
        userStatus: '',
        pagination: {rowsPerPage: 10},

        menuitems: [
          {
            title: 'Reset a User Password',
            dialog: 'grouppassword'
          },
          {
            title: 'Group Membership',
            dialog: 'groupmember'
          },
          { title: 'Delete User',
            dialog: 'deletemember'
          },
          { title: 'Disable user',
            dialog: 'togglestatus'
          }
        ],
        headers: [
          {
            text: 'Presence',
            value: 'status',
            align: 'right',
            sortable: false
          },
          {
            text: 'Name',
            value: 'firstname',
            align: 'center',
            sortable: true
          },
          {
            text: 'Email',
            value: 'email',
            align: 'center',
            sortable: true
          },
          {
            text: 'Role',
            value: 'role',
            align: 'left',
            sortable: false
          },
          {
            text: 'Created',
            value: 'created',
            align: 'left',
            sortable: false
          },
          {
            text: 'Last Login',
            align: 'center',
            sortable: false,
            value: 'posteddate'
          },
          {
            text: '',
            align: 'center',
            sortable: false,
            value: 'posteddate'
          }
        ],
        items: []
      }
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.allUsers.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      showEnableDisable: function (titt, role) {
        let title = titt
        if ((role === 5) && (title === 'Disable user')) {
          title = 'Enable User'
        }
        return title
      },
      returnName: function (key) {
        return key.firstname + ' ' + key.lastname
      },
      onDismiss () {
        this.$store.dispatch('setError', null)
        this.$store.dispatch('setProcess', 'null')
      },
      triggerDrawer () {
        this.drawer = !this.drawer
      },
      checkFunc (data) {
        if (data === 'grouppassword') {
          this.grouppassword = !this.grouppassword
        } else if (data === 'groupmember') {
          this.groupmember = !this.groupmember
        } else if (data === 'deletemember') {
          this.deletemember = !this.deletemember
        } else if (data === 'togglestatus') {
          this.togglestatus = !this.togglestatus
        }
      },
      assignId (userId, userStatus) {
        this.currentUserId = userId
        this.userStatus = userStatus
      },
      deleteRow () {
        this.deletemember = false
        const payload = {
          uid: this.currentUserId
        }
        this.$store.dispatch('deleteUser', payload)
      },
      updateGroupMemberShip () {
        this.groupmember = false
        this.togglestatus = false
        const payload = {
          uid: this.currentUserId,
          role: this.selectedMembership

        }
        this.$store.dispatch('updateUser', payload)
      },
      disableUser (membership) {
        let userss = this.userStatus
        if (this.userStatus === 5) {
          userss = 4
        } else {
          userss = 5
        }
        this.togglestatus = false
        const payload = {
          uid: this.currentUserId,
          role: userss

        }
        this.$store.dispatch('updateUser', payload)
      },
      getUserStatus () {
        let userss = 'Enable'

        if (this.userStatus === 5) {
          userss = 'Enable'
        } else {
          userss = 'Disable'
        }
        return userss
      },
      changePassword () {
      },
      removePasswordAlert () {
        this.passwordUpdatedError = ''
        this.passwordUpdated = false
      }
    }

  }
</script>
<style>
  .navigation-drawer {
    position: fixed;
  }
  table.table tbody td {
    font-weight: normal !important;
    font-size: 14px !important;
    font-family: sans-serif !important;
  }
  td:nth-child(2) {
    text-align: center;
}

td.text-xs-left {
    padding: 10px !important;
}

th.column {
    text-align: left !important;
    padding-left: 0px !important;
}
.list__tile__title {
    font-family: sans-serif !important;
}
.indent {
  text-indent: 19px;
}
</style>
