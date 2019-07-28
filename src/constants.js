// Base SMPP HEADER
import UCS2Encoding from "./UCS2Encoding.js";
import GsmEncoding from "./GsmEncoding";

export const SMPP_HEADER = {
    packetLength: {
        pattern:"packetLength:32/integer",
        fieldLength: 4,
        specRef:"3.2.1"
    },
    commandId: {
        pattern: "commandId:32/integer",
        interpret: function(v) {
            for (let cmdId in SMPP_COMMANDS_DESCRIPTIONS) {
                if (SMPP_COMMANDS_DESCRIPTIONS[cmdId].commandId == v) {
                    return cmdId;
                }
            }

            return "unknown command id";
        },
        fieldLength: 4,
        specRef:"3.2.1"
    },
    status: {
        pattern: "status:32/integer",
        interpret: function(v) {
            // https://github.com/twitter-archive/cloudhopper-smpp/blob/master/src/main/java/com/cloudhopper/smpp/SmppConstants.java#L355

            return "OK";
        },
        fieldLength: 4,
        specRef:"3.2.1"
    },
    sequenceNumber: {
        pattern:"sequenceNumber:32/integer",
        fieldLength: 4,
        specRef:"3.2.1"
    }
};

export const COMMAND_ID_GENERIC_NACK="GENERIC_NACK";
export const COMMAND_ID_BIND_RECEIVER="BIND_RECEIVER";
export const COMMAND_ID_BIND_RECEIVER_RESP="BIND_RECEIVER_RESP";
export const COMMAND_ID_BIND_TRANSMITTER="BIND_TRANSMITTER";
export const COMMAND_ID_BIND_TRANSMITTER_RESP="BIND_TRANSMITTER_RESP";
export const COMMAND_ID_QUERY_SM="QUERY_SM";
export const COMMAND_ID_QUERY_SM_RESP="QUERY_SM_RESP";
export const COMMAND_ID_SUBMIT_SM="SUBMIT_SM";
export const COMMAND_ID_SUBMIT_SM_RESP="SUBMIT_SM_RESP";
export const COMMAND_ID_DELIVER_SM="DELIVER_SM";
export const COMMAND_ID_DELIVER_SM_RESP="DELIVER_SM_RESP";
export const COMMAND_ID_UNBIND="UNBIND";
export const COMMAND_ID_UNBIND_RESP="UNBIND_RESP";
export const COMMAND_ID_REPLACE_SM="REPLACE_SM";
export const COMMAND_ID_REPLACE_SM_RESP="REPLACE_SM_RESP";
export const COMMAND_ID_CANCEL_SM="CANCEL_SM";
export const COMMAND_ID_CANCEL_SM_RESP="CANCEL_SM_RESP";
export const COMMAND_ID_BIND_TRANSCEIVER="BIND_TRANSCEIVER";
export const COMMAND_ID_BIND_TRANSCEIVER_RESP="BIND_TRANSCEIVER_RESP";
export const COMMAND_ID_OUTBIND="OUTBIND";
export const COMMAND_ID_ENQUIRE_LINK="ENQUIRE_LINK";
export const COMMAND_ID_ENQUIRE_LINK_RESP="ENQUIRE_LINK_RESP";
export const COMMAND_ID_ALERT_NOTIFICATION="ALERT_NOTIFICATION";
export const COMMAND_ID_DATA_SM="DATA_SM";
export const COMMAND_ID_DATA_SM_RESP="DATA_SM_RESP";

export const SMPP_COMMAND_IDS = [
    COMMAND_ID_GENERIC_NACK,
    COMMAND_ID_BIND_RECEIVER,
    COMMAND_ID_BIND_RECEIVER_RESP,
    COMMAND_ID_BIND_TRANSMITTER,
    COMMAND_ID_BIND_TRANSMITTER_RESP,
    COMMAND_ID_QUERY_SM,
    COMMAND_ID_QUERY_SM_RESP,
    COMMAND_ID_SUBMIT_SM,
    COMMAND_ID_SUBMIT_SM_RESP,
    COMMAND_ID_DELIVER_SM,
    COMMAND_ID_DELIVER_SM_RESP,
    COMMAND_ID_UNBIND,
    COMMAND_ID_UNBIND_RESP,
    COMMAND_ID_REPLACE_SM,
    COMMAND_ID_REPLACE_SM_RESP,
    COMMAND_ID_CANCEL_SM,
    COMMAND_ID_CANCEL_SM_RESP,
    COMMAND_ID_BIND_TRANSCEIVER,
    COMMAND_ID_BIND_TRANSCEIVER_RESP,
    COMMAND_ID_OUTBIND,
    COMMAND_ID_ENQUIRE_LINK,
    COMMAND_ID_ENQUIRE_LINK_RESP,
    COMMAND_ID_ALERT_NOTIFICATION,
    COMMAND_ID_DATA_SM,
    COMMAND_ID_DATA_SM_RESP
];

export const SMPP_COMMANDS_DESCRIPTIONS =
{
    "GENERIC_NACK"  : {
        "mtid"      : "request",
        "commandId" : 0x80000000,
        "pattern"   : null
    },
    "BIND_RECEIVER"  : {
        "mtid"      : "request",
        "commandId" : 0x00000001,
        "pattern"   : {
            systemId:"systemId:16/string-z",
            password:"password:9/string-z",
            systemType:"systemType:13/string-z",
            interfaceVersion:"interfaceVersion:8/integer",
            addrTon:"addrTon:8/integer",
            addrNpi:"addrNpi:8/integer",
            addressRange:"addressRange:41/string-z"
        }
    },
    "BIND_RECEIVER_RESP"  : {
        "mtid"      : "response",
        "commandId" : 0x80000001,
        "pattern"   : {
            systemId:"systemId:16/string-z",
            tlvs:"tlvs/binary"
        }
    },
    "BIND_TRANSMITTER"  : {
        "mtid"      : "request",
        "commandId" : 0x00000002,
        "pattern"   : {
            systemId: "systemId:16/string-z",
            password: "password:9/string-z",
            systemType: "systemType:13/string-z",
            interfaceVersion: "interfaceVersion:8/integer",
            addrTon: "addrTon:8/integer",
            addrNpi: "addrNpi:8/integer",
            addressRange: "addressRange:41/string-z"
        }
    },
    "BIND_TRANSMITTER_RESP"  : {
        "mtid"      : "response",
        "commandId" : 0x80000002,
        "pattern"   : {
            systemId: "systemId:16/string-z",
            tlvs: "tlvs/binary"
        }
    },
    "QUERY_SM"  : {
        "mtid"      : "request",
        "commandId" : 0x00000003,
        "pattern"   : {
            messageId: "messageId:65/string-z",
            sourceAddrTon: "sourceAddrTon:8/integer",
            sourceAddrNpi: "sourceAddrNpi:8/integer",
            sourceAddr: "sourceAddr:21/string-z"
        }
    },
    "QUERY_SM_RESP"  : {
        "mtid"      : "response",
        "commandId" : 0x80000003,
        "pattern"   : {
            messageId: "messageId:65/string-z",
            finalDate: "finalDate:18/string-z",
            messageState: "messageState:8/integer",
            errorCode: "errorCode:8/integer"
        }
    },
    "SUBMIT_SM"  : {
        "mtid"      : "request",
        "commandId" : 0x00000004,
        "specRef"   : "4.4.1",
        "pattern"   : {
            serviceType: {pattern:"serviceType:6/string-z", specRef:"5.2.11"},
            sourceAddrTon: {pattern:"sourceAddrTon:8/integer", specRef:"5.2.5"},
            sourceAddrNpi: {pattern:"sourceAddrNpi:8/integer", specRef:"5.2.6"},
            sourceAddr: {pattern:"sourceAddr:21/string-z", specRef:"5.2.8"},
            destAddrTon: {pattern:"destAddrTon:8/integer", specRef:"5.2.5"},
            destAddrNpi: {pattern:"destAddrNpi:8/integer", specRef:"5.2.6"},
            destinationAddr: {pattern:"destinationAddr:21/string-z", specRef:"5.2.9"},
            esmClass: {pattern:"esmClass:8/integer", specRef:"5.2.12"},
            protocolId: {pattern:"protocolId:8/integer", specRef:"5.2.13"},
            priorityFlag: {pattern:"priorityFlag:8/integer", specRef:"5.2.14"},
            scheduleDeliveryTime: {pattern:"scheduleDeliveryTime:17/string-z", specRef:"5.2.15"},
            validityPeriod: {pattern:"validityPeriod:17/string-z", specRef:"5.2.16"},
            registeredDelivery: {pattern:"registeredDelivery:8/integer", specRef:"5.2.17"},
            replaceIfPresentFlag: {pattern:"replaceIfPresentFlag:8/integer", specRef:"5.2.18"},
            dataCoding: {pattern:"dataCoding:8/integer", specRef:"5.2.19"},
            smDefaultMsgId: {pattern:"smDefaultMsgId:8/integer", specRef:"5.2.20"},
            smLength: {pattern:"smLength:8/integer", specRef:"5.2.21"},
            shortMessage: {
                pattern:"shortMessage:smLength/binary",
                specRef:"5.2.22",
                interpret: function(value, ctx) {
                    if ((ctx.boundVars.esmClass & ESM_CLASS_UDHI_MASK) > 0) {
                        let udhLength = value[0];

                        value = value.slice(udhLength + 1);
                    }

                    let encodings = {
                        "ucs2"  : new UCS2Encoding(),
                        "gsm"   : new GsmEncoding()
                    };

                    let result = {};

                    for (let encName in encodings) {
                        let encoding = encodings[encName];

                        try {
                            result[encName] = encoding.convert(value);
                        } catch (e) {
                            //
                        }
                    }

                    return result;
                }
            },
            tlvs: {pattern:"tlvs/binary"},
        }
    },
    "SUBMIT_SM_RESP"  : {
        "mtid"      : "response",
        "commandId" : 0x80000004,
        "specRef"   : "4.4.2",
        "pattern"   : [
            "messageId:65/string-z"
        ]
    },
    "DELIVER_SM"  : {
        "mtid"      : "request",
            "commandId" : 0x00000005,
            "pattern"   : [
            "serviceType:6/string-z",
            "sourceAddrTon:8/integer",
            "sourceAddrNpi:8/integer",
            "sourceAddr:21/string-z",
            "destAddrTon:8/integer",
            "destAddrNpi:8/integer",
            "destinationAddr:21/string-z",
            "esmClass:8/integer",
            "protocolId:8/integer",
            "priorityFlag:8/integer",
            "scheduleDeliveryTime:17/string-z",
            "validityPeriod:17/string-z",
            "registeredDelivery:8/integer",
            "replaceIfPresentFlag:8/integer",
            "dataCoding:8/integer",
            "smDefaultMsgId:8/integer",
            "smLength:8/integer",
            "shortMessage:smLength/binary",
            "tlvs/binary"
        ]
    },
    "DELIVER_SM_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000005,
            "pattern"   : [
            "messageId:65/string-z"
        ]
    },
    "UNBIND"  : {
        "mtid"      : "request",
            "commandId" : 0x00000006,
            "pattern"   : null
    },
    "UNBIND_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000006,
            "pattern"   : null
    },
    "REPLACE_SM"  : {
        "mtid"      : "request",
            "commandId" : 0x00000007,
            "pattern"   : [
            "messageId:65/string-z",
            "sourceAddrTon:8/integer",
            "sourceAddrNpi:8/integer",
            "sourceAddr:21/string-z",
            "scheduleDeliveryTime:17/string-z",
            "validityPeriod:17/string-z",
            "registeredDelivery:8/integer",
            "smDefaultMsgId:8/integer",
            "smLength:8/integer",
            "shortMessage:smLength/binary"
        ]
    },
    "REPLACE_SM_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000007,
            "pattern"   : null
    },
    "CANCEL_SM"  : {
        "mtid"      : "request",
            "commandId" : 0x00000008,
            "pattern"   : [
            "serviceType:6/string-z",
            "messageId:65/string-z",
            "sourceAddrTon:8/integer",
            "sourceAddrNpi:8/integer",
            "sourceAddr:21/string-z",
            "destAddrTon:8/integer",
            "destAddrNpi:8/integer",
            "destinationAddr:21/string-z"
        ]
    },
    "CANCEL_SM_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000008,
            "pattern"   : null
    },
    "BIND_TRANSCEIVER"  : {
        "mtid"      : "request",
            "commandId" : 0x00000009,
            "pattern"   : [
            "systemId:16/string-z",
            "password:9/string-z",
            "systemType:13/string-z",
            "interfaceVersion:8/integer",
            "addrTon:8/integer",
            "addrNpi:8/integer",
            "addressRange:41/string-z"
        ]
    },
    "BIND_TRANSCEIVER_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000009,
            "pattern"   : [
            "systemId:16/string-z",
            "tlvs/binary"
        ]
    },
    "OUTBIND"  : {
        "mtid"      : "request",
            "example"   : "00000000B000000000000000148656c6c6f0031323300",
            "commandId" : "0000000B",
            "pattern"   : [
            "systemId:16/string-z",
            "password:9/string-z"
        ]
    },
    "ENQUIRE_LINK"  : {
        "mtid"      : "request",
            "commandId" : 0x00000015,
            "pattern"   : null
    },
    "ENQUIRE_LINK_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000015,
            "pattern"   : null
    },
    "ALERT_NOTIFICATION"  : {
        "mtid"      : "request",
            "commandId" : 0x00000102,
            "pattern"   : [
            "sourceAddrTon:8/integer",
            "sourceAddrNpi:8/integer",
            "sourceAddr:21/string-z",
            "esmeAddrTon:8/integer",
            "esmeAddrNpi:8/integer",
            "esmeAddr:65/string-z",
            "tlvs/binary"
        ]
    },
    "DATA_SM"  : {
        "mtid"      : "request",
            "commandId" : 0x00000103,
            "pattern"   : [
            "serviceType:6/string-z",
            "sourceAddrTon:8/integer",
            "sourceAddrNpi:8/integer",
            "sourceAddr:21/string-z",
            "destAddrTon:8/integer",
            "destAddrNpi:8/integer",
            "destinationAddr:21/string-z",
            "esmClass:8/integer",
            "registeredDelivery:8/integer",
            "dataCoding:8/integer",
            "tlvs/binary"
        ]
    },
    "DATA_SM_RESP"  : {
        "mtid"      : "response",
            "commandId" : 0x80000103,
            "pattern"   : [
            "messageId:65/string-z",
            "tlvs/binary"
        ]
    }
};

// TLV TAGS
// @see: https://github.com/fizzed/cloudhopper-smpp/blob/master/src/main/java/com/cloudhopper/smpp/SmppConstants.java#L109-L224

//
// Optional TLV Tags
//
export const TAG_SOURCE_TELEMATICS_ID = 0x0010;
export const TAG_PAYLOAD_TYPE = 0x0019;
export const TAG_PRIVACY_INDICATOR = 0x0201;
export const TAG_USER_MESSAGE_REFERENCE = 0x0204;
export const TAG_USER_RESPONSE_CODE = 0x0205;
export const TAG_SOURCE_PORT = 0x020A;
export const TAG_DESTINATION_PORT = 0x020B;
export const TAG_SAR_MSG_REF_NUM = 0x020C;
export const TAG_LANGUAGE_INDICATOR = 0x020D;
export const TAG_SAR_TOTAL_SEGMENTS = 0x020E;
export const TAG_SAR_SEGMENT_SEQNUM = 0x020F;
export const TAG_SOURCE_SUBADDRESS = 0x0202;
export const TAG_DEST_SUBADDRESS = 0x0203;
export const TAG_CALLBACK_NUM = 0x0381;
export const TAG_MESSAGE_PAYLOAD = 0x0424;
// SC Interface Version
export const TAG_SC_INTERFACE_VERSION = 0x0210;
// Display Time
export const TAG_DISPLAY_TIME = 0x1201;
// Validity Information
export const TAG_MS_VALIDITY = 0x1204;
// DPF Result
export const TAG_DPF_RESULT = 0x0420;
// Set DPF
export const TAG_SET_DPF = 0x0421;
// MS Availability Status
export const TAG_MS_AVAIL_STATUS = 0x0422;
// Network Error Code
export const TAG_NETWORK_ERROR_CODE = 0x0423;
// Delivery Failure Reason
export const TAG_DELIVERY_FAILURE_REASON = 0x0425;
// More Messages to Follow
export const TAG_MORE_MSGS_TO_FOLLOW = 0x0426;
// Message State
export const TAG_MSG_STATE = 0x0427;
// Congestion State
export const TAG_CONGESTION_STATE = 0x0428;
// Callback Number Presentation  Indicator
export const TAG_CALLBACK_NUM_PRES_IND = 0x0302;
// Callback Number Alphanumeric Tag
export const TAG_CALLBACK_NUM_ATAG = 0x0303;
// Number of messages in Mailbox
export const TAG_NUM_MSGS = 0x0304;
// SMS Received Alert
export const TAG_SMS_SIGNAL = 0x1203;
// Message Delivery Alert
export const TAG_ALERT_ON_MSG_DELIVERY = 0x130C;
// ITS Reply Type
export const TAG_ITS_REPLY_TYPE = 0x1380;
// ITS Session Info
export const TAG_ITS_SESSION_INFO = 0x1383;
// USSD Service Op
export const TAG_USSD_SERVICE_OP = 0x0501;
// Broadcast Channel Indicator
export const TAG_BROADCAST_CHANNEL_INDICATOR = 0x0600;
// Broadcast Content Type
export const TAG_BROADCAST_CONTENT_TYPE = 0x0601;
// Broadcast Content Type Info
export const TAG_BROADCAST_CONTENT_TYPE_INFO = 0x0602;
// Broadcast Message Class
export const TAG_BROADCAST_MESSAGE_CLASS = 0x0603;
// Broadcast Rep Num
export const TAG_BROADCAST_REP_NUM = 0x0604;
// Broadcast Frequency Interval
export const TAG_BROADCAST_FREQUENCY_INTERVAL = 0x0605;
// Broadcast Area Identifier
export const TAG_BROADCAST_AREA_IDENTIFIER = 0x0606;
// Broadcast Error Status
export const TAG_BROADCAST_ERROR_STATUS = 0x0607;
// Broadcast Area Success
export const TAG_BROADCAST_AREA_SUCCESS = 0x0608;
// Broadcast End Time
export const TAG_BROADCAST_END_TIME = 0x0609;
// Broadcast Service Group
export const TAG_BROADCAST_SERVICE_GROUP = 0x060A;
// Source Network Id
export const TAG_SOURCE_NETWORK_ID = 0x060D;
// Dest Network Id
export const TAG_DEST_NETWORK_ID = 0x060E;
// Source Node Id
export const TAG_SOURCE_NODE_ID = 0x060F;
// Dest Node Id
export const TAG_DEST_NODE_ID = 0x0610;
// Billing Identification
export const TAG_BILLING_IDENTIFICATION = 0x060B;
// Originating MSC Address
export const TAG_ORIG_MSC_ADDR = 0x8081;
// Destination MSC Address
export const TAG_DEST_MSC_ADDR = 0x8082;
// Destination Address Subunit
export const TAG_DEST_ADDR_SUBUNIT = 0x0005;
// Destination Network Type
export const TAG_DEST_NETWORK_TYPE = 0x0006;
// Destination Bearer Type
export const TAG_DEST_BEAR_TYPE = 0x0007;
// Destination Telematics ID
export const TAG_DEST_TELE_ID = 0x0008;
// Source Address Subunit
export const TAG_SOURCE_ADDR_SUBUNIT = 0x000D;
// Source Network Type
export const TAG_SOURCE_NETWORK_TYPE = 0x000E;
// Source Bearer Type
export const TAG_SOURCE_BEAR_TYPE = 0x000F;
// Source Telematics ID
export const TAG_SOURCE_TELE_ID = 0x0010;
// QOS Time to Live
export const TAG_QOS_TIME_TO_LIVE = 0x0017;
// Additional Status Info Text
export const TAG_ADD_STATUS_INFO = 0x001D;
// Receipted Message ID
export const TAG_RECEIPTED_MSG_ID = 0x001E;
// MS Message Wait Facilities
export const TAG_MS_MSG_WAIT_FACILITIES = 0x0030;

export const SMPP_TLV_TAG_IDS = [
    TAG_SOURCE_TELEMATICS_ID,
    TAG_PAYLOAD_TYPE,
    TAG_PRIVACY_INDICATOR,
    TAG_USER_MESSAGE_REFERENCE,
    TAG_USER_RESPONSE_CODE,
    TAG_SOURCE_PORT,
    TAG_DESTINATION_PORT,
    TAG_SAR_MSG_REF_NUM,
    TAG_LANGUAGE_INDICATOR,
    TAG_SAR_TOTAL_SEGMENTS,
    TAG_SAR_SEGMENT_SEQNUM,
    TAG_SOURCE_SUBADDRESS,
    TAG_DEST_SUBADDRESS,
    TAG_CALLBACK_NUM,
    TAG_MESSAGE_PAYLOAD,
    TAG_SC_INTERFACE_VERSION,
    TAG_DISPLAY_TIME,
    TAG_MS_VALIDITY,
    TAG_DPF_RESULT,
    TAG_SET_DPF,
    TAG_MS_AVAIL_STATUS,
    TAG_NETWORK_ERROR_CODE,
    TAG_DELIVERY_FAILURE_REASON,
    TAG_MORE_MSGS_TO_FOLLOW,
    TAG_MSG_STATE,
    TAG_CONGESTION_STATE,
    TAG_CALLBACK_NUM_PRES_IND,
    TAG_CALLBACK_NUM_ATAG,
    TAG_NUM_MSGS,
    TAG_SMS_SIGNAL,
    TAG_ALERT_ON_MSG_DELIVERY,
    TAG_ITS_REPLY_TYPE,
    TAG_ITS_SESSION_INFO,
    TAG_USSD_SERVICE_OP,
    TAG_BROADCAST_CHANNEL_INDICATOR,
    TAG_BROADCAST_CONTENT_TYPE,
    TAG_BROADCAST_CONTENT_TYPE_INFO,
    TAG_BROADCAST_MESSAGE_CLASS,
    TAG_BROADCAST_REP_NUM,
    TAG_BROADCAST_FREQUENCY_INTERVAL,
    TAG_BROADCAST_AREA_IDENTIFIER,
    TAG_BROADCAST_ERROR_STATUS,
    TAG_BROADCAST_AREA_SUCCESS,
    TAG_BROADCAST_END_TIME,
    TAG_BROADCAST_SERVICE_GROUP,
    TAG_SOURCE_NETWORK_ID,
    TAG_DEST_NETWORK_ID,
    TAG_SOURCE_NODE_ID,
    TAG_DEST_NODE_ID,
    TAG_BILLING_IDENTIFICATION,
    TAG_ORIG_MSC_ADDR,
    TAG_DEST_MSC_ADDR,
    TAG_DEST_ADDR_SUBUNIT,
    TAG_DEST_NETWORK_TYPE,
    TAG_DEST_BEAR_TYPE,
    TAG_DEST_TELE_ID,
    TAG_SOURCE_ADDR_SUBUNIT,
    TAG_SOURCE_NETWORK_TYPE,
    TAG_SOURCE_BEAR_TYPE,
    TAG_SOURCE_TELE_ID,
    TAG_QOS_TIME_TO_LIVE,
    TAG_ADD_STATUS_INFO,
    TAG_RECEIPTED_MSG_ID,
    TAG_MS_MSG_WAIT_FACILITIES
];

export const SMPP_TLV_TAGS = [
    {tag:TAG_SOURCE_TELEMATICS_ID,name:"TAG_SOURCE_TELEMATICS_ID"},
    {tag:TAG_PAYLOAD_TYPE,name:"TAG_PAYLOAD_TYPE"},
    {tag:TAG_PRIVACY_INDICATOR,name:"TAG_PRIVACY_INDICATOR"},
    {tag:TAG_USER_MESSAGE_REFERENCE,name:"TAG_USER_MESSAGE_REFERENCE"},
    {tag:TAG_USER_RESPONSE_CODE,name:"TAG_USER_RESPONSE_CODE"},
    {tag:TAG_SOURCE_PORT,name:"TAG_SOURCE_PORT"},
    {tag:TAG_DESTINATION_PORT,name:"TAG_DESTINATION_PORT"},
    {tag:TAG_SAR_MSG_REF_NUM,name:"TAG_SAR_MSG_REF_NUM"},
    {tag:TAG_LANGUAGE_INDICATOR,name:"TAG_LANGUAGE_INDICATOR"},
    {tag:TAG_SAR_TOTAL_SEGMENTS,name:"TAG_SAR_TOTAL_SEGMENTS"},
    {tag:TAG_SAR_SEGMENT_SEQNUM,name:"TAG_SAR_SEGMENT_SEQNUM"},
    {tag:TAG_SOURCE_SUBADDRESS,name:"TAG_SOURCE_SUBADDRESS"},
    {tag:TAG_DEST_SUBADDRESS,name:"TAG_DEST_SUBADDRESS"},
    {tag:TAG_CALLBACK_NUM,name:"TAG_CALLBACK_NUM"},
    {tag:TAG_MESSAGE_PAYLOAD,name:"TAG_MESSAGE_PAYLOAD"},
    {tag:TAG_SC_INTERFACE_VERSION,name:"TAG_SC_INTERFACE_VERSION"},
    {tag:TAG_DISPLAY_TIME,name:"TAG_DISPLAY_TIME"},
    {tag:TAG_MS_VALIDITY,name:"TAG_MS_VALIDITY"},
    {tag:TAG_DPF_RESULT,name:"TAG_DPF_RESULT"},
    {tag:TAG_SET_DPF,name:"TAG_SET_DPF"},
    {tag:TAG_MS_AVAIL_STATUS,name:"TAG_MS_AVAIL_STATUS"},
    {tag:TAG_NETWORK_ERROR_CODE,name:"TAG_NETWORK_ERROR_CODE"},
    {tag:TAG_DELIVERY_FAILURE_REASON,name:"TAG_DELIVERY_FAILURE_REASON"},
    {tag:TAG_MORE_MSGS_TO_FOLLOW,name:"TAG_MORE_MSGS_TO_FOLLOW"},
    {tag:TAG_MSG_STATE,name:"TAG_MSG_STATE"},
    {tag:TAG_CONGESTION_STATE,name:"TAG_CONGESTION_STATE"},
    {tag:TAG_CALLBACK_NUM_PRES_IND,name:"TAG_CALLBACK_NUM_PRES_IND"},
    {tag:TAG_CALLBACK_NUM_ATAG,name:"TAG_CALLBACK_NUM_ATAG"},
    {tag:TAG_NUM_MSGS,name:"TAG_NUM_MSGS"},
    {tag:TAG_SMS_SIGNAL,name:"TAG_SMS_SIGNAL"},
    {tag:TAG_ALERT_ON_MSG_DELIVERY,name:"TAG_ALERT_ON_MSG_DELIVERY"},
    {tag:TAG_ITS_REPLY_TYPE,name:"TAG_ITS_REPLY_TYPE"},
    {tag:TAG_ITS_SESSION_INFO,name:"TAG_ITS_SESSION_INFO"},
    {tag:TAG_USSD_SERVICE_OP,name:"TAG_USSD_SERVICE_OP"},
    {tag:TAG_BROADCAST_CHANNEL_INDICATOR,name:"TAG_BROADCAST_CHANNEL_INDICATOR"},
    {tag:TAG_BROADCAST_CONTENT_TYPE,name:"TAG_BROADCAST_CONTENT_TYPE"},
    {tag:TAG_BROADCAST_CONTENT_TYPE_INFO,name:"TAG_BROADCAST_CONTENT_TYPE_INFO"},
    {tag:TAG_BROADCAST_MESSAGE_CLASS,name:"TAG_BROADCAST_MESSAGE_CLASS"},
    {tag:TAG_BROADCAST_REP_NUM,name:"TAG_BROADCAST_REP_NUM"},
    {tag:TAG_BROADCAST_FREQUENCY_INTERVAL,name:"TAG_BROADCAST_FREQUENCY_INTERVAL"},
    {tag:TAG_BROADCAST_AREA_IDENTIFIER,name:"TAG_BROADCAST_AREA_IDENTIFIER"},
    {tag:TAG_BROADCAST_ERROR_STATUS,name:"TAG_BROADCAST_ERROR_STATUS"},
    {tag:TAG_BROADCAST_AREA_SUCCESS,name:"TAG_BROADCAST_AREA_SUCCESS"},
    {tag:TAG_BROADCAST_END_TIME,name:"TAG_BROADCAST_END_TIME"},
    {tag:TAG_BROADCAST_SERVICE_GROUP,name:"TAG_BROADCAST_SERVICE_GROUP"},
    {tag:TAG_SOURCE_NETWORK_ID,name:"TAG_SOURCE_NETWORK_ID"},
    {tag:TAG_DEST_NETWORK_ID,name:"TAG_DEST_NETWORK_ID"},
    {tag:TAG_SOURCE_NODE_ID,name:"TAG_SOURCE_NODE_ID"},
    {tag:TAG_DEST_NODE_ID,name:"TAG_DEST_NODE_ID"},
    {tag:TAG_BILLING_IDENTIFICATION,name:"TAG_BILLING_IDENTIFICATION",specRef:""},
    {tag:TAG_ORIG_MSC_ADDR,name:"TAG_ORIG_MSC_ADDR"},
    {tag:TAG_DEST_MSC_ADDR,name:"TAG_DEST_MSC_ADDR"},
    {tag:TAG_DEST_ADDR_SUBUNIT,name:"TAG_DEST_ADDR_SUBUNIT"},
    {tag:TAG_DEST_NETWORK_TYPE,name:"TAG_DEST_NETWORK_TYPE"},
    {tag:TAG_DEST_BEAR_TYPE,name:"TAG_DEST_BEAR_TYPE"},
    {tag:TAG_DEST_TELE_ID,name:"TAG_DEST_TELE_ID"},
    {tag:TAG_SOURCE_ADDR_SUBUNIT,name:"TAG_SOURCE_ADDR_SUBUNIT"},
    {tag:TAG_SOURCE_NETWORK_TYPE,name:"TAG_SOURCE_NETWORK_TYPE"},
    {tag:TAG_SOURCE_BEAR_TYPE,name:"TAG_SOURCE_BEAR_TYPE"},
    {tag:TAG_SOURCE_TELE_ID,name:"TAG_SOURCE_TELE_ID"},
    {tag:TAG_QOS_TIME_TO_LIVE,name:"TAG_QOS_TIME_TO_LIVE"},
    {tag:TAG_ADD_STATUS_INFO,name:"TAG_ADD_STATUS_INFO"},
    {tag:TAG_RECEIPTED_MSG_ID,name:"TAG_RECEIPTED_MSG_ID"},
    {tag:TAG_MS_MSG_WAIT_FACILITIES,name:"TAG_MS_MSG_WAIT_FACILITIES"}
];

export const ESM_CLASS_MM_MASK          = 0x03;  // BIN 00000011
export const ESM_CLASS_MM_DEFAULT       = 0x00;  // BIN 00000000
export const ESM_CLASS_MM_DATAGRAM      = 0x01;  // BIN 00000001
export const ESM_CLASS_MM_TRANSACTION   = 0x02;  // BIN 00000010
export const ESM_CLASS_MM_STORE_FORWARD = 0x03;  // BIN 00000011

/** Message Type (bits 5-2) */
export const ESM_CLASS_MT_MASK = 0x1C;                          // BIN:  11100
export const ESM_CLASS_MT_SMSC_DELIVERY_RECEIPT = 0x04;         // BIN:    100, Recv Msg contains SMSC delivery receipt
export const ESM_CLASS_MT_ESME_DELIVERY_RECEIPT = 0x08;         // BIN:   1000, Send/Recv Msg contains ESME delivery acknowledgement
export const ESM_CLASS_MT_MANUAL_USER_ACK = 0x10;               // BIN:  10000, Send/Recv Msg contains manual/user acknowledgment
export const ESM_CLASS_MT_CONVERSATION_ABORT = 0x18;            // BIN:  11000, Recv Msg contains conversation abort (Korean CDMA)
// i believe this flag is separate from the types above...
export const ESM_CLASS_INTERMEDIATE_DELIVERY_RECEIPT_FLAG = 0x20;  // BIN: 100000, Recv Msg contains intermediate notification
export const ESM_CLASS_UDHI_MASK = 0x40;
export const ESM_CLASS_REPLY_PATH_MASK = 0x80;