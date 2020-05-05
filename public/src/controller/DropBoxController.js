class DropBoxController {
    constructor(){

        let $ =  document.querySelector.bind(document)

        this._btnSendFileElemento = $('#btn-send-file')

        this._inputFileElemento = $('#files')

        this._snackModalElemento = $('#react-snackbar-root')

        this._adicionarArquivos()
    }

    _adicionarArquivos(){

        this._btnSendFileElemento.addEventListener('click', event => {

            this._inputFileElemento.click()
            
        })

        this._inputFileElemento.addEventListener('change', event => {

            this._tarefasDeEnvios(event.target.files)

            this._snackModalElemento.style.display = "block"
        })
    }

    _tarefasDeEnvios(arquivos) {

        let promesas = [];

        [...arquivos].forEach(arquivo => {

            promesas.push(new Promise( (resolve, reject) =>{

                let ajax = new XMLHttpRequest()

                ajax.open('POST', '/arquivosGuardados')

                ajax.onload = event => {

                    try {
                        resolve(JSON.parse(ajax.responseText))
                    } catch (error) {
                        reject(error)
                    }
                }

                ajax.onerror = event => {
                    reject(event)
                }

                let formDate = new FormData()

                formDate.append('input-file', arquivo )

                ajax.send(formDate)
            } ))
        })

        return Promise.all(promesas)
    }
}