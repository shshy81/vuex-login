<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense nav>
        <v-list-item router :to="{name: 'home'}" link exact>
          <!-- <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title>home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLogin === false" router :to="{name: 'login'}" link exact>
          <v-list-item-content>
            <v-list-item-title>login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else router :to="{name: 'mypage'}" link exact>
          <v-list-item-content>
            <v-list-item-title>mypage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="isLogin"
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item router :to="{name: 'mypage'}">
            <v-list-item-title>마이페이지</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$store.dispatch('logout')">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else router :to="{name : 'login'}">Log IN</v-btn>

    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

  export default {
    data: () => ({ drawer: null }),
    computed: {
        ...mapState(['isLogin', 'isLoginError'])
    },
  }
</script>