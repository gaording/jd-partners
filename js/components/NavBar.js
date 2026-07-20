export const NavBar = {
  template: `
    <nav class="nav-bar">
      <div class="nav-item" :class="{ active: isHome }" @click="$router.push('/')">
        <span class="icon">🏠</span>
        <span>首页</span>
      </div>
      <button class="nav-create" @click="$router.push('/create')">+</button>
      <div class="nav-item" :class="{ active: isMy }" @click="$router.push('/my')">
        <span class="icon">👤</span>
        <span>我的</span>
      </div>
    </nav>
  `,
  computed: {
    isHome() {
      return this.$route.path === '/';
    },
    isMy() {
      return this.$route.path === '/my';
    }
  }
};
