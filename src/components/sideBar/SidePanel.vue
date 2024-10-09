<template>
    <div v-if="isVisible" class="side-panel">
      <button @click="$emit('close')" class="close-button">Close</button>
      <h2>{{ panelTitle }}</h2>
      <slot></slot> <!-- Use a slot to display content dynamically -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidePanel',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      panelTitle: {
        type: String,
        default: '',
      },
    },
  };
  </script>
  
  <style scoped>
  .side-panel {
    position: fixed;
    right: 0;
    top: 0;
    width: 300px; /* Adjust width as needed */
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;
  }
  .close-button {
    margin-bottom: 20px;
  }
  </style>
  