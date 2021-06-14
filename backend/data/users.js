import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@abc.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Naieem Khan',
        email: 'naieem@abc.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Nira Durjoy',
        email: 'nira@abc.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users