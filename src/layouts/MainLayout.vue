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
      <div class="q-pa-xs q-pl-md q-gutter-md row items-center bg-white text-black">
        <!-- File -->
        <div class="cursor-pointer non-selectable">
          File
          <q-menu auto-close square>
            <q-list dense style="min-width: 150px">
              <q-item clickable @click="close">
                <q-item-section>
                  Quit
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <!-- History -->
        <div class="cursor-pointer non-selectable" @click="getAllHistory">
          History
          <q-menu auto-close square>
            <q-list dense style="min-width: 250px">
              <q-item clickable @click="showAllHistoryDialog = true">
                <q-item-section>
                  Show All History
                </q-item-section>
              </q-item>
              <q-item clickable @click="clearHistoryDialog = true">
                <q-item-section>
                  Clear All History
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-for="(value, index) in historyEntries" :key="index">
                <q-item-section
                  @click="$store.dispatch(
                    'request/restoreHistoryAction',
                    getHistory(value)
                  )"
                >
                  {{ getHistory(value)['requestMethod'].label }}:
                  {{ getHistory(value)['requestURL'] }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <!-- Help -->
        <div class="cursor-pointer non-selectable">
          Help
          <q-menu auto-close square>
            <q-list dense style="min-width: 250px">
              <q-item clickable @click="openLink('https://github.com/bunya017/yaro-post')">
                <q-item-section>
                  Github
                </q-item-section>
              </q-item>
              <q-item clickable @click="aboutDialog = true">
                <q-item-section>
                  About
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </q-header>

    <!-- Clear history confirm dialog -->
    <q-dialog v-model="clearHistoryDialog" persistent>
      <q-card square>
        <q-bar class="bg-white">
          <q-icon name="warning" />
          <div>Clear All History</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-separator />
        <q-card-section>
          Are you sure you want to permanently clear all history records?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat label="Yes" color="primary" @click="clearAllHistory" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Show all history dialog -->
    <q-dialog v-model="showAllHistoryDialog" persistent>
      <q-card square style="width: 600px; max-width: 80vw;">
        <q-card-section class="q-pa-none">
          <q-bar class="bg-white">
          <q-icon name="img:statics/logo/logo-128x128.png" />
            <div>History</div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh;" class="scroll">
          <q-list dense>
            <q-item
              clickable
              :key="index"
              v-close-popup
              @click="$store.dispatch(
                'request/restoreHistoryAction',
                getHistory(value)
              )"
              v-for="(value, index) in historyEntries"
            >
              <q-item-section>
                {{ getHistory(value)['requestMethod'].label }}:
                {{ getHistory(value)['requestURL'] }}
              </q-item-section>
              <q-item-section side>
                <q-btn
                  dense
                  flat
                  size="sm"
                  icon="delete"
                  color="grey-7"
                  @click.stop="deleteHistoryitem(value)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            v-close-popup
            color="primary"
          />
          <q-btn
            flat
            color="primary"
            label="Clear History"
            @click="clearHistoryDialog = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- About dialog -->
    <q-dialog v-model="aboutDialog" persistent>
      <q-card square style="min-width: 400px">
        <q-bar class="bg-white">
          <q-icon name="img:statics/logo/logo-128x128.png" />
          <div>Yaropost</div>
          <q-space />
          <q-btn dense flat stretch icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-separator />
        <q-card-section class="text-center">
          <div class="text-h4 q-pb-md">Yaropost</div>
          <div>Copyright © 2020 Bunyaminu Sani</div>
          <div>Version 1.0.0-rc.3</div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[28, 28]">
      <q-btn padding="sm" fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      historyEntries: [],
      aboutDialog: false,
      showRestoreIcon: false,
      clearHistoryDialog: false,
      showAllHistoryDialog: false
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
      let localHistory = this.$q.localStorage.getAll()
      this.historyEntries = []
      for (let item in localHistory) {
        if (item.includes('history')) {
          this.historyEntries.push({
            [item]: localHistory[item]
          })
        }
      }
      return history
    },
    getHistory (payload) {
      let key = Object.keys(payload)[0]
      return payload[key]
    },
    clearAllHistory () {
      this.$q.localStorage.clear()
    },
    deleteHistoryitem (payload) {
      let key = Object.keys(payload)[0]
      this.$q.localStorage.remove(key)
      this.getAllHistory()
    },
    openLink (link) {
      return openURL(link)
    }
  }
}
</script>
