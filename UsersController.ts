import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
    async index({view}) {
        Database.query()
        const users = await Database.from('users')
        return view.render('users.index', {users: users})
    }
}