<template>
    <v-app>
        <v-navigation-drawer persistent :mini-variant="!miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
        </v-navigation-drawer>
        <v-toolbar app :clipped-left="clipped">
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></v-icon>
            </v-btn>
            <v-toolbar-title>Splinter Bid</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat>Join Game</v-btn>
                <v-btn flat :to="{name: 'SingleTable'}">Create Game</v-btn>
                <v-btn :to="{name: 'login'}" color="primary">Login/Register</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <router-view />
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [{
                icon: 'fas fa-shapes',
                title: 'Inspire'
            }],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
}
</script>
<style>
@import './assets/styles.scss';
@import '../node_modules/bulma/css/bulma.css';
</style>