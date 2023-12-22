const authRoute= required('./auth.route.js')
module.export=(app)=>{
    app.use('/' , function(Req,res){
        res.send({
            'message':'Our first endpoint'
        });
    });

    app.use('/auth', authRoute)
}