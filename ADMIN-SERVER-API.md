# The Admin Server API and How it Works

The Admin Server API allows users to create "Piece"-type documents and link them to "Pin"-type documents via the Ceramic API and Admin Server. It performs its operations on the authenticated Ceramic client using its own DID-key, and as a result, "Pin" documents are always created through the Admin Server API.

This page describes and details the document creation process, as well as the actions allowed for users and administrators.

## Document creation
When a user uploads a new document via the /upload page in Riff.cc, a Ceramic API call is made authenticated with the user's DID-key. This creates a new document of type Piece and returns the StreamID of the new document.

After creating the Piece document, the application makes a call to the Admin Server through the /pin route, providing the following data in the request body:

```javascript
{
   ownerID?: string;
   websiteID?: string;
   categoryID?: string;
   pieceID?: string;
   approved?: boolean;
   rejected?: boolean;
   rejectionReason?: string;
}
```

This data is used to create a new Pin document that links to the Piece document via its StreamID, named pieceID in the data object.

## Actions allowed for Users
Users can perform two actions on Riff.cc:

### Action **create**
When a user creates a new Piece document, the API is called with the "create" action. This creates a new Pin document with the information provided in the request body. The Pin document is linked to the previously created Piece document.

### Action **edit**
If the Pin document has not yet been approved or rejected, the user can modify the "name", "cid" and "details" fields of the Piece document and the Pin document category. If this action is executed, the API takes the StreamID of the current Pin document and deletes it. Then, create a new copy of the Piece document with the updated fields and with the new StreamID create a new Pin document with the updated category (if it has changed).

## Actions allowed for Administrators
Administrators are allowed to call all User actions, in addition to the following Admin-exclusive ones:

### Action **edit**
The "edit" action works the same way as when the user executes it; however, administrators can modify the "name", "cid" and "details" fields of the Piece document and the category of the Pin document even if the Pin document has been approved or rejected.

### Action **reject**
The "reject" action allows to mark a Pin document as rejected and provide a rejection reason in the "rejectionReason" field.

### Action **delete**
The "delete" action allows to delete a Pin document and therefore also the linked Piece document.

### Action **unreject**
The "unreject" action allows to undo a previous reject action on a Pin document.

### Action **approve**
The "approve" action allows to Pin a document as approved.
