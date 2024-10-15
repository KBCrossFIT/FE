<template>
    <div class="black-bg" v-if="isOpen" @click="closeModal">
        <div class="white-bg" @click.stop>
            <div class="content-wrapper">
                <div class="details">
                    <div class="box1">
                        <h3 class="section-title">{{ persona.personaName || '이름 없음' }}</h3>
                        <div class="persona-comment">
                            <PersonaComment :persona="persona" />
                        </div>
                        <div class="persona-info">
                            <p><strong>직업:</strong> {{ persona.job || '직업 정보 없음' }}</p>
                        </div>
                        <span class="preference-inline">
                            투자성향: {{ getPreferenceText(persona.personaPreference) }}
                            <span class="preference-number">({{ persona.personaPreference }})</span>
                        </span>
                    </div>

                    <div class="info-row">
                        <div class="persona-chart">
                            <PersonaChart :persona="persona" />
                        </div>
                    </div>
                </div>

                <!-- Chatbot Interaction Section -->
                <div class="chatbot">
                    <!-- Icon and Name aligned inline -->
                    <div class="chatbot-header">
                        <div class="icon-wrapper">
                            <PersonaImage :persona="persona" />
                        </div>
                        <span class="chatbotName">{{ persona.personaName }}</span>
                    </div>

                    <div class="chatbox">
                        <div class="messages" ref="messageContainer">
                            <p
                                v-for="(msg, index) in messages"
                                :key="index"
                                :class="msg.isBot ? 'bot-message' : 'user-message'"
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
import { defineComponent, ref, nextTick } from 'vue';
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
    height: 90vh;
    width: 70vw;
    background: white;
    border-radius: 1rem;
    overflow-y: auto;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.details {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    flex: 6.5;
    padding-right: 1vw;
    border-right: 1px solid #ddd;
}

.box1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    text-align: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    gap: 0.5vh;
    padding: 1.5vh 0;
    margin: 2vh auto 0 auto; /* 상단에 여유를 줘 페르소나 이름이 잘리지 않도록 */
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1vh;
}

.persona-image {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border: 1px solid #7bd5c3;
}

.persona-comment {
    font-size: 1.1rem;
    font-style: italic;
    color: #555;
    max-width: 80%;
    margin-bottom: 1vh;
    line-height: 1.5;
}

.persona-info {
    font-size: 1rem;
    color: #333;
    margin-bottom: 1.5vh;
}

/* Center alignment for info-row */
.info-row {
    display: flex;
    justify-content: flex-start; /* Aligns contents to the left */
    align-items: flex-start;
    margin: 0 auto;
    width: 60%;
    padding: 1vw;

    box-sizing: border-box;
    flex-direction: column; /* Stack contents vertically */
}

.persona-chart {
    display: flex;
    justify-content: flex-start; /* Aligns the chart to the left */
    align-items: center;
    width: auto; /* Ensures chart size fits within the container */
    max-width: 200px;
    margin: 0;
    padding: 1vh 0; /* Adds vertical padding */
    text-align: left;
}

/* Chatbot styling remains unchanged */
.chatbot {
    flex: 3.5;
    height: 100%;
    width: 100%;
    font-family: 'Nanum Gothic', sans-serif;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: center; /* 수직 중앙 정렬 */
}

.chatbot-header {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 1vh;
}

.icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chatbotName {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
}

.chatbox {
    display: flex;
    flex-direction: column;
    height: 85%;
    width: 90%;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 1vh;
    display: flex;
    flex-direction: column;
    gap: 0.8vh;
}

.bot-message {
    align-self: flex-start;
    background-color: #7bd5c3;
    border-radius: 10px;
    padding: 1vh 2vw;
    color: white;
    max-width: 80%;
}

.user-message {
    align-self: flex-end;
    background-color: #e0e0e0;
    border-radius: 10px;
    padding: 1vh 2vw;
    max-width: 80%;
}

.input-box {
    display: flex;
    width: 100%; /* 전체 너비 차지 */
    margin-top: 1vh;
}

.input-box input {
    flex: 8;
    width: 100%; /* input 필드도 부모의 전체 너비 사용 */
    padding: 1vh;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.input-box button {
    flex: 2;
    width: 100%; /* 버튼도 100% 너비 */
    padding: 1vh;
    margin-left: 1vw;
    background-color: #61cafa;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.input-box button:hover {
    background-color: #42b0e8;
}

.preference-inline {
    font-style: italic;
}

.preference-number {
    color: #21a8e6;
    margin-left: 4px;
}
</style>
