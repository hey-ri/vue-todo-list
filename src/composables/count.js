import { reactive, toRefs } from 'vue';

export const useCount = () => {
  const state = reactive({
    count: 0,
  });

  //count의 값이 Home.vue에서 사용할 때 reactive 했던 것을 구조분해할당 하면서 빼가기 때문에 reactive 함이 사라진다. 그럴 때 toRefs를 쓰면 된다.
  return toRefs(state);
};
