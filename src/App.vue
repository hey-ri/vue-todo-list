<template>
  <h1 class="name">Hello {{ name }} site</h1>
</template>

<script>
export default {
  setup() {
    const name = "hey-ri";

    return {
      name,
    };
  },
};
</script>

<style>
.name {
  color: antiquewhite;
}
</style>
