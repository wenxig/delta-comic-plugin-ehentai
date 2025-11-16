import "@/index.css"
import { coreModule, definePlugin, requireDepend, Utils } from "delta-comic-core"
import axios from "axios"
import { inRange } from "es-toolkit/compat"
import { pluginName } from "./symbol"
import { config } from "./config"
import { ehStore } from "./store"
import { isString } from "es-toolkit"

import './api'
const { layout } = requireDepend(coreModule)
const testAxios = axios.create({
  timeout: 10000,
  method: 'GET',
  validateStatus(status) {
    return inRange(status, 199, 499)
  }
})
testAxios.interceptors.response.use(undefined, Utils.request.utilInterceptors.createAutoRetry(testAxios, 2))


definePlugin({
  name: pluginName,
  api: {
    eh: {
      forks: () => [
        'https://e-hentai.org',
        'https://exhentai.org'
      ],
      test: (fork, signal) => testAxios.get(fork, { signal })
    }
  },
  image: {
    forks: {
      ehgt: ['https://ehgt.org'],
      hath: ['https://hath.network']
    },
    test: ''
  },
  onBooted: ins => {
    ehStore.api.value = Utils.request.createAxios(() => {
      if (!isString(ins.api?.eh)) throw new Error('api not resolved')
      return ins.api.eh
    }, {
      withCredentials: true
    })

  },
  otherProgress: [],
  config: [
    config
  ],
})