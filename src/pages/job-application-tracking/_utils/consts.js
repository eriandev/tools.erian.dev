export const BOARD_INFO_KEY = 'jt_brd'

export const flipDurationMs = 200

/** @type {Array<'wishlist'|'interview'|'applied'>} */
export const JOB_STEPS = ['wishlist', 'applied', 'interview']

/** @type {BoardInfo[]} */
export const DEFAULT_BOARD_INFO = [
  {
    headline: 'wishlist',
    items: [],
  },
  {
    headline: 'applied',
    items: [],
  },
  {
    headline: 'interview',
    items: [],
  },
]

/** @type {NewCardInfo} */
export const DEFAULT_NEW_CARD_INFO = {
  show: false,
  step: 'wishlist',
}

/** @type {EditCardInfo} */
export const DEFAULT_EDIT_CARD_INFO = {
  show: false,
}

/**
 * @typedef JobStep
 * @type {typeof JOB_STEPS[number]}
 */

/**
 * @typedef BoardInfo
 * @type {object}
 *
 * @prop {JobStep} headline
 * @prop {Array<JobPostInfo>} items
 */

/**
 * @typedef JobPostInfo
 * @type {object}
 *
 * @prop {string} id
 * @prop {boolean=} remote
 * @prop {string} location
 * @prop {string} jobTitle
 * @prop {number} timestamp
 * @prop {string=} salary
 * @prop {string=} jobPostUrl
 * @prop {string=} meetUrl
 */

/**
 * @typedef NewCardInfo
 * @type {object}
 *
 * @prop {boolean} show
 * @prop {JobStep} step
 */

/**
 * @typedef EditCardInfo
 * @type {object}
 *
 * @prop {boolean=} show
 * @prop {Partial<JobPostInfo>=} info
 */
