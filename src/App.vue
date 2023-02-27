<template>
  <h1 class="name">Hello {{ name }} site</h1>
  <h1 class="name">Hello {{ greeting() }} site</h1>
  <h1 class="name">Hello {{ greeting2("hori") }} site</h1>
  <h1 class="name">Hello {{ greeting2(name) }} site</h1>
  <h1 class="name">Hello {{ greet }} site</h1>
</template>

<script>
export default {
  setup() {
    const name = "hey-ri";

    const greeting = () => {
      return "hari, ";
    };

    const greeting2 = (name) => {
      return "hello, " + name;
    };

    const greet = greeting(name);

    return {
      name,
      greeting,
      greeting2,
      greet,
    };
  },
};
</script>

<style>
.name {
  color: #5a4c3a;
}
</style>
