import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { BreedsCollection } from '/imports/api/breeds';

const roles = ['admin', 'user'];

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    const userId = Accounts.createUser({
      username: 'admin',
      password: 'admin',
    });
    Roles.addUsersToRoles(userId, 'admin');
  }
  
});

Meteor.methods({
  'user.login'({ username, password }) {
    const user = Meteor.users.findOne({ username });
    
    if (user && Accounts._checkPassword(user, password)) {
      return true;
    }
    
    return false;
  },
});

Meteor.publish("breeds", function () {
  return BreedsCollection.find();
});

Meteor.methods({
  'breeds.insert'(breed) {
    const newBreedId = BreedsCollection.insert(breed);
    return newBreedId;
  }
});

Meteor.methods({
  'breeds.update'(breedId, updatedBreed) {
    const result = BreedsCollection.update({ _id: breedId }, { $set: updatedBreed });
    return result;
  }
});

Meteor.methods({
  'breeds.delete'(breedId) {
    const newBreedId = BreedsCollection.remove(breedId);
    return newBreedId;
  }
});

