import { store, showToast } from '../store.js';

const GROUP_CATEGORIES = [
  { key: 'all', label: '全部', emoji: '🔥' },
  { key: 'sports', label: '运动', emoji: '🏃' },
  { key: 'food', label: '美食', emoji: '🍜' },
  { key: 'drink', label: '喝酒', emoji: '🍺' },
  { key: 'study', label: '学习', emoji: '📚' },
  { key: 'outdoor', label: '户外', emoji: '⛰️' },
  { key: 'game', label: '游戏', emoji: '🎮' },
  { key: 'other', label: '其他', emoji: '✨' }
];

const SEED_GROUPS = [
  {
    id: 'g1',
    name: '亦庄跑团',
    category: 'sports',
    description: '每周三五约跑，配速430-600都有，欢迎加入',
    contact: '京ME群：yizhuang-runners',
    contactType: 'jingme',
    members: 28,
    avatar: '🏃',
    creatorName: '马拉松选手'
  },
  {
    id: 'g2',
    name: '下班喝一杯',
    category: 'drink',
    description: '周五晚上固定局，园区附近的精酿/清吧/居酒屋轮着来',
    contact: '微信群：加微信 beer_friday 拉你',
    contactType: 'wechat',
    members: 15,
    avatar: '🍺',
    creatorName: '精酿爱好者'
  },
  {
    id: 'g3',
    name: '撸铁互助组',
    category: 'sports',
    description: '公司健身房常驻，互相 spot，新手友好',
    contact: '京ME群：jd-gym-bros',
    contactType: 'jingme',
    members: 12,
    avatar: '💪',
    creatorName: '肌肉猛男'
  },
  {
    id: 'g4',
    name: '周末户外探险',
    category: 'outdoor',
    description: '骑行、徒步、爬山、露营，北京周边都去，每周末出发',
    contact: '京ME群：weekend-outdoor',
    contactType: 'jingme',
    members: 35,
    avatar: '⛰️',
    creatorName: '户外爱好者'
  },
  {
    id: 'g5',
    name: '干饭人联盟',
    category: 'food',
    description: '探索园区周边美食，每天中午换着吃，拒绝食堂',
    contact: '微信群：加微信 foodie_jd 拉你',
    contactType: 'wechat',
    members: 42,
    avatar: '🍖',
    creatorName: '美食猎人'
  },
  {
    id: 'g6',
    name: 'Rust 学习小组',
    category: 'study',
    description: '一起学 Rust，每周分享一个知识点，有问题群里随时讨论',
    contact: '京ME群：rust-learners',
    contactType: 'jingme',
    members: 8,
    avatar: '🦀',
    creatorName: '前端老王'
  },
  {
    id: 'g7',
    name: '王者开黑群',
    category: 'game',
    description: '中午和晚上开黑，段位钻石以上，打排位为主',
    contact: '京ME群：wzry-rank',
    contactType: 'jingme',
    members: 20,
    avatar: '🎮',
    creatorName: '峡谷之巅'
  },
  {
    id: 'g8',
    name: '算法刷题日常',
    category: 'study',
    description: '每日一题力扣，群内讨论思路，面试季冲刺',
    contact: '京ME群：leetcode-daily',
    contactType: 'jingme',
    members: 18,
    avatar: '🧮',
    creatorName: '卷王本王'
  },
  {
    id: 'g9',
    name: '羽毛球约场',
    category: 'sports',
    description: '每周二四约羽毛球，公司体育馆，水平不限',
    contact: '微信群：加微信 badminton_jd 拉你',
    contactType: 'wechat',
    members: 16,
    avatar: '🏸',
    creatorName: '羽球达人'
  },
  {
    id: 'g10',
    name: '咖啡品鉴会',
    category: 'food',
    description: '手冲爱好者，每周五下午在咖啡厅品鉴不同产区豆子',
    contact: '京ME群：coffee-tasting',
    contactType: 'jingme',
    members: 9,
    avatar: '☕',
    creatorName: '咖啡续命'
  },
  {
    id: 'g11',
    name: '亦庄骑行团',
    category: 'outdoor',
    description: '公路车/山地车都行，周末约骑京郊，30-80km',
    contact: '京ME群：cycling-yizhuang',
    contactType: 'jingme',
    members: 22,
    avatar: '🚴',
    creatorName: '骑行老炮'
  },
  {
    id: 'g12',
    name: '威士忌品鉴',
    category: 'drink',
    description: '每月一次威士忌品鉴会，AA制，轮流选酒',
    contact: '微信群：加微信 whisky_club 拉你',
    contactType: 'wechat',
    members: 11,
    avatar: '🥃',
    creatorName: '单麦爱好者'
  }
];

const GROUPS_STORAGE_KEY = 'dazi_groups';

function getGroups() {
  const saved = localStorage.getItem(GROUPS_STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(SEED_GROUPS));
  return SEED_GROUPS;
}

function saveGroups(groups) {
  localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
}

export const GroupsPage = {
  template: `
    <div class="page">
      <h1 class="page-title">👥 兴趣群组</h1>

      <div class="filter-tabs">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="filter-tab"
          :class="{ active: currentFilter === cat.key }"
          @click="currentFilter = cat.key"
        >{{ cat.emoji }} {{ cat.label }}</button>
      </div>

      <div v-if="filteredGroups.length">
        <div
          class="group-card"
          v-for="group in filteredGroups"
          :key="group.id"
          @click="showDetail(group)"
        >
          <div class="group-card-left">
            <div class="group-avatar">{{ group.avatar }}</div>
          </div>
          <div class="group-card-body">
            <div class="group-card-header">
              <span class="group-name">{{ group.name }}</span>
              <span class="group-members">{{ group.members }}人</span>
            </div>
            <p class="group-desc">{{ group.description }}</p>
            <div class="group-contact">
              <span class="contact-badge" :class="group.contactType">
                {{ group.contactType === 'jingme' ? '京ME' : '微信' }}
              </span>
              <span class="contact-text">{{ group.contact }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">👥</div>
        <p class="empty-text">这个分类还没有群组</p>
      </div>

      <!-- Add Group Button -->
      <button class="fab-add-group" @click="showAddForm = true">+ 推荐群组</button>

      <!-- Add Group Modal -->
      <div class="modal-overlay" v-if="showAddForm" @click.self="showAddForm = false">
        <div class="modal-content" style="max-width:380px;">
          <h2 class="modal-title">推荐一个群</h2>

          <div class="form-group">
            <label class="form-label">群名称</label>
            <input class="form-input" v-model="newGroup.name" placeholder="群组名称" maxlength="15" />
          </div>

          <div class="form-group">
            <label class="form-label">分类</label>
            <div class="type-selector">
              <div
                v-for="cat in categories.slice(1)"
                :key="cat.key"
                class="type-option"
                :class="{ selected: newGroup.category === cat.key }"
                @click="newGroup.category = cat.key"
              >{{ cat.emoji }} {{ cat.label }}</div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">群简介</label>
            <textarea class="form-input form-textarea" v-model="newGroup.description" placeholder="这个群是做什么的" maxlength="100"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">联系方式</label>
            <div style="display:flex;gap:8px;margin-bottom:8px;">
              <button
                class="filter-tab"
                :class="{ active: newGroup.contactType === 'jingme' }"
                @click="newGroup.contactType = 'jingme'"
              >京ME</button>
              <button
                class="filter-tab"
                :class="{ active: newGroup.contactType === 'wechat' }"
                @click="newGroup.contactType = 'wechat'"
              >微信</button>
            </div>
            <input class="form-input" v-model="newGroup.contact" placeholder="京ME群号 / 微信号" />
          </div>

          <button class="btn btn-primary" @click="addGroup" :disabled="!canSubmit">提交推荐</button>
        </div>
      </div>

      <!-- Detail Modal -->
      <div class="modal-overlay" v-if="detailGroup" @click.self="detailGroup = null">
        <div class="modal-content" style="max-width:380px;">
          <div style="text-align:center;margin-bottom:16px;">
            <div class="profile-avatar">{{ detailGroup.avatar }}</div>
            <h2 style="font-size:18px;font-weight:700;">{{ detailGroup.name }}</h2>
            <p style="color:var(--color-text-secondary);font-size:13px;margin-top:4px;">{{ detailGroup.members }} 人已加入</p>
          </div>
          <p style="font-size:14px;line-height:1.6;margin-bottom:16px;">{{ detailGroup.description }}</p>
          <div class="detail-info" style="margin-bottom:16px;">
            <div class="detail-info-item">
              <span>💬</span>
              <span>{{ detailGroup.contact }}</span>
            </div>
          </div>
          <button class="btn btn-primary" @click="copyContact(detailGroup)">📋 复制联系方式</button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      categories: GROUP_CATEGORIES,
      currentFilter: 'all',
      groups: getGroups(),
      showAddForm: false,
      detailGroup: null,
      newGroup: {
        name: '',
        category: 'sports',
        description: '',
        contact: '',
        contactType: 'jingme'
      }
    };
  },
  computed: {
    filteredGroups() {
      if (this.currentFilter === 'all') return this.groups;
      return this.groups.filter(g => g.category === this.currentFilter);
    },
    canSubmit() {
      return this.newGroup.name.trim() && this.newGroup.category && this.newGroup.contact.trim();
    }
  },
  methods: {
    showDetail(group) {
      this.detailGroup = group;
    },
    copyContact(group) {
      const text = group.contact;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('已复制，去加群吧！');
          this.detailGroup = null;
        });
      } else {
        showToast('请手动复制：' + text);
      }
    },
    addGroup() {
      if (!this.canSubmit) return;
      const group = {
        id: 'g_' + Date.now().toString(36),
        name: this.newGroup.name.trim(),
        category: this.newGroup.category,
        description: this.newGroup.description.trim(),
        contact: this.newGroup.contact.trim(),
        contactType: this.newGroup.contactType,
        members: 1,
        avatar: GROUP_CATEGORIES.find(c => c.key === this.newGroup.category)?.emoji || '✨',
        creatorName: store.user?.nickname || '匿名'
      };
      this.groups.unshift(group);
      saveGroups(this.groups);
      this.showAddForm = false;
      this.newGroup = { name: '', category: 'sports', description: '', contact: '', contactType: 'jingme' };
      showToast('推荐成功！');
    }
  }
};
