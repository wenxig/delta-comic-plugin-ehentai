import { pluginName } from "@/symbol"
import { coreModule, requireDepend, uni, Utils } from "delta-comic-core"
import { eh } from "."

const { view } = requireDepend(coreModule)

export class EhPage extends uni.content.ContentImagePage {
  override comments: Utils.data.RStream<uni.comment.Comment> =
    Utils.data.Stream.create<uni.comment.Comment>(async function* () {
      return
    })
  public static contentType = this.toContentTypeString({
    plugin: pluginName,
    name: 'comic'
  })
  override contentType = uni.content.ContentPage.toContentType(EhPage.contentType)
  override loadAll(signal?: AbortSignal) {
    this.pid.resolve(this.id)
    return this.detail.content.loadPromise(eh.api.comic.getComicInfo(this.id, signal).then(info => {
      this.comments = Utils.data.Stream.create<uni.comment.Comment>(async function* () {
        yield info.comment
        return
      })
      return info.info
    }))
  }
  override reloadAll(_signal?: AbortSignal): Promise<any> {
    throw new Error("Method not implemented.")
  }
  override plugin = pluginName
  override loadAllOffline(): Promise<any> {
    throw new Error("Method not implemented.")
  }
  override exportOffline(_save: any): Promise<any> {
    throw new Error("Method not implemented.")
  }
  override ViewComp = view.Images
  constructor(preload: uni.content.PreloadValue, id: string, ep: string) {
    super(preload, id, ep)
  }
}