<template>
  <input type="text" v-model="name" />
  <button @click="onSubmit" class="btn btn-primary">Click</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let name = ref("hey-ri");

    const onSubmit = () => {
      console.log(name.value);
    };

    return {
      name,
      onSubmit,
    };
  },
};
</script>

<style>
.name {
  color: #5a4c3a;
}

.names {
  color: red;
}
</style>
