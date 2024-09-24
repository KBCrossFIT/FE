import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global Vuetify styles

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
    },
    theme: {
        defaultTheme: 'light', // or 'dark'
    },
});

// Export the Vuetify instance
export default vuetify;
