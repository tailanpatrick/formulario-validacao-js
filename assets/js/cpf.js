// 705.484.450-52       070.987.720-03

class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable:true,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    geraNovoCpf(){
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);

        this.novoCpf = cpfParcial + digito1 + digito2;
    }

    static geraDigito(cpfSemDigitos){
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for(let stringNumerica of cpfSemDigitos){
            total += Number(stringNumerica) * reverso;
            reverso--;
        }

        const digito = 11 - (total % 11);

        return digito > 9 ? '0' : String(digito);
       
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSeq()) return false;
        this.geraNovoCpf();

        return this.novoCpf === this.cpfLimpo;
    }

    isSeq(){
        return this.cpfLimpo[0].repeat(11) === this.cpfLimpo;
    }
}

function cpfMask(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");   
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return v;
}