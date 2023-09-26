/* 
MPX CLass
Sequência de funções utilizadas pelos sistemas da MePixa!
*/

// onKeyPress="mascaraTel(this);" maxlength="15"
// onKeyPress="mascaraCPF(this);" maxlength="14"
// onKeyPress="mascaraData(this);"  maxlength="10"


/*FUNÇÃO DE CONFIRMAÇÃO*/
function confirmar(pag, msg) {
  // Criação do layer
  var layer = document.createElement('div');
  layer.style.position = 'fixed';
  layer.style.top = '0';
  layer.style.left = '0';
  layer.style.width = '100%';
  layer.style.height = '100%';
  layer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  document.body.appendChild(layer);

  // Criação da div com classe "box"
  var box = document.createElement('div');
  box.className = 'box';
  box.style.padding = '15px';
  box.style.display = 'inline-block';
  box.style.align = 'center';
  box.style.maxWidth = '400px';
  box.style.position = 'fixed';
  box.style.top = '50%';
  box.style.left = '50%';
  box.style.transform = 'translate(-50%, -50%)';
  box.style.textAlign = 'center';
  document.body.appendChild(box);

  // Criação do texto dentro da div
  var texto = document.createElement('p');
  texto.innerHTML = msg;
  box.appendChild(texto);

  // Criação do botão "NÃO"
  var botaoNao = document.createElement('button');
  botaoNao.className = 'botao';
  botaoNao.innerHTML = 'NÃO';
  botaoNao.style.backgroundColor = '#FF3300';
  botaoNao.style.marginRight = '10px';
  botaoNao.addEventListener('click', function() {
    document.body.removeChild(layer);
    document.body.removeChild(box);
  });
  box.appendChild(botaoNao);

  // Criação do botão "SIM"
  var botaoSim = document.createElement('button');
  botaoSim.className = 'botao';
  botaoSim.innerHTML = 'SIM';
  botaoSim.style.backgroundColor = '#33CC33';
  botaoSim.addEventListener('click', function() {
    window.open(pag, '_parent');
    document.body.removeChild(layer);
    document.body.removeChild(box);
  });
  box.appendChild(botaoSim);
		
				  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) { // 27 é o código da tecla "Esc"
      fecharTudo();
    }
  });

  function fecharTudo() {
    document.body.removeChild(layer);
    document.body.removeChild(box);
  }
}

//============================ ISCPF2 ===================================


function isCPF2(cpf){

estaok=1
estaok2=1
estaok3=1
 cpf = cpf.replace(/[^\d]+/g,'');    if(cpf == '') return false; // Elimina CPFs invalidos conhecidos
if (cpf.length != 11 ||  cpf == "00000000000" ||    cpf == "11111111111" || cpf == "22222222222" ||     cpf == "33333333333" ||     cpf == "44444444444" ||      cpf == "55555555555" ||   cpf == "66666666666" ||  cpf == "77777777777" ||         cpf == "88888888888" ||         cpf == "99999999999")       {estaok=0;    }
// Valida 1o digito
add = 0;    for (i=0; i < 9; i ++)       add += parseInt(cpf.charAt(i)) * (10 - i);  rev = 11 - (add % 11);  if (rev == 10 || rev == 11)     rev = 0;    if (rev != parseInt(cpf.charAt(9)))     estaok2=0;   
// Valida 2o digito
add = 0;    for (i = 0; i < 10; i ++)        add += parseInt(cpf.charAt(i)) * (11 - i);  rev = 11 - (add % 11);  if (rev == 10 || rev == 11)     rev = 0;    if (rev != parseInt(cpf.charAt(10))){        estaok=0;}else{           estaok3=1;   }
if (estaok==1 && estaok2==1 && estaok3==1) {
return true; 
} else {
return false; 
}
}



//============================ PREENCHER ===================================
function preencher(pag, msg, js = "") {
  // Criação do layer
  var layer = document.createElement('div');
  layer.style.position = 'fixed';
  layer.style.top = '0';
  layer.style.left = '0';
  layer.style.width = '100%';
  layer.style.height = '100%';
  layer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  document.body.appendChild(layer);

  // Criação da div com classe "box"
  var box = document.createElement('div');
  box.className = 'box';
  box.style.padding = '15px';
  box.style.display = 'inline-block';
  box.style.align = 'center';
  box.style.maxWidth = '400px';
  box.style.position = 'fixed';
  box.style.top = '50%';
  box.style.left = '50%';
  box.style.transform = 'translate(-50%, -50%)';
  box.style.textAlign = 'center';
  document.body.appendChild(box);

  // Criação do texto dentro da div
  var texto = document.createElement('p');
  texto.innerHTML = msg;
  box.appendChild(texto);

  // Criação do formulário
  var form = document.createElement('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    abrirPagina();
  });
  box.appendChild(form);

  // Criação do input
  var input = document.createElement('input');
  input.name = 'ok';
  input.type = 'text';
  input.className = 'Formulario';
  input.id = 'ok';
  input.required = true;
  if (js === 'cpf' || js === 'cpfo') {
    input.onkeypress = function(event) {
      mascaraCPF(this);
    };
    input.maxLength = 14;
  } else if (js === 'tel' || js === 'telo') {
    input.onkeypress = function(event) {
      mascaraTel(this);
      if (event.keyCode === 13) {
        event.preventDefault();
var telefoneNumeros = this.value.replace(/\D/g, '');

if (this.value.charAt(0) !== '+') {
  var regexTelefone = /^(?:(?:\+|00)?55\s?)?(?:\(?[1-9][0-9]\)?\s?)?9[0-9]{8}$/;
  
  if (!regexTelefone.test(telefoneNumeros)) {
    alert('CELULAR INVÁLIDO');
    return;
  }
}
        abrirPagina();
      }
    };
    input.maxLength = 15;
  }
  input.autofocus = true;
  form.appendChild(input);

  // Criação do botão "OK"
  var botaoOk = document.createElement('button');
  botaoOk.className = 'botao';
  botaoOk.innerHTML = 'OK';
  botaoOk.style.backgroundColor = '#33CC33';
  botaoOk.style.marginRight = '10px';
  botaoOk.type = 'submit';
  form.appendChild(botaoOk);

  // Criação do botão "CANCELAR"
  var botaoCancelar = document.createElement('button');
  botaoCancelar.className = 'botao';
  botaoCancelar.innerHTML = 'CANCELAR';
		botaoCancelar.style.backgroundColor = '#FF3300';
  botaoCancelar.addEventListener('click', function() {
    document.body.removeChild(layer);
    document.body.removeChild(box);
  });
  box.appendChild(botaoCancelar);
		
		  setTimeout(function() {
    input.focus();
  }, 50);
		
		  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) { // 27 é o código da tecla "Esc"
      fecharTudo();
    }
  });

  function fecharTudo() {
    document.body.removeChild(layer);
    document.body.removeChild(box);
  }
		

  function abrirPagina() {
    var ok = input.value;
    if (ok !== null && ok !== '') {
      if (js === 'cpfo' && !isCPF2(ok)) {
        alert('CPF INVÁLIDO');
        return;
      }
      window.open(pag + encodeURIComponent(ok), '_parent');
      document.body.removeChild(layer);
      document.body.removeChild(box);
    }
  }

}


function alerta(mensagem) {
  // Criação do layer
  var layer = document.createElement('div');
  layer.style.position = 'fixed';
  layer.style.top = '0';
  layer.style.left = '0';
  layer.style.width = '100%';
  layer.style.height = '100%';
  layer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  document.body.appendChild(layer);
  // Criação da div com classe "box"
  var box = document.createElement('div');
  box.className = 'box';
  box.style.padding = '15px';
  box.style.display = 'inline-block';
  box.style.align = 'center';
  box.style.maxWidth = '400px';
  box.style.position = 'fixed';
  box.style.top = '50%';
  box.style.left = '50%';
  box.style.transform = 'translate(-50%, -50%)';
  box.style.textAlign = 'center';
  document.body.appendChild(box);

  // Criação do texto dentro da div
  var texto = document.createElement('p');
  texto.innerHTML = mensagem;
  box.appendChild(texto);
		var botaoSim = document.createElement('button');
  botaoSim.className = 'botao';
  botaoSim.innerHTML = 'OK';
  botaoSim.style.backgroundColor = '#005500';
  botaoSim.addEventListener('click', function() {
    document.body.removeChild(layer);
    document.body.removeChild(box);
  });
  box.appendChild(botaoSim);

  // Fechar alerta ao clicar em qualquer ponto da tela
  layer.addEventListener('click', fecharAlerta);
		document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27 || event.keyCode === 13) { // 27 é o código da tecla "Esc"
      fecharAlerta();
    }
  });

  function fecharAlerta() {
    document.body.removeChild(layer);
    document.body.removeChild(box);
    document.removeEventListener('click', fecharAlerta);
  }
		
}



function preencher2(pag,msg) {
var ok = window.prompt(msg);
if (ok !=null && ok!="") { 
window.open(pag+ok,'_self');
}
}

/* FUNÇÃO FORMULARIO NUMÉRICO
Coloque no campo numérico o seguinte comando:
onkeypress="return sonumero(event);"
*/
function sonumero(e){
    var tecla=(window.event)?event.keyCode:e.which;				
    if((tecla>43 && tecla<58)) return true;
    else{
    	if (tecla==8 || tecla==0 || tecla==13) return true;
	else  return false;
    }
}






/* LEFT, RIGHT e LEN */
function left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function len(str){
	    return String(str).length;
}


/* TEMPORIZADOR, EXIBIR, OCULTAR */

function timer(acao,tempo){
window.setTimeout(acao,tempo);
}

function exibir(id) {
document.getElementById(id).style.display = 'inline-block'
}
function exibirtr(id) {
document.getElementById(id).style.display = 'table-row'
}



function ocultar(id) {
document.getElementById(id).style.display = 'none'
}


/* MASCARAS E VALIDAÇÃO */



// MASCARA GERAL 

function formataCampo(campo, Mascara, evento) { 
var boleanoMascara; 
var Digitato = evento.keyCode;
exp = /\-|\.|\/|\(|\)| /g
campoSoNumeros = campo.value.toString().replace( exp, "" ); 
var posicaoCampo = 0;    
var NovoValorCampo="";
var TamanhoMascara = campoSoNumeros.length;; 
if (Digitato != 8) { // backspace 
for(i=0; i<= TamanhoMascara; i++) { 
boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
|| (Mascara.charAt(i) == "/")) 
boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
|| (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
if (boleanoMascara) { 
NovoValorCampo += Mascara.charAt(i); 
TamanhoMascara++;
}else { 
NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
posicaoCampo++; 
}              
}      
campo.value = NovoValorCampo;
return true; 
}else { 
return true; 
}
}
function mascaraInteiro(){
	
        if ((event.keyCode < 48 || event.keyCode > 57 ) && event.keyCode!= 43){
                event.returnValue = false;
                return false;
        }
        return true;
}


//onKeyPress="mascaraCNPJ(this);"
function mascaraCNPJ(cnpj){
if(mascaraInteiro(cnpj)==false){
event.returnValue = false;
}       
return formataCampo(cnpj, '00.000.000/0000-00', event);
}

function mascaraCPF(cpf){
var tecla=(window.event)?event.keyCode:e.which;
if (tecla==13) {
event.returnValue = true;
} else {
if(mascaraInteiro(cpf)==false){
event.returnValue = false;
}       
return formataCampo(cpf, '000.000.000-00', event);
}
}


function mascaraData(data){
if(mascaraInteiro(data)==false){
event.returnValue = false;
}
return formataCampo(data, '00/00/0000', event);
}



function mascaraTel(telefone) {
  if (telefone.value.startsWith("(0") || telefone.value.startsWith("0") || telefone.value.startsWith("(+") || telefone.value.startsWith("+")) {
    telefone.value = telefone.value.replace('(', '');
    if (telefone.value.startsWith("+")) {
      telefone.maxLength = 25;
    }
  } else {
    if (mascaraInteiro(telefone)) {
      if (telefone.value.length === 0) {
        telefone.value = '(' + telefone.value;
      }
      if (telefone.value.length === 3) {
        telefone.value = telefone.value + ') ';
      }
      if (telefone.value.length === 9) {
        telefone.value = telefone.value + '-';
      }
      if (telefone.value.length === 14) {
        telefone.value = telefone.value.replace('-', '');
        telefone.value = telefone.value.substring(0, 10) + '-' + telefone.value.substring(10);
      }
    } else {
      telefone.value = telefone.value;
    }
  }
}




function mascaraTelefoneInternacional(telefone) {
  // Remove todos os caracteres não numéricos do telefone
  const numeroLimpo = telefone.value.replace(/\D/g, '');
  
  // Verifica se o número está vazio ou começa com '+' (indicativo de DDI)
  if (numeroLimpo === '' || numeroLimpo.startsWith('+')) {
    telefone.value = numeroLimpo;
    return;
  }
  
  // Formata o número de telefone com a máscara desejada
  let numeroFormatado = '+' + numeroLimpo;
  if (numeroLimpo.length > 2) {
    const codigoPais = numeroLimpo.substring(0, 3);
    const restoNumero = numeroLimpo.substring(3);
    numeroFormatado = '+' + codigoPais + ' ' + restoNumero;
  }
  
  // Atualiza o valor do campo de telefone com o número formatado
  telefone.value = numeroFormatado;
}


function invalido() {
	alert('valor inválido');
}
function isCPF(Objcpf){
cpf=Objcpf.value
estaok=1
estaok2=1
estaok3=1
 cpf = cpf.replace(/[^\d]+/g,'');    if(cpf == '') return false; // Elimina CPFs invalidos conhecidos
if (cpf.length != 11 ||  cpf == "00000000000" ||    cpf == "11111111111" || cpf == "22222222222" ||     cpf == "33333333333" ||     cpf == "44444444444" ||      cpf == "55555555555" ||   cpf == "66666666666" ||  cpf == "77777777777" ||         cpf == "88888888888" ||         cpf == "99999999999")       {estaok=0;    }
// Valida 1o digito
add = 0;    for (i=0; i < 9; i ++)       add += parseInt(cpf.charAt(i)) * (10 - i);  rev = 11 - (add % 11);  if (rev == 10 || rev == 11)     rev = 0;    if (rev != parseInt(cpf.charAt(9)))     estaok2=0;   
// Valida 2o digito
add = 0;    for (i = 0; i < 10; i ++)        add += parseInt(cpf.charAt(i)) * (11 - i);  rev = 11 - (add % 11);  if (rev == 10 || rev == 11)     rev = 0;    if (rev != parseInt(cpf.charAt(10))){        estaok=0;}else{           estaok3=1;   }
if (estaok==1 && estaok2==1 && estaok3==1) {
return true; 
} else {
return false; 
}
}


function isCNPJ(cnpj) {
cnpj = cnpj.replace(/[^\d]+/g,'');
if(cnpj == '') return false;
if (cnpj.length != 14)
return false;
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function isDate(data) {
  var ErrCnt = -1;
  var dt = data.value;
  var validformat = /^\d{2}[\/\-]\d{2}[\/|\-]\d{4}$/;
  if (!validformat.test(dt)){ ErrCnt = 0; }
  var d = dt.split(/[\/|\-]/);
  var bday = new Date(d[2],(d[1]-1),d[0]);
  if (((bday.getMonth()+1)!=d[1])||(bday.getDate()!=d[0])||(bday.getFullYear()!=d[2])) { ErrCnt = 1; }
  if (ErrCnt < 0) {
    return true;
  } else {return false; }
}

function idade(age) {
	dateString=right(left(age,5),2)+"/"+left(age,2)+"/"+right(age,4)
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

function isMail(mail) {
	var x = mail.value;
var atpos = x.indexOf("@");
var dotpos = x.lastIndexOf(".");
if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
	return false
} else {
	return true
}
	
}


