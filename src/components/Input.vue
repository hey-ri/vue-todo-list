<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input :value="subject" @input="onInput" type="text" class="form-control" />
    <!-- input에 원래 있던 v-model은 (v-model:"todo.subject") todo가 부모 컴포넌트에 존재함으로 사용할 수 없다. 그래서 v-model의 두 역할 :value와 @input을 따로 사용함으로 해결중이다.-->
    <div v-if="error" class="text-error">{{ error }}</div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { emit } = getCurrentInstance();

    const onInput = (e) => {
      console.log(e.target.value);
      //TodoForm에 v-model:subject에서 subject와 이름이 같아야 하고, 그래야 부모에서 onUpdated될 때 값을 업데이트 할 수 있음(onUpdated는 dom tree에 상태가 변경될때 변경됨)
      emit('update:subject', e.target.value);
      /* :하고 props의 이름을 적어줘야 v-model:subject를 한 의미가 있음 */
    };

    return {
      onInput,
    };
  },
};
</script>

<style scoped>
.text-error {
  color: red;
  font-weight: bold;
}
</style>
