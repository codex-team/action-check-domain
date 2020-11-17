const core = require('@actions/core');
const Dates = require('./utils/dates');
const CheckCertificate = require('./tasks/check-certificate');
const CheckPaidTillDate = require('./tasks/check-paid-till-date');

try {
    /**
     * Site domain to be checked
     * @type {string}
     */
    const URL = core.getInput('url');

    /**
     * Check SSL certificate
     */
    CheckCertificate(URL)
        .then(date => {
            core.setOutput("ssl-expire-date", date.toString());
            core.setOutput("ssl-expire-days-left", Dates.countDays(date));
        })
        .catch(core.error);

    /**
     * Check domain's registry expiry date
     */
    CheckPaidTillDate(URL)
        .then(date => {
            core.setOutput("paid-till-date", date.toString());
            core.setOutput("paid-till-days-left", Dates.countDays(date));
        })
        .catch(core.error);
} catch (error) {
    core.setFailed(error.message);
}