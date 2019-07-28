class DissectingContext {
    constructor(initialBuffer) {
        this.offset = 0;
        this.processingBuffer = initialBuffer;
        this.processedVariables = {};
        this.initialBuffer = initialBuffer;
        this.previoudBuffer = initialBuffer;
        this.initialBufferLength = initialBuffer.byteLength;
        this.boundVars={};
    }
    checkLength(fieldDescription) {
        if (typeof fieldDescription.fieldLength !== "undefined") {
            if (this.offset + fieldDescription.fieldLength > this.initialBufferLength) {
                return false;
            }
        }

        return true;
    }
    pushBuffer(newBuffer) {
        this.previoudBuffer = this.processingBuffer;
        this.processingBuffer = newBuffer;

        let currentOffset = this.offset;

        let newLength = this.processingBuffer.byteLength;

        let fieldLength = this.initialBufferLength - currentOffset - newLength;

        this.offset += fieldLength;

        return {
            offset: currentOffset,
            length: fieldLength,
            buffer: this.previoudBuffer.slice(0,fieldLength)
        };
    }
}

export default DissectingContext;