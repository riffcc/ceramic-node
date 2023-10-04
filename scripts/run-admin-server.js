
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { CREATE_PIN, UPDATE_PIN, CREATE_ETH_ACCOUNT, UPDATE_ETH_ACCOUNT, CREATE_FEATURED, CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION, UPDATE_SITE } from '../utils/constants.js';
import createComposeClient from '../utils/createComposeClient.js';
import verifySignature from '../utils/verifySignature.js';
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err); // Registra el error en la consola.
  res.status(500).json({ error: JSON.stringify(err) });
});


app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.post('/account', async (req, res) => {
  const action = req.body.action
  const accountData = req.body.data
  const msg = req.body.msg
  const signature = req.body.signature
  const address = req.body.address

  const isValid = verifySignature(msg, signature, address)
  console.log('signature is valid', isValid)
  if (!isValid) {
    res.status(500).json({
      message: "Signature invalid."
    })
  }

  try {
    const compose = await createComposeClient()

    if (action === 'create') {
      console.log(accountData)
      try {
        const result = await compose.executeQuery(CREATE_ETH_ACCOUNT, {
          input: {
            content: {
              ...accountData
            }
          }
        })

        res.status(200).json({
          accountID: result.data.createEthAccount.document.id
        })
      } catch (error) {
        console.log('error on execute create eth account', error)
        res.status(500).json({
          msg: 'Invalid user data',
          error: JSON.stringify(error)
        })
      }
    } else if (action === 'edit') {

      const accountId = req.body.accountId
      if (!accountId) {
        res.status(500).json({
          message: "AccountId missing param"
        })
      }
      const input = {
        id: accountId,
        content: {
          ...accountData
        }
      }
      const result = await compose.executeQuery(UPDATE_ETH_ACCOUNT, {
        input
      })
      if (!result.data.updateEthAccount) {
        res.status(500).json({
          message: "Error on update account"
        })
      }
      res.status(200).json({
        accountID: result.data.updateEthAccount.document.id
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: JSON.stringify(error) })
  }
})
app.post('/pin', async (req, res) => {
  const action = req.body.action
  const pinData = req.body.data
  let pinID = req.body.pinId ?? undefined
  const msg = req.body.msg
  const signature = req.body.signature
  const address = req.body.address
  
  const isValid = verifySignature(msg, signature, address)
  if (!isValid) throw new Error("Signature invalid")

  const compose = await createComposeClient()
  if (action == 'create') {
    const result = await compose.executeQuery(CREATE_PIN, {
      input: {
        content: {
          ...pinData
        }
      }
    })

    res.status(200).json({
      pinID: result.data.createPin.document.id
    })

  } else if (action == 'edit') {
    console.log('pinId from edit', pinID)
    await compose.executeQuery(UPDATE_PIN, {
      input: {
        id: pinID,
        content: {
          approved: false,
          rejected: false,
          rejectionReason: "",
          deleted: true
        }
      }
    })

    const result = await compose.executeQuery(CREATE_PIN, {
      input: {
        content: {
          ...pinData
        }
      }
    })
    console.log('result create pin', result)
    pinID = result.data.createPin.document.id
  } else if (action == 'reject') {
    const result = await compose.executeQuery(UPDATE_PIN, {
      input: {
        id: pinID,
        content: {
          ...pinData,
          approved: false,
          rejected: true,
        }
      }
    })
    pinID = result.data.updatePin.document.id
  } else if (action == 'delete') {
    const result = await compose.executeQuery(UPDATE_PIN, {
      input: {
        id: pinID,
        content: {
          ...pinData,
          approved: false,
          rejected: false,
          rejectionReason: "",
          deleted: true
        }
      }
    })
    pinID = result.data.updatePin.document.id
  } else if (action == 'unreject') {
    const result = await compose.executeQuery(UPDATE_PIN, {
      input: {
        id: pinID,
        content: {
          approved: false,
          rejected: false,
          rejectionReason: "",
        }
      }
    })
    pinID = result.data.updatePin.document.id
  } else if (action == 'approve') {
    const result = await compose.executeQuery(UPDATE_PIN, {
      input: {
        id: pinID,
        content: {
          approved: true,
          rejected: false,
          rejectionReason: '',
        }
      }
    })
    pinID = result.data.updatePin.document.id
  } else {
    throw new Error("invalid action")
  }

  res.status(200).json({ pinID })

});
app.post('/featured', async (req, res) => {
  const action = req.body.action
  const featuredData = req.body.data
  const msg = req.body.msg
  const signature = req.body.signature
  const address = req.body.address
  const isValid = verifySignature(msg, signature, address)
  if (!isValid) {
    res.status(500).json({
      message: "Signature invalid."
    })
  }

  try {
    const compose = await createComposeClient()
    if (action == 'create') {
      try {
        const result = await compose.executeQuery(CREATE_FEATURED, {
          input: {
            content: {
              ...featuredData
            }
          }
        })
        console.log(result)
        res.status(200).json({
          featuredID: result.data.createFeatured.document.id
        })
      } catch (error) {
        console.log('error on execute create eth account', error)
        res.status(500).json({
          msg: 'Invalid user data',
          error: JSON.stringify(error)
        })
      }

    } else {
      throw new Error("invalid action")
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: JSON.stringify(error) })
  }

});

app.post('/subscription', async (req, res) => {
  const action = req.body.action
  const subcriptionData = req.body.data
  const msg = req.body.msg
  const signature = req.body.signature
  const address = req.body.address
  const isValid = verifySignature(msg, signature, address)
  if (!isValid) {
    res.status(500).json({
      message: "Signature invalid."
    })
  }

  try {
    const compose = await createComposeClient()
    if (action == 'create') {
      console.log('from create', subcriptionData)
      const result = await compose.executeQuery(CREATE_SUBSCRIPTION, {
        input: {
          content: {
            ...subcriptionData
          }
        }
      })
      console.log(result)
      res.status(200).json({
        subscriptionID: result.data.createSubscription.document.id
      })

    } else if (action == 'update') {
      console.log('from update', subcriptionData)
      const result = await compose.executeQuery(UPDATE_SUBSCRIPTION, {
        input: {
          ...subcriptionData
        }
      })
      console.log(result)
      res.status(200).json({
        subcriptionID: result.data.updateSubscription.document.id
      })
    } else {
      throw new Error("invalid action")
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: JSON.stringify(error) })
  }

});

app.post('/site', async (req, res) => {
  const action = req.body.action
  const siteData = req.body.data
  const siteId = req.body.siteId
  const msg = req.body.msg
  const signature = req.body.signature
  const address = req.body.address
  const isValid = verifySignature(msg, signature, address)
  if (!isValid) {
    res.status(500).json({
      message: "Signature invalid."
    })
  }

  const compose = await createComposeClient()
  if (action == 'update') {
    console.log('from update', siteData)
    const result = await compose.executeQuery(UPDATE_SITE, {
      input: {
        id: siteId,
        content: {
          ...siteData
        }
      }
    })
    console.log(result)
    res.status(200).json({
      siteID: result.data.updateSite.document.id
    })

  } else {
    throw new Error("invalid action")
  }

});

app.listen(3001, function () {
  console.log('Server run on port 3001');
});
