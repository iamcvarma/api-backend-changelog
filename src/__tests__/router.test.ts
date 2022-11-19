import app from '../server'
import supertest from 'supertest'
describe('Get /',()=>{
    it('should return a response',async()=>{
        const res = await supertest(app).get('/')
        expect(res.body.message).toEqual('hello')
    })
})