<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <div class="ModalCart-Header">
                <h1>장바구니</h1>
            </div>
            <hr />

            <!-- 장바구니 목록 -->
            <div class="cartList">
                <table class="cartListTable">
                    <thead>
                        <tr>
                            <th style="width: 5%">
                                <input
                                    type="checkbox"
                                    @change="toggleAllSelect"
                                    :checked="allSelected"
                                />
                            </th>
                            <th style="width: 20%">제공</th>
                            <th style="width: 40%">상품명</th>
                            <th style="width: 8%">상품 종류</th>
                            <th style="width: 15%">수익률</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in paginatedCartItems"
                            :key="item.productId"
                            :class="{ 'selected-row': selected.includes(item.productId) }"
                            @click="toggleSelect(item)"
                        >
                            <td>
                                <input type="checkbox" :value="item.productId" v-model="selected" />
                            </td>
                            <td>{{ item.provider }}</td>
                            <td>{{ item.productName }}</td>
                            <td>
                                <span v-if="item.productType === 'S'">
                                    {{ item.rsrvType === null ? '예금' : '적금' }}
                                </span>
                                <span v-else-if="item.productType === 'B'">채권</span>
                                <span v-else-if="item.productType === 'F'">펀드</span>
                                <span v-else>기타</span>
                            </td>
                            <td :style="getColorStyle(item.expectedReturn)">
                                <span v-if="item.expectedReturn > 0"
                                    >+{{ item.expectedReturn }}%</span
                                >
                                <span v-else-if="item.expectedReturn < 0"
                                    >{{ item.expectedReturn }}%</span
                                >
                                <span v-else>{{ item.expectedReturn }}%</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 페이지네이션 -->
            <div class="pagination-controls">
                <button
                    @click="
                        () => {
                            changePage(-1);
                            selected = [];
                        }
                    "
                    :disabled="currentPage === 1"
                >
                    이전
                </button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button
                    @click="
                        () => {
                            changePage(1);
                            selected = [];
                        }
                    "
                    :disabled="currentPage === totalPages"
                >
                    다음
                </button>
            </div>

            <!-- 하단 버튼들 -->
            <div class="ModalCart-btn">
                <button @click="addToPortfolio">추가하기</button>
                <button @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import {
    getDepositProductDetail,
    getSavingProductDetail,
    getFundProductDetail,
    getBondProductDetail,
} from '@/api/financeApi.js';
import { getCartList } from '@/api/cartApi';

export default {
    name: 'ModalCart',
    setup(props, { emit }) {
        const selected = ref([]);
        // const selectedProductType = ref('');
        const cartItems = ref([]);
        const currentPage = ref(1);
        const itemsPerPage = ref(7);

        onMounted(async () => {
            try {
                cartItems.value = await getCartList();
            } catch (error) {
                console.error('장바구니 데이터를 불러오는 중 오류 발생:', error);
                alert('장바구니 정보를 불러오는 중 오류가 발생했습니다.');
            }
        });

        const paginatedCartItems = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return cartItems.value.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(cartItems.value.length / itemsPerPage.value) || 1;
        });

        const toggleSelect = (item) => {
            const index = selected.value.indexOf(item.productId);
            if (index > -1) {
                selected.value.splice(index, 1);
            } else {
                selected.value.push(item.productId);
            }
        };

        const toggleAllSelect = () => {
            if (allSelected.value) {
                selected.value = [];
            } else {
                selected.value = paginatedCartItems.value.map((item) => item.productId);
                console.log(selected.value);
            }
        };

        const allSelected = computed(() => {
            return (
                selected.value.length > 0 &&
                selected.value.length === paginatedCartItems.value.length
            );
        });

        const changePage = (direction) => {
            currentPage.value += direction;
        };

        const getColorStyle = (value) => ({
            color: value > 0 ? 'red' : value < 0 ? 'blue' : 'black',
        });

        const addToPortfolio = async () => {
            if (selected.value.length === 0) {
                alert('선택한 상품이 없습니다.');
                return;
            }

            try {
                const selectedProducts = await Promise.all(
                    selected.value.map(async (productId) => {
                        const item = cartItems.value.find((item) => item.productId === productId);
                        let productDetails;

                        if (item.productType === 'S') {
                            if (item.rsrvType === null) {
                                productDetails = await getDepositProductDetail(item.productId);
                                productDetails.productType = 'S';
                            } else {
                                productDetails = await getSavingProductDetail(item.productId);
                                productDetails.productType = 'S';
                            }
                        } else if (item.productType === 'F') {
                            productDetails = await getFundProductDetail(item.productId);
                            productDetails.productType = 'F';
                        } else if (item.productType === 'B') {
                            productDetails = await getBondProductDetail(item.productId);
                            productDetails.productType = 'B';
                        }

                        return { ...productDetails };
                    })
                );
                emit('add-items', selectedProducts);
            } catch (error) {
                alert('중복된 상품을 추가하셨습니다!');
            }
            closeModal();
        };

        const closeModal = () => {
            emit('close');
        };

        return {
            selected,
            paginatedCartItems,
            toggleSelect,
            toggleAllSelect,
            addToPortfolio,
            closeModal,
            allSelected,
            currentPage,
            totalPages,
            changePage,
            getColorStyle,
        };
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background-color: white;
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 20px;
}

.ModalCart-Header {
    text-align: center;
}

.Cart-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.product-type-filter {
    padding: 5px;
}

.cartListTable {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.cartListTable th,
.cartListTable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    height: 60px;
}

.selected-row {
    background-color: #e0f7fa;
}

.ModalCart-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    gap: 10px;
}

.ModalCart-btn button {
    padding: 10px 20px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.ModalCart-btn button:hover {
    background-color: #399d91;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
}

.pagination-controls button {
    padding: 5px 10px;
}
</style>
