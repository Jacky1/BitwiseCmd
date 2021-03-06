const formatter = {
    formatString: function(num: number, kind: string) : string {
        return num.toString(getBase(kind || "bin"));
    },
    padLeft: function (str: string, length: number, symbol: string) : string {
        var sb = Array.prototype.slice.call(str), symbol = symbol || "0";

        if(length == null) {
            return str;
        }

        while(length > sb.length) {
            sb.unshift(symbol);
        }

        return sb.join('');
    },
    bin(number: number) {
        return this.formatString(number, 'bin');
    },
    emBin(number: number) {
        return this.padLeft(this.bin(number), 8, '0');
    }
};

function getBase(kind:string) : number {
    switch (kind){
        case 'bin': return 2;
        case 'hex': return 16;
        case 'dec': return 10;
    }

    throw new Error("Unsupported kind: " + kind);
}

export default formatter;
const emBin = formatter.emBin;
export {emBin};