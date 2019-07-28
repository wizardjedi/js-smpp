import Encoding from "./Encoding";

class GsmEncoding extends Encoding {
    constructor() {
        super();
        this.ESCAPE_CHARACTER = 0x1B;

        this.basicCharset = [
            '@', '£', '$', '¥', 'è', 'é', 'ù', 'ì', 'ò', 'Ç', 'LF', 'Ø', 'ø', '\n', 'Å', 'å',
            'Δ', '_', 'Φ', 'Γ', 'Λ', 'Ω', 'Π', 'Ψ', 'Σ', 'Θ', 'Ξ', 'ESC', 'Æ', 'æ', 'ß', 'É',
            ' ', '!', '"', '#', '¤', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?',
            '¡', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ñ', 'Ü', '§',
            '¿', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ñ', 'ü', 'à'
        ];

        this.extendedSet = [
            'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'FF', 'undefined', 'undefined', 'CR2', 'undefined', 'undefined',
            'undefined', 'undefined', 'undefined', 'undefined', '^', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'SS2', 'undefined', 'undefined', 'undefined', 'undefined',
            'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '{', '}', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '\\',
            'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '[', '~', ']', 'undefined',
            '|', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined',
            'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined',
            'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '€', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined',
            'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined',
        ];
    }

    isRepresentable(buffer) {
        for (let i=0;i<buffer.length;i++) {
            let code = buffer[i];

            if (
                (code == this.ESCAPE_CHARACTER)
                && (i < (buffer.length-1))
            ) {
                let code2 = buffer[i+1];
                if (
                    typeof this.extendedSet[code2] == "undefined"
                    || this.extendedSet[code2] == "undefined"
                ) {
                    return false;
                }
                i++;
            } else if (code < 0 || code > 0x7F) {
                return false;
            }
        }

        return true;
    }

    convert(buffer) {
        if (this.isRepresentable(buffer)) {
            let result = [];

            for (let i=0;i<buffer.length;i++) {
                let code = buffer[i];

                if (code == this.ESCAPE_CHARACTER) {
                    let code2 = buffer[i+1];

                    result.push(this.extendedSet[code2]);

                    i++;
                } else {
                    result.push(this.basicCharset[code]);
                }
            }

            return result.join("");
        } else {
            throw new Error("Buffer is not representable");
        }
    }
}

export default GsmEncoding;