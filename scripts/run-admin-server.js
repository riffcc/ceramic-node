
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { CREATE_PIN, UPDATE_PIN } from '../utils/constants.js';
import createComposeClient from '../utils/createComposeClient.js';
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.post('/pin', async (req, res) => {
  const action = req.body.action
  const adminID = req.body.adminID
  const pinData = req.body.data
  let pinID = req.body.pinID ?? undefined

  try {
    if (!pinData || !action) throw new Error("missing params on POST call")
    const compose = await createComposeClient()
    if (action == 'create') {
      const input = {
        content: {
          ...pinData
        }
      }
      const result = await compose.executeQuery(CREATE_PIN, {
        input
      })
      pinID = result.data.createPin.document.id
    } else if (action == 'edit') {

      if (!pinID) throw new Error("pinID undefined for edit action")
      //check if user is pin owner
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
      pinID = result.data.createPin.document.id
    } else if (action == 'reject') {

      if (!pinID || !adminID) throw new Error("pinID or adminID undefined for reject action")
      //check if user is admin
      console.log(
      )
      const input = {
        id: pinID,
        content: {
          ...pinData,
          approved: false,
          rejected: true,
        }
      }
      const result = await compose.executeQuery(UPDATE_PIN, {
        input
      })
      pinID = result.data.updatePin.document.id
    } else if (action == 'delete') {

      if (!pinID || !adminID) throw new Error("pinID or adminID undefined for delete action")
      //check if user is admin
      const input = {
        id: pinID,
        content: {
          ...pinData,
          approved: false,
          rejected: false,
          rejectionReason: "",
          deleted: true
        }
      }

      const result = await compose.executeQuery(UPDATE_PIN, {
        input
      })
      pinID = result.data.updatePin.document.id
    } else if (action == 'unreject') {

      if (!pinID || !adminID) throw new Error("pinID or adminID undefined for unreject action")
      //check if user is admin
      const input = {
        id: pinID,
        content: {
          approved: false,
          rejected: false,
          rejectionReason: "",
        }
      }
      const result = await compose.executeQuery(UPDATE_PIN, {
        input
      })
      pinID = result.data.updatePin.document.id
    } else if (action == 'approve') {

      if (!pinID || !adminID) throw new Error("pinID or adminID undefined for approve action")
      //check if user is admin
      const input = {
        id: pinID,
        content: {
          ...pinData,
          approved: true,
          rejected: false,
          rejectionReason: '',
        }
      }
      const result = await compose.executeQuery(UPDATE_PIN, {
        input
      })
      pinID = result.data.updatePin.document.id
    } else {
      throw new Error("invalid action")
    }

    res.status(200).json({
      pinID
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: JSON.stringify(error) })
  }

});


app.listen(3001, function () {
  console.log('Server run on port 3001');
});
