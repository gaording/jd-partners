import { store, showToast } from '../store.js';
import { ActivityForm } from '../components/ActivityForm.js';

export const CreatePage = {
  components: { ActivityForm },
  template: `
    <div class="page">
      <h1 class="page-title">✨ 发布活动</h1>

      <div v-if="!store.user" style="text-align:center;padding:40px 0;">
        <p style="color:var(--color-text-secondary);margin-bottom:16px;">请先设置昵称再发布</p>
        <button class="btn btn-primary" style="width:auto;padding:10px 24px;" @click="$router.push('/my')">
          去设置
        </button>
      </div>

      <ActivityForm v-else @submit="handleSubmit" />
    </div>
  `,
  data() {
    return { store };
  },
  methods: {
    handleSubmit(formData) {
      store.addActivity(formData);
      showToast('发布成功！');
      this.$router.push('/');
    }
  }
};
