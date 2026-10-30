const http = require("http")

const app = http.createServer((req, res) => {
    //endpoints-link per attach  fuction
    console.log(req.url)
    console.log(req.method)
//    http://localhost:5000/login?email=admin@gmail.com&password=12345
    if (req.url == "/") {
        res.end("Server started link root /")

    }
    else if (req.url == '/login'&& req.method=="POST") {
        console.log(req.url)
        res.end("Server Running link /login.....................")
    }
    else if (req.url == '/register'){
        res.end("link  /register")}
    else{
    res.end("invalid link")
}

})

app.listen(5000, (
    console.log('Server started on http://localhost:5000')
   
))