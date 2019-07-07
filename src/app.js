const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast =require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static path to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        'name':"Advit Nayak",
        'PageTitle':'Weather Application'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        'name':'Advit Nayak',
        'PageTitle':'About'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        'name':'Advit Nayak',
        'PageTitle':'Help'
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Error: Please provide a Valid address")
    }
    geocode(req.query.address,(error,data={})=>{
        if(error){
            return res.send({error})
        }
        forecast(data,(error_forecast,forecast_data)=>{
            if(error_forecast){
                return res.send({error_forecast})
            }
            res.send({
                'forecast':forecast_data,
                'Address':req.query.address
            })
        })
    })
    
    // res.send({
    //     'Location': 'India',
    //     'Temperature' : req.query.address
    // })
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send("Error: Please provide search option")
    }
    console.log( req.query)
    res.send({
        'products':[]
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        'PageTitle':'404 Error',
        'errorMessage':'Help article not found'
    })
});
app.get('*',(req,res)=>{
    res.render('404',{
        'PageTitle':'404 Error',
        'errorMessage':'Page not found'
    })
});

// app.get('*',(req,res)=>{
//     res.send("Error 404!")
// })
// app.get('',(req,res)=>{
//     res.send("<h1>Home Page</h1>")
// });
// app.get('/help',(req,res)=>{
//     res.send({
//         'Name':'Advit',
//         'Age':26
//     })
// });
// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page</h1>");
// });


app.listen(port,()=>{
    console.log("Server Running on port "+port)
})
