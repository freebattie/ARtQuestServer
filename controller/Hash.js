import * as crypto from 'crypto';

export default class Hash {

    /* Methode that HASH with SHA256 using pbkdf2
    * PARA1         string to hash
    * return        string that is hashed */
    static pbkdf2 = async (string) => {
        try {
            // URL explaining crypto.pbkdf2: https://www.geeksforgeeks.org/node-js-crypto-pbkdf2-method/
            const salt = "salt"; // Implementation of this salt could have been better
            const iterations = 10000;
            const keylen = 64;
            const digest = 'sha256';
            return crypto.pbkdf2(string, salt, iterations, keylen, digest,
                (err, derivedKey) => {
                    if (err) throw err;
                });

        } catch (error) {
            console.log("hashing error: ", error);
        }
    };
}