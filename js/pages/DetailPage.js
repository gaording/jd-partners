import { store, CATEGORIES, formatPlannedTime, showToast } from '../store.js';

export const DetailPage = {
  template: `
    <div class="page" v-if="activity">
      <button class="back-btn" @click="$router.back()">← 返回</button>

      <div class="detail-header">
        <span class="category-badge" :class="activity.type">
          {{ categoryInfo.emoji }} {{ categoryInfo.label }}
        </span>
        <h1 class="detail-title">{{ activity.title }}</h1>
        <p class="detail-desc" v-if="activity.description">{{ activity.description }}</p>
      </div>

      <div class="detail-info">
        <div class="detail-info-item">
          <span>📍</span>
          <span>{{ activity.location }}</span>
        </div>
        <div class="detail-info-item">
          <span>🕐</span>
          <span>{{ plannedTimeStr }}</span>
        </div>
        <div class="detail-info-item">
          <span>👥</span>
          <span>{{ activity.participants.length + 1 }}/{{ activity.maxParticipants }} 人参加</span>
        </div>
        <div class="detail-info-item">
          <span>🙋</span>
          <span>发起人：{{ activity.creatorAvatar }} {{ activity.creatorName }}</span>
        </div>
      </div>

      <div class="participants-section" v-if="activity.participants.length">
        <h3 class="participants-title">已加入的搭子</h3>
        <div class="participant-list">
          <div class="participant-item" v-for="p in activity.participants" :key="p.id">
            <span>{{ p.avatar }}</span>
            <span>{{ p.nickname }}</span>
          </div>
        </div>
      </div>

      <div v-if="canJoin" style="margin-top:auto;">
        <button class="btn btn-primary" @click="handleJoin">🙋 我要加入</button>
      </div>
      <div v-else-if="isMine" style="margin-top:16px;">
        <button class="btn btn-primary" style="background:var(--color-secondary);" @click="handleShare">📤 分享给同事</button>
      </div>
      <div v-else-if="hasJoined" style="text-align:center;padding:16px;color:var(--color-secondary);font-weight:500;">
        ✓ 你已加入此活动
      </div>
      <div v-else-if="activity.status === 'full'" style="text-align:center;padding:16px;color:var(--color-text-secondary);">
        人已满
      </div>
    </div>

    <div v-else class="page">
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p class="empty-text">活动不存在</p>
      </div>
    </div>
  `,
  data() {
    return { store };
  },
  computed: {
    activity() {
      const id = this.$route.params.id;
      return store.activities.find(a => a.id === id);
    },
    categoryInfo() {
      return CATEGORIES[this.activity?.type] || {};
    },
    plannedTimeStr() {
      return this.activity ? formatPlannedTime(this.activity.plannedTime) : '';
    },
    canJoin() {
      if (!store.user || !this.activity) return false;
      if (this.activity.creatorId === store.user.id) return false;
      if (this.activity.participants.find(p => p.id === store.user.id)) return false;
      if (this.activity.status === 'full') return false;
      return true;
    },
    isMine() {
      return store.user && this.activity && this.activity.creatorId === store.user.id;
    },
    hasJoined() {
      if (!store.user || !this.activity) return false;
      return this.activity.participants.some(p => p.id === store.user.id);
    }
  },
  methods: {
    handleJoin() {
      if (!store.user) {
        this.$router.push('/my');
        return;
      }
      const ok = store.joinActivity(this.activity.id);
      if (ok) {
        showToast('加入成功！');
      }
    },
    handleShare() {
      const url = window.location.href;
      const text = `我在「JD Partners」发了个活动：${this.activity.title}\n快来看看 → ${url}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('已复制分享文案到剪贴板');
        });
      } else {
        showToast('请手动复制链接分享');
      }
    }
  }
};
