<template>
  <div class="star-rating">
    <ul>
      <li :class="{'enabled': isRateEnabled(0)}" @click="onClickOnRate(0)">⭐️</li>
      <li :class="{'enabled': isRateEnabled(0.25)}" @click="onClickOnRate(0.25)">⭐️</li>
      <li :class="{'enabled': isRateEnabled(0.5)}" @click="onClickOnRate(0.50)">⭐️</li>
      <li :class="{'enabled': isRateEnabled(0.75)}" @click="onClickOnRate(0.75)">⭐️</li>
      <li :class="{'enabled': isRateEnabled(1)}" @click="onClickOnRate(1)">⭐️</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'star-rating',
  props: ['value'],
  data() {
    return {
    }
  },
  methods: {
      onClickOnRate(val) {
          this.$emit('input', val)
      },
      isRateEnabled(rate) {
        return this.value >= rate;
      }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    user-select: none;
    cursor: pointer;
    filter: grayscale(100%);
    display: inline;
    font-size: 3em;
    &.enabled {
      filter: grayscale(0%);
    }
  }
}
</style>
