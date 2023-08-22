export const BOARD_INFO_KEY = 'jt_brd'

export const flipDurationMs = 200
/** @type {Array<'wishlist'|'interview'|'applied'>} */
export const COLUMN_HEADLINES = ['wishlist', 'applied', 'interview']
/** @type {BoardInfo[]} */
export const DEFAULT_BOARD_INFO = [
  {
    headline: 'wishlist',
    items: [
      {
        id: '7f5affb1-6e41-4a7d-bd26-613abc4cfc8e',
        remote: true,
        salary: '5000',
        timestamp: 1691721018580,
        location: 'Miskatonic University',
        jobTitle: 'Professor, Anthropology and Occultism Department',
        jobPostUrl: 'https://google.com',
        meetUrl: 'https://meet.new'
      }
    ]
  },
  {
    headline: 'applied',
    items: []
  },
  {
    headline: 'interview',
    items: []
  }
]
/** @type {ModalInfo} */
export const DEFAULT_MODAL_INFO = {
  isOpen: false,
  title: 'wishlist'
}

/**
 * @typedef ColumnHeadlines
 * @type {typeof COLUMN_HEADLINES[number]}
*/

/**
 * @typedef BoardInfo
 * @type {object}
 *
 * @prop {ColumnHeadlines} headline
 * @prop {Array<ColumnInfo>} items
*/

/**
 * @typedef ColumnInfo
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
 * @typedef ModalInfo
 * @type {object}
 *
 * @prop {boolean} isOpen
 * @prop {ColumnHeadlines} title
*/
