<template>
  <h1 class="name">Hello {{ name }} site</h1>
  <!-- <h1 class="name">Hello {{ greeting() }} site</h1>
  <h1 class="name">Hello {{ greeting2("hori") }} site</h1>
  <h1 class="name">Hello {{ greeting2(name) }} site</h1>
  <h1 class="name">Hello {{ greet }} site</h1> -->
  <button v-on:click="consleLog" class="btn btn-primary">Click</button>
  <button @click="updateName" class="btn btn-primary">change name</button>
</template>

<script>
export default {
  setup() {
    let name = "hey-ri";

    // const greeting = () => {
    //   return "hari, ";
    // };

    // const greeting2 = (name) => {
    //   return "hello, " + name;
    // };

    // const greet = greeting(name);
    const consleLog = () => {
      console.log("hello world");
    };

    const updateName = () => {
      name = "jane";
      console.log(name);
    };

    return {
      name,
      // greeting,
      // greeting2,
      // greet,
      consleLog,
      updateName,
    };
  },
};
</script>

<style>
.name {
  color: #5a4c3a;
}
</style>
