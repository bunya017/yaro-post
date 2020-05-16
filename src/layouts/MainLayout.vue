<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-bar class="q-electron-drag bg-white text-black">
        <q-icon name="img:statics/logo/logo-128x128.png" />
        <div>Yaropost</div>
        <q-space />
        <q-btn-group flat stretch>
          <q-btn
            flat
            dense
            class="q-px-sm"
            icon="minimize"
            @click="minimize"
          />
          <q-btn
            flat
            dense
            @click="maximize"
            :icon="showRestoreIcon ? 'filter_none' : 'crop_square'"
            class="rotate-180 q-px-sm"
          />
          <q-btn
            flat
            dense
            icon="close"
            @click="close"
            class="q-px-sm"
          />
        </q-btn-group>
        <q-resize-observer @resize="isWindowMaximized" />
      </q-bar>
      <div class="q-pa-xs q-pl-md row items-center bg-white text-black">
        <div class="cursor-pointer non-selectable" @click="getAllHistory">
          History
          <q-menu auto-close square>
            <q-list dense style="min-width: 250px">
              <q-item clickable v-for="(value, index) in historyEntries" :key="index">
                <q-item-section>{{ getHistory(value)['requestURL'] }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
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
      showRestoreIcon: false,
      historyEntries: []
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

        if (!win.isMaximized()) {
          this.showRestoreIcon = false
        } else {
          this.showRestoreIcon = true
        }
      }
    },
    getAllHistory () {
      this.historyEntries = []
      let localHistory = this.$q.localStorage.getAll()
      for (let item in localHistory) {
        if (item.includes('history')) {
          this.historyEntries.push({
            [item]: localHistory[item]
          })
        }
      }
    },
    getHistory (payload) {
      let key = Object.keys(payload)[0]
      return payload[key]
    }
  }
}
</script>
