import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet, Navigate } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

const RequireAuth = ({ allowedRoles }) => {
  const user = useTracker(() => Meteor.user());
  console.log(user);
  const userRoles = useTracker(() => {
    // Make sure the user is not null before accessing roles
    return user ? Roles.getRolesForUser(user._id) : [];
  });

  console.log(userRoles);

  return user ? (
    //allowedRoles?.some(role => Roles.userIsInRole(user._id, role)) ? (
    true ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;