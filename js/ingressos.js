/**PARA FAZER
 * LISTAR RESERVAS: 1. Fazer com que crie um h1 para mostrar o nome do evento 
 */

//Armazeno na variável um array com toda a URL sendo dividida por /
const localizacaoDnv = window.location.pathname.split('/');

//Função Para pegar o ID do evento
const encontrarID = () => {
    const urlDoEvento = new URL(window.location.href);//Uma variável vai armazenar a URL pega 
    const id = urlDoEvento.searchParams.get('id'); //Vai pegar a URL salva e adicionar a variável 'id' o valor depois do parametro id (no link)
    return id; //Retorna o valor do ID
}

//Função para Listar Reservas
const listarReservas = async () => {
    const listaDeReservas = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${encontrarID()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        return resposta.json();
    }).catch((erro) => {
        console.log(erro);
    });

    let htmlReservas = '';
    let contagem = 0;
    const tBody = document.getElementById('todasAsReservas')
    listaDeReservas.forEach(reservaDados => {
        contagem++
        htmlReservas +=
            `
                <tr>
                    <th scope="row">${contagem}</th>
                    <td>${reservaDados.owner_name}</td>
                    <td>${reservaDados.owner_email}</td>
                    <td>${reservaDados.number_tickets}</td>
                    <td>
                        <a class="btn btn-danger" onclick="excluirUmaReserva('${reservaDados._id}')">excluir</a>
                    </td>
                </tr>
            `
    });
    tBody.innerHTML = htmlReservas;
}

//Função que Exclui uma Reserva
const excluirUmaReserva = async (id) => { //O ID passado como parametro é o id que foi gerado na função listarReservas(), o parametro é usado na URL para acessar a reserva especifica
    if (confirm('Deseja excluir essa Reserva?')) { //Cria um pop-up com um botão de OK(true) e Cancel(false), caso True, apague a Reserva 
        const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            location.reload(); //Recarregar a página caso a Reserva seja excluida
        }).catch((erro) => {
            console.log(erro); //Tratamento de erro
        })
    }
}

// ***************** FUNCIONAIS ********************************
//Para evitar erros em outras páginas, executar a função só quando estiver na página de listar reservas
if ((localizacaoDoArquivo[localizacaoDoArquivo.length - 1]) == 'listar-reservas.html') {
    listarReservas();
}