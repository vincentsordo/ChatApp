var expect = require('expect');
var {Users} = require('./../../server/utils/Users');



describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Vincent',
      room: 'Room one'
    },
    {
      id: 2,
      name: 'Michael',
      room: 'Room one'
    },
    {
      id: 3,
      name: 'Rachel',
      room: 'Room two'
    }]
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Vincent',
      room: 'New Room'
    };
    var addedUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return list of users for room one', () => {
    let usersList = users.getUserList('Room one');
    expect(usersList).toEqual(['Vincent', 'Michael']);
  });

  it('should get the user with id of 1', () => {
    let user = users.getUser(1);
    expect(user).toEqual(users.users[0]);
  });

  it('should remove user with id of 1', () => {
    users.removeUser(1);
    expect(users.users.length).toBe(2);
  });
});
