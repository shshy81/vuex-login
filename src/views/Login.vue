<template>
    <v-container fill-height style="max-width:450px">
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert
                    dense
                    :value="isLoginError"
                    type="error"
                >아이디와 비번 확인해~
                </v-alert>
                <v-alert
                    dense
                    :value="isLogin"
                    type="success"
                >성공~
                </v-alert>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>로그인</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-text-field
                            v-model="email"
                            label="이메일을 입력하세요"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            type="password"
                            label="패스워드를 입력하세요"
                        ></v-text-field>
                        <v-btn block large depressed color="primary"
                            @click="login({
                                email,
                                password: password
                            })"
                        >로그인</v-btn>
                        <!-- <v-btn @click="test">테스트</v-btn>
                        <v-btn @click="postTest">POST테스트</v-btn> -->
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            email: null,
            password: null,
        }
    },
    computed: {
        ...mapState(['isLogin', 'isLoginError'])
    },
    methods: {
        ...mapActions(['login']),
    }
}
</script>