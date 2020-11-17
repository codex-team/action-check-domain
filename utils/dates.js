/**
 * Wrapper for days counting
 * @type {{countDays: (function(*, *=): number), DAY: number, getToday: (function(): *)}}
 */
const Dates = {
    /**
     * Number of seconds for one day
     * @type {number}
     */
    DAY: 86400000,

    /**
     * Get current date
     * @returns {Date}
     */
    getToday: function () {
        return new Date();
    },

    /**
     * Count number of days between two dates
     * @param {Date} toDate
     * @param {Date|Boolean} fromDate
     * @returns {number}
     */
    countDays: function (toDate, fromDate = false) {
        if (!fromDate) fromDate = Dates.getToday();

        return Math.floor((toDate - fromDate) / Dates.DAY);
    }
};

module.exports = Dates;