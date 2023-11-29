import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { BreedsCollection } from '/imports/api/breeds';
import { ClientsCollection } from '/imports/api/clients';
import { EmployeesCollection } from '/imports/api/employees';
import { ApplicationsCollection } from '/imports/api/applications';

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

Meteor.publish("clients", function () {
  return ClientsCollection.find();
});

Meteor.methods({
  'clients.insert'(client) {
    const newClientId = ClientsCollection.insert(client);
    return newClientId;
  }
});

Meteor.methods({
  'clients.update'(clientId, updatedClient) {
    const result = ClientsCollection.update({ _id: clientId }, { $set: updatedClient });
    return result;
  }
});

Meteor.methods({
  'clients.delete'(clientId) {
    const newClientId = ClientsCollection.remove(clientId);
    return newClientId;
  }
});

Meteor.publish("employees", function () {
  return EmployeesCollection.find();
});

Meteor.methods({
  'employees.insert'(employee) {
    const newEmployeeId = EmployeesCollection.insert(employee);
    return newEmployeeId;
  }
});

Meteor.methods({
  'employees.update'(employeeId, updatedEmployee) {
    const result = EmployeesCollection.update({ _id: employeeId }, { $set: updatedEmployee });
    return result;
  }
});

Meteor.methods({
  'employees.delete'(employeeId) {
    const newEmployeeId = EmployeesCollection.remove(employeeId);
    return newEmployeeId;
  }
});

Meteor.publish("applications", function () {
  return ApplicationsCollection.find();
});

Meteor.methods({
  'applications.insert'(application) {
    const newApplicationId = ApplicationsCollection.insert(application);
    return newApplicationId;
  }
});

Meteor.methods({
  'applications.update'(applicationId, updatedApplication) {
    const result = ApplicationsCollection.update({ _id: applicationId }, { $set: updatedApplication });
    return result;
  }
});

Meteor.methods({
  'applications.delete'(applicationId) {
    const newApplicationId = ApplicationsCollection.remove(applicationId);
    return newApplicationId;
  }
});





