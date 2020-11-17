const https = require('https');

/**
 * Get SSL certificate expiration date
 * @param {string} domain
 * @returns {Promise<Date>}
 */
function checkCertificate(domain) {
    return new Promise((resolve, reject) => {
        https.get(domain, {agent: false}, response => {
            const certificate = response.connection.getPeerCertificate();

            if (!certificate.valid_to) reject(new Error(`Unable to get SSL-certificate expiration date for domain ${domain}`));

            resolve(new Date(certificate.valid_to));
        })
            .on('error', reject);
    });
}

module.exports = checkCertificate;