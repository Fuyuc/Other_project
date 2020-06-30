com.str = {
        _KEY: "12345678900000001234567890000000",//32位
        _IV: "1234567890000000",//16位
        /**************************************************************
        *字符串加密
        *   str：需要加密的字符串
        ****************************************************************/
        Encrypt: function (str) {
            var key = CryptoJS.enc.Utf8.parse(this._KEY); 
            var iv = CryptoJS.enc.Utf8.parse(this._IV);

            var encrypted = '';

            var srcs = CryptoJS.enc.Utf8.parse(str);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            return encrypted.ciphertext.toString();
        },

        /**************************************************************
        *字符串解密
        *   str：需要解密的字符串
        ****************************************************************/
        Decrypt: function (str) {
            var key = CryptoJS.enc.Utf8.parse(this._KEY);
            var iv = CryptoJS.enc.Utf8.parse(this._IV);
            var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
            var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
            var decrypt = CryptoJS.AES.decrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return decryptedStr.toString();
        }
    }