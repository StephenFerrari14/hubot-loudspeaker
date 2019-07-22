# hubot-loudspeaker

Hubot script that posts a message in all channels it is in. Used to get a message to multiple channels.
Works for private and public slack channels.
Starting announcement conversation requires to be in a DM with bot

See [`src/loudspeaker.js`](src/loudspeaker.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-loudspeaker --save`

Then add **hubot-loudspeaker** to your `external-scripts.json`:

```json
[
  "hubot-loudspeaker"
]
```

## Sample Interaction

```
user1>> announcement: I would like everyone to know THIS
hubot>> Are you sure?
Message preview:
Announcement! Stephen Ferrari says I would like everyone to know THIS
user1>> yes
```

## NPM Module

https://www.npmjs.com/package/hubot-loudspeaker
