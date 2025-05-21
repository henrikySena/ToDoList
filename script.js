document.addEventListener("DOMContentLoaded", function () {
    
    // pega os elementos de fora (do HTML) através do id
    const caixaTexto = document.getElementById("caixa-de-texto");
    const botaoAdicionar = document.getElementById("adicionar-tarefa");
    const lista = document.getElementById("lista-tarefas");
    
    
    // vamos criar uma função para ser ativada através do btn 'Adicionar tarefa'
    botaoAdicionar.addEventListener("click", function() {
        if (caixaTexto.value.trim() !=='') {


            // declaração de variáveis  --------------------------------------------------------

            // cria um container 'li' (mas podia ser uma div)
            const itemLista = document.createElement("li");
            itemLista.classList.add("item-tarefa");

            // usa o span como texto dentro do container 'li'
            const textoDaTarefa = document.createElement("span");
            textoDaTarefa.textContent = caixaTexto.value;
            textoDaTarefa.classList.add("texto-tarefa");

            // cria o botaoRemoverTarefa e insere um texto nele
            const botaoRemoverTarefa = document.createElement("button");
            botaoRemoverTarefa.textContent = "Excluir";
            botaoRemoverTarefa.classList.add("btn-excluir");

            // cria o botaoEditarTarefa
            const botaoEditarTarefa = document.createElement("button");
            botaoEditarTarefa.textContent = "Editar Tarefa";
            botaoEditarTarefa.classList.add("btn-editar");


            // funções  ------------------------------------------------------------------------

            // insere os elementos dentreo de 'li' -> criando um 'objeto' em li, um container
            itemLista.appendChild(textoDaTarefa)
            itemLista.appendChild(botaoEditarTarefa)
            itemLista.appendChild(botaoRemoverTarefa)

            
            // remove a tarefa após clicar nela
            botaoRemoverTarefa.addEventListener("click", function() {
                itemLista.remove();
                botaoRemoverTarefa.remove();
            })


            lista.appendChild(itemLista)

            // limpa o cache do input
            caixaTexto.value = ''
        }
    })
    
})
