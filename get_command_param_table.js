let ptr_command_registry__is_valid = Module.getBaseAddress("libminecraftpe.so").add(0x06e05ac8);
let ptr_command_registry__symbol_to_string = Module.getBaseAddress("libminecraftpe.so").add(0x06e124b0);
let ptr_google_breakpad__fileid__fileid = Module.getBaseAddress("libminecraftpe.so").add(0x04e6cd20);

function readStdString(ptr) {
    const isTiny = (ptr.readU8() & 1) === 0;
    if (isTiny) {
        return ptr.add(1).readUtf8String();
    }

    return ptr.add(2 * Process.pointerSize).readUtf8String();
}

// let interceptor = Interceptor.attach(ptr_command_registry__is_valid, {
//     onEnter: function (args) {
//         this.ptr = args[0];
//     },
//     onLeave: function (retval) {
//         interceptor.detach();
//         let fn_command_registry__is_valid = new NativeFunction(ptr_command_registry__is_valid, 'bool', ['pointer', 'pointer']);
//         let fn_command_registry__symbol_to_string = new NativeFunction(ptr_command_registry__symbol_to_string, 'pointer', ['pointer', 'pointer', 'pointer'])
//         let ptr_symbol = Memory.alloc(4);
//         let ptr_string = Memory.alloc(64);
//
//
//         for (let i = 0; i < 1000; i++) {
//             ptr_symbol.writeInt(i | 0x100000);
//             console.log(i, fn_command_registry__is_valid(this.ptr, ptr_symbol));
//             console.log(hexdump(fn_command_registry__symbol_to_string(this.ptr, ptr_symbol, ptr_string)));
//             console.log(hexdump(ptr_string));
//         }
//     }
// });

let interceptor = Interceptor.attach(ptr_google_breakpad__fileid__fileid, {
    onEnter: function (args) {
        // console.log(ptr_string);
        console.log(args[0].readLong());
        console.log(args[1].readUtf8String());
    },
    onLeave: function (retval) {
        console.log(retval.readUtf8String());
    },
});

// let fn_google_breakpad__fileid__fileid = new NativeFunction(ptr_google_breakpad__fileid__fileid, 'pointer', ['pointer', 'pointer']);
// console.log(hexdump(fn_google_breakpad__fileid__fileid(Memory.alloc(8), Module.getBaseAddress("libminecraftpe.so").add(0x0C5E3438))));
// for (let i = 0; i < 71; i++) {
//     console.log(Module.getBaseAddress("libminecraftpe.so").add(0x0C5E3410).add(0x8 * i).readPointer().readUtf8String());
// }

console.log("Hooked into process. Please start a new single player game.");