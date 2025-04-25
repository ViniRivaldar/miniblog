import app from "./app.js"

app.on('pronto', ()=>{
  app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
  })
})