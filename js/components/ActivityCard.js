import { store, CATEGORIES, getRelativeTime, formatPlannedTime } from '../store.js';

export const ActivityCard = {
  props: ['activity'],
  template: `
    <div class="activity-card" @click="goDetail">
      <div class="card-header">
        <span class="category-badge" :class="activity.type">
          {{ categoryInfo.emoji }} {{ categoryInfo.label }}
        </span>
        <span class="time-ago">{{ relativeTime }}</span>
      </div>
      <h3 class="card-title">{{ activity.title }}</h3>
      <div class="card-meta">
        <span>📍 {{ activity.location }}</span>
        <span>🕐 {{ plannedTimeStr }}</span>
        <span v-if="activity.contact">💬 {{ activity.contact }}</span>
      </div>
      <div class="card-footer">
        <div class="creator">
          <span class="avatar">{{ activity.creatorAvatar }}</span>
          <span class="creator-name">{{ activity.creatorName }}</span>
        </div>
        <span class="participant-count">
          {{ activity.participants.length + 1 }}/{{ activity.maxParticipants }}人
        </span>
      </div>
    </div>
  `,
  computed: {
    categoryInfo() {
      return CATEGORIES[this.activity.type] || {};
    },
    relativeTime() {
      return getRelativeTime(this.activity.createdAt);
    },
    plannedTimeStr() {
      return formatPlannedTime(this.activity.plannedTime);
    }
  },
  methods: {
    goDetail() {
      this.$router.push('/detail/' + this.activity.id);
    }
  }
};
