<template>
  <v-card
      :class="{ 'price-card-with-border': item.selected, 'price-card': true }"
      @click="$emit('update:selected', index)"
  >
    <v-img src="@/assets/price-card-image.png" class="price-card-image"></v-img>

    <v-card-text class="mt-2 mt-sm-0" align="center" style="position: relative; z-index: 1">
      <h1 class="price"><sup>$</sup>{{ item.price }}<span class="mo">/mo</span></h1>
      <p>{{ item.download }} Mbps Download</p>
      <p>{{ item.upload }} Mbps Upload</p>
      <p>Unlimited Data</p>
    </v-card-text>

    <v-card-actions class="text-center my-4 mb-md-8">
      <v-btn
          color="buttons"
          dark
          rounded
          width="100%"
          height="40"
          class="px-auto mx-auto mb-8 mb-md-12"
          @click="$emit('update:contact', true)"
      >
        Contact Us
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>

.price-card {
  padding: 30px 20px;
  margin: 40px 20px;
  width: 280px;
  height: 380px;
}

.price-card-with-border {
  box-sizing: border-box;
  border-style: solid;
  border-radius: 16px!important;
  transition: all 0.8s;
  border-top: 4px solid #20731C!important;
  border-bottom: 4px solid #20731C90!important;
}

p, .question {
  font-size: 16px;
  line-height: 180%;
}

p {
  text-align: center;
  color: #000;
}
.question {
  font-weight: bold;
}

.price {
  color: #20731C;
}
.mo {
  font-weight: normal;
  font-size: 18px;
}
.price-card-image {
  width: 172px;
  height: 157px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
}

@media screen and (max-width: 959px) {
  .price-card {
    padding: 16px;
    width: 250px;
    height: 320px;
  }
  p, .question {
    font-size: 13px;
    line-height: 130%;
  }
}

</style>

<script>

export default {
  name: 'PriceCard',
  props: ['item', 'index', 'contact']
}
</script>
