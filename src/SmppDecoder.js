import bitsyntax from 'ut-bitsyntax';
import * as CONSTANTS from './constants';
import {SMPP_HEADER} from "./constants";
import DissectingContext from "./DissectingContext";
import Notifications from "./Notifications";
import DissectingResult from "./DissectingResult";
import {SMPP_COMMANDS_DESCRIPTIONS} from "./constants";
import {SMPP_TLV_TAGS} from "./constants";

class SmppDecoder {
    constructor() {
        this.logLevel = "none";
    }
    trace(logLevel, ...msg) {
        if (this.logLevel !== "none") {
            console.log(msg);
        }
    }
    useLogLevel(level) {
        this.logLevel = level;

        return this;
    }
    /**
     *
     * @param buf
     * @param ignoreHeader
     * @param defaultCommandId
     * @returns {boolean|*|boolean|*}
     */
    decode(buf, ignoreHeader = false, defaultCommandId = "SUBMIT_SM") {
        this.trace("trace", "start decoding", buf, ignoreHeader, defaultCommandId);

        let ctx = new DissectingContext(buf);

        let result = new DissectingResult();

        // Do not parse header
        if (!ignoreHeader) {
            for (let fieldName in SMPP_HEADER) {
                let fieldDescription = SMPP_HEADER[fieldName];

                try {
                    this.decodeField(fieldName, fieldDescription, ctx, result);
                } catch (e) {
                    break;
                }
            }
        }

        let bodyFieldDescription = SMPP_COMMANDS_DESCRIPTIONS[defaultCommandId];

        for (let fieldName in bodyFieldDescription.pattern) {
            if (fieldName === "tlvs") {
                // parse TLVs
                let pattern = 
                    bitsyntax
                        .parse('t:16/integer,l:16/integer,v:l/binary,rest/binary');

                do {
                    let tlvMatch = bitsyntax.match(pattern, ctx.processingBuffer)

                    if (tlvMatch !== false) {
                        let obj = ctx.pushBuffer(tlvMatch.rest);

                        obj.name = this.getTlvName(tlvMatch.t);
                        obj.value = this.interpretValue(obj.name, tlvMatch.v.toString(), );

                        result.data.push(obj);
                    } else {
                        result
                            .notifications
                            .addNotification(
                                "tlv",
                                "Error on processing TLV",
                                ctx.offset
                            );

                        break;
                    }
                } while (ctx.processingBuffer.byteLength > 0);
            } else {
                let fieldDescription = bodyFieldDescription.pattern[fieldName];

                this.trace("trace", "Field description", fieldDescription)

                try {
                    this.decodeField(fieldName, fieldDescription, ctx, result);
                } catch (e) {
                    break;
                }
            }
        }

        return result;
    }
    decodeField(fieldName, fieldDescription, ctx, result) {
        if (!ctx.checkLength(fieldDescription)) {
            result
                .notifications
                .addNotification(
                    fieldName,
                    `Not enough data in buffer. Need: ${fieldDescription.fieldLength} but have:${ctx.initialBufferLength - ctx.offset}`,
                    ctx.offset
                );

            // Todo: тут что-то сделать надо
            throw new Error("Not enough data n  buffer");
        }

        let matchedObject =
            bitsyntax
                .match(
                    this.getPattern(fieldDescription),
                    ctx.processingBuffer,
                    ctx.boundVars
                );

        if (!matchedObject) {
            result.notifications.addNotification(fieldName, `Error on dissecting field:${fieldName}`, ctx.offset);

            // Todo: тут что-то сделать надо
            throw new Error("Not enough data in buffer");
        } else {
            let obj = ctx.pushBuffer(matchedObject.rest);

            obj.name = fieldName;
            obj.value = this.interpretValue(fieldName, matchedObject[fieldName], fieldDescription, ctx);

            if (typeof fieldDescription.specRef !== "undefined") {
                obj.specRef = fieldDescription.specRef;
            }

            ctx.boundVars[fieldName] = obj.value.raw;

            result.data.push(obj);
        }
    }
    interpretValue(field, value, header, ctx) {
        let interpreted = value;

        if (
            typeof header !== "undefined"
            && typeof header.interpret !== "undefined"
        ) {
            interpreted = header.interpret(value, ctx);
        }

        return {
            interpreted,
            raw: value
        };
    }
    getPattern(descr) {
        if (typeof descr.pattern !== "undefined") {
            return this.compilePattern(descr.pattern);
        } else {
            return this.compilePattern(descr);
        }
    }
    compilePattern(ptr) {
        if (typeof ptr === "string") {
            return bitsyntax.parse(ptr + ",rest/binary");
        } else {
            return ptr;
        }
    }

    getTlvName(tag) {
        for (let i in SMPP_TLV_TAGS) {
            if (tag === SMPP_TLV_TAGS[i].tag) {
                return SMPP_TLV_TAGS[i].name;
            }
        }

        return "UNKNOWN_TLV";
    }
}

export default SmppDecoder;