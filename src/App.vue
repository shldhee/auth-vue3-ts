<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/signin">signin</router-link>
    <router-link to="/user">user</router-link>
    <router-link to="/reset-password">reset-password</router-link>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
