import { CATEGORIES, LOCATIONS } from '../store.js';

export const ActivityForm = {
  props: ['modelValue'],
  emits: ['update:modelValue', 'submit'],
  template: `
    <div>
      <div class="form-group">
        <label class="form-label">活动类型</label>
        <div class="type-selector">
          <div
            v-for="(info, key) in categories"
            :key="key"
            class="type-option"
            :class="[key, { selected: form.type === key }]"
            @click="form.type = key"
          >
            {{ info.emoji }} {{ info.label }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">活动标题</label>
        <input
          class="form-input"
          v-model="form.title"
          placeholder="简短描述你想做什么"
          maxlength="30"
        />
      </div>

      <div class="form-group">
        <label class="form-label">详细描述</label>
        <textarea
          class="form-input form-textarea"
          v-model="form.description"
          placeholder="补充一些细节，让别人更了解情况"
          maxlength="200"
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">地点</label>
        <input
          class="form-input"
          v-model="form.location"
          placeholder="在哪里集合"
          list="location-list"
        />
        <datalist id="location-list">
          <option v-for="loc in locations" :value="loc"></option>
        </datalist>
      </div>

      <div class="form-group">
        <label class="form-label">计划时间</label>
        <input
          class="form-input"
          type="datetime-local"
          v-model="form.plannedTime"
        />
      </div>

      <div class="form-group">
        <label class="form-label">联系方式（京ME群/微信群）</label>
        <input
          class="form-input"
          v-model="form.contact"
          placeholder="京ME群号、微信群名或个人京ME号"
        />
      </div>

      <div class="form-group">
        <label class="form-label">最多几人参加</label>
        <input
          class="form-input"
          type="number"
          v-model.number="form.maxParticipants"
          min="2"
          max="20"
        />
      </div>

      <button class="btn btn-primary" @click="handleSubmit" :disabled="!isValid">
        发布活动
      </button>
    </div>
  `,
  data() {
    return {
      form: {
        type: 'study',
        title: '',
        description: '',
        location: '',
        contact: '',
        plannedTime: '',
        maxParticipants: 4
      },
      categories: CATEGORIES,
      locations: LOCATIONS
    };
  },
  computed: {
    isValid() {
      return this.form.type && this.form.title.trim() && this.form.location.trim() && this.form.plannedTime;
    }
  },
  methods: {
    handleSubmit() {
      if (!this.isValid) return;
      this.$emit('submit', { ...this.form });
    }
  }
};
