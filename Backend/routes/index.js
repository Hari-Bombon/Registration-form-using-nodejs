const authRoute= required('./auth.route.js')
module.exports=(app)=>{
    app.get('/' , function(Req,res){
        res.send({
            'message':'Our first endpoint'
        });
    });

    app.use('/auth', authRoute)
}