import { store, AVATARS, showToast } from '../store.js';
import { ActivityCard } from '../components/ActivityCard.js';

export const MyPage = {
  components: { ActivityCard },
  template: `
    <div class="page">
      <h1 class="page-title">👤 我的</h1>

      <!-- Setup Modal -->
      <div class="modal-overlay" v-if="showSetup" @click.self="cancelSetup">
        <div class="modal-content">
          <h2 class="modal-title">设置你的身份</h2>

          <div class="form-group">
            <label class="form-label">选择头像</label>
            <div class="emoji-picker">
              <div
                v-for="emoji in avatars"
                :key="emoji"
                class="emoji-option"
                :class="{ selected: setupForm.avatar === emoji }"
                @click="setupForm.avatar = emoji"
              >{{ emoji }}</div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">你的昵称</label>
            <input
              class="form-input"
              v-model="setupForm.nickname"
              placeholder="取个名字吧"
              maxlength="10"
            />
          </div>

          <button class="btn btn-primary" @click="saveProfile" :disabled="!setupForm.nickname.trim()">
            确定
          </button>
        </div>
      </div>

      <!-- Profile Card -->
      <div class="profile-card" v-if="store.user">
        <div class="profile-avatar">{{ store.user.avatar }}</div>
        <div class="profile-name">{{ store.user.nickname }}</div>
        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-num">{{ myActivities.length }}</div>
            <div class="stat-label">发布</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ joinedActivities.length }}</div>
            <div class="stat-label">参与</div>
          </div>
        </div>
        <button
          class="btn btn-outline"
          style="margin-top:16px;font-size:13px;"
          @click="showSetup = true"
        >修改资料</button>
      </div>

      <div v-else class="profile-card">
        <div class="profile-avatar">❓</div>
        <p style="color:var(--color-text-secondary);margin-bottom:16px;">还没设置身份</p>
        <button class="btn btn-primary" style="width:auto;padding:10px 24px;" @click="showSetup = true">
          设置昵称
        </button>
      </div>

      <!-- My Activities -->
      <div v-if="store.user">
        <h3 class="section-title">我发布的</h3>
        <div v-if="myActivities.length">
          <ActivityCard v-for="a in myActivities" :key="a.id" :activity="a" />
        </div>
        <div v-else class="empty-state">
          <p class="empty-text">还没发布过活动</p>
        </div>

        <h3 class="section-title" style="margin-top:24px;">我参与的</h3>
        <div v-if="joinedActivities.length">
          <ActivityCard v-for="a in joinedActivities" :key="a.id" :activity="a" />
        </div>
        <div v-else class="empty-state">
          <p class="empty-text">还没参与过活动</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      store,
      avatars: AVATARS,
      showSetup: false,
      setupForm: {
        avatar: AVATARS[0],
        nickname: ''
      }
    };
  },
  computed: {
    myActivities() {
      return store.getMyActivities();
    },
    joinedActivities() {
      return store.getJoinedActivities();
    }
  },
  mounted() {
    if (!store.user) {
      this.showSetup = true;
    } else {
      this.setupForm.avatar = store.user.avatar;
      this.setupForm.nickname = store.user.nickname;
    }
  },
  methods: {
    saveProfile() {
      if (!this.setupForm.nickname.trim()) return;

      const user = {
        id: store.user?.id || 'user_' + Date.now().toString(36),
        nickname: this.setupForm.nickname.trim(),
        avatar: this.setupForm.avatar,
        createdAt: store.user?.createdAt || Date.now()
      };

      store.setUser(user);
      this.showSetup = false;
      showToast('设置成功！');
    },
    cancelSetup() {
      if (store.user) {
        this.showSetup = false;
      }
    }
  }
};
