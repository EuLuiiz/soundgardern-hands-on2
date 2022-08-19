//Pegando o Link da API
const SOUND_URL_EVENTOS = 'https://xp41-soundgarden-api.herokuapp.com/events';
const localizacaoDoArquivo = window.location.pathname;
console.log(localizacaoDoArquivo);

//Criando uma arrow function com o tratamennto async/wait
//Assim a função executa na mesma velocidade que a API (1 por vez) e carrega de forma dinâmica sem precisar esperar
const listarEventos = async () => {
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

    function converterData(dataInicial) {
        novaData = dataInicial.split('T');
        novaData = novaData[0]
        novaData = novaData.split('-').reverse().join('/')
        return novaData;
    };

    if (localizacaoDoArquivo === '/admin.html') {//Se a página carregada for Admin, executará esse bloco de ações
        const tbody = document.querySelector('tbody'); //Pegando o elemento PAI para adicionar o conteudo
        let htmlEventos = ''; //Cria uma variável vazia para adicionar todos os elementos
        let contador = 0; //Variável que informará o a contagem do evento na lista
        listaDeEventos.forEach(eventoDados => {//Passa o método .forEach para percorrer todo o Array de objetos criado e gerar um código pra cada
            contador++; //Sempre vai adicionar 1 cada vez que passar por um novo objeto, informando na lista uma contagem
            htmlEventos += //Toda vez que percorrer o objeto e achar um novo objeto, criará um bloco de conteudo e adiciona na variável um abaixo do outro
                `
                <tr>
                    <th scope="row">${contador}</th>
                    <td>${converterData(eventoDados.scheduled)}</td>
                    <td>${eventoDados.name}</td>
                    <td>${eventoDados.attractions.join(', ')}</td>
                    <td>
                        <a href="listar-reservas.html?id=${eventoDados._id}" class="btn btn-dark">Reservas</a>
                        <a href="editar-evento.html?id=${eventoDados._id}" class="btn btn-secondary">Editar</a>
                        <a href="excluir-evento.html?id=${eventoDados._id}" class="btn btn-danger">Excluir</a>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = htmlEventos; //Adicionando o bloco de elementos pronto no HTML
    }

    if (localizacaoDoArquivo === '/eventos.html') {
        const blocosDosEventos = document.querySelector('#listaDeEventos');
        let htmlEventos = '';
        listaDeEventos.forEach(eventoDados => {
            htmlEventos += `
                <article class="evento card p-5 m-3">
                    <h2>${eventoDados.name} <br> ${converterData(eventoDados.scheduled)}</h2>
                    <h4>${eventoDados.attractions.join(', ')}</h4>
                    <p>${eventoDados.description}</p>
                    <a class="btn btn-primary" onclick="mostrarModal('${eventoDados._id}')" id="reservar">reservar ingresso</a>
                </article>
            `;
        });
        blocosDosEventos.innerHTML = htmlEventos;
    }

    if (localizacaoDoArquivo === '/index.html') {
        const top3eventosIndex = document.getElementById('top3eventos');
        let htmlEventos = '';
        let contador = 0;
        listaDeEventos.forEach(eventoDados => {
            if (contador < 3) {
                htmlEventos += `
                    <article class="evento card p-5 m-3">
                        <h2>${eventoDados.name} <br> ${converterData(eventoDados.scheduled)}</h2>
                        <h4>${eventoDados.attractions.join(', ')}</h4>
                        <p>${eventoDados.description}</p>
                        <a class="btn btn-primary" onclick="mostrarModal('${eventoDados._id}')" id="reservar" >reservar ingresso</a>
                    </article>
                `;
                contador++;
            }
        });
        top3eventosIndex.innerHTML = htmlEventos;
    }
}

listarEventos();


//função para pegar os dados dos eventos
function armazenarDados(bancoDeDados){
    const dadosSalvos = bancoDeDados


}



/**Precisa Fazer:
 * Função correta de converter Data
*/