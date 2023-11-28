import { Meteor } from 'meteor/meteor';
import { BreedsCollection } from '/imports/api/breeds';

Meteor.startup(() => {
  
});

Meteor.publish("breeds", function () {
  return BreedsCollection.find();
});

Meteor.methods({
  'breeds.insert'(breed) {
    console.log(breed)
    const newBreedId = BreedsCollection.insert(breed);
    return newBreedId;
  }
});

