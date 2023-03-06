<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input :value="subject" @input="onInput" type="text" class="form-control" />
    <!-- input에 원래 있던 v-model은 (v-model:"todo.subject") todo가 부모 컴포넌트에 존재함으로 사용할 수 없다. -->
    <div v-if="error" class="text-error">{{ error }}</div>
  </div>
</template>

<script>
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
  setup(props, { emit }) {
    const onInput = (e) => {
      // console.log(e.target.value)
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
