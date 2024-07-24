let lon = 0;
let lat = 0;

getLocation()

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    console.log(lat, lon)
}


function tratamentoDeEnvio(e) {
    e.preventDefault();

    // Pegando os valores dos campos do html para colocar no fetch body: JSON.
    const nome = document.querySelector('input[name=nome]');
    const email = document.querySelector('input[name=email]');
    const mensagem = document.querySelector('textarea[name=mensagem]');


    fetch('https://sheetdb.io/api/v1/u2yqk7tp4mryw', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NOME: nome.value,
            EMAIL: email.value,
            MENSAGEM: `https://www.google.com/maps/place/${lat}%20${lon}`,
        }) // Estes nomes devem ser iguais aos das colunas, inclusive em minusculos ou maiusculos, para que posam ser encontrados.
    }).then(() => {
        alert('Mensagem enviada com Sucesso!');
    })


    // Limpar campos.
    nome.value = '';
    email.value = '';
    mensagem.value = '';

    //alert('Enviado!'); // Colocado o then().
}


document.querySelector('form').addEventListener('submit', tratamentoDeEnvio)

/*
Aparentemente, o problema está relacionado com o uso da função 'watchPosition' no lugar de 'getCurrentPosition'. A função 'watchPosition' continua a monitorar a posição do usuário, o que pode resultar em múltiplas atualizações da latitude e longitude. Se você só precisa obter a localização uma vez, deve usar 'getCurrentPosition'.

https://www.google.com/maps/place/-7.8961133%20-37.1251023
*/
