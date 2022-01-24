'use strict';

//let banco = [
//    {'tarefa' : 'Estudar JS', 'status' : ''},
//    {'tarefa' : 'Netflix', 'status' : 'checked'},
//    {'tarefa' : 'Teste', 'status' : ''}
//]

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [] 
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

const criarItem = (tarefa, status='', indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}> 
    `
    document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach( (item, indice) => criarItem(item.tarefa, item.status, indice))
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value
    if( tecla === 'Enter' ){
        const banco = getBanco()
        banco.push({'tarefa' : texto, 'status' : ''})
        setBanco(banco)
        atualizarTela()
        evento.target.value = ''
    }
}

const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1);
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' || 'ckecked' : '';
    setBanco(banco)
    atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    console.log(elemento)
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice
        atualizarItem(indice) 
    }
}

const tamanhoTela = () => {
    const largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const todoAddMobile = document.getElementById('todoAddMobile')
    const todoText = document.getElementById('todoText')
    console.log(largura)

    if(largura > 600){
        todoAddMobile.style.display = 'none'
    }else if(largura < 600){
        todoAddMobile.style.display = 'block'
        todoText.style.display = 'none'
    }
}



document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList').addEventListener('click', clickItem)

tamanhoTela()
atualizarTela()