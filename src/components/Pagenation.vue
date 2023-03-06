<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="onClick(currentPage - 1)" v-if="currentPage !== 1" style="cursor: pointer">
          Previous
        </a>
      </li>
      <li v-for="page in totalPage" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''">
        <a class="page-link" @click="onClick(page)" style="cursor: pointer"> {{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="onClick(currentPage + 1)" v-if="totalPage !== currentPage" style="cursor: pointer"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
import { getCurrentInstance } from 'vue';
export default {
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['click'],
  setup() {
    const { emit } = getCurrentInstance();
    const onClick = (page) => {
      emit('click', page);
    };

    return {
      onClick,
    };
  },
};
</script>
<style scoped>
nav {
  position: absolute;
  left: 50%;
  bottom: -15%;
  transform: translateX(-50%);
}
</style>
