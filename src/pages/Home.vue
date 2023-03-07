<template>
  <div>Home Page</div>
  <span>{{ count }}</span>
  <button @click="count++" class="btn btn-primary ml-3">Add</button>
</template>

<script>
import { useCount } from '@/composables/count';
export default {
  setup() {
    const { count } = useCount();
    //return 받은 state 안에 count가 있기 때문에 구조분해할당을 통해 count를 가져올 수 있다.
    console.log(count);

    //return을 {count}로 넣으주지 않으면 렌더링이 일어나지 않는다 왜지..?
    return { count };
  },
};
</script>

<style></style>
