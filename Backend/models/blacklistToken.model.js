const mongoose = require('mongoose');

// command: create a schema for blacklisting jwt tokens andhave ttl  of 24 hours

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);

