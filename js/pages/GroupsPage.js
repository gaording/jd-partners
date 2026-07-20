import { store, showToast } from '../store.js';

const SEED_GROUPS = [
  {
    id: 'g1',
    name: '亦庄跑团',
    tags: ['运动', '跑步'],
    description: '每周三五约跑，配速430-600都有，欢迎加入',
    contact: '京ME群：yizhuang-runners',
    contactType: 'jingme',
    members: 28,
    avatar: '🏃'
  },
  {
    id: 'g2',
    name: '下班喝一杯',
    tags: ['喝酒', '社交'],
    description: '周五晚上固定局，园区附近的精酿/清吧/居酒屋轮着来',
    contact: '微信群：加微信 beer_friday 拉你',
    contactType: 'wechat',
    members: 15,
    avatar: '🍺'
  },
  {
    id: 'g3',
    name: '撸铁互助组',
    tags: ['运动', '健身'],
    description: '公司健身房常驻，互相 spot，新手友好',
    contact: '京ME群：jd-gym-bros',
    contactType: 'jingme',
    members: 12,
    avatar: '💪'
  },
  {
    id: 'g4',
    name: '周末户外探险',
    tags: ['户外', '徒步', '露营'],
    description: '骑行、徒步、爬山、露营，北京周边都去，每周末出发',
    contact: '京ME群：weekend-outdoor',
    contactType: 'jingme',
    members: 35,
    avatar: '⛰️'
  },
  {
    id: 'g5',
    name: '干饭人联盟',
    tags: ['美食', '探店'],
    description: '探索园区周边美食，每天中午换着吃，拒绝食堂',
    contact: '微信群：加微信 foodie_jd 拉你',
    contactType: 'wechat',
    members: 42,
    avatar: '🍖'
  },
  {
    id: 'g6',
    name: 'Rust 学习小组',
    tags: ['学习', '编程语言', 'Rust'],
    description: '一起学 Rust，每周分享一个知识点，有问题群里随时讨论',
    contact: '京ME群：rust-learners',
    contactType: 'jingme',
    members: 8,
    avatar: '🦀'
  },
  {
    id: 'g7',
    name: '王者开黑群',
    tags: ['游戏', '王者荣耀'],
    description: '中午和晚上开黑，段位钻石以上，打排位为主',
    contact: '京ME群：wzry-rank',
    contactType: 'jingme',
    members: 20,
    avatar: '🎮'
  },
  {
    id: 'g8',
    name: '算法刷题日常',
    tags: ['学习', '算法', '面试'],
    description: '每日一题力扣，群内讨论思路，面试季冲刺',
    contact: '京ME群：leetcode-daily',
    contactType: 'jingme',
    members: 18,
    avatar: '🧮'
  },
  {
    id: 'g9',
    name: '羽毛球约场',
    tags: ['运动', '羽毛球'],
    description: '每周二四约羽毛球，公司体育馆，水平不限',
    contact: '微信群：加微信 badminton_jd 拉你',
    contactType: 'wechat',
    members: 16,
    avatar: '🏸'
  },
  {
    id: 'g10',
    name: '咖啡品鉴会',
    tags: ['美食', '咖啡'],
    description: '手冲爱好者，每周五下午在咖啡厅品鉴不同产区豆子',
    contact: '京ME群：coffee-tasting',
    contactType: 'jingme',
    members: 9,
    avatar: '☕'
  },
  {
    id: 'g11',
    name: '亦庄骑行团',
    tags: ['户外', '骑行'],
    description: '公路车/山地车都行，周末约骑京郊，30-80km',
    contact: '京ME群：cycling-yizhuang',
    contactType: 'jingme',
    members: 22,
    avatar: '🚴'
  },
  {
    id: 'g12',
    name: '威士忌品鉴',
    tags: ['喝酒', '威士忌'],
    description: '每月一次威士忌品鉴会，AA制，轮流选酒',
    contact: '微信群：加微信 whisky_club 拉你',
    contactType: 'wechat',
    members: 11,
    avatar: '🥃'
  },
  {
    id: 'g13',
    name: 'AI 学习社',
    tags: ['学习', 'AI', 'LLM', 'Agent'],
    description: '关注 LLM/Agent/RAG 前沿，每周读一篇论文，分享落地实践',
    contact: '京ME群：jd-ai-study',
    contactType: 'jingme',
    members: 45,
    avatar: '🤖'
  },
  {
    id: 'g14',
    name: 'Prompt Engineering',
    tags: ['学习', 'AI', '提示词'],
    description: '研究提示词工程，分享 Claude/GPT 使用技巧，提升工作效率',
    contact: '京ME群：prompt-eng',
    contactType: 'jingme',
    members: 32,
    avatar: '💡'
  },
  {
    id: 'g15',
    name: 'AI 编程实战',
    tags: ['学习', 'AI', '编程'],
    description: '用 AI 辅助编程的实战经验分享，Cursor/Copilot/Claude Code 使用心得',
    contact: '京ME群：ai-coding-jd',
    contactType: 'jingme',
    members: 27,
    avatar: '⚡'
  },
  {
    id: 'g16',
    name: '系统设计读书会',
    tags: ['学习', '系统设计', '读书'],
    description: '精读 DDIA/SRE/架构之美，每两周一章，群内讨论',
    contact: '京ME群：system-design-book',
    contactType: 'jingme',
    members: 14,
    avatar: '📖'
  }
];

const GROUPS_STORAGE_KEY = 'dazi_groups_v2';

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
          class="filter-tab"
          :class="{ active: selectedTag === '' }"
          @click="selectedTag = ''"
        >🔥 全部</button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="filter-tab"
          :class="{ active: selectedTag === tag }"
          @click="selectedTag = tag"
        >{{ tag }}</button>
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
            <div class="group-tags">
              <span class="tag-pill" v-for="t in group.tags" :key="t" @click.stop="selectedTag = t">{{ t }}</span>
            </div>
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
        <p class="empty-text">这个标签下还没有群组</p>
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
            <label class="form-label">标签（用空格分隔，如"学习 AI Python"）</label>
            <input class="form-input" v-model="newGroup.tagsInput" placeholder="运动 跑步" />
            <div class="tag-hints" v-if="tagHints.length">
              <span class="tag-hint" v-for="t in tagHints" :key="t" @click="addTagHint(t)">+ {{ t }}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">群头像 emoji</label>
            <input class="form-input" v-model="newGroup.avatar" placeholder="🤖" maxlength="2" style="width:60px;text-align:center;font-size:24px;" />
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
          <div class="group-tags" style="justify-content:center;margin-bottom:12px;">
            <span class="tag-pill" v-for="t in detailGroup.tags" :key="t">{{ t }}</span>
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
      selectedTag: '',
      groups: getGroups(),
      showAddForm: false,
      detailGroup: null,
      newGroup: {
        name: '',
        tagsInput: '',
        avatar: '✨',
        description: '',
        contact: '',
        contactType: 'jingme'
      }
    };
  },
  computed: {
    allTags() {
      const countMap = {};
      this.groups.forEach(g => {
        (g.tags || []).forEach(t => {
          countMap[t] = (countMap[t] || 0) + 1;
        });
      });
      return Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag);
    },
    filteredGroups() {
      if (!this.selectedTag) return this.groups;
      return this.groups.filter(g => (g.tags || []).includes(this.selectedTag));
    },
    canSubmit() {
      return this.newGroup.name.trim() && this.newGroup.tagsInput.trim() && this.newGroup.contact.trim();
    },
    tagHints() {
      const input = this.newGroup.tagsInput.toLowerCase();
      if (!input) return this.allTags.slice(0, 8);
      const existing = input.split(/\s+/).filter(Boolean);
      return this.allTags.filter(t => !existing.includes(t) && t.toLowerCase().includes(existing[existing.length - 1] || '')).slice(0, 6);
    }
  },
  methods: {
    showDetail(group) {
      this.detailGroup = group;
    },
    addTagHint(tag) {
      const parts = this.newGroup.tagsInput.split(/\s+/).filter(Boolean);
      if (parts.length > 0) {
        parts[parts.length - 1] = tag;
      } else {
        parts.push(tag);
      }
      this.newGroup.tagsInput = parts.join(' ') + ' ';
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
      const tags = this.newGroup.tagsInput.split(/\s+/).filter(Boolean).slice(0, 5);
      const group = {
        id: 'g_' + Date.now().toString(36),
        name: this.newGroup.name.trim(),
        tags,
        description: this.newGroup.description.trim(),
        contact: this.newGroup.contact.trim(),
        contactType: this.newGroup.contactType,
        members: 1,
        avatar: this.newGroup.avatar || '✨'
      };
      this.groups.unshift(group);
      saveGroups(this.groups);
      this.showAddForm = false;
      this.newGroup = { name: '', tagsInput: '', avatar: '✨', description: '', contact: '', contactType: 'jingme' };
      showToast('推荐成功！');
    }
  }
};
