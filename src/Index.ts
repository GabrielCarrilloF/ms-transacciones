import express from "express"
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/ping', (_req, res) => {
    console.log('soy un ping')
    res.send('pongmcbhdgc')
})

app.listen(PORT, () => {
    console.log(`Servidor está en el puerto ${PORT}`)
})