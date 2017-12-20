<template lang="html">
  <v-card class="xs6 mt-4" flat>
    <v-card-media :src="props.item.companylogo" height="120px" :contain="true">
      <!-- <div class="avatar ml-2" style="height: 150px; width: 150px;">
        <img :src="props.item.companylogo" alt="logo"></div> -->
      <v-layout column class="media">
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-2 mt-4">
          <div class="display-1 pl-2" style="color: #000;">{{ props.item.companylegalname }}
            <v-icon v-if="props.item.verified" small :right="true" primary>verified_user</v-icon>
            <v-icon color="red" v-if="!props.item.verified" small :right="true">error</v-icon>
          </div>
        </v-card-title>
      </v-layout>
    </v-card-media>
    <v-layout>
      <v-flex xs6 class="ma-2 mt-4">
        <v-card light flat>
           <v-list two-line>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ props.item.firstname }} {{ props.item.lastname }}</v-list-tile-title>
                <v-list-tile-sub-title>Full Name</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ props.item.phonenumber }}</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ props.item.email }}</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ props.item.streetaddress }}</v-list-tile-title>
                <v-list-tile-sub-title>Street Address</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>assignment_ind</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Specialties</v-list-tile-sub-title>
                <v-list-tile-title>{{ props.item.specialties }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>pan_tool</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Capabilities</v-list-tile-sub-title>
                <v-list-tile-title>{{ props.item.capabilities }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>chrome_reader_mode</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Capabilities Statements</v-list-tile-title>
                <v-list-tile-sub-title>
                <a v-if="props.item.capabilitiesstatement" target="_blank" :href="props.item.capabilitiesstatement" round color="red lighten-1" dark>View PDF</a>
                <span v-if="!props.item.capabilitiesstatement">Not Available</span>
              </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>explore</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ props.item.dunsnumber }}</v-list-tile-title>
                <v-list-tile-sub-title>Duns Number</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6 class="ma-2 mt-4">
        <v-card light flat>
          <v-list two-line>
            <!-- <v-divider inset></v-divider> -->
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>extension</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ props.item.cageid }}</v-list-tile-title>
                <v-list-tile-sub-title>Cage ID</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>settings_overscan</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Federal Contractor</v-list-tile-title>
              </v-list-tile-content>
              <v-list-action>
                <v-chip v-if="props.item.fedcontractor" color="green" text-color="white">
                  <v-card-text>YES</v-card-text>
                </v-chip>
                <v-chip v-if="!props.item.fedcontractor" color="red" text-color="white">
                  <v-card-text>NO</v-card-text>
                </v-chip>
              </v-list-action>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>toc</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Federal Contractor Type</v-list-tile-sub-title>
                <v-list-tile-title>{{props.item.fedcontractortype}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>subject</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Security Clearance</v-list-tile-sub-title>
                <v-list-tile-title>{{props.item.securityclearance}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>timeline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Primary NAICS Codes</v-list-tile-sub-title>
                <v-list-tile-title>{{props.item.primarynaicscodes}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>dialpad</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Additional NAICS Codes</v-list-tile-sub-title>
                <v-list-tile-title>{{props.item.additionalnaicscodes}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>dialpad</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Primary PSC Codes</v-list-tile-sub-title>
                <v-list-tile-title>{{props.item.primarypsccodes}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
              <v-list-tile-action>
                <v-icon primary>dialpad</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Additional PSC Codes</v-list-tile-sub-title>
                <v-list-tile-title>{{props.item.additionalpsccodes}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['props']
}
</script>

<style lang="css">
</style>
