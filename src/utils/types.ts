export interface LightstickType {
  id: number
  artist: string
  name: string
  agency: string
  tag: string
  version: number
  group: boolean
  image: string
  profile?: string
  keywords?: string[]
}

export interface GroupedLightstick {
  main: LightstickType
  versions: LightstickType[]
}
