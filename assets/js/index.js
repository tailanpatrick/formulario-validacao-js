
const _inputName = Symbol('inputName');
const _inputSurname = Symbol('inputSurname');
const _inputCpf = Symbol('inputCpf');
const _inputUser = Symbol('inputUser');
const _inputPassword = Symbol('inputPassword');
const _inputRPassword = Symbol('inputRPassword');
const _form = Symbol('form');

class ValidateForm {
    constructor() {
        this[_form] = document.querySelector('form');
        this[_inputName] = document.querySelector('#name');
        this[_inputSurname] = document.querySelector('#surname');
        this[_inputCpf] = document.querySelector('#cpf');
        this[_inputUser] = document.querySelector('#user');
        this[_inputPassword] = document.querySelector('#password');
        this[_inputRPassword] = document.querySelector('#r-password');
        this.#eventos();
    }

    #eventos() {
        document.addEventListener('keyup', e => {
            this.#handleKeyUp(e);
        });

        this[_form].addEventListener('submit', e => {
            this.#handleSubmit(e);
        });
    }

    /**
     * 
     * @param {Event} e 
     */
    #handleKeyUp(e) {
        const notTab = e.key !== 'Tab';

        e.preventDefault();

        const element = e.target;
        const spanError = element.parentNode.querySelector('span.error');

        if (element === this[_inputName]) {
            const name = element.value;

            if (name === '') {
                this.#containsError(true, element, spanError,
                    'Insira o Nome.');
            } else {
                this.#containsError(false, element, spanError);
            }
        }

        if (element === this[_inputSurname]) {
            const name = element.value;

            if (name === '') {
                this.#containsError(true, element, spanError,
                    'Insira o Sobrenome.');
            } else {
                this.#containsError(false, element, spanError);
            }
        }

        if (element === this[_inputCpf] && notTab) {
            const cpf = element.value;

            // Mascarando CPF
            element.value = cpfMask(cpf);

            // Validando CPF
            const validaCpf = new ValidaCPF(cpf);

            if (!validaCpf.valida()) {
                this.#containsError(true, element, spanError,
                    'CPF Inválido.');
            } else {
                this.#containsError(false, element, spanError);
            }
        }

        if (element === this[_inputUser] && notTab) {
            let user = element.value;

            element.value = this.#lettersOrNumbers(user);

            if (!isNaN(user[0])) {
                element.value = user.slice(1);
                this.#containsError(true, element, spanError,
                    'Nome de Usuário não pode começar com números.');
            } else {
                this.#containsError(false, element, spanError);
            }

        }

        if (element === this[_inputPassword] && notTab) {
            const password = element.value;

            if (password === '') {
                this.#containsError(true, element, spanError,
                    'Insira a senha');
                return;
            } else {
                this.#containsError(false, element, spanError);
            }

            if (password.length < 6 || password.length > 12) {
                this.#containsError(true, element, spanError,
                    'Senha precisa ter entre 6 a 12 caracteres.');
            } else {
                this.#containsError(false, element, spanError);
            }
        }

        if (element === this[_inputRPassword] && notTab) {
            const password = this[_inputPassword].value;
            const rPassword = element.value;

            if (password !== rPassword && rPassword !== '') {
                this.#containsError(true, element, spanError, 'As senhas não coincidem.');
                this[_inputPassword].classList.add('error');

            } else {
                this.#containsError(false, element, spanError);
                this[_inputPassword].classList.remove('error');
            }
        }
    }

    async #handleSubmit(e) {
        e.preventDefault();
        const arrayForm = Array.from(this[_form]).slice(0, -1);

        for (const input of arrayForm) {
            const spanError = input.parentNode.querySelector('span.error');
            const label = input.parentNode.querySelector('label');

            if (input.value === '') {
                this.#containsError(true, input, spanError,
                    `Insira o ${label.textContent}`);
            }

        }
        const spans = document.querySelectorAll('span.error.active');

        if (spans && spans.length > 0) {
            console.clear();
            this.#mensagem('O formulário contém erros!');
            const firstErrorInput = arrayForm[0].parentNode.querySelector('label');
            if (firstErrorInput) {
                firstErrorInput.scrollIntoView({ behavior: 'smooth' });
            }
        }else {
            console.clear();
            this.#mensagem('Dados enviados com sucesso!','yellow');
            for (const input of arrayForm){
                console.log(input.value);
            }
            this[_form].reset();
        }
    }

    #lettersOrNumbers(value) {
        return value.replace(/[^a-zA-Z0-9]/g, '');
    }

    #containsError(contains, input, spanError, msg = '') {
        if (contains) {
            spanError.innerHTML = msg;
            spanError.classList.add('active');
            input.classList.add('error');
            return;
        }

        spanError.innerHTML = '';
        spanError.classList.remove('active');
        input.classList.remove('error');
    }

    #mensagem(texto, cor = 'red', tempo = 3500) {

        let id = Math.floor(Date.now() * Math.random()).toString();

        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;

        document.querySelector('#container-mensagens').innerHTML += msg;

        setTimeout(() => {
            setTimeout(() => {
                document.querySelector("#msg-" + id).remove();
            }, 800)
        }, tempo);
    }
}

const validate = new ValidateForm();
