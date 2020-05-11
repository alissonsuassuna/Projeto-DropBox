class DropBoxController {
    constructor(){

        let $ =  document.querySelector.bind(document)

        this._btnSendFileElemento = $('#btn-send-file')

        this._inputFileElemento = $('#files')

        this._snackModalElemento = $('#react-snackbar-root')

        this._progressBarElemento = this._snackModalElemento.querySelector('.mc-progress-bar-fg')

        this._nameFileElemento = this._snackModalElemento.querySelector('.filename')

        this._timeleftElemento = this._snackModalElemento.querySelector('.timeleft')

        this._adicionarArquivos()
    }

    _adicionarArquivos(){

        this._btnSendFileElemento.addEventListener('click', event => {

            this._inputFileElemento.click()
            
        })

        this._inputFileElemento.addEventListener('change', event => {

            this._tarefasDeEnvios(event.target.files)

            this._mostrarModal()

            this._inputFileElemento.value = ''
        })
    }

    _mostrarModal(mostrar = true) {

        this._snackModalElemento.style.display = (mostrar) ? 'block' : 'none'
    }

    _tarefasDeEnvios(arquivos) {

        let promesas = [];

        [...arquivos].forEach(arquivo => {

            promesas.push(new Promise( (resolve, reject) =>{

                let ajax = new XMLHttpRequest()

                ajax.open('POST', '/arquivosGuardados')

                ajax.onload = event => {

                    this._mostrarModal(false)

                    try {
                        resolve(JSON.parse(ajax.responseText))
                    } catch (error) {
                        reject(error)
                    }
                }

                ajax.onerror = event => {

                    this._mostrarModal(false)
                    reject(event)
                }

                ajax.upload.onprogress = event => {

                    this._progressoDeEnvio(event, arquivo)
        
                }

                let formDate = new FormData()

                formDate.append('input-file', arquivo )

                this._comecouEnvio = Date.now()

                ajax.send(formDate)
            } ))
        })

        return Promise.all(promesas)
    }

    _progressoDeEnvio(event, arquivo) {

        let tempoGasto = Date.now() - this._comecouEnvio

        let quantidadeDeBytesEnviados = event.loaded
        let totalDeBytes = event.total

        let porcentagem = parseInt((quantidadeDeBytesEnviados / totalDeBytes) * 100)

        this._progressBarElemento.style.width = `${porcentagem}%`

        let tempoRestante = ((100 - porcentagem) * tempoGasto) / porcentagem

        this._nameFileElemento.innerHTML = arquivo.name

        this._timeleftElemento.innerHTML = this._formatacaoDeTempo(tempoRestante)
    }

    _formatacaoDeTempo(milesegundos) {

        let segundos = parseInt((milesegundos / 1000) % 60) 
        let minutos = parseInt((milesegundos / (1000 * 60)) % 60)
        let horas = parseInt((milesegundos / (1000 * 60 * 60)) % 24)

        if(horas > 0) {
            return `${horas} horas, ${minutos} minutos e ${segundos} segundos`
        }
        if(minutos > 0) {
            return `${minutos} minutos e ${segundos} segundos`
        }
        if(segundos > 0) {
            return `${segundos} segundos`
        }

        // Nada
        return ""
    }
}