<template>
<div>
  <div class="timer">
    <div class="text-center">
      <h1><b>Klik-Klok</b> Online Timer</h1>
    </div>
    <div class="set-timer text-center">
      <h4>Set Timer</h4>
      <div class="row">
        <div class="col">
          MINUTES
          <NumberInputSpinner
            :min="0"
            :max="999"
            v-model="time.minutes"
          />
        </div>
        <div class="col">
          SECONDS
          <NumberInputSpinner
            :min="0"
            :max="59"
            v-model="time.seconds"
          />
        </div>
      </div>
      <div class="mt-4 mb-4">
        <div class="row">
          <div class="col-md-11">
            <select class="form-control" @change="getAudio">
              <option value="">-SELECT AUDIO-</option>
              <option v-for="(a,index) in alarmAudio" :key="index" :value="index">{{a.name}}</option>
            </select>
          </div>
          <div class="col-md-1">
            <button v-if="!listening" class="btn btn-light" @click="listenAudio()">🔊</button>
            <button v-else class="btn btn-light" @click="stopListenAudio()">✖</button>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <button v-if="startTimerBool" @click="stopTimer()" class="btn btn-danger w-100">RESET</button>
        <button v-else @click="startTimer()" class="btn btn-primary w-100">START</button>
      </div>
        <Countdown v-if="startTimerBool" class="countdown" :time="time.total" />
    </div>
  </div>
</div>
</template>

<script>
import NumberInputSpinner from 'vue-number-input-spinner'
import Countdown from '@/components/Countdown.vue'
import {EventBus} from '@/library/EventBus'
import {Howl} from 'howler'
export default {
  data() {
    return {
      startTimerBool: false,
      listening: false,
      sound: "",
      time: {
        minutes: 0,
        seconds: 0,
        total: 0
      },
      audio:"",
      alarmAudio: [
        {
          name: "Standart",
          src: "standart.mp3"
        },
        {
          name: "Chicken",
          src: "chicken.mp3"
        },
        {
          name: "Samsung Alarm Ringtone",
          src: "samsung.mp3"
        },
        {
          name: "Bring This Happiness",
          src: "happiness.mp3"
        }
      ]
    }
  },
  components: {
    NumberInputSpinner,
    Countdown
  },
  methods: {
    startTimer() {
      let seconds = (this.time.minutes*60)+this.time.seconds
      this.time.total = seconds
      this.startTimerBool = true
    },
    stopTimer() {
      this.startTimerBool = false
      if (typeof this.sound === "object") this.stopListenAudio()
    },
    getAudio(e) {
      this.audio = this.alarmAudio[e.target.value].src
    },
    listenAudio() {
      var _this = this
      this.listening = true
      this.sound = new Howl({
        src: [`/audio/${this.audio}`],
        autoplay: true,
        onend: function() {
          _this.listening = false
        }
      })
    },
    stopListenAudio() {
      this.listening = false
      this.sound.stop()
    }
  },
  mounted() {
    EventBus.$on('timer/stop', () => {
      this.sound = new Howl({
        src: [`/audio/${this.audio}`],
        autoplay: true,
        loop: true,
      })
    })
  }
}
</script>

<style>
  .timer h1 b {
    font-family: "Segoe UI Black";
  }
  .set-timer {
    padding: 15px 25%;
  }
  .set-timer .col {
    padding: 0 8px;
  }
  @media only screen and (max-width: 600px) {
    .set-timer {
      padding: 15px 10%;
    }
  }
</style>
