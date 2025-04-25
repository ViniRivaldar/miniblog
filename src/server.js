
import app from "./app.js"
import { emitter } from "./database/index.js"

emitter.on('database_ready', ()=>{
  app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
  })
})
