import { ehStore } from "@/store"
import { Utils } from "delta-comic-core"
import { createFullToItem } from "./utils"

export namespace _ehApiComic {
  const { PromiseContent } = Utils.data

  export const getComicInfo = PromiseContent.fromAsyncFunction(async (id: string, signal?: AbortSignal) => {
    const html = new DOMParser().parseFromString(await ehStore.api.value!.get<string>(id.replaceAll('-', '/'), {
      params: {
        hc: 1
      },
      signal
    }), 'text/html')
    return {
      info: createFullToItem(html,id)
    }
  })
}