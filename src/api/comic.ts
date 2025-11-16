import { uni } from "delta-comic-core"

export namespace _ehComic {
  export class EhItem extends uni.item.Item {
    override like(signal?: AbortSignal): PromiseLike<boolean> {
      throw new Error("Method not implemented.")
    }
    override report(signal?: AbortSignal): PromiseLike<any> {
      throw new Error("Method not implemented.")
    }
    override sendComment(text: string, signal?: AbortSignal): PromiseLike<any> {
      throw new Error("Method not implemented.")
    }
    constructor(v: uni.item.RawItem) {
      super(v)
    }
  }
}