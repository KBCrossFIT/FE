<template>
    <div class="black-bg" v-if="isOpen" @click="closeModal">
        <div class="white-bg" @click.stop>
            <div class="content-wrapper">
                <div class="details">
                    <div class="box1">
                        <h3 class="section-title">{{ persona.personaName || '이름 없음' }}</h3>
                        <!-- Persona Image -->
                        <div class="persona_image">
                            <PersonaImage :persona="persona" />
                        </div>
                        <!-- Persona Comment -->
                        <div class="persona-comment">
                            <PersonaComment :persona="persona" />
                        </div>
                    </div>

                    <!-- Persona Info and Contact Info in a Single Row -->
                    <div class="info-row">
                        <!-- Persona Info Section -->
                        <div class="persona-info">
                            <p><strong>직업:</strong> {{ persona.job || '직업 정보 없음' }}</p>
                            <p>
                                <strong>투자 성향:</strong>
                                <span class="preference">{{
                                    getPreferenceText(persona.personaPreference)
                                }}</span>
                                <span class="preference-number"
                                    >({{ persona.personaPreference }})</span
                                >
                            </p>
                        </div>

                        <!-- Contact Info Section -->
                        <div class="contact-info">
                            <h3 class="section-title">투자 정보</h3>
                            <p><strong>예/적금:</strong> {{ persona.savingsRate || 'N/A' }}%</p>
                            <p><strong>펀드:</strong> {{ persona.fundRate || 'N/A' }}%</p>
                            <p><strong>채권:</strong> {{ persona.bondRate || 'N/A' }}%</p>
                            <p><strong>주식:</strong> {{ persona.stockRate || 'N/A' }}%</p>
                        </div>
                    </div>

                    <!-- Persona Chart Positioned Below -->
                    <div class="persona-chart">
                        <PersonaChart :persona="persona" />
                    </div>
                </div>

                <!-- Right Section for Chatbot Interaction -->
                <div class="chatbot">
                    <h4 class="chatbotName">{{ persona.personaName }}</h4>
                    <div class="chatbox">
                        <div class="messages" ref="messageContainer">
                            <p
                                v-for="(msg, index) in messages"
                                :key="index"
                                :class="{
                                    'bot-message': msg.isBot,
                                    'user-message': !msg.isBot,
                                }"
                                v-html="msg.text"
                            ></p>
                        </div>
                        <div class="input-box">
                            <input
                                v-model="userMessage"
                                type="text"
                                placeholder="메시지를 입력하세요"
                                @keyup.enter="sendMessage"
                            />
                            <button @click="sendMessage">전송</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, nextTick } from 'vue';
import sendMessageToChatbot from '@/api/chatbot';
import PersonaImage from '@/components/persona/PersonaImage.vue';
import PersonaComment from '@/components/persona/PersonaComment.vue';
import PersonaChart from '@/components/persona/PersonaChart.vue';

export default defineComponent({
    name: 'ModalPersona',
    components: {
        PersonaImage,
        PersonaComment,
        PersonaChart,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        persona: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        const userMessage = ref('');
        const messages = ref([]);
        const messageContainer = ref(null);

        const scrollToBottom = async () => {
            await nextTick();
            if (messageContainer.value) {
                messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
            }
        };

        const sendMessage = async () => {
            if (!userMessage.value.trim()) return;

            const message = userMessage.value;
            messages.value.push({ text: message, isBot: false });
            userMessage.value = '';

            await scrollToBottom();

            try {
                const response = await sendMessageToChatbot(props.persona.personaName, message);
                messages.value.push({ text: response, isBot: true });
            } catch (error) {
                messages.value.push({ text: '응답을 받을 수 없습니다.', isBot: true });
            }

            await scrollToBottom();
        };

        const closeModal = () => {
            messages.value = [];
            emit('close');
        };

        watch(
            () => props.isOpen,
            (newVal) => {
                if (!newVal) {
                    messages.value = [];
                }
            }
        );

        const getPreferenceText = (preference) => {
            switch (preference) {
                case 1:
                    return '위험 투자';
                case 2:
                    return '적극 투자';
                case 3:
                    return '위험 중립';
                case 4:
                    return '안정 추구';
                case 5:
                    return '안정형';
                default:
                    return '정보 없음';
            }
        };

        return {
            closeModal,
            sendMessage,
            userMessage,
            messages,
            messageContainer,
            getPreferenceText,
        };
    },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');

.black-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.white-bg {
    height: 80vh;
    width: 75vw;
    background: white;
    border-radius: 1rem;
}

.content-wrapper {
    display: flex;
    height: 100%;
}

.details {
    flex: 6.5;
    padding-right: 0.3vw;
    border-right: 1px solid #ddd;
    margin-top: 20px;
}

.persona-comment {
    margin: 0 auto;
    width: 60%;
    text-align: center;
    font-size: 1.3rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 1vh;
    margin-bottom: 1vh;
}

.persona-info,
.contact-info {
    flex: 1;
    padding: 0.5vw;
}

.section-title {
    font-size: 1.25rem;
    color: #424242;
    text-align: center;
}

.preference {
    font-weight: 600;
    color: #1976d2;
}

.preference-number {
    font-style: italic;
    color: #9e9e9e;
    margin-left: 4px;
}

/* Persona Chart Section */
.persona-chart {
    margin-top: 2vh;
    display: flex;
    justify-content: left;
    margin-left: 40px;
}

/* Chatbot styling */
.chatbot {
    flex: 3.5;
    padding-right: 1vw;
    padding-left: 1vw;
    font-family: 'Nanum Gothic', sans-serif;
}
.chatbotName {
    font-size: 2rem;
    font-weight: 900;
    color: #333;
    text-align: center;
    margin: 1.5vh 0 0.2vh;
}

.chatbox {
    display: flex;
    flex-direction: column;
    height: 88%;
}

.messages {
    flex: 1;
    overflow-y: scroll;
    padding: 1vw;
    display: flex;
    flex-direction: column;
}

.bot-message {
    align-self: flex-start;
    background-color: #7bd5c3;
    border-radius: 1rem;
    padding: 0.6vw;
    color: white;
    margin: 0.5vh 0;
    margin-right: 20%;
}

.user-message {
    align-self: flex-end;
    background-color: #e0e0e0;
    border-radius: 1rem;
    padding: 0.6vw;
    margin: 0.5vh 0;
    margin-left: 20%;
}

.input-box {
    display: flex;
}

.input-box input {
    flex: 8.5;
    padding: 0.6vw;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
}

.input-box button {
    flex: 1.5;
    padding: 0.6vw;
    margin-left: 0.5vw;
    background-color: #61cafa;
    color: white;
    border: none;
    border-radius: 0.5rem;
}
</style>
