const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const existing = bcrypt.compareSync(password, users[i].pswHash);
          if (existing) {
            let userToReturn = {...users[i]}
            delete userToReturn.pswHash;
            console.log(userToReturn)
            res.status(200).send(userToReturn)
            return
          }
        }
        // if (users[i].username === username && users[i].password === password) {
        //   res.status(200).send(users[i])
        // }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {password, username, email, firstName, lastName } = req.body;
        console.log('Registering User')
        console.log(req.body)
        const salt = bcrypt.genSaltSync(5);
        const pswHash = bcrypt.hashSync(password, salt);
        

        let user = {
          username,
          email,
          firstName,
          lastName,
          pswHash
        }
        

      console.log(user);


        users.push(req.body)
        res.status(200).send(req.body)

    }
}