<template>
  <div class="text-center">
      <v-dialog
        v-model="success"
        :width="width"
        :height="height"
      >
        <v-card
            class="success-content"
            :width="width"
            :height="height"
        >
          <FoneSymbol class="success-content--svg"/>
          <v-btn
              text
              small
              :class="`success-content-${size}--close-button`"
              @click="$emit('update:success', false)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6741 12.0008L0.274578 1.60119C-0.0915623 1.23505 -0.0915623 0.64143 0.274578 0.275337C0.640718 -0.0907557 1.23434 -0.0908026 1.60044 0.275337L12 10.6749L22.3995 0.275337C22.7657 -0.0908026 23.3593 -0.0908026 23.7254 0.275337C24.0915 0.641477 24.0915 1.2351 23.7254 1.60119L13.3259 12.0007L23.7254 22.4003C24.0915 22.7664 24.0915 23.3601 23.7254 23.7261C23.5423 23.9092 23.3024 24.0007 23.0624 24.0007C22.8225 24.0007 22.5826 23.9092 22.3995 23.7261L12 13.3266L1.60048 23.7261C1.41744 23.9092 1.17748 24.0007 0.937531 24.0007C0.697578 24.0007 0.457672 23.9092 0.274578 23.7261C-0.0915623 23.36 -0.0915623 22.7664 0.274578 22.4003L10.6741 12.0008Z" fill="black"/>
            </svg>
          </v-btn>
          <LikeSymbol :size="likeSize" :class="`success-content-${size}--like`"/>
          <p :class="`success-content--title success-content-${size}--title`">Success!</p>
          <p :class="`success-content--text success-content-${size}--text`">Thank you for your interest. We will get back to you within 48 hours</p>
        </v-card>
      </v-dialog>
    </div>
</template>

<style scoped>
.success-content {
  position: relative;
  top:0;
  left:0;
  overflow: hidden;
}
.success-content * {
  position: absolute;
}
.success-content--svg {
  right: 0;
  bottom: 0;
}
.success-content--title {
  font-style: normal;
  font-weight: bold;
  line-height: 150%;
  letter-spacing: 0.02em;
  color: #4CAF50;
}
.success-content--text {
  font-style: normal;
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0.02em;
  color: #353535;
}
.success-content-button {
  text-transform: none!important;
}

  .success-content-wide--close-button {
    top: 29px;
    right: 32px;
  }
  .success-content-shrink--close-button {
    top: 10px;
    right: 5px;
    transform: scale(0.5, 0.5);
  }

  .success-content-wide--like {
    top: 24px;
    left: -18px;
  }
  .success-content-shrink--like {
    top: 40px;
    left: 0px;
  }

  .success-content-wide--title {
    left: 274px;
    top: 73px;
    font-size: 42px;
    text-align: left;
  }
  .success-content-shrink--title {
    left: 54px;
    top: 200px;
    width: 200px;
    text-align: center;
    font-size: 24px;
  }

  .success-content-wide--text {
    left: 274px;
    top: 141px;
    width: 327px;
    font-size: 24px;
    text-align: left;
  }
  .success-content-shrink--text {
    left: 23px;
    top: 250px;
    width: 250px;
    text-align: center;
    font-size: 18px;
  }

  .success-content-button-wide--light {
    top: 250px;
    left: 274px;
  }
  .success-content-button-shrink--light {
    top: 320px;
    left: 54px;
    font-size: 13px;
  }

  .success-content-button-wide--green {
    top: 250px;
    left: 476px;
  }
  .success-content-button-shrink--green {
    top: 380px;
    left: 48px;
  }
</style>

<script>
import { mapState } from 'vuex'

import FoneSymbol from '@/components/check-availability/FoneSymbol.vue'
import LikeSymbol from '@/components/check-availability/LikeSymbol.vue'

export default {
  name: 'SuccessPopup',
  components: {
    FoneSymbol,
    LikeSymbol
  },
  props: {
    success: Boolean
  },
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapState({
      screen: 'viewportWidth'
    }),
    size () {
      return this.screen > 750 ? 'wide' : 'shrink'
    },
    width () {
      return this.screen > 750 ? 730 : 298
    },
    height () {
      return this.screen > 750 ? 352 : 477
    },
    likeSize () {
      return this.screen > 750 ? 290 : 150
    }
  }
}
</script>
