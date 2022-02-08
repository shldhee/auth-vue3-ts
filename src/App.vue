<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/signin">로그인</router-link> |
    <router-link to="/user">회원 정보 조회</router-link> |
    <router-link to="/reset-password">비밀번호 재설정</router-link>
  </div>
  <router-view class="content" />
</template>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
