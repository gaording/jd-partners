const STORAGE_KEYS = {
  USER: 'dazi_current_user',
  ACTIVITIES: 'dazi_activities',
  INITIALIZED: 'dazi_initialized'
};

const CATEGORIES = {
  study: { label: '学习搭子', emoji: '📚', color: 'study' },
  gym: { label: '健身搭子', emoji: '💪', color: 'gym' },
  meal: { label: '吃饭搭子', emoji: '🍜', color: 'meal' },
  explore: { label: '逛周边', emoji: '🚶', color: 'explore' }
};

const AVATARS = ['😊', '🐱', '🐶', '🦊', '🐼', '🐨', '🦁', '🐯', '🐸', '🐙'];

const LOCATIONS = [
  '总部A座 3层',
  '总部B座 大堂',
  '公司健身房',
  '园区食堂',
  '园区咖啡厅',
  '公司附近商场',
  '园区跑道',
  '写字楼楼下',
  '公司图书馆',
  '附近公园'
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return new Date(timestamp).toLocaleDateString('zh-CN');
}

function formatPlannedTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const timeStr = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

  if (date.toDateString() === now.toDateString()) {
    return `今天 ${timeStr}`;
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return `明天 ${timeStr}`;
  }
  return `${date.getMonth() + 1}/${date.getDate()} ${timeStr}`;
}

function getSeedActivities() {
  const now = Date.now();
  const hour = 3600000;

  return [
    {
      id: generateId(),
      type: 'study',
      title: '周末一起学 Rust，互相监督',
      description: '最近在学 Rust，一个人容易摸鱼，找个搭子一起写代码互相监督，顺便讨论问题',
      location: '公司图书馆',
      plannedTime: new Date(now + 20 * hour).toISOString(),
      maxParticipants: 3,
      creatorId: 'seed_1',
      creatorName: '前端老王',
      creatorAvatar: '👨‍💻',
      participants: [
        { id: 'seed_p1', nickname: '算法小李', avatar: '🧮', joinedAt: now - 2 * hour }
      ],
      status: 'open',
      createdAt: now - 3 * hour
    },
    {
      id: generateId(),
      type: 'gym',
      title: '下班后去撸铁，求个 spotter',
      description: '练胸日，需要人帮忙保护一下卧推。水平：80kg 左右',
      location: '公司健身房',
      plannedTime: new Date(now + 5 * hour).toISOString(),
      maxParticipants: 2,
      creatorId: 'seed_2',
      creatorName: '肌肉猛男',
      creatorAvatar: '💪',
      participants: [],
      status: 'open',
      createdAt: now - 1 * hour
    },
    {
      id: generateId(),
      type: 'meal',
      title: '中午一起去吃那家新开的烤肉',
      description: '园区北门新开了一家韩式烤肉，两人套餐比较划算，有人一起吗？',
      location: '园区北门外',
      plannedTime: new Date(now + 2 * hour).toISOString(),
      maxParticipants: 4,
      creatorId: 'seed_3',
      creatorName: '干饭达人',
      creatorAvatar: '🍖',
      participants: [
        { id: 'seed_p2', nickname: '小美', avatar: '👩‍🔬', joinedAt: now - 30 * 60000 },
        { id: 'seed_p3', nickname: '实习生小张', avatar: '🐣', joinedAt: now - 15 * 60000 }
      ],
      status: 'open',
      createdAt: now - 2 * hour
    },
    {
      id: generateId(),
      type: 'explore',
      title: '周末骑车去逛逛亦庄湿地公园',
      description: '天气不错，打算周六上午骑共享单车去南边的湿地公园转转，大概2小时',
      location: '公司南门集合',
      plannedTime: new Date(now + 44 * hour).toISOString(),
      maxParticipants: 6,
      creatorId: 'seed_4',
      creatorName: '户外爱好者',
      creatorAvatar: '🚴',
      participants: [
        { id: 'seed_p4', nickname: '摄影小哥', avatar: '📷', joinedAt: now - 5 * hour }
      ],
      status: 'open',
      createdAt: now - 6 * hour
    },
    {
      id: generateId(),
      type: 'study',
      title: '算法刷题小组，每天一道 Hard',
      description: '准备跳槽的来！每天晚上8点一起在力扣上做一道 Hard，互相讲思路',
      location: '总部A座 3层',
      plannedTime: new Date(now + 8 * hour).toISOString(),
      maxParticipants: 5,
      creatorId: 'seed_5',
      creatorName: '卷王本王',
      creatorAvatar: '🏆',
      participants: [
        { id: 'seed_p5', nickname: 'Java架构师', avatar: '☕', joinedAt: now - 4 * hour },
        { id: 'seed_p6', nickname: '转码选手', avatar: '🔄', joinedAt: now - 3 * hour }
      ],
      status: 'open',
      createdAt: now - 5 * hour
    },
    {
      id: generateId(),
      type: 'gym',
      title: '约跑！绕园区3圈配速530',
      description: '有没有跑步的朋友，配速530左右，计划跑5公里，园区跑道环境不错',
      location: '园区跑道',
      plannedTime: new Date(now + 6 * hour).toISOString(),
      maxParticipants: 4,
      creatorId: 'seed_6',
      creatorName: '马拉松选手',
      creatorAvatar: '🏃',
      participants: [],
      status: 'open',
      createdAt: now - 4 * hour
    },
    {
      id: generateId(),
      type: 'meal',
      title: '下午茶！瑞幸拼单凑满减',
      description: '瑞幸满50减15，还差两杯，有没有人一起拼？我来下单',
      location: '总部B座 大堂',
      plannedTime: new Date(now + 1 * hour).toISOString(),
      maxParticipants: 3,
      creatorId: 'seed_7',
      creatorName: '咖啡续命',
      creatorAvatar: '☕',
      participants: [
        { id: 'seed_p7', nickname: '奶茶控', avatar: '🧋', joinedAt: now - 10 * 60000 }
      ],
      status: 'open',
      createdAt: now - 40 * 60000
    },
    {
      id: generateId(),
      type: 'explore',
      title: '周日去大悦城看电影',
      description: '想看那部新上映的科幻片，一个人看没意思，有没有人一起去？可以顺便逛逛',
      location: '公司附近商场',
      plannedTime: new Date(now + 50 * hour).toISOString(),
      maxParticipants: 4,
      creatorId: 'seed_8',
      creatorName: '电影迷',
      creatorAvatar: '🎬',
      participants: [],
      status: 'open',
      createdAt: now - 8 * hour
    },
    {
      id: generateId(),
      type: 'study',
      title: '一起准备系统设计面试',
      description: '模拟系统设计面试，互相出题互相面，每周两次，每次1小时',
      location: '园区咖啡厅',
      plannedTime: new Date(now + 26 * hour).toISOString(),
      maxParticipants: 3,
      creatorId: 'seed_9',
      creatorName: '面试达人',
      creatorAvatar: '🎯',
      participants: [
        { id: 'seed_p8', nickname: '后端大佬', avatar: '🖥️', joinedAt: now - 7 * hour }
      ],
      status: 'open',
      createdAt: now - 10 * hour
    },
    {
      id: generateId(),
      type: 'meal',
      title: '今天食堂有新菜，组团去尝',
      description: '听说二楼食堂上了小龙虾盖饭！要早去不然肯定卖完，11:30 出发',
      location: '园区食堂',
      plannedTime: new Date(now + 1.5 * hour).toISOString(),
      maxParticipants: 5,
      creatorId: 'seed_10',
      creatorName: '美食猎人',
      creatorAvatar: '🦐',
      participants: [
        { id: 'seed_p9', nickname: '永远饿着的人', avatar: '😋', joinedAt: now - 20 * 60000 },
        { id: 'seed_p10', nickname: '减肥失败者', avatar: '🐷', joinedAt: now - 5 * 60000 }
      ],
      status: 'open',
      createdAt: now - 1 * hour
    }
  ];
}

const store = Vue.reactive({
  user: null,
  activities: [],

  init() {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }

    const savedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (savedActivities) {
      this.activities = JSON.parse(savedActivities);
    } else {
      this.activities = getSeedActivities();
      this.saveActivities();
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  },

  saveActivities() {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(this.activities));
  },

  setUser(user) {
    this.user = user;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  addActivity(data) {
    const activity = {
      id: generateId(),
      ...data,
      creatorId: this.user.id,
      creatorName: this.user.nickname,
      creatorAvatar: this.user.avatar,
      participants: [],
      status: 'open',
      createdAt: Date.now()
    };
    this.activities.unshift(activity);
    this.saveActivities();
    this.simulateJoin(activity.id);
    return activity;
  },

  joinActivity(activityId) {
    const activity = this.activities.find(a => a.id === activityId);
    if (!activity || !this.user) return false;
    if (activity.creatorId === this.user.id) return false;
    if (activity.participants.find(p => p.id === this.user.id)) return false;
    if (activity.participants.length >= activity.maxParticipants) return false;

    activity.participants.push({
      id: this.user.id,
      nickname: this.user.nickname,
      avatar: this.user.avatar,
      joinedAt: Date.now()
    });

    if (activity.participants.length >= activity.maxParticipants) {
      activity.status = 'full';
    }

    this.saveActivities();
    return true;
  },

  simulateJoin(activityId) {
    const names = ['路过的同事', '隔壁工位的', '摸鱼中的人', '刚看到的'];
    const avatars = ['😄', '🙋', '✌️', '🤝'];
    const delay = 10000 + Math.random() * 20000;

    setTimeout(() => {
      const activity = this.activities.find(a => a.id === activityId);
      if (!activity || activity.status === 'full') return;

      const idx = Math.floor(Math.random() * names.length);
      activity.participants.push({
        id: 'sim_' + generateId(),
        nickname: names[idx],
        avatar: avatars[idx],
        joinedAt: Date.now()
      });
      this.saveActivities();

      showToast(`${names[idx]} 加入了你的活动！`);
    }, delay);
  },

  getMyActivities() {
    if (!this.user) return [];
    return this.activities.filter(a => a.creatorId === this.user.id);
  },

  getJoinedActivities() {
    if (!this.user) return [];
    return this.activities.filter(a =>
      a.participants.some(p => p.id === this.user.id)
    );
  }
});

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

export { store, CATEGORIES, AVATARS, LOCATIONS, getRelativeTime, formatPlannedTime, showToast };
