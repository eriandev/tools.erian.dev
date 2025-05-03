import type { JOB_APPLICATION_STATUS } from './consts.ts'

export type JobApplicationStatus = (typeof JOB_APPLICATION_STATUS)[number]

export type BoardInfo = Record<JobApplicationStatus, JobApplicationInfo[]>

export interface JobApplicationInfo {
  id: string
  location: string
  jobTitle: string
  timeStamp: number
  salary?: string
  remote?: boolean
  meetUrl?: string
  jobPostUrl?: string
}

export interface NewCardInfo {
  show: boolean
  step: JobApplicationStatus
}

export interface EditCardInfo {
  show?: boolean
  info?: Partial<JobApplicationInfo>
}
