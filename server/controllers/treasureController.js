module.exports = {
    dragonTreasure: async (req, res) => {
        let db = req.app.get('db')
        let dragTreasure = await db.get_dragon_treasure(1)

        return res.status(200).send(dragTreasure)
    }
}