const router= require ('express').Router();
let Flight = require ('../airlines/flights');

router.route('/').get((req,res)=> {
    Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: '+ err)) ;

}) ;


router.route('/add').post ((req,res) => {
    const From =req.body.From ;
    const To = req.body.To;
    const Flight_Date =req.body.Flight_Date;
    const  Cabin =req.body.Cabin;
    const Seats_Available=Number(req.body.Seats_Available);

    const newFlight = new Flight ({
        From,
        To,
        Flight_Date,
        Cabin,
        Seats_Available,


    }) ;

    newFlight.save()
      .then(() => res.json ('Flight Added!'))
      .catch (err=> res.status (400).json('Error:' + err));

});

router.route('/:id').get((req,res)=>
{
    Flight.findById(req.params.id)
    .then(Flight => res.json(Flight))
    .catch (err=> res.status (400).json('Error:' + err));
})

router.route('/:id').delete((req,res)=>
{
    Flight.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Flight Deleted'))
    .catch (err=> res.status (400).json('Error:' + err));
})

router.route('/update/:id').post((req,res)=>
{
    Flight.findById(req.params.id)
    .then(Flight => {
        Flight.From =req.body.From ;
        Flight.To = req.body.To;
        Flight.Flight_Date = req.body.Flight_Date;
        Flight.Cabin =req.body.Cabin;
        Flight.Seats_Available=Number(req.body.Seats_Available);

        Flight.save()

        .then(() => res.json ('Flight updated!'))
      .catch (err=> res.status (400).json('Error:' + err));
    })
    .catch (err=> res.status (400).json('Error:' + err));
});


module.exports= router;
