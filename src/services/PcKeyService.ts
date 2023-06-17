class PcKeyService {
  private pressingKey: Array<string> = []

  //     keyDownHanler = (event: KeyboardEvent) => {
  //   if (pressingKey.includes(event.key)) return
  //   if (event.key === ' ') {
  //     PcKeyController.toggleTransportTrigger()
  //   } else if (Constants.PC_KEY.flatMap((e) => e).includes(event.key)) {
  //     PcKeyController.noteOnTrigger(event.key)
  //   }
  //   pressingKey.push(event.key)
  // }

  // keyUpHanler = (event: KeyboardEvent) => {
  //   if (Constants.PC_KEY.flatMap((e) => e).includes(event.key)) {
  //     PcKeyController.noteOffTrigger(event.key)
  //   }
  //   pressingKey = pressingKey.filter((e) => e !== event.key)
  // }
}

export default PcKeyService
