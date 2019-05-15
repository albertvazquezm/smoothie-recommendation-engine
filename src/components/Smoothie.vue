<template>
  <div class="smoothie">
    <ul>
      <li v-for="(ingredient, idx) in ingredients" :key="idx">{{ingredientIcon[ingredient]}}</li>
    </ul>
  </div>
</template>

<script>

import {Ingredient} from '../constants/Ingredient'

export default {
  name: 'smoothie',
  props: ['ingredients'],
  data() {
    return {
      ingredientIcon: Ingredient
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    display: inline;
    font-size: 3em;
  }
}
</style>
