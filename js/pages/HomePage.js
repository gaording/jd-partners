import { store, CATEGORIES } from '../store.js';
import { ActivityCard } from '../components/ActivityCard.js';

export const HomePage = {
  components: { ActivityCard },
  template: `
    <div class="page">
      <h1 class="page-title">🤝 JD Partners</h1>

      <div class="filter-tabs">
        <button
          class="filter-tab"
          :class="{ active: currentFilter === 'all' }"
          @click="currentFilter = 'all'"
        >全部</button>
        <button
          v-for="(info, key) in categories"
          :key="key"
          class="filter-tab"
          :class="{ active: currentFilter === key }"
          @click="currentFilter = key"
        >{{ info.emoji }} {{ info.label }}</button>
      </div>

      <div v-if="filteredActivities.length">
        <ActivityCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          :activity="activity"
        />
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">🌟</div>
        <p class="empty-text">暂时没有活动，去发布一个吧！</p>
      </div>
    </div>
  `,
  data() {
    return {
      currentFilter: 'all',
      categories: CATEGORIES
    };
  },
  computed: {
    filteredActivities() {
      if (this.currentFilter === 'all') {
        return store.activities;
      }
      return store.activities.filter(a => a.type === this.currentFilter);
    }
  }
};
