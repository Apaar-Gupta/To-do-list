const testController = (req,res) => {
  res.status(200).send('Hello from testController')
}
module.exports = { testController }