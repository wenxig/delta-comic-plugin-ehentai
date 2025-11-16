import { pluginName } from "@/symbol"
import { coreModule, requireDepend, uni, Utils } from "delta-comic-core"

const { view } = requireDepend(coreModule)

export class EhPage extends uni.content.ContentImagePage {
  public static contentType = this.toContentTypeString({
    plugin: pluginName,
    name: 'comic'
  })
  override contentType = uni.content.ContentPage.toContentType(EhPage.contentType)
  override comments = Utils.data.Stream.create<never>(async function* (signal, that) {
    return
  })
  override loadAll(_signal?: AbortSignal): Promise<any> {
    throw new Error("Method not implemented.")
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