<template>
    <v-container>
        <v-row>
            <!-- Influencer Description -->
            <v-col cols="12" md="7" class="d-flex flex-column align-center">
                <h2 class="text-center">{{ influencer.name }}</h2>
                <p class="text-center">{{ influencer.description }}</p>
            </v-col>

            <!-- Chatbot Section -->
            <v-col cols="12" md="5" class="chatbot-section">
                <v-card @click="toggleChatbot" class="chatbot-card">
                    <v-card-title>
                        <h3>Chatbot</h3>
                    </v-card-title>
                    <v-card-text v-if="isChatbotOpen">
                        <p>Chatbot session will be implemented here.</p>
                        <div class="chat-window">
                            <!-- Example chat messages -->
                            <div v-for="(msg, index) in chatMessages" :key="index" class="chat-message">
                                <p>{{ msg }}</p>
                            </div>
                            <v-text-field
                                v-model="userMessage"
                                label="Type your message"
                                @keyup.enter="sendMessage"
                            ></v-text-field>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['name'],
    data() {
        return {
            influencer: {
                name: '',
                description: '',
            },
            isChatbotOpen: false,
            userMessage: '',
            chatMessages: [],
        };
    },
    created() {
        this.fetchInfluencerDetails();
    },
    methods: {
        fetchInfluencerDetails() {
            const influencers = [
                { id: 1, name: '홍길동', description: 'Details about Influencer A' },
                { id: 2, name: '김영희', description: 'Details about Influencer B' },
                { id: 3, name: '이철수', description: 'Details about Influencer C' },
            ];

            this.influencer = influencers.find(inf => inf.name === this.name) || { name: 'Unknown', description: 'No details available.' };
        },
        toggleChatbot() {
            this.isChatbotOpen = !this.isChatbotOpen;
        },
        sendMessage() {
            if (this.userMessage.trim()) {
                this.chatMessages.push(`You: ${this.userMessage}`);
                // Placeholder for bot's response
                this.chatMessages.push(`Bot: This is a response to "${this.userMessage}"`);
                this.userMessage = '';
            }
        },
    },
};
</script>

<style scoped>
.chatbot-section {
    display: flex;
    justify-content: flex-end; /* Align the chatbot section to the right */
    position: relative; /* Positioning for the chatbot dropdown */
}

.chatbot-card {
    cursor: pointer; /* Change cursor to pointer for interactivity */
    position: absolute; /* Position the card */
    bottom: -400px; /* Adjust this value to lower the chatbot */
    right: 20px; /* Adjust this value for horizontal positioning */
    width: 300px; /* Fixed width for the chatbot */
    transition: bottom 0.3s ease; /* Smooth transition */
}

.chat-window {
    max-height: 200px; /* Set a max height for the chat window */
    overflow-y: auto; /* Enable vertical scrolling if needed */
}

.chat-message {
    margin: 5px 0; /* Spacing between messages */
}
</style>
