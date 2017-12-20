<template>
  <v-layout row wrap class="body-bg">

    <v-flex xs12>

      <v-parallax :jumbotron="false" :src="site_settings.styles.landing.background_image" :height="parallaxHeight">
        <p id="top">
          <v-btn flat  @click="dialog=true;active='SIGN-UP';" href="#SIGN-UP" dark>Sign Up</v-btn>
          <v-btn flat  @click="dialog=true;active='SIGN-IN';" href="#SIGN-IN" dark>Sign In</v-btn>
        </p>

        <v-layout>
          <img :src="site_settings.styles.general.logo" style="height:100px;position:fixed;top:0;left:0;" class="pl-3 pa-4">
 
        </v-layout>
        <v-layout column align-center justify-center>
          <h2 class="white--text bold">{{sections.jumbotron.header}}</h2>
          <p class="title white--text py-0 pb-3" style="text-align: center; width: 700px;">
            {{sections.jumbotron.sub_text}}
            </p>
          <v-icon x-large dark class="pb-3">play_circle_filled</v-icon>
        </v-layout>
        <v-layout row align-center justify-center right>
            <v-btn class="green accent-2 white--text" href="#learn-more" transition="slide-y-reverse-transition">Learn More</v-btn>
            <v-btn class="red accent-4 white--text" href="#get-started">Get Started</v-btn>
        </v-layout>
      </v-parallax>
    </v-flex>
    <v-container class="pt-5">
      <v-layout row wrap align-center justify-center id="learn-more">
        <v-flex xs1 class="hidden-sm-and-down" ></v-flex>
        <v-flex sm12 md6 style="text-align: center;float: right" class="pr-0 pb-0">
          <v-card class="pb-4">
            <v-card-title class="bold title pb-1 pt-5 px-5" >
              {{sections.info_section.header}}
            </v-card-title>
            <v-card-text class="pb-2 px-5">
              {{sections.info_section.sub_text}}
            </v-card-text>
            <v-btn  flat class="green accent-2 white--text" @click.prevent="dialog = true;active = 'SIGN-UP'" >Sign Up</v-btn>
            <registration-component :trigger="dialog" :active="active" @cancel="dialog=false">
            </registration-component>
          </v-card>
        </v-flex>
        <v-flex hidden-xs-only hidden-sm-only sm12 md5 style="float: left" class="pl-0 pt-0">
          <img src="/static/img/laptop.png" height="250px"></img>
        </v-flex>

      </v-layout>
      <v-divider class="mt-5"></v-divider>
      <v-layout column  align-center align-center class="mt-5"  id="get-started">


        <v-flex xs12>
          <h4 class="text-align-center bold">IT'S EASY TO GET STARTED...</h4>
        </v-flex>
      </v-layout>
      <v-layout row wrap block class="pt-4">
        <v-flex xs12 md4>
          <div>
            <div class="icon-header text-md-center">
              <v-icon dark large class="green--text">check_circle</v-icon>
            </div>
            <div class="mt-3 mb-1">
              <h6 class="text-uppercase">{{ site_settings.pages.landing_pages.intro_section.block1.header }}</h6>
            </div>
            <p>
              {{ site_settings.pages.landing_pages.intro_section.block1.sub_text }}
            </p>
            <v-btn flat class="green accent-2 white--text ml-0">Sign up</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div>
            <div class="icon-header text-md-center">
              <v-icon dark large class="green--text">check_circle</v-icon>
            </div>
            <div class="mt-3 mb-1">
              <h6 class="text-uppercase">{{ site_settings.pages.landing_pages.intro_section.block2.header }}</h6>
            </div>
            <p>
              {{ site_settings.pages.landing_pages.intro_section.block2.sub_text }}
            </p>
            <v-btn flat class="green accent-2 white--text ml-0">Submit company</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div>
            <div class="icon-header text-md-center">
              <v-icon dark large class="green--text">check_circle</v-icon>
            </div>
            <div class="mt-3 mb-1">
              <h6 class="text-uppercase">{{ site_settings.pages.landing_pages.intro_section.block3.header }}</h6>
            </div>
            <p>
              {{ site_settings.pages.landing_pages.intro_section.block3.sub_text }}
            </p>
            <v-btn flat class="green accent-2 white--text ml-0">Get started</v-btn>
          </div>
        </v-flex>

          <!-- <v-stepper> -->
            <!-- <v-stepper-header class="no-box-shadow"> -->
              <!-- <v-stepper-step step="1" complete>CREATE AN ACCOUNT</v-stepper-step> -->
              <!-- <v-divider></v-divider> -->
              <!-- <v-stepper-step step="1" complete>ADD YOUR COMPANY</v-stepper-step> -->
              <!-- <v-divider></v-divider> -->
              <!-- <v-stepper-step step="1" complete>CONNECT & COLLABORATE</v-stepper-step> -->
            <!-- </v-stepper-header> -->
            <!-- <v-steeper-content> -->
              
            <!-- </v-steeper-content> -->
          <!-- </v-stepper> -->
        </v-flex>
      </v-layout>
      <v-divider class="mt-5"></v-divider>
      <v-layout row  wrap class="mt-5" id="get-started">


        <v-flex xs12>
          <h4 class="text-md-center bold">Case Studies</h4>
        </v-flex>
          <v-flex xs12 md4>
            <v-card class="case-study px-4 pt-4 pb-4 mr-3 mb-3">
              <h5 class="">{{ site_settings.pages.landing_pages.case_studies.block1.header }}</h5>
                <p>
                  {{ site_settings.pages.landing_pages.case_studies.block1.sub_text }}
                </p>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="case-study px-4 pt-4 pb-4 mr-3 mb-3">
              <h5 class="">{{ site_settings.pages.landing_pages.case_studies.block2.header }}</h5>
                <p>
                  {{ site_settings.pages.landing_pages.case_studies.block2.sub_text }}
                </p>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="case-study px-4 pt-4 pb-4 mb-3">
              <h5 class="">{{ site_settings.pages.landing_pages.case_studies.block3.header }}</h5>
                <p>
                  {{ site_settings.pages.landing_pages.case_studies.block3.sub_text }}
                </p>
            </v-card>
          </v-flex>
      </v-layout>
      <v-divider class="mt-5"></v-divider>
      <v-layout row column wrap justify-center class="mt-5">
        <v-flex xs12 md12>
          <h4 class="">FAQs</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md6 xs12 class="mb-3 mr-4">
            <div class="question-block">
              <div class="question">
                <h6>{{ site_settings.pages.landing_pages.faq.block1.header }}</h6>
              </div>
              <div class="question-answer">
                <p>
                  {{ site_settings.pages.landing_pages.faq.block1.sub_text }}
                </p>
              </div>
            </div>
        </v-flex>
        <v-flex md6 xs12 class="mb-3">
            <div class="question-block">
              <div class="question">
                <h6>{{ site_settings.pages.landing_pages.faq.block2.header }}</h6>
              </div>
              <div class="question-answer">
                <p>
                  {{ site_settings.pages.landing_pages.faq.block2.sub_text }}
                </p>
              </div>
            </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md6 xs12 class="mb-3 mr-4">
            <div class="question-block">
              <div class="question">
                <h6>{{ site_settings.pages.landing_pages.faq.block3.header }}</h6>
              </div>
              <div class="question-answer">
                <p>
                  {{ site_settings.pages.landing_pages.faq.block3.sub_text }}
                </p>
              </div>
            </div>
        </v-flex>
        <v-flex md6 xs12 class="mb-3">
            <div class="question-block">
              <div class="question">
                <h6>{{ site_settings.pages.landing_pages.faq.block4.header }}</h6>
              </div>
              <div class="question-answer">
                <p>
                  {{ site_settings.pages.landing_pages.faq.block4.sub_text }}
                </p>
              </div>
            </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex xs12>
      <div class="footer-bg pt-5 pb-3">
        <v-container>
          <v-layout row>
            <v-flex md3 xs12>
              <div class="address">
                <h6 class="address-state">{{ site_settings.pages.landing_pages.footer.block1.header }}</h6>
                {{ site_settings.pages.landing_pages.footer.block1.sub_text }}
                <!-- <div class="address-phone">+49 40 432 923023</div>
                <div class="address-email">hello@mail.com</div>
                <address>
                  Happqwmviius 79, 22769
                </address>
                <div class="address-city-country">
                  Hamburg, Germany
                </div> -->
              </div>
            </v-flex>
            <v-flex md6 hidden-xs-only>
            </v-flex>
            <v-flex md3 xs12 class="pt-5">
              <v-icon>mdi-facebook-box</v-icon>
              <v-icon>mdi-twitter</v-icon>
              <v-icon>mdi-instagram</v-icon>
            </v-flex>
          </v-layout>
          <v-layout row class="mt-3">
            <v-flex md12 class="text-md-center">
              {{ site_settings.pages.landing_pages.footer.copyright_info }}
              <!-- 2017 The Simple VUE All rights reserved -->
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-flex>
    <!-- <seo-title value="My exchange"/> -->
  </v-layout>
</template>

<script>
  import RegistrationComponent from '../components/modal/RegistrationComponent.vue'
  // import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
  import 'mdi/css/materialdesignicons.min.css'

  export default {
    components: {
      RegistrationComponent
    },
    data () {
      return {
        parallaxHeight: 1000,
        dialog: false,
        active: 'SIGN-UP'
      }
    },
    mounted () {
      this.parallaxHeight = screen.height - 90
      document.getElementById('app').style.backgroundColor = this.site_settings.styles.landing.background_color || '#fff'
      document.getElementById('app').style.fontSize = this.site_settings.styles.landing.font_size
      console.log(this.landing_page)
    },
    methods: {
      openRegistartionModal () {
        this.trigger = !this.trigger
      }
    },
    computed: {
      loading () {
        return this.$store.getters.getLoading
      },
      site_settings () {
        return this.$store.getters.getSettings
      },
      landing_page () {
        return this.$store.getters.getSettings.pages.landing_pages
      },
      sections () {
        return this.$store.getters.getLandingPage
      }
    },
    watch: {
      hash (value) {
        alert(value)
      }
    }
  }
</script>


<style>
  @import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:900');
  .bold {
    font-family: 'Alegreya Sans SC', sans-serif;
  }
  .body-bg {
    background: #fff;
  }
  #top {
    position: absolute;
    top: 15px;
    right: 50px;
    color: #fff;
  }
  #footer {
    background: #eeeeee;
    background-color: #e0e0e0;
  }

  .no-box-shadow {
    box-shadow: none;
  }

  .text-uppercase {
    text-transform: uppercase;
  }

  .case-study {
    height: 270px !important;
  }

  .footer-bg {
    background: #f3f3f3;
    height: auto;
  }

</style>
