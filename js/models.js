//MODELS
class Modelos {
    constructor() {
        this._copy = "";
        this._data = enviar.value;
        this._texto = "";
        this._imagem = "";
        this._titulo = "";

    }

    buscaGalaxia() {

        let request = new XMLHttpRequest()

        request.addEventListener("load", () => {
            
            if (request.status == 200) {

                let dados = this._processaResponse(request.responseText);
                this._atualiza(dados);
            }
        })

        request.open("GET", "https://api.nasa.gov/planetary/apod?api_key=JBjDplZ3xTnfv1OEShsGhRaJNcn3LAyaKtZHUfiW&date=" + this._data, false);
        request.send();
    }

    _processaResponse(responseText) {
        console.log(responseText)
        let response = JSON.parse(responseText);
        return response;
    }

    _atualiza(dados) {
        
        this._copy = dados.copyright;
        this._imagem = dados.url;
        this._texto = dados.explanation;
        this._data = dados.enviar;
        this._titulo = dados.title;
    }

    getCopyright() {
        return this._copy;
    }

    getImagem() {
        return this._imagem;
    }

    getData() {
        return this._data;
    }

    getTitulos() {
        return this._titulo;
    }

    getText() {
        return this._texto;
    }
}

//VIEWS
class Visualizacao
    {
        constructor() { }
        render( model )
        {
            
            let card = document.createElement( "div" );
            
            card.innerHTML = `
                <h1>${ model.getTitulos() }</h1>
                <img src=${ model.getImagem() }>
                <p>${ model.getCopyright() }</p>
                <p>${ model.getData() }</p>
                <p>${ model.getText() }</p>
            `
            document.body.appendChild( card );
        }
    }

    //CONTROLLERS
    class Controle {
        constructor() { }
    
        adicionaGalaxia() {
    
            let user = new Modelos();
            user.buscaGalaxia();
    
            let view = new Visualizacao();
            view.render(user);
        }
    }
    
    let controller = new Controle();

    document.getElementById("enviar").addEventListener("click", controller.adicionaGalaxia);