export const flipDurationMs = 200
/** @type {Array<'wishlist'|'interview'|'applied'>} */
export const COLUMN_HEADLINES = ['wishlist', 'interview', 'applied']
/** @type {BoardInfo[]} */
export const DEFAULT_BOARD_INFO = [
  {
    id: 'wishlist',
    items: [
      {
        id: '7f5affb1-6e41-4a7d-bd26-613abc4cfc8e',
        remote: true,
        place: 'Miskatonic University',
        position: 'Professor, Anthropology and Occultism Department',
        timestamp: 1691721018580,
        salary: 5000,
        jobPostUrl: 'https://google.com',
        meetUrl: 'https://meet.new'
      }
    ]
  },
  {
    id: 'interview',
    items: []
  },
  {
    id: 'applied',
    items: []
  }
]

/**
 * @typedef ColumnHeadlines
 * @type {typeof COLUMN_HEADLINES[number]}
*/

/**
 * @typedef BoardInfo
 * @type {object}
 *
 * @prop {ColumnHeadlines} id
 * @prop {Array<ColumnInfo>} items
*/

/**
 * @typedef ColumnInfo
 * @type {object}
 *
 * @prop {string} id
 * @prop {boolean=} remote
 * @prop {string} place
 * @prop {string} position
 * @prop {number} timestamp
 * @prop {number=} salary
 * @prop {string=} jobPostUrl
 * @prop {string=} meetUrl
*/
