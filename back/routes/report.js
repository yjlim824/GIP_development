const express = require('express');
const router = express.Router();
const request = require('request');
const client = require('@jsreport/nodejs-client')('http://localhost:5488', "admin", "password" );
const fs = require('fs');
const path = require('path');


async function render () {
  const res = await client.render({
    template: {
      content: 'hello {{someText}}',
      recipe: 'chrome-pdf',
      engine: 'handlebars'
    },
    data: { someText: 'world!!' }
  })

  //console.log(res.headers)
  const bodyBuffer = await res.body()
 // console.log(bodyBuffer.toString())
}

//render().catch(console.error)

// router.get('/', (req, res, next) => {
//    client.render({
//      template: { name: 'goseong-main', recipe: 'chrome-pdf', engine: 'handlebars' },
//      data : JSON.stringify(req.body)
//    }).then((response) => response.pipe(res))
//      .catch(next)
//  });

router.post('/', async(req, res, next) => {
    try {        
        const data = req.body;
        //const id = req.body.id;
        const date = req.body.report_date;
        const year = date.slice(0,4);
        const month = date.slice(5,7);
        console.log(year,month);
        const report = await client.render({
          template: { name: 'sacheontour-main', recipe: 'chrome-pdf', engine: 'handlebars' },
          data : JSON.stringify(data)
        });
        let fileName = "sacheontour" + year + month + ".pdf";
        var filePathName = path.join(__dirname,'../report/' + fileName);
        const bodyBuffer = await report.body();
        fs.writeFile(filePathName, bodyBuffer, function(err){

          if(err) {
              res.send({
                  message : 'failed'
              })
          }
          res.send({
              message : 'success'
          })
      });


       // res.status(201).send('ok');
      } catch (error) {
        console.error(error);
        next(error);
      }
    
});

module.exports = router;