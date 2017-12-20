<template>
<v-card class="pa-2" id="block">
        <v-tabs fixed dark primary centered>
        <v-tabs-bar class="grey lighten">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item
            v-for="i in items"
            :key="i"
            :href="'#tab-' + i"
            id="tab-item"
        >
            {{ i }}
        </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content
            v-for="i in items"
            :key="i"
            :id="'tab-' + i"
        >
            <v-card class="pa-3">
            <v-text-field
            name="input-1"
            label="Title Text"
            id="testing"
            v-model="data.header"
            ></v-text-field>
            <v-text-field
            name="input-7-1"
            label="Subtitle Text"
            multi-line
            v-model="data.sub_text"
            ></v-text-field>
            <v-btn
            :loading="loading"
            @click.prevent="submitData(values)"
            :disabled="loading"
            round secondary dark small
            :id="type"
            >
            <v-icon>save</v-icon>
            Save
            <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
            </span>
            </v-btn>
            </v-card>
        </v-tabs-content>
        </v-tabs>
    </v-card>
</template>
<script>
export default {
  props: ['items', 'submitData', 'loading', 'type', 'data'],
  data () {
    return {
      values: {
        type: this.type,
        data: this.data
      }
    }
  }
}
</script>
<style>
    #block {
        border: #ccc solid 2px;
    }
</style>
