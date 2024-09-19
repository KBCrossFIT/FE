<template>
    <v-app>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="3" md="2" lg="3">
                    <v-card class="pa-4" elevation="2">
                        <v-card-text>
                            <v-list>
                                <v-list-item @click="navigateTo('/mypage')">
                                    <v-list-item-content>
                                        <v-list-item-title>내 개인정보</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="navigateTo('/mypageEdit')">
                                    <v-list-item-content>
                                        <v-list-item-title>개인 정보 수정</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="8" lg="6">
                    <v-card class="pa-8" elevation="2">
                        <v-card-title class="text-h5 teal--text">내 개인정보</v-card-title>

                        <v-card-text>
                            <v-form>
                                전체 이름
                                <v-text-field
                                    :value="user.fullName"
                                    prepend-icon="mdi-account"
                                    readonly
                                ></v-text-field>
                                이메일
                                <v-text-field
                                    :value="user.email"
                                    prepend-icon="mdi-email"
                                    type="email"
                                    readonly
                                ></v-text-field>

                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        생년월일
                                        <v-text-field
                                            :value="user.dob"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="user.dob"
                                        @input="menu = false"
                                        :readonly="true"
                                    ></v-date-picker>
                                </v-menu>

                                성별
                                <v-text-field
                                    :value="user.gender"
                                    prepend-icon="mdi-gender"
                                    type="gender"
                                    readonly
                                ></v-text-field>

                                <v-btn color="teal" block @click="navigateTo('/mypageEdit')"
                                    >수정하기</v-btn
                                >
                                <v-btn color="teal" block @click="navigateTo('/')">돌아가기</v-btn>
                                <v-btn color="teal" block @click="handleDelete()">탈퇴하기</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- Confirmation Dialog -->
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">탈퇴 확인</v-card-title>
                <v-card-text>정말로 탈퇴하시겠습니까?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="confirmDelete">확인</v-btn>
                    <v-btn color="grey" text @click="dialog = false">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    name: 'MyPage',
    data() {
        return {
            user: {
                fullName: '홍길동',
                email: 'hong@example.com',
                dob: '1990-01-01', // Example date
                gender: 'male',
            },
            menu: false,
            dialog: false,
        };
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        handleDelete() {
            this.dialog = true; // Open the confirmation dialog
        },
        confirmDelete() {
            this.dialog = false; // Close the dialog
            this.$router.push('/'); // Redirect to homepage
        },
    },
};
</script>

<style scoped>
/* Styling to match the login and signup pages */
.v-application {
    background-color: #f0f9f9;
}

.v-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title {
    text-align: center;
    color: #4db6ac;
    margin-bottom: 20px;
}

.v-text-field {
    margin-bottom: 15px;
}

.v-btn {
    background-color: #4db6ac;
    color: white;
    border-radius: 5px;
    font-size: 16px;
}

.v-btn:hover {
    background-color: #399d91;
}
</style>
