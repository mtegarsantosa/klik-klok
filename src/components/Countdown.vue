<template>
    <div>
        <p>
            <strong>{{minutes}}</strong>
            <strong>:</strong>
            <strong>{{seconds}}</strong>
        </p>
    </div>
</template>

<script>
import {EventBus} from '@/library/EventBus'
export default {
  props: {
      time: {
          type: Number,
          default: 0
      }
  },
  data: function () {
      return {
          total: '',
          minutes: '--',
          seconds: '--',
          interval: 0
      }
  },
  mounted: function () {
      this.total = parseInt(this.time, 10)
      this.interval = setInterval(() => {
          this.tick()
      }, 1000)
  },
  methods: {
      str_pad_left: function (string, pad, length) {
          return (new Array(length+1).join(pad)+string).slice(-length)
      },
      tick: function () {
          var minutes = Math.floor(this.total / 60)
          var seconds = this.total - minutes * 60
            this.minutes = minutes
            this.seconds = seconds

          if (this.total <= 0) {
              clearInterval(this.interval)
              EventBus.$emit('timer/stop')
          }

          this.total -= 1
      }
  }
}
</script>

<style scoped>
  p {
    margin: 0;
    font-size: 100px;
  }
</style>
