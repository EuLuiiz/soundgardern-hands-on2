const SOUND_URL_EVENTOS = 'https://xp41-soundgarden-api.herokuapp.com/events';//Pegando o Link da API
const localizacaoDoArquivo = window.location.pathname.split('/');//Armazeno na variável um array com toda a URL sendo dividida por /

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

    //Função para convertar a Data (visual)
    function converterData(dataInicial) {
        //Modelo de data (2022-03-26T03:02:04.504Z)
        novaData = dataInicial.split('T'); //Guardo em uma variavel um array separando a data informada por 'T' (array[0]=2022-03-26 / array[1]=03:02:04.504Z)
        novaData = novaData[0] //Para facilitar falo pra variável armazenar apenas o primeiro elemento do array (array[0]=2022-03-26)
        novaData = novaData.split('-').reverse().join('/') //Agora será criado um novo array separado por '-' depois reverto a ordem do array e junto tudo novamente com '/'
        return novaData; //Retorno a nova data (26/03/2022)
    };

    //Conferindo se o ultimo elemento do array é a extensão do arquivo (fazendo assim funcionar em todos os sistemas independendo do local ou forma de acesso)
    if ((localizacaoDoArquivo[localizacaoDoArquivo.length - 1]) === 'admin.html') {//Se a página carregada for Admin, executará esse bloco de ações
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

    //Mesma coisa do exemplo acima
    if ((localizacaoDoArquivo[localizacaoDoArquivo.length - 1]) === 'eventos.html') {
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

    //Mesma coisa do exemplo acima
    if ((localizacaoDoArquivo[localizacaoDoArquivo.length - 1]) === 'index.html') {
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

//Toda a função será executada mas só vai continuar caso alguma condição retorne true, assim não terá erros em páginas diferentes
listarEventos();