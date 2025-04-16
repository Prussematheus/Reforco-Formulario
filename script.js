document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
   
    const nomeInput = document.querySelector('input[placeholder="Coloque Seu Nome aqui"]');
    const sobrenomeInput = document.querySelector('input[placeholder="Coloque Seu Sobrenome aqui"]');
    const dataInput = document.querySelector('input[type="date"]');
    const emailInput = document.querySelector('input[type="email"]');
    const cartaoInput = document.querySelector('input[type="number"]');
    const carroInput = document.querySelector('input[placeholder="Digite seu carro favorito"]');
    const musicaInput = document.querySelector('input[placeholder="Gênero Musical Favorito"]');
    const descricaoTextarea = document.getElementById('descricao');
    const generoRadios = document.querySelectorAll('input[name="genero"]');
    const experienciaCheckboxes = document.querySelectorAll('input[name="trabalho"]');
    
    
    function showError(input, message) {
        const spanError = input.nextElementSibling;
        spanError.textContent = message;
        spanError.style.display = 'block';
        input.style.borderColor = 'var(--color-red)';
    }
    
    function hideError(input) {
        const spanError = input.nextElementSibling;
        spanError.style.display = 'none';
        input.style.borderColor = 'var(--color-dark1)';
    }
    
    function validateIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            return idade - 1;
        }
        return idade;
    }
    
   
    function validateNome() {
        const value = nomeInput.value.trim();
        if (value.length < 2) {
            showError(nomeInput, 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        hideError(nomeInput);
        return true;
    }
    
    function validateSobrenome() {
        const value = sobrenomeInput.value.trim();
        if (value.length < 4) {
            showError(sobrenomeInput, 'Sobrenome deve ter pelo menos 6 caracteres');
            return false;
        }
        hideError(sobrenomeInput);
        return true;
    }
    
    function validateDataNascimento() {
        if (!dataInput.value) {
            showError(dataInput, 'Por favor, informe sua data de nascimento');
            return false;
        }
        
        const dataNascimento = new Date(dataInput.value);
        const hoje = new Date();
        
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = dataNascimento.getMonth();
        
        if (mesNascimento > mesAtual || 
            (mesNascimento === mesAtual && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        
        if (idade < 13) {
            showError(dataInput, 'Cê tem que 13 anos');
            return false;
        }
        
        if (idade > 120) {
            showError(dataInput, 'Deus não deixa ter mais de 120 anos');
            return false;
        }
        if (dataNascimento > hoje) {
            showError(dataInput, 'Data de nascimento não pode ser no futuro');
            return false;
        }
        
        hideError(dataInput);
        return true;
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(emailInput, 'Por favor, insira um email válido');
            return false;
        }
        hideError(emailInput);
        return true;
    }
    
    function validateCartao() {
        const value = cartaoInput.value.trim();
        if (!value) {
            showError(cartaoInput, 'Digita Pufavô 🥺🥺🥺');
            return false;
        }
        hideError(cartaoInput);
        return true;
    }
    
    function validateCarro() {
        const value = carroInput.value.trim();
        if (!value.includes(' ')) {
            showError(carroInput, 'É difícil separar Marca, Modelo e Ano por espaços?');
            return false;
        }
        hideError(carroInput);
        return true;
    }
    
    function validateMusica() {
        const value = musicaInput.value.trim().toLowerCase();
        if (value === 'funk') {
            showError(musicaInput, 'Funk não é música! Escolha outro gênero');
            return false;
        }
        if (!value) {
            showError(musicaInput, 'Por favor, informe seu gênero musical favorito');
            return false;
        }
        hideError(musicaInput);
        return true;
    }
    
    function validateDescricao() {
        const value = descricaoTextarea.value.trim();
        if (value.length < 10) {
            descricaoTextarea.style.borderColor = 'var(--color-red)';
            return false;
        }
        descricaoTextarea.style.borderColor = 'var(--color-dark1)';
        return true;
    }
    
    function validateGenero() {
        let isChecked = false;
        generoRadios.forEach(radio => {
            if (radio.checked) isChecked = true;
        });
        
        if (!isChecked) {
            document.querySelector('.multipla_escolha').style.border = '3px solid var(--color-red)';
            return false;
        }
        document.querySelector('.multipla_escolha').style.border = 'none';
        return true;
    }
    
    function validateExperiencia() {
        let isChecked = false;
        experienciaCheckboxes.forEach(checkbox => {
            if (checkbox.checked) isChecked = true;
        });
        
        if (!isChecked) {
            document.querySelector('.caixa_selecao').style.border = '3px solid var(--color-red)';
            return false;
        }
        document.querySelector('.caixa_selecao').style.border = 'none';
        return true;
    }
    

    nomeInput.addEventListener('blur', validateNome);
    sobrenomeInput.addEventListener('blur', validateSobrenome);
    dataInput.addEventListener('blur', validateDataNascimento);
    emailInput.addEventListener('blur', validateEmail);
    cartaoInput.addEventListener('blur', validateCartao);
    carroInput.addEventListener('blur', validateCarro);
    musicaInput.addEventListener('blur', validateMusica);
    descricaoTextarea.addEventListener('blur', validateDescricao);
    
    generoRadios.forEach(radio => {
        radio.addEventListener('change', validateGenero);
    });
    
    experienciaCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateExperiencia);
    });
    
 
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        if (!validateNome()) isValid = false;
        if (!validateSobrenome()) isValid = false;
        if (!validateDataNascimento()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateCartao()) isValid = false;
        if (!validateCarro()) isValid = false;
        if (!validateMusica()) isValid = false;
        if (!validateDescricao()) isValid = false;
        if (!validateGenero()) isValid = false;
        if (!validateExperiencia()) isValid = false;
        
       
        if (isValid) {
            alert('Formulário enviado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});