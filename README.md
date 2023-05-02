# pointr-sdk

This is an SDK for the pointr api. It works as a middleware to facilitate the access to the API without requiring any extra work using other libraries.

## Installation

You can install Pointr using `npm`:

```bash
npm install pointr-sdk --save
```

## Usage

To use Pointr, you'll need to declare an instance of a `PointrClient` as it follows:

```javascript
import { Pointr } from "pointr-sdk";

const pointr = new Pointr("your_api_key");
```

Then, you can execute the methods available in the `Pointr` class. For example:

```javascript
const points = await pointr.getDraft("corene_putsbox")

console.log(points); // [{ question: "How would you describe... }]
```

Now, you can use the various methods available in the `Pointr` class to interact with the API. For example:

```javascript
const draft = await pointr.getDraft("user_key");
console.log(draft);

const newDraft = await pointr.createDraft({ email: "user@email.com", userKe... });
console.log(newDraft);

const draftUrl = await pointr.createDraftUrl("user_key");
console.log(draftUrl);

const draftPoints = await pointr.getDraftPoints("user_key");
console.log(draftPoints);

const userExists = await pointr.checkIfUserExists("user_email");
console.log(userExists);

const existingPoints = await pointr.getExistingPoints("user_email");
console.log(existingPoints);
```

## Documentation

You can find the documentation for the SDK [here](https://app.pointr.co/settings).

Remember that you must be logged in to access the documentation.