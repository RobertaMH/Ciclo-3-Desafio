const express = require('express');
const cors = require('cors');
// const  {sequelize} = require('./models');

const models = require ('./models');
//  const { json } = require('sequelize/lib/sequelize');

const app = express()
app.use(cors());
app.use (express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
// let compra = models.Compra;
// let produto = models.Produto;
// let itemcompra = models.ItemPedido;

//aulas
//part1
app.get('/', function(req, res){
    res.send('Olá, Mundo!')
});


app.post('/clientes', async (req, res)=>{

    await cliente.create({
    
        nome: "Marcos",
        endereco: "Av.123",
        uf: "Paraná",
        email:"marcosSilva@hotmail.com",
        data: "2020-05-15",
        clienteDesde: "2000-09-30"
       
               
    }).then(function(){
        return  res.json({
            error: false,
            message: 'Cliente foi criado com sucesso!'
        })
    }).catch(function(erro){
    
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel criar cliente.'
        })
     
    });
});
    
    app.post('/pedidos', async (req, res) => {
        await pedido.create(
            req.body
        ).then(function(){
            return res.json({
                error: false,
                message: 'pedido foi criado com sucesso!'
            })
        }).catch(function(erro){
        
            return res.status(400).json({
                error: true,
                message: 'Foi impossivel criar pedido.'
            });
         
        });
        
    });
   
app.post('/servicos', async (req, res) => {
await servico.create(
    req.body
).then(function(){
    return res.json({
        error: false,
        message: 'Serviço foi criado com sucesso!'
    });
}).catch (function(erro){

    return res.status(400).json({
        error: true,
        message: 'Foi impossivel se conectar.'
    })
 
});
});
app.post('/clientes', async (req, res)=>{

    await cliente.create({
    
        nome: "Marcos",
        endereco: "Av.123",
        uf: "Paraná",
        email:"marcosSilva@hotmail.com",
        data: "2020-05-15",
        clienteDesde: "2000-09-30"
       
               
    }).then(function(){
        return  res.json({
            error: false,
            message: 'Cliente foi criado com sucesso!'
        })
    }).catch(function(erro){
    
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel criar cliente.'
        })
     
    });
});
app.post('/itempedidos', async (req, res)=>{

    await cliente.create({
    
        pedidoId: "11",
        servicoId:"6",
        quantidade:"1",
        valor:"500"
       
               
    }).then(function(){
        return  res.json({
            error: false,
            message: 'Item foi criado com sucesso!'
        })
    }).catch(function(erro){
    
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel criar item.'
        })
     
    });
});
//listas
    app.get('/listaservicos', async(req, res)=>{

        await servico.findAll({
           // raw: true
           order: [['nome', 'ASC']]
        }).then(function(servicos){
            res.json({servicos})
         });
    });
   
    app.get('/listaclientes', async (req, res) => {
        await cliente.findAll({
            raw: true
        }).then((cliente) => {
            res.json({
                cliente
            })
        });
    });
    app.get('/listapedido', async(req, res)=>{

        await pedido.findAll({
           raw: true
        //    order: [['nome', 'ASC']]
        }).then(function(pedidos){
            res.json({pedidos})
         });
    });
    //oferta
    app.get('/ofertaservicos', async (req, res)=>{
        await servico.count ('id').then (function(servicos){
            res.json ({servicos});
        });
    });
    app.get('/ofertacli', async (req, res)=>{
        await cliente.count ('id').then (function(cliente){
            res.json ({cliente});
        });
    });
    //id
    app.get('/servicos/:id', async(req, res)=> {
        await servico.findByPk(req.params.id)
        .then (serv =>{
            return res.json({
                error: false,
                serv
            });
        }).catch (function(erro){
            return res.status(400).json({
                error: true,
                messege: 'Erro: código não encontrado!'
            });
        });
    });
    app.get('/pedidos/:id', async (req, res)=>{

        await pedido.findByPk(req.params.id,{include:[{all: true}]})

        .then(ped=>{
            return res.json({ped});
        });
    });
    //atualizarservico
    app.put('/atualizaservico', async (req, res)=>{
        await servico.update(req.body, {
            where: {id: req.body.id}
        }).then (function (){
            return res.json({
                error: false,
                message:"Serviço foi alterado com sucesso!"
            })
        }).catch (function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração do serviço"
            });
        });
    });

   //editaritens
    //aparece o PromiseRejection
    // app.put('/pedidos/:id/editaritem', async (req, res)=>{
    //     const item={
    //         quantidade: req.body.quantidade,
    //         valor: req.body.valor
    //     };
    //     if (!await pedido.findByPk(req.params.id)){
    //         return res.status(400).json ({
    //             error: true,
    //             message: 'Pedido não encontrado'
    //         });
    //     };
    //     if (!await servico.findByPk(req.body.ServicoId)){
    //         return res.status(400).json ({
    //             error: true,
    //             message: 'Serviço não encontrado'
    //         });
    //     };

    //     await itempedido.update(item, {
    //         where: Sequelize.and({Servico: req.body.ServicoId},
    //            {PedidoId:req.params.id} )
    //     }).then(function(itens){
    //         return res.json({
    //             error: false,
    //              messege: "Seu pedido foi alterado!",
    //             itens
    //         });
    //     }).catch(function(erro){
    //         return res.status(400).json({
    //             error: true,
    //             messege: "Não foi possivel alterar"
    //         });
    //     });
    // });
    //excluir
    app.get('/excluircliente/:id', async(req, res)=>{
        cliente.destroy ({
            where: {id: req.params.id}
        }).then(function(){
            return res.json ({
                error: false,
                message: "cliente for excluido com sucesso."
        });
    }).catch(function( erro){
        return res.status(400).json({
            error: true,
            messege:"Erro ao excluir o cliente."
        });
    });
});
app.get('/excluirpedido/:id', async(req, res)=>{
    pedido.destroy ({
        where: {id: req.params.id}
    }).then(function(){
        return res.json ({
            error: false,
            message: "pedido for excluido com sucesso."
    });
}).catch(function( erro){
    return res.status(400).json({
        error: true,
        messege:"Erro ao excluir o pedido."
    });
});
});
app.get('/excluiritem/:id', async(req, res)=>{
    pedido.destroy ({
        where: {id: req.params.id}
    }).then(function(){
        return res.json ({
            error: false,
            message: "Item for excluido com sucesso."
    });
}).catch(function( erro){
    return res.status(400).json({
        error: true,
        messege:"Erro ao excluir o item."
    });
});
});
//DESAFIO

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{

    console.log('Servidor ativo: http://localhost:3001');
})