import GsmEncoding from "../src/GsmEncoding";

test('test gsm encoding', () =>{
    var gsmEncoding = new GsmEncoding();

    console.log(gsmEncoding.isRepresentable([42, 64]));

    console.log(gsmEncoding.convert([0x54, 0x65, 0x73, 0x74, 0x1b, 0x3C, 0x32, 0x1b, 0x3E]));

    console.log(String.fromCharCode(0 * 256 + 0x36));
});
