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
  VListItemTitle 
} from 'vuetify/components';

const vuetify = createVuetify({
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
    VListItemTitle
  },
  theme: {
    defaultTheme: 'light', // or 'dark'
  },
});

export default vuetify;
