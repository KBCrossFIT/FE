<template>
  <div id="news-title" style="display: flex">
    <div id="up-title" style="flex: 1">
      <v-img
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-img>
    </div>

    <div id="down-title" style="flex: 1">
      <div id="second" class="card-wrapper">
        <v-card class="mx-auto" color="white" max-width="400" title="연합뉴스">
          <template v-slot:prepend>
            <v-icon class="black-icon">mdi-newspaper</v-icon>
          </template>

          <!-- 내용 -->
          <v-card-text
            class="text-h6 py-3"
            style="
              color: black;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              max-height: 4.5em;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            "
          >
            뉴스 제목
          </v-card-text>
          <v-card-text
            class="text-h7 py-3"
            style="
              color: black;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              max-height: 4.5em;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            "
          >
            뉴스 내용 두 줄까지 사용
          </v-card-text>

          <!-- 유트버 프로필 이미지 -->
          <v-card-actions>
            <v-list-item class="w-100">
              <v-img
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                width="50"
                height="50"
                class="rounded-0 me-2"
              ></v-img>

              <!-- 유트버 프로필 -->
              <v-list-item-content>
                <v-list-item-title style="color: black"
                  >Evan You</v-list-item-title
                >
                <v-list-item-subtitle style="color: black"
                  >Vue Creator</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
