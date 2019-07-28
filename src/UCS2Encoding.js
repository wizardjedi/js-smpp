import Encoding from "./Encoding";

class UCS2Encoding extends Encoding {
    convert(buffer) {
        let result = [];

        for (let i=0;i<buffer.length;i+=2) {
            let code0 = buffer[i];
            let code1 = buffer[i+1];

            result.push(String.fromCharCode(code0 * 256 + code1));
        }

        return result.join("");
    }
}

export default UCS2Encoding;