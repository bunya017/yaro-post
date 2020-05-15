<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-bar class="q-electron-drag bg-white">
        <q-icon color="black" name="img:statics/logo/logo-128x128.png" />
        <div class="text-black">Yaropost</div>
        <q-space />
        <q-btn-group flat stretch>
          <q-btn
            flat
            dense
            class="q-px-sm"
            icon="minimize"
            @click="minimize"
            text-color="black"
          />
          <q-btn
            flat
            dense
            @click="maximize"
            text-color="black"
            :icon="showRestoreIcon ? 'filter_none' : 'crop_square'"
            class="rotate-180 q-px-sm"
          />
          <q-btn
            flat
            dense
            icon="close"
            @click="close"
            class="q-px-sm"
            text-color="black"
          />
        </q-btn-group>
        <q-resize-observer @resize="isWindowMaximized" />
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      showRestoreIcon: false
    }
  },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },
    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },
    close () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },
    isWindowMaximized () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          this.showRestoreIcon = true
        } else {
          this.showRestoreIcon = false
        }
      }
    }
  }
}
</script>
