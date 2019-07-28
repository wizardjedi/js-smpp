import SmppDecoder from "../src/SmppDecoder";
import {HEADER1, PDU1} from "./constants";
import {COMMAND_ID_SUBMIT_SM, SMPP_COMMAND_IDS} from "../src/constants";
import bitsyntax from 'ut-bitsyntax';

test('test bit syntax', () =>{
    let pattern = bitsyntax.parse('sym:4/string-binary,sym2:4/string-binary,_/binary');

    let match = bitsyntax.match(pattern, Buffer.from([78,79,80,45,78]));

    console.log("match=>", match);
});

test('Test parsing header', () => {
    let decoder = new SmppDecoder();

    let decoded = decoder.decode(HEADER1);

    /*expect(decoded)
        .toBe(
            {
                header:[
                    {
                        name:"length",
                        offset:0,
                        length:4,
                        comment:"See section 5.2.1",
                        value:{
                            interpeted: 123,
                            raw: 123,
                            hex: "0000007B"
                        }
                    },
                    {
                        name:"commandId",
                        offset:4,
                        length:4,
                        value:{
                            interpreted:"submit_sm",
                            raw:4,
                            hex:"00000004"
                        },
                        comment:"See section 5.2.1"
                    },
                    {
                        name:"status",
                        offset:8,
                        length:4,
                        value: {
                            interpreted: "ok",
                            raw:0
                            hex:"00000000"
                        }
                    },
                    {
                        name:"sequenceNumber",
                        offset
                    }
                    commandId: {
                        type: "submit_sm",
                        raw: 4
                    },
                    status:{
                        type: "OK",
                        raw: 0
                    },
                    sequenceNumber: 78
                ]
            }
        );*/
});

test('Test parsing SUBMIT_SM wo header', () => {
    let decoder = new SmppDecoder();

    let decoded = decoder.useLogLevel("trace").decode(PDU1, true, COMMAND_ID_SUBMIT_SM);

    /*expect(decoded)
        .toBe(
            {
                header:[
                    {
                        name:"length",
                        offset:0,
                        length:4,
                        comment:"See section 5.2.1",
                        value:{
                            interpeted: 123,
                            raw: 123,
                            hex: "0000007B"
                        }
                    },
                    {
                        name:"commandId",
                        offset:4,
                        length:4,
                        value:{
                            interpreted:"submit_sm",
                            raw:4,
                            hex:"00000004"
                        },
                        comment:"See section 5.2.1"
                    },
                    {
                        name:"status",
                        offset:8,
                        length:4,
                        value: {
                            interpreted: "ok",
                            raw:0
                            hex:"00000000"
                        }
                    },
                    {
                        name:"sequenceNumber",
                        offset
                    }
                    commandId: {
                        type: "submit_sm",
                        raw: 4
                    },
                    status:{
                        type: "OK",
                        raw: 0
                    },
                    sequenceNumber: 78
                ]
            }
        );*/
});