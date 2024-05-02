import express from 'express'
import cors from 'cors'
import Stripe  from "stripe"
let stripe=new Stripe('sk_test_51P8FVQSJbdORr3L1sqEPNXiAUTcUk11YOUAKNVKAaKNxf1u5YCNiiIPBtiRVtpvTdCfzDzOnoSLWqHOA4Uyevyr000heVnyYbC');
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors())
//http://localhost:1000
app.get('/',(req,res)=>{  res.send("hello from server")})
//http://localhost:1000/create-payment-intent
app.post("/create-payment-intent", async (req, res) => {    
  const { amount,details } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount:amount * 100,
    currency: "usd",
    // description:"car rental",
    automatic_payment_methods: {
      enabled: true,},
      // shipping:{
      //   address:{
      //       line1:"aaa", line2:"aaa",
      //       city:"Ahmedabad", state:"Gujrat",
      //       country:"US" },
      //   name:details.name,phone:details.mobile  }
})
  res.send({
    clientSecret: paymentIntent.client_secret});
});
let PORT=1000
app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));