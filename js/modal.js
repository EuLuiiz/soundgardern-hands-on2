const localModal = document.querySelector('.modal');
const SOUND_URL_RESERVA = 'https://xp41-soundgarden-api.herokuapp.com/bookings'

//função para pegar todos os dados do evento e mostrar no modal
async function pegarDadosEModal(idDoEvento) {
    const listaDeEventos = await fetch(SOUND_URL_EVENTOS, { //Vai salvar na variável 'listaDeEventos' o array de objetos retornados
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => { //Retorna a lista da API em forma de um array de objetos
        return resposta.json();
    }).catch((erro) => { //Tratamento de erro
        console.log(erro);
    });

    listaDeEventos.forEach(objeto => {
        if (objeto._id === idDoEvento) {
           const h1Titulo = document.getElementById('titulo-h1-modal');
           const infoIngressos = document.getElementById('ingressos-informados-modal');
           h1Titulo.innerHTML = `${objeto.name}`;
           infoIngressos.innerHTML = `Ingressos (Restam ${objeto.number_tickets})`;
           
        }
    })
}

//Função que ao clicar para reservar ingresso, vai abrir um modal na tela e criar um formulário baseado no evento selecionado e criar uma nova função para criar reserva na API
function mostrarModal(idDoEvento) {
    pegarDadosEModal(idDoEvento);
    localModal.style.display = 'block';


    const formReservarIngresso = document.querySelector('#cadastro-modal');

    formReservarIngresso.addEventListener('submit', async (event) => {
        event.preventDefault();

        const inputNome = document.getElementById('nomeModal');
        const inputEmail = document.getElementById('emailModal');
        const inputIngresso = document.getElementById('ingressosModal');
        const id = idDoEvento;

        const reservarEventoObj = {
            "owner_name": `${inputNome.value}`,
            "owner_email": `${inputEmail.value}`,
            "number_tickets": `${inputIngresso.value}`,
            "event_id": `${id}`
        }

        const reservarEventoJSON = JSON.stringify(reservarEventoObj);

        const resposta = await fetch(SOUND_URL_RESERVA, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: reservarEventoJSON
        }).then((response) => {
            alert('Reserva concluida!')
            window.location.reload();
            return response.json();
        }).then((responseOBJ) => {
            console.log(responseOBJ);
        });
    })
}

//Função que esconde o modal
function ocultarModal() {
    localModal.style.display = 'none';
}