import { IAuthForm } from "./authTypes";

export interface Register extends IAuthForm {}

export interface Login {
  username: string
  password: string
}