const request = require("supertest");
const {describe, expect, it, test} = require
("@jest/globals")
const app = require("./src/app")
const { User } = require("./models")
const { Fruit } = require("/models")
const syncSeed = require("./seed.js")

beforeAll (async () => {
    await syncSeed()
    const users = await User.findAll({})
    const fruits = await Fruit.findAll({})
    restQuantity = users.length
    restQuantity1 = fruits.length
})
describe("Users", () => {

    test("GET users returns an array of users", async () => {
        const response = await request(app).get("/users")
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body[0]).toHaveProperty("name")
    })

test("GET user:id returns correct user details", async () => {
    const userId = 1
    const response = await request(app).get("/users/1")
    expect(response.body).toEqual(
        expect.objectContaining({
            name: "User 1",
            age: 30
        })
    )
})
test("POST restaurant a new array", async () => {
    const response = await request(app)
    .post("/users")
    .send({name: "User 5", age: 54})
    expect(response.body.length).toEqual(restQuantity + 1)
})
test('PUT users returns an updated array of users', async () => {
    await request(app)
    .put("/users/1")
    .send({ name: "User One", Age: 45}) // noting what info will be sent to replace item 1
    const user = await User.findbyPk(1)
    expect(user.name).toEqual("User One")
})

test("delete db by id", async () => {
    await request(app).delete("/users/1")   //deleted item 1 from db
    const users = await User.findAll({})
    expect(users.length).toEqual(restQuantity) 
    expect(users[0].id).not.toEqual(1) //checking first 1 does not have an id of 1 as should have been deleted. 
})
})