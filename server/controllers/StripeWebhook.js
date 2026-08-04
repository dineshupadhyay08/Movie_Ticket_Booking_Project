import stripe from 'stripe';

export const stripeWebhooks = async(request,response)=>{
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers['stripe-signature'];

  let event;

  try{
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }catch(error){
    return response.status(400).send(`Webhook Error: ${error.message}`);
    // console.log(`⚠️  Webhook signature verification failed.`, error.message);
  }

}