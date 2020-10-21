const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/countriesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//-----    Countries Schema    -----//
const countriesRateSchema = new mongoose.Schema({
  name: {
    type: String,
    // required:[true, "Please check your data. No name !"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please check your data. No rate !"]
  },
  review: String,
});

//-----    People Schema    -----//
const peopleShema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteCountry: countriesRateSchema
});

//-----    creating models   -----//
const Country = mongoose.model("Country", countriesRateSchema);
const Person = mongoose.model("Person", peopleShema);


// -----    creatind documents for DB   -----//
const estonia = new Country({
  name: "Estonia",
  rating: 7,
  review: "Nice nature and all seasons capture the place. Little bit rainy but not enough to be a depressed person."
});

const bulgaria = new Country({
  name: "Bulgaria",
  rating: 6,
  review: "Nice place to chill, but needs some attention inside the country for people who live there!"
});

const finland = new Country({
  name: "Finland",
  rating: 8,
  review: "Almost perfect but, a little bit too cold to be there all year."
});

const egypt = new Country({
  name: "Egypt",
  rating: 5,
  review: "Nice and hot, but too many hungry people and still not a safe place."
});

const noName = new Country({
  rating: 6,
  review: "That country have no name !"
});

const person = new Person({
  name: "Ukku",
  age: 25,
  favouriteCountry: estonia
});


//-----    Generating 10 new persons   -----//
const listOfPeople = [];

for (var i = 0; i < 10; i++) {
  const person = new Person({
    name: "John",
    age: 37
  });
  listOfPeople.push(person);
};


// =================================================================================
// INSERT MANY DOCUMENTS INTO COLLECTION
// =================================================================================
//
// Person.insertMany(      // or Country depends into what collection we will add data.
//   listOfPeople,       // or separated objects [bulgaria,estonia,finladn etc.]
//   function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Succesfully saved all documents to countriesDB");
//     }
//   });



// =================================================================================
// UPDATE ONE DOCUMENT INTO COLLECTION
// =================================================================================

Person.updateOne({_id: "5f9029c9b0696131e0944f7e"},{favouriteCountry: finland},
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully updated document to countriesDB");
    }
  });



  // =================================================================================
  // DELETE ONE DOCUMENT FROM COLLECTION
  // =================================================================================

  // Country.deleteOne({name: "noNameCountry"},
  //   function(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Succesfully deleted document from countriesDB");
  //     }
  //   });



    // =================================================================================
    // DELETE MANY DOCUMENTS FROM COLLECTION
    // =================================================================================
    //
    // Person.deleteMany({name: "John"},       // Deleted  all documents that have name: "John"
    //   function(err) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("Succesfully deleted documents from countriesDB");
    //     }
    //   });



//-----   Saving document into collection    -----//
// country.save().then(() => console.log('Document saved into collection !'));;
// person.save().then(() => console.log('Document saved into collection !'));;



// =================================================================================
// SEARCHING DOCUMENTS IN COLLECTIONS
// =================================================================================

// Country.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//
//     //-----    log all documents in country collection and show only names   -----//
//     fruits.forEach(function(country) {
//       console.log(country.name);
//     });
//
//   }
// })

    //-----    closing connection with DB -----//
    mongoose.connection.close();
