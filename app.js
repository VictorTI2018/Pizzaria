let items = []

let rbPizza = document.getElementById('rbPizza')
let rbBebida = document.getElementById('rbBebida')

const validarDados = () => {
    let pizza = document.getElementById('pizza')
    let bebida = document.getElementById('bebida')
    let descricao = document.getElementById('descricao')
    let message = document.getElementById('message')
    let mesa = document.getElementById('mesa')

    let itemSelecionado = 0
    let produto = ""

    if (rbPizza.checked) {
        itemSelecionado = pizza.selectedIndex
        produto = pizza[itemSelecionado].text
    } else {
        itemSelecionado = bebida.selectedIndex
        produto = bebida[itemSelecionado].text
    }
    let valorDaDescricao = descricao.value
    if (validarDescricao(valorDaDescricao)) {
        let numeroDaMesa = mesa.value
        if (validarNumeroDaMesa(numeroDaMesa)) {
            const payload = `Mesa: ${numeroDaMesa} - ${produto}: (${valorDaDescricao})`
            adicionarPedido(payload)
        } else {
            mostrarErro({ el: message, message: 'Por favor, informe o número da mesa!', color: 'danger' })
            clearError({ el: message, message: 'Dados do Pedido', time: 2500 })
        }

    } else {
        mostrarErro({ el: message, message: 'Por favor, informe uma descrição para o pedido!', color: 'danger' })
        clearError({ el: message, message: 'Dados do Pedido', time: 2500 })
    }
}

const mostrarErro = (messageOptions) => {
    messageOptions.el.innerHTML = alertCustom(messageOptions.message, messageOptions.color)
}


const clearError = (messageOptions) => {
    setTimeout(() => {
        messageOptions.el.innerHTML = `${messageOptions.message}`
    }, messageOptions.time)
}

const validarDescricao = (descricao) => {
    return descricao !== ''
}

const validarNumeroDaMesa = (mesa) => {
    return Number(mesa) > 0 && Number(!isNaN(mesa))
}

const adicionarPedido = (dados) => {
    items.push(dados)
    mostrarSaidaDoPedido(items)
    limparCampos()
}

const alertCustom = (mensagem, tipo) => {
    return `<div class="alert alert-${tipo}" role="alert">
                ${mensagem}
            </div>`
}

const limparCampos = () => {
    let pizza = document.getElementById('pizza')
    let bebida = document.getElementById('bebida')
    rbPizza.checked = true
    bebida.className = 'd-none'
    pizza.className = 'd-block form-control'
    pizza.selectedIndex = 0
    document.getElementById('descricao').value = ''
    document.getElementById('mesa').value = ''
    rbPizza.focus()


}

const mostrarSaidaDoPedido = (items) => {
    let saidaDoPedido = document.getElementById('saidaDoPedido')
    saidaDoPedido.textContent = items.join("\n")
}

const trocarDeItem = () => {
    let pizza = document.getElementById('pizza')
    let bebida = document.getElementById('bebida')

    if (rbPizza.checked) {
        bebida.className = 'd-none'
        pizza.className = 'd-block form-control'
    } else {

        pizza.className = 'd-none'
        bebida.className = 'd-block form-control'
    }
}

const numeroDeSaboresPlaceholder = (tipoPizza) => {
    let numeroSabores = 0
    switch (tipoPizza) {
        case 'broto':
            numeroSabores = 1
            break;
        case 'media':
            numeroSabores = 2
            break;
        case 'grande':
        case 'familia':
            numeroSabores = 3
            break
    }

    return numeroSabores
}

const tipoDeBebidasDisponivel = (tipoBebida) => {
    let tipoDeBebidas = ""
    switch (tipoBebida) {
        case 'guarana':
            tipoDeBebidas = "Poty, Cotuba, Antarctica."
            break;
        case 'suco':
            tipoDeBebidas = "Laranja, Acerola, Abacaxi."
            break;
        case 'agua':
            tipoDeBebidas = 'Com gás, Sem gás, Tônica.'
            break;
        case 'cerveja':
            tipoDeBebidas = "Brahma, Skol, Antarctica Sub Zero."
    }
    return tipoDeBebidas
}

const mostrarDescricaoPlaceholder = () => {
    let pizza = document.getElementById('pizza')
    let bebidas = document.getElementById('bebida')
    let descricao = document.getElementById('descricao')
    if (rbPizza.checked) {
        let numeroDeSabores = numeroDeSaboresPlaceholder(pizza.value)
        descricao.placeholder = `Até ${numeroDeSabores} sabores`
    } else {
        let tipoDeBebidas = tipoDeBebidasDisponivel(bebidas.value)
        descricao.placeholder = `${tipoDeBebidas}`
    }
}

rbPizza.addEventListener('change', trocarDeItem)
rbBebida.addEventListener('change', trocarDeItem)

let descricao = document.getElementById('descricao')
descricao.addEventListener('focus', mostrarDescricaoPlaceholder)

descricao.addEventListener('blur', () => descricao.placeholder = '')

descricao.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        validarDados()
    }
})

let btnGerarPedido = document.getElementById('btnGerarPedido')
btnGerarPedido.addEventListener('click', validarDados)

