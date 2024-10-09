<template>
    <li class="menu-item" ref="menuItem" @click="toggleDropdown(2)">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-shopping-cart icon"></i>
        <span class="menu-text">장바구니</span>
      </a>
      <div v-if="activeDropdown === 2" class="dropdown-content" ref="dropdown">
        <div class="cart-dropdown">
          <h3 class="section-title">장바구니</h3>
          <div v-if="cart.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
          <table v-else class="cart-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="index">
                <td class="item-name">{{ item.name }}</td>
                <td class="item-price">{{ item.price }}원</td>
                <td class="item-quantity">{{ item.quantity }}</td>
                <td>
                  <button class="cart-trashcanBtn" @click="removeFromCart(item)">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: 'CartSection',
    props: {
      activeDropdown: {
        type: Number,
        required: true,
      },
      cart: {
        type: Array,
        required: true,
      },
      removeFromCart: {
        type: Function,
        required: true,
      },
    },
    toggleDropdown(menuNumber) {
  const dropdown = this.$refs.dropdown; // 드롭다운 요소에 대한 참조

  if (activeDropdown.value === menuNumber) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = menuNumber;
    this.$nextTick(() => {
      const menuItem = this.$refs[`menuItem${menuNumber}`]; // 각 메뉴 항목에 대한 참조
      const rect = menuItem.getBoundingClientRect();
      dropdown.style.left = `${rect.right}px`; // 드롭다운의 왼쪽 위치를 메뉴 항목의 오른쪽으로 설정
      dropdown.style.top = `${rect.top}px`; // 드롭다운의 상단을 메뉴 항목의 상단과 맞추기
    });
  }
}

  };
  </script>
  
  <style scoped>
  .menu-item {
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
    position: relative; /* 드롭다운을 상대적으로 배치하기 위해 position을 relative로 설정 */
  }
  
  .sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    color: grey;
    text-decoration: none;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  
  .sidebar-link:hover {
    background-color: #d7dbde; /* Change background on hover */
  }
  
  .icon {
    font-size: 24px; /* Size of the icon */
    margin-bottom: 5px;
  }
  
  .menu-text {
    font-size: 0.7rem;
    opacity: 1; /* Always fully visible */
    transition: none; /* Remove the transition */
  }
  
  .dropdown-content {
    position: absolute; /* Absolute로 설정하여 메뉴 항목에 상대적으로 배치 */
    background-color: #fff;
    padding: 10px;
    width: 180px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none; /* 기본적으로 숨김 */
  }
  
  .dropdown-content.show {
    display: block; /* 드롭다운을 보이게 하기 위한 클래스 */
  }
  
  .cart-dropdown {
    padding: 10px;
  }
  
  .section-title {
    font-size: 1.4rem;
    color: #2d6a4f;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 1.1rem;
    color: #777;
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
  }
  
  .cart-table th {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .cart-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .cart-trashcanBtn {
    background-color: #e74c3c; /* Red button for delete */
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth hover effect */
  }
  
  .cart-trashcanBtn:hover {
    background-color: #c0392b; /* Darker red on hover */
  }
  </style>
  