import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global Vuetify styles
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import components
import {
  VApp,
  VAppBar,
  VToolbar,
  VToolbarTitle,
  VSpacer,
  VCard,
  VCardSubtitle,
  VMain,
  VFooter,
  VRow,
  VCol,
  VList,
  VListItem,
  VListItemTitle,
  VCardTitle, // μ¶”κ°€
  VCardText, // μ¶”κ°€
  VContainer, // μ¶”κ°€
  VTextField, // μ¶”κ°€
  VDatePicker, // μ¶”κ°€
  VForm, // μ¶”κ°€
  VRadioGroup, // μ¶”κ°€
  VRadio, // μ¶”κ°€
  VMenu, // μ¶”κ°€
  VBtn, // μ¶”κ°€
} from 'vuetify/components';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // MDI μ•„μ�΄μ½� μ„Έν�Έ μ‚¬μ�©
  },
  components: {
    VApp,
    VAppBar,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VCard,
    VCardSubtitle,
    VMain,
    VFooter,
    VRow,
    VCol,
    VList,
    VListItem,
    VListItemTitle,

    VCardTitle, // 추가
    VCardText, // 추가
    VContainer, // 추가
    VTextField, // 추가
    VDatePicker, // 추가
    VForm, // 추가
    VRadioGroup, // 추가
    VRadio, // 추가
    VMenu, // 추가
    VBtn, // 추가
    VPagination, // 추가
    VDataTable, // 추가
    VCheckbox,
    VSparkline,
    VSheet,
    VDivider,
    VIcon,
    VImg,
    VListItemSubtitle,
    VCardActions,
} from 'vuetify/components';

// Create Vuetify instance
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },

    components: {
        VApp,
        VAppBar,
        VToolbar,
        VToolbarTitle,
        VSpacer,
        VCard,
        VCardSubtitle,
        VMain,
        VFooter,
        VRow,
        VCol,
        VList,
        VListItem,
        VListItemTitle,
        VCardTitle, // 추가
        VCardText, // 추가
        VContainer, // 추가
        VTextField, // 추가
        VDatePicker, // 추가
        VForm, // 추가
        VRadioGroup, // 추가
        VRadio, // 추가
        VMenu, // 추가
        VBtn, // 추가
        VPagination, // 추가
        VDataTable, // 추가
        VCheckbox,
        VSparkline,
        VSheet,
        VDivider,
        VIcon,
        VListItem,
        VImg,
        VListItemSubtitle,
        VCardActions,
    },
    theme: {
        defaultTheme: 'light', // or 'dark'
    },
});

// export default vuetify;
export default createVuetify({
  components,
  directives,
});