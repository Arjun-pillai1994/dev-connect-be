#Dev Tinder APIS


authRouter
POST /auth/signup
POST /auth/login
POST /auth/logout


profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password


connectionRequestRouter
POST /request/send/interested/:userId
POST /request/send/ignore/:userId
POST /request/review/accepted/:userId
POST /request/review/rejected/:userId


POST user/connections
POST user/requests
POST user/feed - GETS you the details of other users in the platform