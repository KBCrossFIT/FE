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
                        <div class="persona-info">
                            <p><strong>직업:</strong> {{ persona.job || '직업 정보 없음' }}</p>
                        </div>
                    </div>

                    <div class="info-row">
                        <div class="persona-chart">
                            <PersonaChart :persona="persona" />
                        </div>
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
    overflow: hidden;
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
    overflow-y: auto;
    padding-top: 2vh; /* 부모 컨테이너의 시작 위치 고정 */
}

.box1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    gap: 0.5vh;
    padding: 1.5vh 0;
    padding-bottom: 2vh; /* 아래쪽으로만 확장 */
    margin: 0 auto; /* 중앙 정렬 */
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1vh;
}

.persona-image {
    width: 100px;
    height: 100px;
    margin-bottom: 1vh;
    overflow: hidden;
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
    padding: 1vw;
    font-family: 'Nanum Gothic', sans-serif;
    overflow-y: auto;
}

.chatbotName {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin: 1.5vh 0;
}

.chatbox {
    display: flex;
    flex-direction: column;
    height: 85%;
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
    margin-top: 1vh;
}

.input-box input {
    flex: 8;
    padding: 1vh;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.input-box button {
    flex: 2;
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
</style>
