<template>
  <h1 v-bind:class="nameClass">Hello {{ name.name }} site {{ name.id }}</h1>
  <!-- <h1 class="name">Hello {{ greeting() }} site</h1>
  <h1 class="name">Hello {{ greeting2("hori") }} site</h1>
  <h1 class="name">Hello {{ greeting2(name) }} site</h1>
  <h1 class="name">Hello {{ greet }} site</h1> -->
  <input :type="type" v-bind:value="name.name" />
  <button v-on:click="consleLog" class="btn btn-primary">Click</button>
  <button @click="updateName" class="btn btn-primary">change name, input type</button>
  <h2>my age {{ age.id }}</h2>
  <!-- age.id로 접근 하지 않으면 {"id":1}이렇게 표시됨 -->
  <button @click="updateAge" class="btn btn-primary">change age</button>

  <!-- v-bind === :value -->
  <!-- v-on === @click -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    //ref는 숫자, 스트링, 오브젝트, 어레이가 다 들어가고 .value를 해줘야 쓸 수 있다.
    let name = ref({ name: "hey-ri", age: 20 });
    const type = ref("radio");
    const nameClass = ref("names");

    //reactive는 오브젝트, 어레이만 들어갈 수 있으며 .value없이 접근 가능하다. 밑에 처럼
    let age = reactive({ id: 1 });

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
      name.value.name = "jane";
      name.value.id = 50;
      type.value = "text";
      console.log(name);
    };

    const updateAge = () => {
      age.id = 20;
    };

    return {
      name,
      // greeting,
      // greeting2,
      // greet,
      consleLog,
      updateName,
      age,
      updateAge,
      type,
      nameClass,
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
