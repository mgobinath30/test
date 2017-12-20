<template>
  <v-card id="right_section">
      <v-toolbar class="white elevation-0">
        <v-toolbar-title class="">
          Layout/Block Settings
        </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-layout row wrap>
            <!-- <v-card-text>
              Welcome, Feel free to edit blocks on the landing page from this section
            </v-card-text> -->
          <v-flex xs12>
            <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Jumbotron Section</div>
              <block
                :items="jumbotron_items"
                :submitData="submitData"
                :loading="loading"
                type="jumbotron"
                :data="settings.jumbotron"
              ></block>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-flex>
          <v-flex xs12>
            <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Information Section</div>
              <block
                :items="info_items"
                :submitData="submitData"
                :loading="loading"
                type="info_section"
                :data="settings.info_section"
              ></block>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-flex>
          <v-flex xs12>
            <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Introduction Section</div>
              <multiple-block
                :items="intro_items"
                :submitData="submitData"
                :loading="loading"
                type="intro_section"
                :data="settings.intro_section"
              ></multiple-block>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-flex>
          <v-flex xs12>
            <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">FAQ Section</div>
                <multiple-block
                  :items="faq_items"
                  :submitData="submitData"
                  :loading="loading"
                  type="faq"
                  :data="settings.faq"
                ></multiple-block>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-flex>
          <v-flex xs12>
            <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Case Studies</div>
              <multiple-block
                :items="casestudies_items"
                :submitData="submitData"
                :loading="loading"
                type="case_studies"
                :data="settings.case_studies"
              ></multiple-block>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-flex>
          <v-flex xs12>
            <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Footer Section</div>
                <multiple-block
                  :items="footer_items"
                  :submitData="submitData"
                  :loading="loading"
                  type="footer"
                  :data="settings.footer"
                ></multiple-block>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-container>
  </v-card>
</template>
<script src="./js/landing.js"></script>
<style lang="stylus" scoped>
.title-header {
  font-size: 18px;
  text-align: center;
  left 0;
  color: #205c43;
}
#tab-item {
  min-width: 20px;
}
.pa-3 {

}
</style>