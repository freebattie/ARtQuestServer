import * as crypto from 'crypto';

/** #======================================================#
 *  #    Program or program file : Hash.js
 *  #    Description: Everything needed for hashing password
 *  #    Author: Snorre
 *  #    Date: 01.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

export default class Hash {

    /**
     * @description Methode that HASH with SHA256 using pbkdf2
     * @param       salt string to salt string value
     * @param       string string that is hashed
     * @return      string that is hashed + salted */
    static Pbkdf2 = async (salt, string) => {
        try {
            // URL explaining crypto.pbkdf2: https://www.geeksforgeeks.org/node-js-crypto-pbkdf2-method/
            const ITERATION = 10000;
            const KEYLEN = 64;
            const DIGEST = 'sha256';
            return crypto.pbkdf2(string, salt, ITERATION, KEYLEN, DIGEST,
                (err, derivedKey) => {
                    if (err) throw err;
                });

        } catch (error) {
            console.log("hashing error: ", error);
        }
    };
}