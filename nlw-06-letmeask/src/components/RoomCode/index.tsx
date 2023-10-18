import { Copy } from "phosphor-react"
import { StyledRoomCode } from "./styles"

type RoomCodeProps = {
  code?: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code as string)
  }

  return (
    <StyledRoomCode onClick={copyRoomCodeToClipboard}>
      <div>
        <Copy size={24} />
      </div>
      <span>Sala #{props.code}</span>
    </StyledRoomCode>
  )
}
