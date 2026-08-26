export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number
  summary?: string
  image?: string
  links?: {
    paper?: string
    code?: string
  }
}

export interface Project {
  id: string
  name: string
  year: number
  description: string
  image?: string
  link?: string
}

export interface Award {
  id: string
  name: string
  issuer: string
  year: number
  description?: string
}

