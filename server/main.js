import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { BreedsCollection } from '/imports/api/breeds';
import { ClientsCollection } from '/imports/api/clients';
import { EmployeesCollection } from '/imports/api/employees';
import { ApplicationsCollection } from '/imports/api/applications';
import { CompetitionsCollection } from '/imports/api/competitions';
import { AnimalsCollection } from '/imports/api/animals';
import { ParticipationsCollection } from '/imports/api/participations';

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

const defineCrudMethods = (collection) => {
  Meteor.methods({
    [`${collection._name}.insert`](document) {
      const newDocumentId = collection.insert(document);
      return newDocumentId;
    },

    [`${collection._name}.update`](documentId, updatedDocument) {
      const result = collection.update({ _id: documentId }, updatedDocument, { replace: true });
      return result;
    },

    [`${collection._name}.delete`](documentId) {
      const result = collection.remove(documentId);
      return result;
    },
  });

  Meteor.publish(`${collection._name}`, function () {
    return collection.find();
  });
};

defineCrudMethods(AnimalsCollection);
defineCrudMethods(ParticipationsCollection);
defineCrudMethods(BreedsCollection);
defineCrudMethods(ClientsCollection);
defineCrudMethods(EmployeesCollection);
defineCrudMethods(ApplicationsCollection);
defineCrudMethods(CompetitionsCollection);