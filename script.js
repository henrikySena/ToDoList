document.addEventListener("DOMContentLoaded", function () {
    
    // pega os elementos de fora (do HTML) através do id
    const caixaTexto = document.getElementById("caixa-de-texto");
    const botaoAdicionar = document.getElementById("adicionar-tarefa");
    const lista = document.getElementById("lista-tarefas");

    // elementos do modal
    const modal = document.getElementById("modal-edicao")
    const inputModal = document.getElementById("input-modal")
    const botaoSalvar = document.getElementById("botao-salvar")
    const botaoCancelar = document.getElementById("botao-cancelar")
    
    let tarefaAtual = null // ela vai guardar a tarefa que está sendo editada
    

    // função para salvar as tarefas no localStorage
    function salvarTarefas() {
        const tarefas = []
        document.querySelectorAll(".item-tarefa .texto-tarefa").forEach(span => {
            tarefas.push(span.textContent)
        })
        localStorage.setItem("tarefas",JSON.stringify(tarefas))
    }

    // função para carregar as tarefas
    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
        tarefas.forEach(texto => {
            criarItemTarefa(texto)
        })
    }
    
    // vamos criar uma função para ser ativada através do btn 'Adicionar tarefa'
    function criarItemTarefa(texto) {
            
            // cria um container 'li' (mas podia ser uma div)
            const itemLista = document.createElement("li")
            itemLista.classList.add("item-tarefa")

            // usa o span como texto dentro do container 'li'
            const textoDaTarefa = document.createElement("span")
            textoDaTarefa.textContent = texto
            textoDaTarefa.classList.add("texto-tarefa")

            // cria o botaoRemoverTarefa e insere um texto nele
            const botaoRemoverTarefa = document.createElement("button")
            botaoRemoverTarefa.textContent = "Excluir"
            botaoRemoverTarefa.classList.add("btn-excluir")

            // cria o botaoEditarTarefa
            const botaoEditarTarefa = document.createElement("button")
            botaoEditarTarefa.textContent = "Editar Tarefa"
            botaoEditarTarefa.classList.add("btn-editar")


            // insere os elementos dentreo de 'li' -> criando um 'objeto' em li, um container
            itemLista.appendChild(textoDaTarefa)
            itemLista.appendChild(botaoEditarTarefa)
            itemLista.appendChild(botaoRemoverTarefa)

            
            // botão para remover a tarefa
            botaoRemoverTarefa.addEventListener("click", function() {
                itemLista.remove();
                salvarTarefas()
            })


            
            // editar tarefa por meio de um modal
            botaoEditarTarefa.addEventListener("click", function() {

                // deixa o modal visivel retirando a classe hidden (q o deixa escondido)
                modal.classList.remove("hidden")

                // pega o texto da tarefa
                inputModal.value = textoDaTarefa.textContent

                // guarda o span que será editado
                tarefaAtual = textoDaTarefa
                inputModal.value = tarefaAtual.textContent

                // coloca o mouse automaticamente dentro do input
                inputModal.focus()
            })

            // insere os itens dentro da lista
            lista.appendChild(itemLista)

            // no final, limpa o cache do input
            caixaTexto.value = ''
    }

    // botao para adicionar uma nova tarefa
    botaoAdicionar.addEventListener("click", function(){
        if (caixaTexto.value.trim() !=='') {
            criarItemTarefa(caixaTexto.value)
            salvarTarefas()
            caixaTexto.value = ''
        }
    })
    
    // colocando os listeners fora do modal evita que eles 
    // sejam duplicados toda vez que os botões são executados
    botaoSalvar.addEventListener("click", function() {
        if (tarefaAtual) {
            tarefaAtual.textContent = inputModal.value;
            modal.classList.add("hidden")
            tarefaAtual = null;
            salvarTarefas()
        }
    })
    
    botaoCancelar.addEventListener("click", function() {
        modal.classList.add("hidden")
        tarefaAtual = null
    })

    carregarTarefas()
})
