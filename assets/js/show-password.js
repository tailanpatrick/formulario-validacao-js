const btnsShow = document.querySelectorAll('.btn-show');
const inputsPass = document.querySelectorAll('.input-password');


for (let btn of btnsShow) {

    ['mousedown', 'touchstart'].forEach(event => {
        const input = btn.previousElementSibling;

        btn.style.opacity = '0';

        input.addEventListener('keyup', e => {
            if(!input.value){
                btn.style.opacity = '0';
                return;
            }
            btn.style.opacity = '1';
        });

        btn.addEventListener(event, () => {
            let holdTimer = setTimeout(() => {
                input.type = 'text';
                btn.classList.remove('bi-eye-fill');
                btn.classList.add('bi-eye-slash-fill');
            }, 200); 
            
            btn.addEventListener('mouseup', () => {
                clearTimeout(holdTimer);
                btn.previousElementSibling.type = 'password';
                btn.classList.add('bi-eye-fill');
                btn.classList.remove('bi-eye-slash-fill');
            });
    
            btn.addEventListener('mouseleave', () => {
                clearTimeout(holdTimer);
                btn.previousElementSibling.type = 'password';
                btn.classList.add('bi-eye-fill');
                btn.classList.remove('bi-eye-slash-fill');
            });

            btn.addEventListener('touchend', () => {
                clearTimeout(holdTimer);
                btn.previousElementSibling.type = 'password';
                btn.classList.add('bi-eye-fill');
                btn.classList.remove('bi-eye-slash-fill');
            });
        });
    });
    
}