import { Document } from 'mongoose'

export interface Token extends Document {
  name?: string
  readonly access_token: string
  readonly expires_in: number
  readonly meta?: any
}
