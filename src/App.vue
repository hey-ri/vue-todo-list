<template>
  <input type="text" :value="name" @input="updataName" />
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

    const updataName = (e) => {
      name.value = e.target.value;
    };

    return {
      name,
      onSubmit,
      updataName,
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
