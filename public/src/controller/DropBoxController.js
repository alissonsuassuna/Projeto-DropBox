class DropBoxController {
    constructor(){

        this.btnSendFileElemento = document.querySelector('#btn-send-file')

        this.inputFileElemento = document.querySelector('#files')

        this.snackModalElemento = document.querySelector('#react-snackbar-root')

        this.initEvents()
    }

    initEvents(){

        this.btnSendFileElemento.addEventListener('click', event => {

            this.inputFileElemento.click()
            
        })

        this.inputFileElemento.addEventListener('change', event => {

            this.tarefasDeEnvios(event.target.files)

            this.snackModalElemento.style.display = "block"
        })
    }

    tarefasDeEnvios(arquivos) {

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