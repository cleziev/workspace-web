function carregaDash(){
    var strUser = localStorage.getItem("dashcardUser");
    if (!strUser){
        window.location = "index.html";
    }

    // usuario está conectado... preciso consultar o relatórico consolidado no back end
    var strId = window.location.search;
    console.log(strId);

    var idAgente = strId.substr(4);
    console.log("ID recuperado = "+idAgente);

    fetch("http://localhost:8088/totaisconsolidados?id="+idAgente)
       .then(res => res.json())
       .then(lista => preencheDash(lista));
}

function preencheDash(lista){
    console.log(lista);
    var nomeAgente;
    var volume;
    var sucesso;
    var fraude;
    var falha;

    for (i=0; i<lista.length; i++){
        var ag = lista[i];
        nomeAgente = ag.nomeAgente;
        volume = ag.volume;
        if(ag.status==0){
            sucesso = ag.numeroOp;
        }
        else if(ag.status==1){
            falha = ag.numeroOp;
        }
        else{
            fraude = ag.numeroOp;
        }

    }



    document.getElementById("nomeAgente").innerHTML = "<h3>"+nomeAgente+"</h3>";
    document.getElementById("volumeAgente").innerHTML = "<h4>Volume Transacional: "+volume+"</h4>";
    document.getElementById("sucesso").innerHTML = "<h4>Transação com Sucesso: "+sucesso+"</h4>";
    document.getElementById("fraude").innerHTML = "<h4>Transação Suspeita de  Fraude: "+fraude+"</h4>";
    document.getElementById("falha").innerHTML = "<h4>Transação com Fraude: "+falha+"</h4>";

    var ctx = document.getElementById('meuGrafico');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sucesso', 'Falha', 'Fraude'],
            datasets: [{
                label: '# de operacoes',
                data: [suc, fal, fra],
                backgroundColor: [
                    'rgba(0,0,255,0.2)',
                    'rgba(0,120,120,0.2)',
                    'rgba(255,0,0,0.2)'
                ]
           }]
        },
        options : {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}



/*
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
*/