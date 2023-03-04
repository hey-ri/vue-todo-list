<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input :value="subject" @input="onInput" type="text" class="form-control" />
    <div v-if="subjectError" class="text-error">{{ error }}</div>
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
      retuired: true,
    },
    subject: {
      type: String,
      retuired: true,
    },
  },
  setup(props, { emit }) {
    const onInput = (e) => {
      console.log(e.target.value);
      emit('update-subject', e.target.value);
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
