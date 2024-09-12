<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-8" elevation="2">
            <v-card-title class="text-h5 teal--text">마이페이지</v-card-title>

            <v-card-text>
              <v-form @submit.prevent="handleUpdate">
                <v-text-field
                  label="전체 이름"
                  v-model="user.fullName"
                  prepend-icon="mdi-account"
                ></v-text-field>

                <v-text-field
                  label="이메일"
                  v-model="user.email"
                  prepend-icon="mdi-email"
                  type="email"
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
                    <v-text-field
                      v-model="user.dob"
                      label="생년월일"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="user.dob" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-radio-group v-model="user.gender" row>
                  <v-radio label="남성" value="male"></v-radio>
                  <v-radio label="여성" value="female"></v-radio>
                  <v-radio label="기타" value="other"></v-radio>
                </v-radio-group>

                <v-btn color="teal" block type="submit">저장</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
        dob: null,
        gender: 'male',
      },
      menu: false,
    };
  },
  methods: {
    handleUpdate() {
      // Handle user data update logic
      console.log('User data updated:', this.user);
      alert('정보가 업데이트되었습니다.');
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
